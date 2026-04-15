export type DemoProject = {
  id: string;
  title: string;
  location: string;
  deliverable: string;
  /** Route to a real page if available; otherwise send to /projects (MVP). */
  href: string;
};

/**
 * MVP demo projects used throughout the portal (Projects page + global search).
 * Keep in sync with the cards rendered in `src/app/projects/page.tsx`.
 */
export const DEMO_PROJECTS: DemoProject[] = [
  {
    id: "williams-avenue-residence",
    title: "Williams Avenue Residence",
    location: "Larkspur, CA",
    deliverable: "Real Estate Floor Plans",
    href: "/projects",
  },
  {
    id: "pico-avenue-residence",
    title: "Pico Avenue Residence",
    location: "San Francisco, CA",
    deliverable: "Real Estate Floor Plans",
    href: "/projects",
  },
  {
    id: "estrella-avenue-residence",
    title: "Estrella Avenue Residence",
    location: "Piedmont, CA",
    deliverable: "As-Built Documentation",
    href: "/projects",
  },
  {
    id: "casa-mirador",
    title: "Casa Mirador",
    location: "Merida, Mexico",
    deliverable: "Drafting & Design",
    href: "/projects/casa-mirador",
  },
  {
    id: "harbor-point-office-suite",
    title: "Harbor Point Office Suite",
    location: "Oakland, CA",
    deliverable: "3D Reality Capture",
    href: "/projects",
  },
  {
    id: "redwood-commons-retail",
    title: "Redwood Commons Retail",
    location: "San Jose, CA",
    deliverable: "3D Reality Capture",
    href: "/projects",
  },
];

