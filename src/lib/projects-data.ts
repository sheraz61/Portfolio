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
        period: 'Sep 2025 — Jun 2026',
        status: 'Completed',
        description:
            'An AI-powered campus safety platform combining computer vision and deep learning with a role-based incident management dashboard for suspicious activity detection.',
        highlights: [
            'Built a hybrid deep-learning pipeline for suspicious activity detection across live camera feeds',
            'Developed role-based incident dashboards for security staff and administrators',
            'Integrated AWS S3 for storing and retrieving media associated with flagged incidents',
            'Owned the system architecture, model integration, and backend as a final-year thesis project',
        ],
        stack: [
            'React',
            'Tailwind CSS',
            'FastAPI',
            'PostgreSQL',
            'AWS',
            'TensorFlow',
            'Deep Learning',
            'Computer Vision',
            'Gemini API',
        ],
        github: 'https://github.com/sheraz61/CampusGaurd',
        vercel: 'https://campus-gaurd-five.vercel.app/',
    },

    {
        slug: 'vendora',
        name: 'Vendora',
        period: 'Feb 2026 — Apr 2026',
        status: 'Completed',
        description:
            'A multi-vendor e-commerce platform with real-time buyer-vendor communication, role-based dashboards, payment processing, and a CI/CD deployment pipeline.',
        highlights: [
            'Built real-time buyer-vendor messaging using Socket.IO',
            'Designed three role-based dashboards for buyers, vendors, and administrators',
            'Integrated Stripe and PayPal for payment processing',
            'Implemented vendor onboarding with product, inventory, and order management',
        ],
        stack: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
            'Socket.IO',
            'Stripe',
            'PayPal',
            'GitHub Actions',
            'CI/CD',
        ],
        github: 'https://github.com/sheraz61/vendora',
        vercel: 'https://multi-vendor-ecom-seven.vercel.app/',
    },

    {
        slug: 'interviewprep',
        name: 'InterviewPrep',
        period: 'Oct 2025 — Present',
        status: 'Building',
        description:
            'An AI-powered mock interview platform designed to generate role-specific questions, evaluate answers, and provide structured feedback with progress tracking.',
        highlights: [
            'Built an automated interview generation and evaluation workflow',
            'Created progress analytics to track performance across sessions and question categories',
            'Implemented separate candidate and admin experiences using role-based access',
            'Designed a RESTful API layer with rate-limited endpoints for AI-generated content',
        ],
        stack: [
            'React',
            'Node.js',
            'Express',
            'MongoDB',
        ],
        github: 'https://github.com/sheraz61/interviewprep',
    },
    {
        slug: 'campusconnect',
        name: 'CampusConnect',
        period: '2026 — Present',
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
        period: 'Jan 2026 — Feb 2026',
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
        period: 'Apr 2025 — May 2025',
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