import { Store, MessageSquare, BarChart, MapPin, Bot, Briefcase, FileText, Receipt, Users, Cloud, Heart, Monitor, BookOpen, Wallet } from "lucide-react";

export const memberProjectsData = [
  {
    id: 4,
    name: "RationUndo",
    author: "Jithin JZ",
    description: "A free website to easily check stock details in Kerala ration shops using pincode, place name, or shop number.",
    stats: { stars: 0, forks: 0 },
    category: "Govt",
    icon: Store,
    animationClass: "group-hover:animate-icon-swing",
    windowColor: "bg-[#FF8C42]", // Orange
    pillColor: "bg-[#42A5F5]", // Blue
    link: "https://rationundo.onrender.com",
    github: "https://github.com/jithin-jz",
    email: "jithinjzx@gmail.com"
  },
  {
    id: 5,
    name: "Parathipetty",
    author: "Muhammed Roshan",
    description: "Kerala's public complaint box, on WhatsApp",
    stats: { stars: 0, forks: 0 },
    category: "Govt",
    icon: MessageSquare,
    animationClass: "group-hover:animate-icon-wiggle",
    windowColor: "bg-[#A18CE5]", // Purple
    pillColor: "bg-[#FFD166]", // Yellow
    link: "https://Parathipetty.com",
    email: "muhammedroshanps@gmail.com"
  },
  {
    id: 6,
    name: "Kerala Polling",
    author: "Rishnu",
    description: "A web-based election opinion poll for Kerala.",
    stats: { stars: 0, forks: 0 },
    category: "Community",
    icon: BarChart,
    animationClass: "group-hover:animate-icon-heartbeat",
    windowColor: "bg-[#4CAF50]", // Green
    pillColor: "bg-[#E91E63]", // Pink
    link: "https://kerala-polling.rishnu.xyz/",
    email: "rishnudev@gmail.com"
  },
  {
    id: 7,
    name: "Kuzhiyundo",
    author: "Sajith Lal",
    description: "A crowdsourced pothole tracker app",
    stats: { stars: 0, forks: 0 },
    category: "Community",
    icon: MapPin,
    animationClass: "group-hover:animate-icon-float",
    windowColor: "bg-[#FF5722]", // Deep Orange
    pillColor: "bg-[#03A9F4]", // Light Blue
    link: "https://kuzhiyundo.com",
    github: "https://github.com/sajithlaldev/kuzhiyundo",
    email: "sajithlal65@gmail.com"
  },
  {
    id: 8,
    name: "AI Mock Interview",
    author: "Mohamed Amaan",
    description: "An AI mock interview SaaS platform",
    stats: { stars: 0, forks: 0 },
    category: "SaaS",
    icon: Bot,
    animationClass: "group-hover:animate-icon-wiggle",
    windowColor: "bg-[#9C27B0]", // Purple
    pillColor: "bg-[#FFEB3B]", // Yellow
    link: "https://github.com/modamaan/Ai-mock-Interview",
    github: "https://github.com/modamaan/Ai-mock-Interview",
    email: "mohamedamaan319@gmail.com"
  },
  {
    id: 9,
    name: "Alen dev portfolio",
    author: "Alen James",
    description: "Modern smooth portfolio showcasing my works",
    stats: { stars: 0, forks: 0 },
    category: "Portfolios",
    icon: Briefcase,
    animationClass: "group-hover:animate-icon-swing",
    windowColor: "bg-[#2196F3]", // Blue
    pillColor: "bg-[#FF5722]", // Deep Orange
    link: "https://alen-james.vercel.app/",
    github: "https://github.com/alen899-my",
    email: "alenjames899@gmail.com"
  },
  {
    id: 10,
    name: "EnteProfile",
    author: "Muhammed Roshan",
    description: "Professional Portfolio + Resumes within 5 minutes",
    stats: { stars: 0, forks: 0 },
    category: "Tools",
    icon: FileText,
    animationClass: "group-hover:animate-icon-float",
    windowColor: "bg-[#00BCD4]", // Cyan
    pillColor: "bg-[#FF9800]", // Orange
    link: "https://enteprofile.com",
    github: "https://github.com/Roshan-Here/",
    email: "muhammedroshanps@gmail.com"
  },
  {
    id: 11,
    name: "Invoice Generator",
    author: "Shihab Rahman",
    description: "Create beautiful, branded PDF invoices and estimates directly from your browser. No sign-up required. Secure & Offline-first.",
    stats: { stars: 0, forks: 0 },
    category: "Tools",
    icon: Receipt,
    animationClass: "group-hover:animate-icon-wiggle",
    windowColor: "bg-[#8BC34A]", // Light Green
    pillColor: "bg-[#03A9F4]", // Light Blue
    link: "https://invoice.shihabsaleem.site/",
    github: "https://github.com/shihabsaleem/invoice-landing",
    email: "hello@shihabsaleem.site"
  },
  {
    id: 12,
    name: "Collabifi",
    author: "Arjun Anoop",
    description: "Collaboration discovery platform: people post ideas, find the missing collaborator, connect directly, and build together.",
    stats: { stars: 0, forks: 0 },
    category: "Community",
    icon: Users,
    animationClass: "group-hover:animate-icon-float",
    windowColor: "bg-[#FF5252]", // Red
    pillColor: "bg-[#FFEB3B]", // Yellow
    link: "http://collabifi.vercel.app",
    github: "https://github.com/aarjjun/Collabify",
    email: "arjunanoop.codes@gmail.com"
  },
  {
    id: 13,
    name: "N-Drive",
    author: "Aflah PP",
    description: "Cloud file management platform. Securely upload, organize, share, and download files with AI-assisted features.",
    stats: { stars: 0, forks: 0 },
    category: "SaaS",
    icon: Cloud,
    animationClass: "group-hover:animate-icon-heartbeat",
    windowColor: "bg-[#009688]", // Teal
    pillColor: "bg-[#FF5722]", // Deep Orange
    link: "https://n-drive-app.netlify.app/",
    github: "https://github.com/aflah-pp/N-Drive",
    email: "aflahpp777@gmail.com"
  },
  {
    id: 14,
    name: "Kerala Blood Connect",
    author: "Abhijith Sachu",
    description: "A public service web platform connecting donors, patients, and hospitals to find blood and nearby blood banks during emergencies.",
    stats: { stars: 0, forks: 0 },
    category: "Community",
    icon: Heart,
    animationClass: "group-hover:animate-icon-heartbeat",
    windowColor: "bg-[#E91E63]", // Pink/Red
    pillColor: "bg-[#FFFFFF]", // White
    link: "https://kerala-blood-connect.vercel.app",
    github: "https://github.com/Abhijithsachu/Kerala-Blood-Connect",
    email: "abhijith007sachu@gmail.com"
  },
  {
    id: 15,
    name: "GlobalThozhil",
    author: "Jojin John",
    description: "GlobalThozhil is a free job-search web app built for India-to-global job discovery, with a special focus on Kerala users. It combines live job aggregation, AI career help, profile-based matching, employer job posting, admin approval, and optional CMS editing.",
    stats: { stars: 0, forks: 0 },
    category: "Tools",
    icon: Briefcase,
    animationClass: "group-hover:animate-icon-swing",
    windowColor: "bg-[#3F51B5]", // Indigo
    pillColor: "bg-[#00BCD4]", // Cyan
    link: "https://globalthozhil.onrender.com/",
    github: "https://github.com/jojin1709/-GlobalThozhil",
    email: "jojinjohn1709@gmail.com"
  },
  {
    id: 16,
    name: "Sparq",
    author: "Jithu Biju",
    description: "The anonymous web is broken. It's either 99% bots or spam. So I built Sparq: a localized, 100% bot-free stranger chat alternative. Match nearby first (City -> State -> Global) Face-check verification = Zero bots Guest Mode: Chat instantly in 1 click",
    stats: { stars: 0, forks: 0 },
    category: "Community",
    icon: MessageSquare,
    animationClass: "group-hover:animate-icon-wiggle",
    windowColor: "bg-[#FF9800]", // Orange
    pillColor: "bg-[#FF5722]", // Deep Orange
    link: "https://sparq-flax.vercel.app/",
    github: "https://github.com/arjunkr303/sparq",
    email: "jithubiju124@gmail.com"
  },
  {
    id: 17,
    name: "Genxlink",
    author: "Lalu James",
    description: "Privacy-Focused Remote Desktop Solution",
    stats: { stars: 0, forks: 0 },
    category: "Tools",
    icon: Monitor,
    animationClass: "group-hover:animate-icon-float",
    windowColor: "bg-[#607D8B]", // Blue Grey
    pillColor: "bg-[#9E9E9E]", // Grey
    link: "",
    github: "https://github.com/lalupj07/GenXlink",
    email: "lalujames560@gmail.com"
  },
  {
    id: 18,
    name: "InterviewKit",
    author: "Aby Varghese",
    description: "Your ultimate dev dojo! Master algorithms, crush system design, and level up your career.",
    stats: { stars: 0, forks: 0 },
    category: "EdTech",
    icon: BookOpen,
    animationClass: "group-hover:animate-icon-float",
    windowColor: "bg-[#0F172A]", // Dark Slate (Stylish Dark Mode)
    pillColor: "bg-[#38BDF8]", // Neon Sky Blue
    link: "https://interviewkit.online/",
    github: "https://github.com/AbyvargheseMandapathel/",
    email: "abyvarghesemandapathel@gmail.com"
  }
];
