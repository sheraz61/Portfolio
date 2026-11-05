export type PullRequest = {
    number: number
    title: string
    /** Part of the codebase the change touched */
    area: string
    kind: 'Feature' | 'Fix' | 'Fix + Feature'
    /** Merge date, YYYY-MM-DD */
    mergedAt: string
    url: string
    additions: number
    deletions: number
    files: number
    /**
     * Set on standout PRs. They show first on the project page, and the first
     * two show when the project row is expanded on /open-source.
     */
    featured?: { summary: string }
}

export type OpenSourceProject = {
    /** URL segment: /open-source/<slug> */
    slug: string
    /** owner/repo */
    name: string
    org: string
    avatar: string
    url: string
    homepage?: string
    /** GitHub search for all of my merged PRs in this repo */
    allPullRequestsUrl: string
    description: string
    language: string
    license: string
    /** Merged PRs only, newest first */
    pullRequests: PullRequest[]
}

/* Add a new project here, or a new merged PR to a project's list. */
export const openSourceProjects: OpenSourceProject[] = [
    {
        slug: 'pathment',
        name: 'pathment/pathment',
        org: 'Pathment',
        avatar: 'https://avatars.githubusercontent.com/u/285181426?v=4',
        url: 'https://github.com/pathment/pathment',
        homepage: 'https://pathment.me',
        allPullRequestsUrl:
            'https://github.com/pathment/pathment/pulls?q=is%3Apr+is%3Amerged+author%3Asheraz61',
        description: 'A SaaS platform that helps companies save money on training their employees.',
        language: 'TypeScript',
        license: 'Apache-2.0',
        pullRequests: [
            {
                number: 769,
                title: 'Pre-join camera choice for mentees',
                area: 'Meetings',
                kind: 'Feature',
                mergedAt: '2026-10-18',
                url: 'https://github.com/pathment/pathment/pull/769',
                additions: 143,
                deletions: 21,
                files: 3,
                featured: {
                    summary:
                        'Mentees now choose Camera On or Camera Off before joining a live meeting, instead of the camera state being decided for them. Added a start-muted option to the Jitsi room and a pre-join modal to the call overlay.',
                },
            },
            {
                number: 768,
                title: '403 error when reading notifications',
                area: 'Backend',
                kind: 'Fix',
                mergedAt: '2026-09-30',
                url: 'https://github.com/pathment/pathment/pull/768',
                additions: 2,
                deletions: 1,
                files: 1,
                featured: {
                    summary:
                        'Marking a notification as read failed with "Workspace ownership cannot be changed" because the query left out organizationId, so the workspace security hooks saw an ownership change. Loading the field fixed it.',
                },
            },
            {
                number: 761,
                title: 'Mentor Schedules UI supports dark mode semantic variables',
                area: 'Mentor schedules',
                kind: 'Fix',
                mergedAt: '2026-09-26',
                url: 'https://github.com/pathment/pathment/pull/761',
                additions: 30,
                deletions: 30,
                files: 2,
            },
            {
                number: 759,
                title: 'Clan Review completed-task view',
                area: 'Review',
                kind: 'Fix + Feature',
                mergedAt: '2026-09-26',
                url: 'https://github.com/pathment/pathment/pull/759',
                additions: 259,
                deletions: 97,
                files: 3,
                featured: {
                    summary:
                        'Fixed feedback parsing broken by a backend schema change so mentors see star ratings and awarded points again, and redesigned the submission history drawer with theme-aware cards for light and dark mode.',
                },
            },
            {
                number: 751,
                title: 'Polish messaging dark mode, contrast and button layout',
                area: 'Messaging',
                kind: 'Fix',
                mergedAt: '2026-09-19',
                url: 'https://github.com/pathment/pathment/pull/751',
                additions: 114,
                deletions: 103,
                files: 6,
            },
            {
                number: 750,
                title: 'Dark mode contrast in BulkReviewDrawer and FeedbackAssist',
                area: 'Review',
                kind: 'Fix',
                mergedAt: '2026-09-19',
                url: 'https://github.com/pathment/pathment/pull/750',
                additions: 24,
                deletions: 24,
                files: 2,
            },
            {
                number: 749,
                title: 'Dark mode text readability in RichTextEditor',
                area: 'Editor',
                kind: 'Fix',
                mergedAt: '2026-09-19',
                url: 'https://github.com/pathment/pathment/pull/749',
                additions: 18,
                deletions: 10,
                files: 2,
            },
            {
                number: 716,
                title: 'Roadmap task card overlap and mobile scaling',
                area: 'Roadmap',
                kind: 'Fix',
                mergedAt: '2026-09-10',
                url: 'https://github.com/pathment/pathment/pull/716',
                additions: 20,
                deletions: 20,
                files: 2,
            },
        ],
    },
]

export function getProject(slug: string) {
    return openSourceProjects.find((p) => p.slug === slug)
}

export function featuredPullRequests(project: OpenSourceProject) {
    return project.pullRequests.filter((pr) => pr.featured)
}

/** Totals for a set of PRs. "Fix + Feature" counts as a feature so features + fixes = merged. */
export function contributionStats(pullRequests: PullRequest[]) {
    return {
        merged: pullRequests.length,
        features: pullRequests.filter((pr) => pr.kind !== 'Fix').length,
        fixes: pullRequests.filter((pr) => pr.kind === 'Fix').length,
        added: pullRequests.reduce((sum, pr) => sum + pr.additions, 0),
        removed: pullRequests.reduce((sum, pr) => sum + pr.deletions, 0),
    }
}

export function formatDate(isoDate: string, options: Intl.DateTimeFormatOptions) {
    return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' })
}
