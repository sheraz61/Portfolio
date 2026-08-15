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
        period: 'Jan 2026 — Present',
        status: 'Building',
        description:
            'A full-stack learning management system built from the ground up to explore how a real learning platform handles authentication, course delivery, user interactions, and backend state.',
        highlights: [
            '38+ REST APIs covering authentication, users, courses, orders, reviews, Q&A, notifications, and course content',
            'Redis-backed authentication and session management using access and refresh token architecture',
            'Role-based authorization separating admin and learner capabilities across protected resources',
            'Automated notification cleanup using Node Cron to remove read notifications after 30 days',
        ],
        stack: [
            'Next.js',
            'TypeScript',
            'Node.js',
            'Express',
            'MongoDB',
            'Redis',
        ],
        github: 'https://github.com/sheraz61/learnex',
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
]