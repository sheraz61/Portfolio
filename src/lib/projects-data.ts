export type Project = {
    slug: string
    name: string
    period: string
    status: 'Building' | 'Completed'
    description: string
    highlights: string[]
    stack: string[]
    github: string
    vercel?: string
    image?: string
}

export const projects: Project[] = [
    {
        slug: 'learnex',
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
    },

    {
        slug: 'campusguard',
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
    },

    {
        slug: 'vendora',
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
    },

    {
        slug: 'mockly',
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
    },
    {
        slug: 'campusconnect',
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
    },
    {
        slug: 'expense-manager',
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