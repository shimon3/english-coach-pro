import type { CEFRLevel, SkillArea } from "@/lib/utils"

export interface DayActivity {
  date: string
  xp: number
  minutesStudied: number
}

export interface ActivityDay {
  date: string
  xp: number
  sessionsCount: number
}

export interface RecommendedLesson {
  id: string
  title: string
  module: string
  progressPercent: number
  estimatedMinutes: number
  href: string
  iconName: string
  xpReward: number
}

export interface User {
  id: string
  name: string
  avatarInitials: string
  jobTitle: string
  company: string
  country: string
  countryFlag: string
  nativeLanguages: string[]
  currentLevel: CEFRLevel
  sublevel: number
  totalXP: number
  xpToNextLevel: number
  streakDays: number
  lastActiveDate: string
  joinedDate: string
  dailyGoalXP: number
  todayXP: number
  preferredAccent: "US" | "UK" | "AU" | "CA"
  skillScores: Record<SkillArea, number>
  focusTopics: string[]
  totalStudyMinutes: number
  totalWordsLearned: number
  totalLessonsCompleted: number
}

export const currentUser: User = {
  id: "user_demo",
  name: "Alex",
  avatarInitials: "AL",
  jobTitle: "Software Developer",
  company: "Demo Company",
  country: "Demo Country",
  countryFlag: "🌍",
  nativeLanguages: ["Spanish"],
  currentLevel: "B1",
  sublevel: 2,
  totalXP: 2840,
  xpToNextLevel: 5000,
  streakDays: 14,
  lastActiveDate: "2026-06-11",
  joinedDate: "2026-05-28",
  dailyGoalXP: 300,
  todayXP: 180,
  preferredAccent: "US",
  skillScores: {
    speaking: 52,
    listening: 61,
    reading: 74,
    writing: 63,
    vocabulary: 58,
    grammar: 67,
  },
  focusTopics: [
    "Microsoft 365",
    "Entra ID",
    "Active Directory",
    "Windows Server",
    "Fortinet",
    "Networking",
    "Help Desk",
    "Cybersecurity",
  ],
  totalStudyMinutes: 720,
  totalWordsLearned: 234,
  totalLessonsCompleted: 18,
}

export const weeklyActivity: DayActivity[] = [
  { date: "2026-06-05", xp: 120, minutesStudied: 25 },
  { date: "2026-06-06", xp: 245, minutesStudied: 50 },
  { date: "2026-06-07", xp: 0, minutesStudied: 0 },
  { date: "2026-06-08", xp: 310, minutesStudied: 55 },
  { date: "2026-06-09", xp: 185, minutesStudied: 35 },
  { date: "2026-06-10", xp: 290, minutesStudied: 50 },
  { date: "2026-06-11", xp: 180, minutesStudied: 30 },
]

// 84 days of activity data for the heatmap (12 weeks)
export const monthlyActivity: ActivityDay[] = (() => {
  const days: ActivityDay[] = []
  const start = new Date("2026-03-20")
  const activityPattern = [
    240, 180, 0, 310, 95, 200, 155,
    0, 280, 245, 190, 0, 310, 200,
    120, 0, 280, 310, 0, 195, 240,
    310, 185, 0, 295, 180, 240, 0,
    0, 290, 310, 165, 285, 0, 200,
    240, 0, 310, 285, 195, 0, 155,
    200, 285, 0, 310, 195, 240, 285,
    0, 310, 195, 0, 280, 285, 240,
    185, 0, 295, 310, 240, 0, 285,
    120, 245, 310, 0, 285, 195, 240,
    310, 0, 285, 245, 190, 0, 295,
    120, 0, 245, 310, 0, 185, 180,
  ]
  for (let i = 0; i < 84; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    const xp = activityPattern[i] ?? 0
    days.push({
      date: d.toISOString().split("T")[0],
      xp,
      sessionsCount: xp > 0 ? Math.ceil(xp / 120) : 0,
    })
  }
  return days
})()

export const recommendedLessons: RecommendedLesson[] = [
  {
    id: "it-email-reports",
    title: "Writing Help Desk Reports",
    module: "IT English",
    progressPercent: 40,
    estimatedMinutes: 12,
    href: "/conversations",
    iconName: "FileText",
    xpReward: 120,
  },
  {
    id: "pronunciation-th",
    title: "Mastering the TH Sound",
    module: "Pronunciation",
    progressPercent: 0,
    estimatedMinutes: 8,
    href: "/vocabulary",
    iconName: "Mic",
    xpReward: 60,
  },
  {
    id: "vocab-networking",
    title: "Networking & Infrastructure Terms",
    module: "Vocabulary",
    progressPercent: 25,
    estimatedMinutes: 10,
    href: "/vocabulary",
    iconName: "BookOpen",
    xpReward: 80,
  },
]

export const recentActivity = [
  { id: "1", date: "2026-06-11", module: "Pronunciation", title: "Consonant Clusters", xp: 60, durationMinutes: 12 },
  { id: "2", date: "2026-06-11", module: "Vocabulary", title: "Microsoft 365 Terms", xp: 50, durationMinutes: 10 },
  { id: "3", date: "2026-06-10", module: "Grammar", title: "Conditional Sentences", xp: 75, durationMinutes: 18 },
  { id: "4", date: "2026-06-10", module: "Listening", title: "IT Security Podcast Ep. 3", xp: 120, durationMinutes: 22 },
  { id: "5", date: "2026-06-09", module: "IT English", title: "Email: Incident Reports", xp: 90, durationMinutes: 15 },
]
