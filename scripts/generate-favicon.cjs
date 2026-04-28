/**
 * Regenerates raster favicons from the canonical ArchRecon SVG brand marks.
 * Run: npm run generate:favicon
 *
 * Source: public/favicon-dark.svg (navy circle + gradient mark — same asset as tab “dark” SVG).
 * Outputs: public/favicon.ico (16/32/48 PNG frames), public/apple-touch-icon.png (180×180).
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const toIco = require("to-ico");

async function main() {
  const root = path.join(__dirname, "..");
  const svgPath = path.join(root, "public/favicon-dark.svg");
  const svg = fs.readFileSync(svgPath);

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer()),
  );
  const ico = await toIco(pngBuffers);
  fs.writeFileSync(path.join(root, "public/favicon.ico"), ico);

  await sharp(svg)
    .resize(180, 180)
    .png()
    .toFile(path.join(root, "public/apple-touch-icon.png"));

  console.log(
    "OK: wrote public/favicon.ico (%s) and public/apple-touch-icon.png",
    sizes.join(", ") + " px",
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
