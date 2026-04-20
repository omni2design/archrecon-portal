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
    previewImageUrl: "/projects/project-casa-mirador-front-exterior-render.webp",
    fileSize: "2.4 MB",
    version: "v2",
    uploadedLabel: "Oct 12, 2025",
    viewer: {
      fileInfoName: "Front Exterior Render",
      typeLineLabel: "Renders",
      description:
        "Exterior render of Casa Mirador, showcasing the front facade.",
    },
  },
  {
    id: "interior-courtyard",
    title: "Interior Courtyard",
    category: "Renders",
    previewImageUrl: "/projects/project-casa-mirador-interior-courtyard.webp",
  },
  {
    id: "interior-living-space",
    title: "Interior Living Space",
    category: "Renders",
    previewImageUrl: "/projects/project-casa-mirador-interior-living-space.webp",
  },
  {
    id: "courtyard-vista-view-1",
    title: "Courtyard Vista View 1",
    category: "Renders",
    previewImageUrl: "/projects/project-casa-mirador-courtyard-vista-view-1.webp",
  },
  {
    id: "courtyard-vista-view-2",
    title: "Courtyard Vista View 2",
    category: "Renders",
    previewImageUrl: "/projects/project-casa-mirador-courtyard-vista-view-2.webp",
  },
  {
    id: "backyard-arial-view",
    title: "Backyard Arial View",
    category: "Renders",
    previewImageUrl: "/projects/project-casa-mirador-backyard-arial-view.webp",
  },
  {
    id: "entry-to-backyard-landscape-plan",
    title: "Entry to Backyard Landscape Plan",
    category: "Site Plans",
    previewImageUrl: "/projects/project-casa-mirador-entry-to-backyard-landscape-plan.webp",
  },
  {
    id: "1st-floor-plan",
    title: "1st Floor Plan",
    category: "Floor Plans",
    previewImageUrl: "/projects/project-casa-mirador-1st-floor-plan.webp",
  },
  {
    id: "2nd-floor-plan-mezzanine",
    title: "2nd Floor Plan / Mezzanine",
    category: "Floor Plans",
    previewImageUrl: "/projects/project-casa-mirador-2nd-floor-plan-mezzanine.webp",
  },
  {
    id: "building-to-landscape-site-section",
    title: "Building to Landscape Site Section",
    category: "Sections",
    previewImageUrl: "/projects/project-casa-mirador-building-to-landscape-site-section.webp",
  },
];

export function getCasaMiradorAsset(assetId: string) {
  return CASA_MIRADOR_ASSETS.find((asset) => asset.id === assetId) ?? null;
}

/** Figma “Related files” row labels (design uses category lines that differ from project data). */
export const CASA_MIRADOR_RELATED_ROW_LABELS: Partial<
  Record<string, { title?: string; categoryLine: string }>
> = {
  "interior-courtyard": { categoryLine: "Renders" },
  "interior-living-space": { categoryLine: "Renders" },
  "1st-floor-plan": { title: "First Floor Plan", categoryLine: "Floor Plans" },
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

