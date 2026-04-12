export type CasaMiradorAssetCategory =
  | "Renders"
  | "Site Plans"
  | "Floor Plans"
  | "Sections"
  | "Documents";

/** Optional copy aligned to Figma File Viewer (node 216:25923) where the mock uses different labels. */
export type CasaMiradorAssetViewerMeta = {
  breadcrumbLeaf?: string;
  fileInfoName?: string;
  /** Shown in “Type: …” under the page title */
  typeLineLabel?: string;
  description?: string;
};

export type CasaMiradorAsset = {
  id: string;
  title: string;
  category: CasaMiradorAssetCategory;
  /**
   * Preview image URL (can be a remote Figma-served asset).
   * The file viewer uses this as the primary visual until we connect real file storage.
   */
  previewImageUrl: string;
  /** Sidebar + meta defaults; omitted fields use sensible demo values */
  fileSize?: string;
  version?: string;
  uploadedLabel?: string;
  viewer?: CasaMiradorAssetViewerMeta;
};

export const CASA_MIRADOR_ASSETS: CasaMiradorAsset[] = [
  {
    id: "front-exterior-render",
    title: "Front Exterior Render",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/b052effc-60db-4901-b3af-ae187b549673",
    fileSize: "2.4 MB",
    version: "v2",
    uploadedLabel: "Oct 12, 2025",
    viewer: {
      breadcrumbLeaf: "Ground Floor Plan",
      fileInfoName: "Ground Floor Plan",
      typeLineLabel: "Floor Plans",
      description:
        "Detailed ground floor architectural plan showing room layouts, dimensions, and structural elements.",
    },
  },
  {
    id: "interior-courtyard",
    title: "Interior Courtyard",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/9caf68a3-271d-40e2-9e20-e172b56b0cc4",
  },
  {
    id: "interior-living-space",
    title: "Interior Living Space",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/cd2c5b96-a41e-4bb9-ac12-84fa23337b55",
  },
  {
    id: "courtyard-vista-view-1",
    title: "Courtyard Vista View 1",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/b4b19b8c-4db1-4658-9e6a-a731b1b22e0f",
  },
  {
    id: "courtyard-vista-view-2",
    title: "Courtyard Vista View 2",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/1532aff5-778b-4c76-8348-931abe2dd9be",
  },
  {
    id: "backyard-arial-view",
    title: "Backyard Arial View",
    category: "Renders",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/95adb650-d15d-48b8-972c-455164fa7c43",
  },
  {
    id: "entry-to-backyard-landscape-plan",
    title: "Entry to Backyard Landscape Plan",
    category: "Site Plans",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/5ca2d5af-411c-4276-ba16-cab4cd14dc8d",
  },
  {
    id: "1st-floor-plan",
    title: "1st Floor Plan",
    category: "Floor Plans",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/33ed14ff-7836-444e-9d5f-220e6aaea411",
  },
  {
    id: "2nd-floor-plan-mezzanine",
    title: "2nd Floor Plan / Mezzanine",
    category: "Floor Plans",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/d69596c0-3385-4463-8de0-1677278cf18f",
  },
  {
    id: "building-to-landscape-site-section",
    title: "Building to Landscape Site Section",
    category: "Sections",
    previewImageUrl: "https://www.figma.com/api/mcp/asset/18649c2c-b945-4033-8694-3cc44239670a",
  },
];

export function getCasaMiradorAsset(assetId: string) {
  return CASA_MIRADOR_ASSETS.find((asset) => asset.id === assetId) ?? null;
}

/** Figma “Related files” row labels (design uses category lines that differ from project data). */
export const CASA_MIRADOR_RELATED_ROW_LABELS: Partial<
  Record<string, { title?: string; categoryLine: string }>
> = {
  "interior-courtyard": { categoryLine: "Sections" },
  "interior-living-space": { categoryLine: "Floor Plans" },
  "1st-floor-plan": { title: "First Floor Plan", categoryLine: "Renders" },
};

const RELATED_PRIORITY = ["interior-courtyard", "interior-living-space", "1st-floor-plan"] as const;

export function getRelatedCasaMiradorAssets(currentId: string, limit = 3): CasaMiradorAsset[] {
  const out: CasaMiradorAsset[] = [];
  for (const id of RELATED_PRIORITY) {
    if (out.length >= limit) break;
    if (id === currentId) continue;
    const a = getCasaMiradorAsset(id);
    if (a) out.push(a);
  }
  if (out.length < limit) {
    for (const a of CASA_MIRADOR_ASSETS) {
      if (out.length >= limit) break;
      if (a.id === currentId || out.some((x) => x.id === a.id)) continue;
      out.push(a);
    }
  }
  return out.slice(0, limit);
}

