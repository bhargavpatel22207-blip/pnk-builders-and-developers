import project1 from "@/assets/project1.jpeg";
import project2 from "@/assets/project2.jpg";
import project3 from "@/assets/project3.jpg";
import project4 from "@/assets/project4.jpg";
import project5 from "@/assets/project5.jpg";
import project6 from "@/assets/project6.jpg";

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { value: 30, suffix: "+", label: "Individual Houses Completed" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 4.6, suffix: "+", label: "Customer Rating", decimals: 1 },
  { value: 4, suffix: "+", label: "Locations Served" },
];

export const SERVICES = [
  { icon: "Home", title: "Residential Construction", desc: "End-to-end home building with premium materials and finishes." },
  { icon: "Building2", title: "Commercial Construction", desc: "Offices, retail and commercial spaces built to last." },
  { icon: "PencilRuler", title: "Architectural Planning", desc: "Functional, beautiful layouts tailored to your needs." },
  { icon: "Frame", title: "Structural Designing", desc: "Safe, efficient structural engineering and design." },
  { icon: "Hammer", title: "House Renovation", desc: "Transform existing spaces with modern upgrades." },
  { icon: "Sofa", title: "Interior Designing", desc: "Elegant interiors that reflect your lifestyle." },
  { icon: "FileCheck2", title: "Building Approvals", desc: "Hassle-free permits and statutory approvals." },
  { icon: "HardHat", title: "Construction Supervision", desc: "On-site quality control at every stage." },
  { icon: "Box", title: "2D & 3D Elevations", desc: "Photorealistic visualisation before you build." },
  { icon: "KeyRound", title: "Turnkey Projects", desc: "We handle everything, you receive the keys." },
];

export const PROJECTS = [
  { id: 1, title: "Modern Family House", image: project1, location: "Zaheerabad", type: "Residential", status: "Completed" },
  { id: 2, title: "Modern Family House", image: project2, location: "Zaheerabad", type: "Residential", status: "Completed" },
  { id: 3, title: "Modern Family House", image: project3, location: "Zaheerabad", type: "Residential", status: "Completed" },
  { id: 4, title: "Modern Family House", image: project4, location: "Zaheerabad", type: "Residential", status: "Completed" },
  { id: 5, title: "Temple construction", image: project5, location: "Tatpalle", type: "Religious", status: "Ongoing", link: "https://temple-donationssg.vercel.app/" },
  { id: 6, title: "Modern Family House", image: project6, location: "Zaheerabad", type: "Residential", status: "Completed" },
];

export const PROJECT_FILTERS = ["All", "Residential", "Commercial", "Ongoing", "Completed"] as const;

export const GALLERY = [
  { image: project1, category: "Completed Projects" },
  { image: project4, category: "Ongoing Projects" },
  { image: project3, category: "Interiors" },
  { image: project2, category: "Structural Work" },
  { image: project1, category: "Completed Projects" },
  { image: project4, category: "Structural Work" },
  { image: project3, category: "Interiors" },
  { image: project2, category: "Completed Projects" },
];

export const GALLERY_CATEGORIES = ["All", "Ongoing Projects", "Completed Projects", "Interiors", "Structural Work"] as const;

export const WHY_CHOOSE = [
  { icon: "Gem", title: "Premium Quality Materials", desc: "Only the best, sourced materials in every build." },
  { icon: "Users", title: "Experienced Team", desc: "Skilled engineers, architects and craftsmen." },
  { icon: "Eye", title: "Transparent Process", desc: "Clear pricing and updates at every milestone." },
  { icon: "Clock", title: "On-Time Delivery", desc: "We respect timelines and your investment." },
  { icon: "ShieldCheck", title: "Structural Safety", desc: "Engineered for durability and safety standards." },
  { icon: "Heart", title: "Customer Satisfaction", desc: "Long-term relationships built on trust." },
];

export const VALUES = ["Quality", "Transparency", "Commitment", "Timely Delivery"];

export const TESTIMONIALS = [
  { name: "Ramesh Kumar", location: "Zaheerabad", rating: 5, review: "PNK Builders constructed our dream home on time and within budget. The quality of work is exceptional and the team kept us updated throughout." },
  { name: "Sushma Reddy", location: "Sangareddy", rating: 5, review: "Highly professional and transparent. The 3D elevation helped us visualise everything before construction. Truly the best in the region." },
  { name: "Anil Goud", location: "Narayankhed", rating: 4, review: "Great experience working with PNK. Premium materials, skilled workers and honest pricing. Highly recommended for individual houses." },
  { name: "Priya Sharma", location: "Rudraram", rating: 5, review: "From planning to handover, everything was smooth. Our interiors look stunning. Thank you PNK Builders & Developers!" },
];

export const PROJECT_TYPES = ["Residential", "Commercial", "Renovation", "Interior", "Turnkey", "Other"];
export const BUDGET_RANGES = ["Below ₹20 Lakhs", "₹20 - 50 Lakhs", "₹50 Lakhs - 1 Cr", "Above ₹1 Cr"];
