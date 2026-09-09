import { ProjectItem, SkillItem, SocialItem } from '../types';

export const PERSONAL_INFO = {
  name: "Shahnawaz Bheda",
  role: "Next.Js Developer",
  tagline: "Dedicated Front-End Developer",
  university: "Atmiya University",
  degree: "Msc-IT (4th Semester)",
  email: "shahnawazbheda@gmail.com",
  github: "https://github.com/shahnawaz-bheda",
  linkedin: "https://www.linkedin.com/posts/shahnawaz-bheda-7771141a3_bheda-is-now-on-topmate-activity-7171385568973598720-EsXH",
  twitter: "https://x.com/BhedaShahnawaz",
  instagram: "https://www.instagram.com/i_nawaz_khatri/"
};

export const INTRO_PARAGRAPHS = [
  "Enthusiastic and dedicated Computer Science student with a specialization in web development, fervently pursuing opportunities to contribute to innovative projects utilizing Next.js and React.js.",
  "Proficient in the Next.js and React.js ecosystems, I'm driven to create engaging and performant web applications. My adeptness with these technologies enables me to architect seamless user experiences while ensuring optimal functionality.",
  "I am eager to apply and expand my expertise in Next.js and React.js within dynamic development teams, leveraging my skills to deliver immersive and impactful web experiences."
];

export const ABOUT_PARAGRAPHS = [
  "Hello, my name is Shahnawaz Bheda and I am a dedicated Front - End developer. Currently, I am in my 4th semester pursuing a Msc-IT degree at Atmiya University.",
  "Throughout my academic endeavors, I've adeptly executed numerous projects leveraging Next.JS and React.JS, showcasing proficiency in Git and GitHub. Additionally, I've honed my skills working with four prominent CSS frameworks—Ant Design, Bootstrap, Tailwind CSS, and Daisy UI."
];

export const TYPEWRITER_ROLES = [
  "MERN Developer . .",
  "Next.Js Developer . .",
  "Full Stack Web Developer",
  "React.js Developer",
  "Node.js Developer",
  "Front - End Developer . .",
  "MSc-IT Graduate . ."
];

export const SKILL_ITEMS: SkillItem[] = [
  { name: "React", color: "#61DAFB", iconName: "react" },
  { name: "Next.js", color: "#ffffff", iconName: "nextjs" },
  { name: "Tailwind CSS", color: "#06B6D4", iconName: "tailwind" },
  { name: "Bootstrap", color: "#7952B3", iconName: "bootstrap" },
  { name: "Daisy UI", color: "#1AD1A5", iconName: "daisyui" },
  { name: "Ant Design", color: "#1890FF", iconName: "antdesign" },
  { name: "Git", color: "#F05032", iconName: "git" },
  { name: "GitHub", color: "#ffffff", iconName: "github" }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 1,
    title: "Organ Donation Project",
    category: "Healthcare",
    shortSummary: "Awareness platform to educate, dispel myths, and encourage registration for life-saving organ donation.",
    description: "The organ donation project seeks to raise awareness about the importance of organ donation. By providing clear information about the process and benefits of organ donation, the project aims to dispel myths and encourage people to become donors. It emphasizes the positive impact a single donor can have on multiple lives and addresses legal and ethical considerations. Through engaging content and community outreach, the project aims to create a more informed and supportive environment for organ donation. Ultimately, the goal is to inspire individuals to register as organ donors and contribute to saving lives through this selfless act.",
    image: "/projects/project1.png",
    tech: ["React", "Next.js", "Tailwind CSS"],
    github: "https://github.com/shahnawaz-bheda/organ-donation-Laravel",
    demo: "",
    featured: true
  },
  {
    id: 2,
    title: "Customer Relationship Management (CRM)",
    category: "Enterprise",
    shortSummary: "Comprehensive customer intelligence suite with automated lead tracking, sales pipelines, and analytics.",
    description: "Customer Relationship Management (CRM) is a vital strategy that businesses employ to build and maintain strong connections with their customers. In today's competitive landscape, effective CRM systems are indispensable tools. These systems help businesses streamline communication, manage customer data, and enhance overall customer experience. By centralizing customer information, businesses can gain valuable insights into their preferences and behaviors, allowing for more personalized interactions. CRM also plays a crucial role in tracking customer interactions, managing sales leads, and improving overall customer satisfaction. In essence, a well-implemented CRM system is not just a technological solution; it's a customer-centric approach that fosters long-lasting relationships, improves customer loyalty, and contributes to sustainable business growth.",
    image: "/projects/project2.png",
    tech: ["Next.js", "React", "Tailwind CSS", "REST API"],
    github: "https://github.com/shahnawaz-bheda/CRM-react",
    demo: "https://customer-relationship-management.vercel.app/",
    featured: true
  },
  {
    id: 3,
    title: "Online Cafe Management System",
    category: "Full-Stack",
    shortSummary: "Digital cafe operations platform covering real-time orders, dynamic menus, and inventory forecasting.",
    description: "Online cafe management systems are integral tools that streamline the operations of cafes, enhancing efficiency and customer experience. These systems typically encompass various features such as order management, inventory tracking, and customer engagement tools. Through an intuitive interface, cafe owners and staff can easily process orders, manage inventory levels, and keep track of sales. Online cafe management systems often include online ordering capabilities, allowing customers to place orders remotely for pickup or delivery. This not only expands the cafe's reach but also caters to the growing demand for convenient dining options. Additionally, these systems may offer customer loyalty programs and analytics tools to help cafes understand their customers better and tailor their services accordingly. By leveraging technology in cafe management, businesses can optimize their processes, improve customer satisfaction, and stay competitive in the ever-evolving hospitality industry.",
    image: "/projects/project3.png",
    tech: ["React.js", "Node.js", "Bootstrap", "MongoDB"],
    github: "https://github.com/shahnawaz-bheda/online-cafe-management-Asp.Net",
    demo: ""
  },
  {
    id: 4,
    title: "The Saanu's Film Nest",
    category: "Media",
    shortSummary: "Streaming and download portal offering secure content access with legal licensing and user curation.",
    description: "The Saanu's Film Nest project is a comprehensive initiative designed to offer users a legal and convenient platform for accessing and downloading movies. Committed to upholding copyright laws and licensing agreements, the project focuses on securing the rights to a diverse range of movies through partnerships with distributors and production houses. The user experience is paramount, with a user-friendly website or app featuring secure authentication, robust data protection, and a seamless download mechanism. The platform allows users to create profiles, track their downloads, and receive personalized recommendations.",
    image: "/projects/project4.png",
    tech: ["React", "CSS3", "JavaScript", "Express"],
    github: "https://github.com/shahnawaz-bheda/Movie-Prime-Reactjs",
    demo: ""
  },
  {
    id: 5,
    title: "The Medicare Appointment Book",
    category: "Healthcare",
    shortSummary: "Multi-tier clinical scheduling platform with EHR synchronization, SMS alerts, and patient portals.",
    description: "The Medicare Appointment Book project is a pivotal initiative aimed at revolutionizing the scheduling process within the Medicare healthcare system. Acknowledging the current challenges in appointment management, this project focuses on developing a sophisticated system with user-friendly interfaces, multi-step appointment scheduling, and robust security measures. Users, including patients, healthcare providers, and administrators, will benefit from a streamlined process that integrates seamlessly with electronic health records (EHR) and ensures accessibility for individuals with diverse needs. The notification system, incorporating email, SMS, and app alerts, aims to enhance patient adherence to appointments. Moreover, the project places a strong emphasis on regulatory compliance, incorporating feedback mechanisms for continuous improvement and a comprehensive training and support infrastructure. By addressing these critical components, the Medicare Appointment Book project aspires to improve the overall patient experience, enhance healthcare provider efficiency, and contribute to the broader goal of optimizing healthcare delivery within the Medicare framework.",
    image: "/projects/project5.png",
    tech: ["Next.js", "React.js", "Tailwind CSS", "Node.js"],
    github: "https://github.com/shahnawaz-bheda/Medicare-Appointment-Reactjs",
    demo: "https://medicare-appointment-reactjs.vercel.app/",
    featured: true
  },
  {
    id: 6,
    title: "The Cafe Billing System in C#",
    category: "Desktop & POS",
    shortSummary: "High-throughput desktop point-of-sale software with tax calculations, itemized receipts, and audit logs.",
    description: "The Cafe Billing System in C# is a meticulously designed application that offers a seamless and efficient experience for both customers and cafe staff. With an intuitive graphical user interface, users can easily navigate through the menu, select items, and specify quantities, while the system calculates the subtotal, taxes, and total amount. The payment handling module allows for flexibility, accommodating various payment methods such as cash or credit cards, with the system calculating change and finalizing transactions. Receipts are generated with precision, detailing the ordered items, quantities, prices, and a comprehensive total. The system also incorporates features for discounts, promotions, and order history, providing a versatile tool for both day-to-day operations and strategic business analysis. Security measures are implemented to safeguard customer data, and user-friendly error handling ensures a smooth billing process. Whether managing the cafe's daily transactions or analyzing sales trends, this Cafe Billing System in C# aims to enhance the overall efficiency and effectiveness of cafe management, catering to the diverse needs of both customers and cafe staff.",
    image: "/projects/project6.png",
    tech: [".NET Framework", "C#", "SQL Server", "Windows Forms"],
    github: "https://github.com/shahnawaz-bheda/cafe-billing-CSharp",
    demo: ""
  }
];

export const SOCIAL_ITEMS: SocialItem[] = [
  { name: "GitHub", href: "https://github.com/shahnawaz-bheda", color: "#ffffff" },
  { name: "Twitter", href: "https://x.com/BhedaShahnawaz", color: "#1DA1F2" },
  { name: "LinkedIn", href: "https://www.linkedin.com/posts/shahnawaz-bheda-7771141a3_bheda-is-now-on-topmate-activity-7171385568973598720-EsXH", color: "#0077B5" },
  // { name: "Instagram", href: "https://www.instagram.com/i_nawaz_khatri/", color: "#E1306C" }
];
