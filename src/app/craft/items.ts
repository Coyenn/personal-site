export const craftTitle = "Craft";
export const craftDescription = "A gallery of my designs and experiments.";

export type CraftImageMedia = {
  height: number;
  kind: "image";
  src: string;
  width: number;
};

export type CraftVideoMedia = {
  height: number;
  kind: "video";
  src: string;
  width: number;
};

export type CraftMedia = CraftImageMedia | CraftVideoMedia;

type CraftBase = {
  date: string;
  dateTime: string;
  description?: string;
  href?: string;
  slug: string;
  tags: string[];
  title: string;
};

export type CraftImageItem = CraftBase & { media: CraftImageMedia };
export type CraftVideoItem = CraftBase & { media: CraftVideoMedia };
export type CraftItem = CraftImageItem | CraftVideoItem;

function slugifyTitle(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function item<T extends Omit<CraftImageItem, "slug"> | Omit<CraftVideoItem, "slug">>(
  input: T,
): T & { slug: string } {
  return {
    ...input,
    slug: slugifyTitle(input.title),
  };
}

export function isCraftVideo(entry: CraftItem): entry is CraftVideoItem {
  return entry.media.kind === "video";
}

export const craftItems: CraftItem[] = [
  item({
    title: "Icon Reordering Animation",
    date: "July 2025",
    dateTime: "2025-07",
    tags: ["React", "Motion"],
    media: {
      kind: "video",
      src: "/videos/craft/iso-reodering-demo.mp4",
      width: 1920,
      height: 992,
    },
  }),
  item({
    title: "Isometric Depth Illustration",
    date: "January 2025",
    dateTime: "2025-01",
    tags: ["React", "Illustration", "Motion"],
    media: {
      kind: "video",
      src: "/videos/craft/z-index-stack.mp4",
      width: 2940,
      height: 1840,
    },
  }),
  item({
    title: "Notification Bell",
    date: "January 2025",
    dateTime: "2025-01",
    tags: ["React", "Motion"],
    media: {
      kind: "video",
      src: "/videos/craft/notification-bell.mp4",
      width: 1400,
      height: 1400,
    },
  }),
  item({
    title: "Graph Slider",
    date: "January 2025",
    dateTime: "2025-01",
    tags: ["React", "Motion"],
    media: {
      kind: "video",
      src: "/videos/craft/graph-slider.mp4",
      width: 2790,
      height: 1648,
    },
  }),
  item({
    title: "AI Prompt UI",
    date: "December 2024",
    dateTime: "2024-12",
    tags: ["Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/prompt-ui.png",
      width: 1600,
      height: 882,
    },
  }),
  item({
    title: "Gingerbread Man Icon",
    date: "December 2024",
    dateTime: "2024-12",
    tags: ["Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/breadman.png",
      width: 2160,
      height: 2160,
    },
  }),
  item({
    title: "3D Icon",
    date: "December 2024",
    dateTime: "2024-12",
    tags: ["Figma", "3D", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/3d-icon.png",
      width: 4560,
      height: 2320,
    },
  }),
  item({
    title: "SQL Client",
    date: "December 2024",
    dateTime: "2024-12",
    tags: ["Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/sql-client.png",
      width: 3249,
      height: 2399,
    },
  }),
  item({
    title: "Folder Peek",
    date: "December 2024",
    dateTime: "2024-12",
    tags: ["Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/folder-peek.png",
      width: 3840,
      height: 2160,
    },
  }),
  item({
    title: "Music App — Design Practice",
    date: "November 2024",
    dateTime: "2024-11",
    tags: ["Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/music-app-mockup.png",
      width: 3723,
      height: 4101,
    },
  }),
  item({
    title: "Lorem Agency Website Concept",
    date: "May 2024",
    dateTime: "2024-05",
    description:
      "A design exercise to practice my Figma skills. I wanted to create a modern and clean agency website.",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/lorem-agency.png",
      width: 7680,
      height: 4320,
    },
  }),
  item({
    title: "Banking App Concept",
    date: "April 2024",
    dateTime: "2024-04",
    description: "Design exercise to practice my Figma skills. (21.04.2024)",
    tags: ["React", "Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/banking-app.png",
      width: 4322,
      height: 3196,
    },
  }),
  item({
    title: "Banking App Concept (Full View)",
    date: "April 2024",
    dateTime: "2024-04",
    description: "Design exercise to practice my Figma skills. (21.04.2024)",
    tags: ["React", "Figma", "Design"],
    media: {
      kind: "image",
      src: "/images/craft/banking-app-2.png",
      width: 4320,
      height: 4320,
    },
  }),
  item({
    title: "iPhone Mockup (Rock)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (26.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/iphone-mockup-rock.png",
      width: 1920,
      height: 1920,
    },
  }),
  item({
    title: "iPhone Mockup (Table)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (26.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/iphone-mockup-table.png",
      width: 3840,
      height: 2160,
    },
  }),
  item({
    title: "iPhone Mockup (White)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (25.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/iphone-mockup-white.png",
      width: 2160,
      height: 2160,
    },
  }),
  item({
    title: "iPhone Mockup (White 2)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (25.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/iphone-mockup-white-2.png",
      width: 2160,
      height: 2160,
    },
  }),
  item({
    title: "KPIs (Black & White)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (24.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/kpi-black-and-white.png",
      width: 1823,
      height: 984,
    },
  }),
  item({
    title: "Charts (Black & White)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (24.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/charts-black-and-white.png",
      width: 2732,
      height: 2250,
    },
  }),
  item({
    title: "Bar Charts",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (23.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/bar-charts.png",
      width: 2574,
      height: 2250,
    },
  }),
  item({
    title: "Admin Toolbar",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (22.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/admin-toolbar.png",
      width: 998,
      height: 673,
    },
  }),
  item({
    title: "AI Tasks App Concept (3)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (21.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/ai-tasks-app-concept-3.png",
      width: 998,
      height: 1065,
    },
  }),
  item({
    title: "AI Tasks App Concept (2)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (20.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/ai-tasks-app-concept-2.png",
      width: 1053,
      height: 831,
    },
  }),
  item({
    title: "AI Tasks App Concept (1)",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (20.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/ai-tasks-app-concept-1.png",
      width: 2000,
      height: 1982,
    },
  }),
  item({
    title: "Team Select",
    date: "January 2024",
    dateTime: "2024-01",
    description:
      "A concept for a team select dropdown. Design exercise to practice my Figma skills. (19.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/team-select.png",
      width: 1500,
      height: 1332,
    },
  }),
  item({
    title: "WYSIWYG Concept",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (18.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/wysiwyg-concept.png",
      width: 2401,
      height: 1227,
    },
  }),
  item({
    title: "Create Account Modal",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (17.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/create-account-modal.png",
      width: 1268,
      height: 1850,
    },
  }),
  item({
    title: "TYPO3 Sidebar Concept",
    date: "January 2024",
    dateTime: "2024-01",
    description:
      "A concept for a new sidebar for the TYPO3 CMS backend. Design exercise to practice my Figma skills. (16.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/typo3-sidebar.png",
      width: 1243,
      height: 1976,
    },
  }),
  item({
    title: "Feedback Modal",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (15.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/feedback-modal.png",
      width: 1268,
      height: 1301,
    },
  }),
  item({
    title: "Black & White Buttons",
    date: "January 2024",
    dateTime: "2024-01",
    description: "Design exercise to practice my Figma skills. (14.01.2024)",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/black-white-buttons.png",
      width: 1580,
      height: 822,
    },
  }),
  item({
    title: "TYPO3 Dashboard Redesign (1)",
    date: "January 2024",
    dateTime: "2024-01",
    description:
      "A redesign of the current TYPO3 CMS backend dashboard. I focused on making the dashboard more modern and less cluttered.",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/typo3-left.png",
      width: 1920,
      height: 1078,
    },
  }),
  item({
    title: "TYPO3 Dashboard Redesign (2)",
    date: "January 2024",
    dateTime: "2024-01",
    description:
      "A redesign of the current TYPO3 CMS backend dashboard. I focused on making the dashboard more modern and less cluttered.",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/typo3-right.png",
      width: 1920,
      height: 1081,
    },
  }),
  item({
    title: "Lock Illustration",
    date: "January 2024",
    dateTime: "2024-01",
    description:
      "I couldn't find a suitable illustration for the password form on my personal site, so I decided to create one myself.",
    tags: ["Blender"],
    media: {
      kind: "image",
      src: "/images/craft/lock-illustration.png",
      width: 1080,
      height: 1080,
    },
  }),
  item({
    title: "Resource Management App Concept",
    date: "December 2023",
    dateTime: "2023-12",
    description:
      "I designed this concept for a resource management app to practice my Figma/Design skills.",
    tags: ["Figma", "Design", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/shelter.png",
      width: 2160,
      height: 2160,
    },
  }),
  item({
    title: "Redesign of my Personal Website",
    date: "August 2023",
    dateTime: "2023-08",
    href: "https://tim.cv",
    description:
      "In this iteration of my personal site, I focused on simplicity and ease of use. No complex animations. Just simple, clean and fast.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    media: {
      kind: "image",
      src: "/images/craft/personal-website-redesign.png",
      width: 1900,
      height: 995,
    },
  }),
  item({
    title: "Port Alert - Port Monitoring",
    date: "August 2023",
    dateTime: "2023-08",
    href: "https://github.com/coyenn/port-alert",
    description: "A simple port monitoring tool. Available as a docker image",
    tags: ["CLI", "Docker", "Monitoring"],
    media: {
      kind: "image",
      src: "/images/craft/port-alert.png",
      width: 1092,
      height: 617,
    },
  }),
  item({
    title: "Desktop Mockup 2 (3D Render)",
    date: "June 2023",
    dateTime: "2023-06",
    description: "This scene was rendered entriely in Blender.",
    tags: ["Blender", "3D", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/mockups/desktop.png",
      width: 1920,
      height: 1400,
    },
  }),
  item({
    title: "Desktop Mockup 1 (3D Render)",
    date: "June 2023",
    dateTime: "2023-06",
    description: "This scene was rendered entriely in Blender.",
    tags: ["Blender", "3D", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/mockups/desktop-2.png",
      width: 1920,
      height: 1080,
    },
  }),
  item({
    title: "Mobile Mockup (3D Render)",
    date: "June 2023",
    dateTime: "2023-06",
    description: "This scene was rendered entriely in Blender.",
    tags: ["Blender", "3D", "Mockup"],
    media: {
      kind: "image",
      src: "/images/craft/mockups/mobile.png",
      width: 1920,
      height: 1080,
    },
  }),
  item({
    title: "My Personal Logo",
    date: "May 2023",
    dateTime: "2023-05",
    description:
      "When reworking my personal site, I felt the need to create a logo for myself. I wanted to create something that is simple, but still has more detail than the average logo.",
    tags: ["Logo", "Design", "Figma"],
    media: {
      kind: "image",
      src: "/images/craft/my-logo-light.png",
      width: 1080,
      height: 1080,
    },
  }),
  item({
    title: "My Personal Logo (dark)",
    date: "May 2023",
    dateTime: "2023-05",
    description:
      "When reworking my personal site, I felt the need to create a logo for myself. I wanted to create something that is simple, but still has more detail than the average logo.",
    tags: ["Logo", "Design", "Figma"],
    media: {
      kind: "image",
      src: "/images/craft/my-logo-dark.png",
      width: 1080,
      height: 1080,
    },
  }),
];

export function getCraftItems() {
  return craftItems;
}
