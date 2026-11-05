export type ProjectCategory = 'Full-stack' | 'AI / ML' | 'Backend' | 'Frontend'

export const projectCategories: ProjectCategory[] = ['Full-stack', 'AI / ML', 'Backend', 'Frontend']

export type Project = {
    slug: string
    /** First one is the label shown on the card; the project appears under every one in the filters */
    categories: ProjectCategory[]
    /** Keep the project in this file but leave it off the site (no card, no page) */
    hidden?: boolean
    /** Headline fact for the project page's stat grid when the project isn't featured */
    fact?: { value: string; label: string }
    name: string
    period: string
    status: 'Building' | 'Completed'
    description: string
    highlights: string[]
    stack: string[]
    github: string
    vercel?: string
    /**
     * Screen recording for the project page, e.g. '/projects/videos/learnex.mp4'.
     * When set it replaces the screenshot there (muted, looping, with the cover as poster).
     */
    video?: string
    /** Screenshots of the live demo, used by the home page showcase */
    preview?: {
        /** Page the screenshots show, when it isn't the demo's home page */
        url?: string
        /** First screen, 1200x750 */
        cover: string
        /** Full page (1200px wide), scrolled through on hover; omitted when the site is a single screen */
        full?: { src: string; height: number }
    }
    /** Set on projects shown in the home page "Selected work" showcase */
    featured?: {
        /** Display order on the home page */
        order: number
        /** Short category line, e.g. "E-learning platform" */
        tagline: string
        /** One or two sentences for the showcase card */
        summary: string
        /** Headline number */
        metric: { value: string; label: string }
        /** Small extra badge, e.g. an award */
        badge?: string
        /** The few technologies to show on the card */
        stack: string[]
    }
}

/* Every project, including hidden ones. Use `projects` below for what the site shows. */
const allProjects: Project[] = [
    {
        slug: 'learnex',
        categories: ['Full-stack'],
        name: 'LearnEx',
        period: 'Aug 2026',
        status: 'Completed',
        description:
            'A full-stack e-learning platform where students can browse, buy, and take courses online, and admins can manage everything from a separate dashboard. LearnEx has three parts: a student-facing site, an admin dashboard (deployed as a separate application), and a backend server.',
        highlights: [
            'Course creation wizard with support for videos and images via Cloudinary',
            'Secure payment processing integrated through Stripe SDK',
            'Live notifications powered by Socket.io for real-time updates',
            'Analytics dashboard showing user, order, and revenue trends over 12 months using Chart.js',
            'CMS-like admin panel to update homepage hero, FAQs, and categories without touching code',
            'Multi-provider authentication with email, Google, and GitHub (NextAuth + JWT)',
            'Redis caching layer for API responses to improve performance',
            'Centralized error handling so failed requests don\'t crash the app',
            'Auth tokens stored in HTTP-only cookies with bcrypt password hashing for security',
        ],
        stack: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Redux Toolkit',
            'Node.js',
            'Express',
            'MongoDB',
            'Mongoose',
            'Redis',
            'Socket.io',
            'Stripe',
            'Cloudinary',
            'JWT',
            'Chart.js',
        ],
        github: 'https://github.com/sheraz61/learnex',
        vercel: 'https://learn-ex-client.vercel.app/',
        preview: { cover: '/projects/learnex.webp', full: { src: '/projects/learnex-full.webp', height: 3640 } },
        featured: {
            order: 1,
            tagline: 'E-learning platform',
            summary:
                'A student site, an admin dashboard and an Express API deployed as three apps, with Stripe checkout, Socket.io live notifications, Redis caching and 12-month Chart.js analytics.',
            metric: { value: '37', label: 'REST endpoints' },
            stack: ['Next.js', 'TypeScript', 'Express', 'MongoDB', 'Redis', 'Stripe'],
        },
    },

    {
        slug: 'campusguard',
        categories: ['AI / ML', 'Full-stack'],
        name: 'CampusGuard',
        period: 'Sep 2025 - Jun 2026',
        status: 'Completed',
        description:
            'A smart campus safety and inquiry management platform engineered as my final-year capstone (awarded A+). Built around a custom 9,000+ image dataset and a 91% accurate hybrid ResNet50 + CBAM + custom head computer vision model, backed by FastAPI, AWS RDS PostgreSQL, Amazon S3, and role-based workflows for Admins, Guards, and CSA.',
        highlights: [
            'Built and labeled a custom university suspicious activity dataset of 9,000+ images across 7 activity classes (2 research papers currently under review)',
            'Trained a hybrid ResNet50 + CBAM + custom head deep learning architecture achieving 91% accuracy for automated incident detection',
            'Architected a complete digital inquiry management system replacing manual paper workflows with role-based access for Admin, Security Guards, and CSA',
            'Engineered end-to-end incident pipeline spanning automated detection, instant real-time alerts, guard dispatch, evidence collection, and CSA departmental inquiry tracking',
            'Built FastAPI backend service integrated with AWS RDS PostgreSQL for relational case histories and Amazon S3 for secure snapshot storage',
        ],
        stack: [
            'React',
            'FastAPI',
            'Python',
            'ResNet50 + CBAM + Custom Head',
            'Computer Vision',
            'Deep Learning',
            'PostgreSQL',
            'AWS RDS',
            'Amazon S3',
            'Tailwind CSS',
            'REST APIs',
        ],
        github: 'https://github.com/sheraz61/CampusGaurd',
        vercel: 'https://campus-gaurd-five.vercel.app/',
        preview: { cover: '/projects/campusguard.webp' },
        featured: {
            order: 2,
            tagline: 'AI campus safety system',
            summary:
                'Flags suspicious activity with a ResNet50 + CBAM vision model served from FastAPI, with PostgreSQL, S3 storage and live WebSocket alerts for admin, guard and CSA roles.',
            metric: { value: '91%', label: 'model accuracy' },
            badge: 'A+ capstone',
            stack: ['React', 'FastAPI', 'TensorFlow', 'PostgreSQL', 'AWS S3'],
        },
    },

    {
        slug: 'vendora',
        categories: ['Full-stack'],
        name: 'Vendora',
        period: 'Feb 2026 - Apr 2026',
        status: 'Completed',
        description:
            'A production-grade multi-vendor e-commerce marketplace connecting customers, independent sellers, and platform administrators across four distinct deployment units with real-time buyer-seller communication and multi-gateway payment processing.',
        highlights: [
            'Architected a decentralized multi-vendor marketplace across 4 deployment units (Vercel frontend, Render Express API, Render Socket server, MongoDB Atlas)',
            'Built real-time buyer-seller chat system with message delivery and read indicators using a dedicated Socket.io server',
            'Engineered dual payment workflows integrating Stripe and PayPal SDKs with automated seller commission and withdrawal calculations',
            'Designed three specialized role-based interfaces for buyers, autonomous vendor storefronts, and administrative governance',
            'Implemented promotional mechanisms including timed flash sale events, coupon codes, and Cloudinary-optimized media delivery',
        ],
        stack: [
            'React 19',
            'Vite',
            'Tailwind CSS',
            'Material-UI',
            'Redux Toolkit',
            'Node.js',
            'Express.js',
            'MongoDB Atlas',
            'Mongoose',
            'Socket.io',
            'Stripe',
            'PayPal',
            'Cloudinary',
            'JWT',
        ],
        github: 'https://github.com/sheraz61/vendora',
        vercel: 'https://multi-vendor-ecom-seven.vercel.app/',
        preview: { cover: '/projects/vendora.webp', full: { src: '/projects/vendora-full.webp', height: 3303 } },
        featured: {
            order: 3,
            tagline: 'Multi-vendor marketplace',
            summary:
                'Sellers run their own storefronts while customers shop across them, with Stripe and PayPal checkout, Socket.io buyer–seller chat, coupons and events.',
            metric: { value: '4', label: 'deployment units' },
            stack: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
        },
    },

    {
        slug: 'mockly',
        categories: ['AI / ML', 'Full-stack'],
        name: 'Mockly',
        period: 'Oct 2025 - Present',
        status: 'Completed',
        description:
            'A full-stack AI-powered technical interview platform that generates contextual interview questions, enables voice-based answers via speech-to-text, and delivers automated AI evaluation with detailed analytics.',
        highlights: [
            'Integrated Google Gemini AI (gemini-2.5-flash) for contextual technical question generation and automated performance evaluation',
            'Integrated native Web Speech API for real-time speech-to-text voice answer input',
            'Implemented OTP email verification, JWT authentication with HTTP-only cookies, and bcrypt password hashing',
            'Built comprehensive performance analytics dashboards with score tracking and interview history using Recharts',
            'Applied rate-limiting caps (3 interviews/day) on RESTful endpoints to optimize AI token consumption and prevent abuse',
        ],
        stack: [
            'React 19',
            'Vite',
            'Tailwind CSS',
            'Redux Toolkit',
            'Node.js',
            'Express.js',
            'MongoDB',
            'Mongoose',
            'Google Gemini API',
            'Web Speech API',
            'JWT',
            'Nodemailer',
            'Recharts',
        ],
        github: 'https://github.com/sheraz61/interviewprep',
        vercel: 'https://ai-mockly.vercel.app/',
        preview: { cover: '/projects/mockly.webp', full: { src: '/projects/mockly-full.webp', height: 2789 } },
    },
    {
        slug: 'campusconnect',
        hidden: true,
        categories: ['Full-stack'],
        name: 'CampusConnect',
        period: '2026 - Present',
        status: 'Building',
        description:
            'A campus connectivity platform designed to help students share notes and past papers, with upcoming features for lending and requesting items within hostels.',
        highlights: [
            'Implemented a secure sharing system for academic resources (notes, past papers)',
            'Designing a request and lending system tailored for hostel students',
            'Focusing on campus-specific community connectivity and resource sharing',
        ],
        stack: [
            'React.js',
            'JavaScript',
            'Node.js',
            'MongoDB',
        ],
        github: 'https://github.com/sheraz61/Campus-Connect',
    },
    {
        slug: 'doctor-appointment',
        hidden: true,
        categories: ['Full-stack'],
        name: 'Doctor Appointment System',
        period: 'Jan 2026 - Feb 2026',
        status: 'Completed',
        description:
            'A full-stack doctor appointment booking platform featuring separate role-based dashboards for patients, doctors, and administrators.',
        highlights: [
            'Implemented secure JWT-based authentication and role-based access control',
            'Developed real-time slot availability and appointment scheduling logic',
            'Built responsive frontend interfaces and RESTful APIs',
            'Integrated Cloudinary for robust doctor and patient profile image management',
        ],
        stack: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
            'Cloudinary',
        ],
        github: 'https://github.com/sheraz61/doctorAppointment',
    },
    {
        slug: 'blog-backend',
        hidden: true,
        categories: ['Backend'],
        name: 'Blog Application Backend',
        period: 'Apr 2025 - May 2025',
        status: 'Completed',
        description:
            'A complete user authentication and account management backend system designed with strict security practices and API alignment.',
        highlights: [
            'Designed features for register, login/logout, OTP email verification, and password management',
            'Applied JWT authentication and bcrypt for secure password hashing',
            'Integrated Nodemailer for automated email communication',
            'Thoroughly tested all REST APIs using Postman to ensure performance and reliability',
        ],
        stack: [
            'Node.js',
            'Express',
            'MongoDB',
            'JWT',
            'Nodemailer',
        ],
        github: 'https://github.com/sheraz61/BlogApplicaiton-Backend',
    },
    {
        slug: 'quinttech',
        fact: { value: '1st', label: 'Client project' },
        categories: ['Frontend'],
        name: 'QuintTech',
        period: 'Jan 2026',
        status: 'Completed',
        description:
            'A modern, responsive landing page and technology services website built for a startup in collaboration with a fellow developer.',
        highlights: [
            'Built a multi-page navigation experience including Home, Services, Portfolio, About, and Contact',
            'Implemented a modern UI with smooth gradient designs, animated hero sections, and hover effects',
            'Ensured fully responsive layouts across mobile, tablet, and desktop viewports',
            'Delivered the entire project under a rapid 2-week development cycle',
        ],
        stack: [
            'React',
            'Vite',
            'Tailwind CSS',
            'React Router',
        ],
        github: 'https://github.com/sheraz61/QuintTech',
        vercel: 'https://quinttech.netlify.app/',
        preview: { cover: '/projects/quinttech.webp', full: { src: '/projects/quinttech-full.webp', height: 2733 } },
    },
    {
        slug: 'expense-manager',
        hidden: true,
        categories: ['Frontend'],
        name: 'Budget Tracker App',
        period: 'Apr 2025',
        status: 'Completed',
        description:
            'A client-side expense tracking application designed to help users manage budgets efficiently with persistent local storage.',
        highlights: [
            'Built functionality to create and manage multiple budget categories and track specific expenses',
            'Implemented robust data persistence using browser Local Storage API so data remains after refresh',
            'Managed global application state seamlessly using React Context API',
            'Integrated date-fns for precise expense history tracking and formatting',
        ],
        stack: [
            'React',
            'React Bootstrap',
            'Context API',
            'Local Storage',
        ],
        github: 'https://github.com/sheraz61/Expense-Manager',

    },
]
/** Projects shown on the site, in order */
export const projects = allProjects.filter((p) => !p.hidden)

/** Projects for the home page showcase, in display order */
export const featuredProjects = projects
    .filter((p): p is Project & { featured: NonNullable<Project['featured']> } => Boolean(p.featured))
    .sort((a, b) => a.featured.order - b.featured.order)

export function getProject(slug: string) {
    return projects.find((p) => p.slug === slug)
}
