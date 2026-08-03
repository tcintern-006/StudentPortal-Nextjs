// Home page data 
import logo1 from '@/app/Assets/logos/logo1.svg'
import logo2 from '@/app/Assets/logos/logo2.svg'
import logo3 from '@/app/Assets/logos/logo3.svg'
import logo4 from '@/app/Assets/logos/logo4.svg'
import logo5 from '@/app/Assets/logos/logo5.svg'
import logo6 from '@/app/Assets/logos/logo6.svg'
import heroImage from "@/app/Assets/Images/homepageImage.webp"
import img1 from '@/app/Assets/cources/img1.webp'
import img2 from "@/app/Assets/cources/img2.webp"
import img3 from "@/app/Assets/cources/img3.webp"
import img4 from "@/app/Assets/cources/img4.webp"
import img5 from "@/app/Assets/cources/img5.webp"

export const homeData = {
    title: "Learn to Code Like a Pro",
    description: "We teach you the essential skills you need to succeed as a dev in 2026",
    btn: "TRY IT FOR FREE",
    btnDesc: "Take 2 min - no signup",
    HeroImage: heroImage,
    logoText: "Trusted by the world's best companies",
    logos: [logo1, logo2, logo3, logo4, logo5, logo6],


}

// NAVBAR DATA 

export const navbarData = {
    links: [
        { name: "Home", href: "/", iconClass: "icon-[lucide--home]" },
        { name: "Courses", href: "/courses", iconClass: "icon-[lucide--book]" },
        { name: "Instructors", href: "/instructors", iconClass: "icon-[lucide--users]" },
        { name: "About", href: "/about", iconClass: "icon-[lucide--info]" },
        { name: "Contact", href: "/contact", iconClass: "icon-[lucide--phone]" },
    ],

    btnText: "SIGN IN",

    socials: [
        { name: "LinkedIn", href: "https://www.linkedin.com/in/muhammadammar46/", iconClass: "icon-[lucide--linkedin]" },
        { name: "GitHub", href: "https://github.com/tcintern-006", iconClass: "icon-[lucide--github]" },
        { name: "Facebook", href: "https://web.facebook.com/ammarawan45/", iconClass: "icon-[lucide--facebook]" },
    ]
}



// Cources Data
export const coursesData = {
    title: "Courses",
    description: "Level Up Your Coding Skills with Expert-Led Courses",
    courses: [
        {
            slug: "web-development",
            title: "3.0 Job Ready AI Powered Cohort",
            bubbles: ["Product Branding", "Community Access", "Job Ready"],
            description: "Become a full-stack web developer! Learn to build dynamic web applications using the MERN stack, with hands-on projects and expert guidance.",
            btnText: "Enroll Now",
            price: "200",
            img: img1,
            off: "70% OFF",
            orignalPrice: "500",
            btn1: "Buy Now",
            btn2: "Learn More",
        },
        {
            slug: "data-science",
            title: "Data Science and Analytics with GenAI",
            bubbles: ["Machine Learning", "Deep Learning", "Gen-Ai"],
            description: "Unlock the power of data science! Learn to analyze and visualize data using Python, SQL, and Tableau, with real-world projects and expert guidance.",
            btnText: "Enroll Now",
            price: "$200",
            img: img2,
            off: "70% OFF",
            orignalPrice: "$500",
            btn1: "Buy Now",
            btn2: "Learn More",
        },
        {
            slug: "data-analytics",
            title: "Complete Data Analytics",
            bubbles: ["AI", "Data-Analysis", "Python"],
            description: "Master data analytics! Learn to analyze and visualize data using Python, SQL, and Tableau, with real-world projects and expert guidance.",
            btnText: "Enroll Now",
            price: "$200",
            img: img3,
            off: "70% OFF",
            orignalPrice: "$500",
            btn1: "Buy Now",
            btn2: "Learn More",
        },
        {
            slug: "mern-stack",
            title: "2.0 Job Ready AI Powered Cohort",
            description: "Become a full-stack web developer! Learn to build dynamic web applications using the MERN stack, with hands-on projects and expert guidance.",
            bubbles: ["MERN Stack", "DSA with JS", "Job Ready"],
            btnText: "Enroll Now",
            price: "$200",
            img: img4,
            off: "70% OFF",
            orignalPrice: "$500",
            btn1: "Buy Now",
            btn2: "Learn More",
        },
        {
            slug: "dsa",
            title: "DSA Domination",
            description: "Ace your coding interviews! Master Java and DSA with our expert-led course, packed with interactive lessons and practice tests.",
            bubbles: ["Deep Learning", "Logic Bulding", "JAVA"],
            btnText: "Enroll Now",
            price: "$90",
            img: img5,
            off: "70% OFF",
            orignalPrice: "$500",
            btn1: "Buy Now",
            btn2: "Learn More",
        },
    ]
}



// Instructors data

export const instructorsData = {
    title: "Meet Your Instructors",
    description: "Learn from industry professionals with real-world experience.",
    instructors: [
        {
            slug: "ahmed-raza",
            name: "Ahmed Raza",
            role: "Senior Full-Stack Developer",
            pic: img1, 
            bio: "5+ years building production web apps with React and Node.js. Previously worked at a fintech startup scaling to 1M+ users.",
            expertise: ["React", "Node.js", "MongoDB"],
            experience: "5+ Years",
            studentsCount: "1200+",
            rating: "4.9",
            socials: {
                linkedin: "#",
                github: "#",
                twitter: "#"
            }
        },
        {
            slug: "sara-khan",
            name: "Sara Khan",
            role: "AI/ML Engineer",
            pic: img2,
            bio: "Specializes in machine learning and data science, with a background in academic research and industry deployment of ML pipelines.",
            expertise: ["Python", "TensorFlow", "Data Science"],
            experience: "4+ Years",
            studentsCount: "800+",
            rating: "4.8",
            socials: {
                linkedin: "#",
                github: "#",
                twitter: "#"
            }
        },
        {
            slug: "bilal-ahmed",
            name: "Bilal Ahmed",
            role: "DevOps & Cloud Architect",
            pic: img3,
            bio: "Expert in cloud infrastructure, CI/CD pipelines, and scalable system design. Certified AWS Solutions Architect.",
            expertise: ["AWS", "Docker", "Kubernetes"],
            experience: "6+ Years",
            studentsCount: "950+",
            rating: "5.0",
            socials: {
                linkedin: "#",
                github: "#",
                twitter: "#"
            }
        }
    ]
};


// About us Data 

export const AboutUsData = {
    title: "About Us",
    subtitle: "Empowering the next generation of developers",
    description: "We're on a mission to make high-quality tech education accessible to everyone. What started as a small community of self-taught developers has grown into a platform trusted by thousands of students building real careers in tech.",
}


// Contact data

export const contactData = {
  title: "Get In Touch",
  subtitle: "Have a question about a course or need help getting started? We'd love to hear from you.",
}