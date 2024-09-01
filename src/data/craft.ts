import AdminToolbar from "@/public/images/craft/admin-toolbar.png";
import AITasksAppConcept1 from "@/public/images/craft/ai-tasks-app-concept-1.png";
import AITasksAppConcept2 from "@/public/images/craft/ai-tasks-app-concept-2.png";
import AITasksAppConcept3 from "@/public/images/craft/ai-tasks-app-concept-3.png";
import BankingApp2 from "@/public/images/craft/banking-app-2.png";
import BankingApp from "@/public/images/craft/banking-app.png";
import BarCharts from "@/public/images/craft/bar-charts.png";
import BlackWhiteButtons from "@/public/images/craft/black-white-buttons.png";
import ChartsBlackAndWhite from "@/public/images/craft/charts-black-and-white.png";
import CreateAccountModal from "@/public/images/craft/create-account-modal.png";
import FeedbackModal from "@/public/images/craft/feedback-modal.png";
import IPhoneMockupRock from "@/public/images/craft/iphone-mockup-rock.png";
import IPhoneMockupTable from "@/public/images/craft/iphone-mockup-table.png";
import IPhoneMockupWhite2 from "@/public/images/craft/iphone-mockup-white-2.png";
import IPhoneMockupWhite from "@/public/images/craft/iphone-mockup-white.png";
import KPIBlackAndWhite from "@/public/images/craft/kpi-black-and-white.png";
import LockIllustration from "@/public/images/craft/lock-illustration.png";
import LoremAgency from "@/public/images/craft/lorem-agency.png";
import Desktop2MockupImage from "@/public/images/craft/mockups/desktop-2.png";
import DesktopMockupImage from "@/public/images/craft/mockups/desktop.png";
import MobileMockupImage from "@/public/images/craft/mockups/mobile.png";
import MyLogoDark from "@/public/images/craft/my-logo-dark.png";
import MyLogoLight from "@/public/images/craft/my-logo-light.png";
import PDemoGif from "@/public/images/craft/p-demo.gif";
import PersonalWebsiteRedesign from "@/public/images/craft/personal-website-redesign.png";
import PortAlert from "@/public/images/craft/port-alert.png";
import Shelter from "@/public/images/craft/shelter.png";
import TeamSelect from "@/public/images/craft/team-select.png";
import Typo3Left from "@/public/images/craft/typo3-left.png";
import Typo3Right from "@/public/images/craft/typo3-right.png";
import Typo3Sidebar from "@/public/images/craft/typo3-sidebar.png";
import WYSIWYGConcept from "@/public/images/craft/wysiwyg-concept.png";

import type { StaticImageData } from "next/image";

export interface Craft {
	title: string;
	description?: string;
	tags?: string[];
	date: string;
	link?: string;
	target?: string;
	image?: StaticImageData;
}

const craft: Craft[] = [
	{
		title: "Lorem Agency Website Concept",
		date: "May 2024",
		image: LoremAgency,
		description:
			"A design exercise to practice my Figma skills. I wanted to create a modern and clean agency website.",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Banking App Concept",
		date: "April 2024",
		image: BankingApp,
		description: "Design exercise to practice my Figma skills. (21.04.2024)",
		tags: ["React", "Figma", "Design"],
	},
	{
		title: "Banking App Concept (Full View)",
		date: "April 2024",
		image: BankingApp2,
		description: "Design exercise to practice my Figma skills. (21.04.2024)",
		tags: ["React", "Figma", "Design"],
	},
	{
		title: "iPhone Mockup (Rock)",
		date: "January 2024",
		image: IPhoneMockupRock,
		description: "Design exercise to practice my Figma skills. (26.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "iPhone Mockup (Table)",
		date: "January 2024",
		image: IPhoneMockupTable,
		description: "Design exercise to practice my Figma skills. (26.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "iPhone Mockup (White)",
		date: "January 2024",
		image: IPhoneMockupWhite,
		description: "Design exercise to practice my Figma skills. (25.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "iPhone Mockup (White 2)",
		date: "January 2024",
		image: IPhoneMockupWhite2,
		description: "Design exercise to practice my Figma skills. (25.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "KPIs (Black & White)",
		date: "January 2024",
		image: KPIBlackAndWhite,
		description: "Design exercise to practice my Figma skills. (24.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Charts (Black & White)",
		date: "January 2024",
		image: ChartsBlackAndWhite,
		description: "Design exercise to practice my Figma skills. (24.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Bar Charts",
		date: "January 2024",
		image: BarCharts,
		description: "Design exercise to practice my Figma skills. (23.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Admin Toolbar",
		date: "January 2024",
		image: AdminToolbar,
		description: "Design exercise to practice my Figma skills. (22.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "AI Tasks App Concept (3)",
		date: "January 2024",
		image: AITasksAppConcept3,
		description: "Design exercise to practice my Figma skills. (21.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "AI Tasks App Concept (2)",
		date: "January 2024",
		image: AITasksAppConcept2,
		description: "Design exercise to practice my Figma skills. (20.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "AI Tasks App Concept (1)",
		date: "January 2024",
		image: AITasksAppConcept1,
		description: "Design exercise to practice my Figma skills. (20.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Team Select",
		date: "January 2024",
		image: TeamSelect,
		description:
			"A concept for a team select dropdown. Design exercise to practice my Figma skills. (19.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "WYSIWYG Concept",
		date: "January 2024",
		image: WYSIWYGConcept,
		description: "Design exercise to practice my Figma skills. (18.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Create Account Modal",
		date: "January 2024",
		image: CreateAccountModal,
		description: "Design exercise to practice my Figma skills. (17.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "TYPO3 Sidebar Concept",
		date: "January 2024",
		image: Typo3Sidebar,
		description:
			"A concept for a new sidebar for the TYPO3 CMS backend. Design exercise to practice my Figma skills. (16.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Feedback Modal",
		date: "January 2024",
		image: FeedbackModal,
		description: "Design exercise to practice my Figma skills. (15.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Black & White Buttons",
		date: "January 2024",
		image: BlackWhiteButtons,
		description: "Design exercise to practice my Figma skills. (14.01.2024)",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "TYPO3 Dashboard Redesign (1)",
		date: "January 2024",
		image: Typo3Left,
		description:
			"A redesign of the current TYPO3 CMS backend dashboard. I focused on making the dashboard more modern and less cluttered.",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "TYPO3 Dashboard Redesign (2)",
		date: "January 2024",
		image: Typo3Right,
		description:
			"A redesign of the current TYPO3 CMS backend dashboard. I focused on making the dashboard more modern and less cluttered.",
		tags: ["Figma", "Design", "Mockup"],
	},
	{
		title: "Lock Illustration",
		date: "January 2024",
		image: LockIllustration,
		description:
			"I couldn't find a suitable illustration for the password form on my personal site, so I decided to create one myself.",
		tags: ["Blender"],
	},
	{
		title: "Resource Management App Concept",
		date: "December 2023",
		image: Shelter,
		description:
			"I designed this concept for a resource management app to practice my Figma/Design skills.",
		tags: ["Figma", "Design", "Mockup"],
	},
	// {
	// 	title: "Custom Video Player",
	// 	date: "September 2023",
	// 	video: "/videos/craft/video-player.mp4",
	// 	description:
	// 		"I built this video player to have something that fits the design of my personal site. It is built with React and Framer Motion.",
	// 	tags: ["React", "Framer Motion"],
	// },
	// {
	// 	title: "Dynamic Island Experiment",
	// 	date: "September 2023",
	// 	video: "/videos/craft/dynamic-island.mp4",
	// 	description:
	// 		"I attempted to implement the famous dynamic island from the iPhone 14 Pro using React and Framer Motion.",
	// 	tags: ["React", "Framer Motion"],
	// },
	{
		title: "Redesign of my Personal Website",
		date: "August 2023",
		link: "https://tim-ritter.com",
		target: "_blank",
		image: PersonalWebsiteRedesign,
		description:
			"In this iteration of my personal site, I focused on simplicity and ease of use. No complex animations. Just simple, clean and fast.",
		tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
	},
	{
		title: "Port Alert - Port Monitoring",
		date: "August 2023",
		link: "https://github.com/coyenn/port-alert",
		target: "_blank",
		image: PortAlert,
		description: "A simple port monitoring tool. Available as a docker image",
		tags: ["CLI", "Docker", "Monitoring"],
	},
	// {
	// 	title: "Developer Review Platform",
	// 	date: "July 2023",
	// 	video: "/videos/craft/open-teamup.mp4",
	// 	link: "https://openteamup.com",
	// 	target: "_blank",
	// 	description:
	// 		"I built this platform to help Roblox developers find the right people for their projects. Think of it as glassdoor for Roblox developers.",
	// 	tags: ["Roblox", "T3 Stack"],
	// },
	{
		title: "Desktop Mockup 2 (3D Render)",
		date: "June 2023",
		image: DesktopMockupImage,
		description: "This scene was rendered entriely in Blender.",
		tags: ["Blender", "3D", "Mockup"],
	},
	{
		title: "Desktop Mockup 1 (3D Render)",
		date: "June 2023",
		image: Desktop2MockupImage,
		description: "This scene was rendered entriely in Blender.",
		tags: ["Blender", "3D", "Mockup"],
	},
	{
		title: "Mobile Mockup (3D Render)",
		date: "June 2023",
		image: MobileMockupImage,
		description: "This scene was rendered entriely in Blender.",
		tags: ["Blender", "3D", "Mockup"],
	},
	{
		title: "My Personal Logo",
		date: "May 2023",
		image: MyLogoLight,
		description:
			"When reworking my personal site, I felt the need to create a logo for myself. I wanted to create something that is simple, but still has more detail than the average logo.",
		tags: ["Logo", "Design", "Figma"],
	},
	{
		title: "My Personal Logo (dark)",
		date: "May 2023",
		image: MyLogoDark,
		description:
			"When reworking my personal site, I felt the need to create a logo for myself. I wanted to create something that is simple, but still has more detail than the average logo.",
		tags: ["Logo", "Design", "Figma"],
	},
	// {
	// 	title: "CLI Project Management Tool",
	// 	description:
	// 		"To learn Rust I challenged myself to build a CLI project management tool. There is little to no documentation and the code is not very clean. But it works and I learned a lot. :)",
	// 	tags: ["Rust", "CLI"],
	// 	date: "May 2023",
	// 	link: "https://github.com/RevisionOrg/p",
	// 	target: "_blank",
	// 	image: PDemoGif,
	// },
];

export default craft;
