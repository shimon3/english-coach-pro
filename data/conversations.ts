import type { CEFRLevel } from "@/lib/utils"

export type ITConversationCategory =
  | "help-desk"
  | "microsoft365"
  | "security"
  | "networking"
  | "incidents"
  | "meetings"

export interface GrammarNote {
  triggerPhrase: string
  correction: string
  betterAlternative?: string
  explanation: string
}

export interface VocabHighlight {
  word: string
  phonetic: string
  definition: string
}

export interface ConversationTurn {
  id: string
  role: "user" | "ai"
  content: string
  delayMs?: number
  grammarNote?: GrammarNote
  vocabularyHighlights?: VocabHighlight[]
  suggestedReplies?: string[]
}

export interface ConversationScenario {
  id: string
  title: string
  description: string
  difficulty: CEFRLevel
  estimatedMinutes: number
  category: ITConversationCategory
  context: string
  userRole: string
  aiRole: string
  aiName: string
  aiAvatar: string
  tags: string[]
  xpReward: number
  script: ConversationTurn[]
}

export const CATEGORY_META: Record<ITConversationCategory, { label: string; color: string; bg: string; border: string }> = {
  "help-desk":    { label: "Help Desk",    color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/25" },
  "microsoft365": { label: "Microsoft 365",color: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/25" },
  "security":     { label: "Security",     color: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/25" },
  "networking":   { label: "Networking",   color: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/25" },
  "incidents":    { label: "Incidents",    color: "text-red-400",     bg: "bg-red-400/10",     border: "border-red-400/25" },
  "meetings":     { label: "Meetings",     color: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/25" },
}

// ─── Helper ──────────────────────────────────────────────────────────────────
const t = (
  id: string,
  role: "user" | "ai",
  content: string,
  opts?: Partial<Omit<ConversationTurn, "id" | "role" | "content">>
): ConversationTurn => ({ id, role, content, ...opts })

// ═════════════════════════════════════════════════════════════════════════════
// SCENARIOS
// ═════════════════════════════════════════════════════════════════════════════

const helpdeskprinter: ConversationScenario = {
  id: "helpdeskprinter",
  title: "The Printer Won't Print",
  description: "Walk a frustrated employee through a printer troubleshooting session step by step.",
  difficulty: "B1",
  estimatedMinutes: 8,
  category: "help-desk",
  context: "Claire from the Accounting department calls the IT helpdesk. She has been trying to print an urgent report for 20 minutes. You are the IT support agent taking her call.",
  userRole: "IT Support Agent",
  aiRole: "Employee (Accounting)",
  aiName: "Claire Martin",
  aiAvatar: "CM",
  tags: ["printing", "troubleshooting", "helpdesk", "printer"],
  xpReward: 60,
  script: [
    t("hp-1", "ai", "Hello? Is this IT support? I really need help — I have a board meeting in 30 minutes and my printer is completely refusing to print anything!", {
      delayMs: 1000,
      suggestedReplies: [
        "Good morning, IT support speaking. Can I take your name and employee number please?",
        "Hello, you've reached IT support. Don't worry, let's sort this out quickly. What's your name?",
        "Hi, this is IT. I'll help you right away. Can you tell me your name and which printer you're using?",
      ],
    }),
    t("hp-2", "user", "Good morning, IT support speaking. I can help you with that. Can I take your name and the printer model you're trying to use?", {
      grammarNote: {
        triggerPhrase: "Can I take your name",
        correction: "Can I take your name is correct.",
        betterAlternative: "Could I take your name and employee number, please?",
        explanation: "Adding 'Could I' instead of 'Can I' sounds more professional and polite in a formal support context.",
      },
    }),
    t("hp-3", "ai", "My name is Claire Martin, from Accounting. I'm trying to print on the HP LaserJet on the second floor — the one near the kitchen. It just shows 'offline' in the queue.", {
      delayMs: 1300,
      vocabularyHighlights: [
        { word: "queue", phonetic: "/kjuː/", definition: "A list of print jobs waiting to be processed by a printer." },
        { word: "offline", phonetic: "/ˈɒflaɪn/", definition: "Not connected to or available on a network; not operational." },
      ],
      suggestedReplies: [
        "Thank you, Claire. First, can you right-click the printer in your settings and select 'See what's printing'?",
        "Okay Claire, let's start by checking if the printer is actually powered on. Can you see any lights on the device?",
        "I see. Let me check the printer status on our end. Can you also try cancelling all jobs in the print queue?",
      ],
    }),
    t("hp-4", "user", "Thank you, Claire. Let me check on our monitoring system. While I do that, can you check if the printer has any lights on — green or orange?"),
    t("hp-5", "ai", "Yes, there's a flashing orange light. The display says 'Paper jam — Tray 2'. Oh, I didn't notice that before! Can you help me clear it?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "paper jam", phonetic: "/ˈpeɪpər dʒæm/", definition: "A situation where paper gets stuck inside a printer, preventing it from operating." },
        { word: "tray", phonetic: "/treɪ/", definition: "A flat, removable compartment in a printer that holds paper." },
      ],
      suggestedReplies: [
        "No problem, Claire. First, please turn the printer off using the power button, then wait 30 seconds.",
        "Of course! Open Tray 2 carefully and gently pull out any stuck paper. Make sure to pull in the direction the paper feeds.",
        "Sure. Can you see where the paper is jammed? Open all the access panels and look for folded paper.",
      ],
    }),
    t("hp-6", "user", "Of course! Let's sort that out. Could you open Tray 2 on the printer and gently pull out any stuck paper? Make sure to pull it in the direction it travels through the machine."),
    t("hp-7", "ai", "Okay I opened it... there's a torn piece of paper stuck at the back. I pulled it out but there might be a small bit still inside.", {
      delayMs: 1200,
      suggestedReplies: [
        "That's fine. Please also check the back panel — there's usually a rear access door on HP printers.",
        "Good work. Now open the rear access panel as well and check for any remaining pieces.",
        "Don't worry about small bits — the printer should handle those. Turn it off and back on, then try printing a test page.",
      ],
    }),
    t("hp-8", "user", "Good. Now please open the rear access panel on the back of the printer as well. There's often a small door there that allows you to remove any remaining pieces.", {
      grammarNote: {
        triggerPhrase: "there's often a small door there that allows you",
        correction: "This is correct.",
        betterAlternative: "There should be a small access door at the back — that will allow you to check for any remaining paper.",
        explanation: "Using 'should be' sounds more professional than 'there's often', as it guides the user more confidently.",
      },
    }),
    t("hp-9", "ai", "I found it! There was another piece at the back. I've removed everything. Should I turn the printer back on now?", {
      delayMs: 900,
      suggestedReplies: [
        "Yes, please power it back on and wait about 30 seconds for it to initialise.",
        "Yes, go ahead. Once it's back on, please try printing a single test page first.",
        "Perfect! Turn it on and let me know what the display says once it's fully started.",
      ],
    }),
    t("hp-10", "user", "Excellent! Yes, please power it back on and give it about 30 seconds to initialise. Once the display shows 'Ready', try sending a test page first before your full report."),
    t("hp-11", "ai", "It says 'Ready' now! And... the test page is printing! Oh thank goodness. Thank you so much, I was really panicking!", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "initialise", phonetic: "/ɪˈnɪʃəlaɪz/", definition: "To start up and prepare a device or system for use. (British: initialise, American: initialize)" },
      ],
      suggestedReplies: [
        "You're welcome! Is there anything else I can help you with today?",
        "Great news! I'll log this as a paper jam incident. Is there anything else?",
        "Glad we got that sorted! I'll create a ticket for this call. Have a good meeting!",
      ],
    }),
    t("hp-12", "user", "Glad we sorted that out so quickly! I'll log a ticket for this incident. Is there anything else I can help you with, or are you all set for your meeting?", {
      grammarNote: {
        triggerPhrase: "are you all set",
        correction: "'All set' is a common American English phrase meaning 'ready' or 'prepared'.",
        betterAlternative: "Is there anything else you need, or are you ready for your meeting?",
        explanation: "'Are you all set?' is perfectly natural in spoken English, especially in support contexts.",
      },
    }),
    t("hp-13", "ai", "No, that's everything, thank you! You saved my day. I'll make sure to pull paper out more carefully from now on.", {
      delayMs: 900,
      suggestedReplies: [
        "No problem at all! I'll close the ticket as resolved. Good luck with the board meeting!",
        "Happy to help, Claire! Don't hesitate to call us if anything else comes up. Goodbye!",
        "You're very welcome. I'll update the ticket now. Have a great meeting!",
      ],
    }),
    t("hp-14", "user", "Great to hear! I'll update the ticket as resolved. Have a great board meeting, Claire. Don't hesitate to call us if anything else comes up. Goodbye!"),
    t("hp-15", "ai", "Thank you so much. Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const m365sharepoint: ConversationScenario = {
  id: "m365sharepoint",
  title: "Can't Access SharePoint",
  description: "Diagnose and fix a SharePoint permissions issue for an employee who urgently needs access to a project site.",
  difficulty: "B1",
  estimatedMinutes: 9,
  category: "microsoft365",
  context: "Marc Dubois, a project manager, contacts the IT helpdesk via Teams chat. He cannot access the new SharePoint project site and has a client deliverable due today.",
  userRole: "IT Support Agent",
  aiRole: "Project Manager",
  aiName: "Marc Dubois",
  aiAvatar: "MD",
  tags: ["sharepoint", "permissions", "microsoft365", "access"],
  xpReward: 70,
  script: [
    t("sp-1", "ai", "Hi IT team, I'm getting an 'Access Denied' error when I try to open the Project Phoenix SharePoint site. I need the files urgently — can you help?", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi Marc, I can help with that. Can you send me the exact URL of the SharePoint site?",
        "Hello Marc! Access denied usually means you haven't been added to the site yet. Let me check your permissions.",
        "Hi Marc. I'll look into this right away. What is your full email address?",
      ],
    }),
    t("sp-2", "user", "Hi Marc! I'll look into this straightaway. Could you share the exact URL of the SharePoint site you're trying to access?"),
    t("sp-3", "ai", "Sure, the URL is https://ourcompany.sharepoint.com/sites/ProjectPhoenix. I've been working on this project for two weeks — I don't understand why I can't access it now.", {
      delayMs: 1200,
      suggestedReplies: [
        "Thanks. Let me check the site permissions in the SharePoint admin center now.",
        "I see. It's possible your account wasn't added to the site members group. Give me a moment to verify.",
        "Okay, I'm pulling up the site permissions now. This will take about 30 seconds.",
      ],
    }),
    t("sp-4", "user", "Thanks, Marc. I'm pulling up the site permissions in the SharePoint admin center now. This might take just a moment.", {
      grammarNote: {
        triggerPhrase: "I'm pulling up",
        correction: "I'm pulling up the site permissions — this is correct.",
        betterAlternative: "I'm checking the site permissions now in the SharePoint admin center.",
        explanation: "'Pulling up' is natural IT support language. 'Checking' is slightly more formal and universally understood.",
      },
    }),
    t("sp-5", "ai", "No problem, take your time. I just want to make sure I can access the files before my 3 PM client call.", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "permissions", phonetic: "/pəˈmɪʃənz/", definition: "The settings that control who can view, edit, or manage a file, folder, or website." },
        { word: "admin center", phonetic: "/ˈædmɪn ˈsentər/", definition: "The web portal where IT administrators manage Microsoft 365 services and settings." },
      ],
      suggestedReplies: [
        "I can see the issue — you're not in the Members or Visitors group for that site. I'll add you now.",
        "Found it. Your account has been removed from the site members group. I'll restore your access immediately.",
        "I see the problem. The site owner changed the permissions last week. Let me add you back now.",
      ],
    }),
    t("sp-6", "user", "I can see the issue, Marc. Your account is not currently listed in the site's Members group. I'll add you to the correct permission group right now. It should take effect within a few minutes."),
    t("sp-7", "ai", "Oh, that explains it. Do you know why I was removed? Was it a mistake?", {
      delayMs: 1000,
      suggestedReplies: [
        "It looks like the site owner may have accidentally removed you during a permissions cleanup. I'll add you back as a Member.",
        "I'm not sure of the reason — I'll need to check the audit logs. For now, let me restore your access.",
        "The audit log shows the site owner updated the permissions list last Friday. It may have been unintentional.",
      ],
    }),
    t("sp-8", "user", "Looking at the audit log, it seems the site owner ran a permission cleanup last Friday and your account may have been removed accidentally. I'll restore your access now and flag it to the site owner."),
    t("sp-9", "ai", "I see. Okay, thank you. And will I have the same permissions as before — can I edit files, or just view them?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "audit log", phonetic: "/ˈɔːdɪt lɒɡ/", definition: "A record of all administrative and user activity — useful for investigating changes in access and permissions." },
        { word: "site owner", phonetic: "/saɪt ˈoʊnər/", definition: "The person with full control over a SharePoint site, who can manage permissions and settings." },
      ],
      suggestedReplies: [
        "I'll add you as a Site Member, which gives you read and edit access, but not admin rights.",
        "You'll have Member access — meaning you can view and edit documents but cannot manage site settings.",
        "I'm restoring you as a Member, which matches your previous permissions. You'll be able to edit files.",
      ],
    }),
    t("sp-10", "user", "I'll restore you as a Site Member, which gives you read and edit access to all documents in the site — the same as before. You won't be able to change site settings, but that shouldn't affect your work.", {
      grammarNote: {
        triggerPhrase: "that shouldn't affect your work",
        correction: "This is correct.",
        betterAlternative: "That won't impact your ability to work on the project.",
        explanation: "'That won't impact your ability to...' sounds more professional and reassuring in a business context.",
      },
    }),
    t("sp-11", "ai", "Perfect, that's exactly what I need. Thank you. How long before the access is working?", {
      delayMs: 800,
      suggestedReplies: [
        "It should be active within 2 to 5 minutes. You may need to refresh your browser.",
        "Permission changes usually take 1 to 5 minutes to propagate. Try opening the link again in a few minutes.",
        "It typically takes between 2 and 5 minutes. If it's still not working after 10 minutes, please contact me again.",
      ],
    }),
    t("sp-12", "user", "Permission changes in SharePoint typically take between two and five minutes to propagate. Please try accessing the site again in about five minutes. If it still shows the error, clear your browser cache first or try in a private window."),
    t("sp-13", "ai", "Excellent, I'll try again in five minutes. Thank you for the quick help — I was getting worried about my deadline!", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "propagate", phonetic: "/ˈprɒpəɡeɪt/", definition: "To spread or replicate a change across all servers in a system so that all users see the updated result." },
        { word: "cache", phonetic: "/kæʃ/", definition: "Temporary storage used by browsers to load pages faster; sometimes needs to be cleared after permission changes." },
      ],
      suggestedReplies: [
        "No problem at all! I'll create a ticket for this and notify the site owner. Good luck with your 3 PM call!",
        "Glad I could help! I'll close the ticket once you confirm access is restored. Have a great meeting!",
        "Happy to help, Marc. I'll log this and follow up with the site owner. Let me know if anything else comes up.",
      ],
    }),
    t("sp-14", "user", "No problem at all! I'll log this incident and notify the site owner about the accidental removal so it doesn't happen again. I'll follow up with you in 30 minutes to confirm everything is working. Good luck with your client call!"),
    t("sp-15", "ai", "That would be great, thank you! I'll confirm once I'm in. Bye for now.", { delayMs: 700 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const passwordreset: ConversationScenario = {
  id: "passwordreset",
  title: "Locked Out of My Account",
  description: "Help a user who is completely locked out of their account after too many failed login attempts.",
  difficulty: "B1",
  estimatedMinutes: 7,
  category: "security",
  context: "Sophie Lambert calls the IT helpdesk. She cannot log into her computer or Microsoft 365 account after trying her password multiple times this morning. The account is now locked.",
  userRole: "IT Support Agent",
  aiRole: "Employee (HR)",
  aiName: "Sophie Lambert",
  aiAvatar: "SL",
  tags: ["password", "account lockout", "active directory", "security", "SSPR"],
  xpReward: 60,
  script: [
    t("pr-1", "ai", "Good morning, I'm Sophie from HR. I can't log into my computer at all this morning — it keeps saying my account is locked. I've tried my password several times but nothing works!", {
      delayMs: 1000,
      suggestedReplies: [
        "Good morning Sophie! Don't worry, account lockouts are quick to fix. Can I verify your identity first?",
        "Hi Sophie, I can unlock your account. For security, I'll need to verify your identity before making any changes.",
        "Hello Sophie! I can see a locked account in our system. Can you confirm your employee number for me?",
      ],
    }),
    t("pr-2", "user", "Good morning, Sophie! I can help you with that. For security purposes, I'll need to verify your identity before I can unlock your account. Could you please confirm your full name and employee number?"),
    t("pr-3", "ai", "Of course. I'm Sophie Lambert, my employee number is EMP-4821, and I work in the HR department on the third floor.", {
      delayMs: 1000,
      suggestedReplies: [
        "Thank you Sophie. Can you also tell me your manager's name for additional verification?",
        "Thank you. I can see your account in the system. I also need to ask your date of birth for verification.",
        "Perfect. One more question for verification — what is the name of your manager?",
      ],
    }),
    t("pr-4", "user", "Thank you, Sophie. I can see your account in our system. For additional verification, could you tell me the name of your direct manager?", {
      grammarNote: {
        triggerPhrase: "direct manager",
        correction: "'Direct manager' is correct.",
        betterAlternative: "Could you also confirm the name of your line manager or supervisor?",
        explanation: "'Line manager' is the preferred British English term in professional contexts. 'Direct manager' is also perfectly acceptable.",
      },
    }),
    t("pr-5", "ai", "Yes, my manager is Isabelle Renard, the HR Director.", {
      delayMs: 800,
      suggestedReplies: [
        "Thank you, that matches our records. I'll unlock your account right now.",
        "Perfect, that confirms your identity. I'm unlocking the account in Active Directory now.",
        "Great, that matches. Before I unlock, can you tell me — do you remember what password you were trying to use?",
      ],
    }),
    t("pr-6", "user", "That matches our records. I'm going to unlock your account in Active Directory now. This will only take a moment."),
    t("pr-7", "ai", "Oh thank you! Will I be able to use the same password, or do I need to change it?", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "Active Directory", phonetic: "/ˈæktɪv dɪˈrektəri/", definition: "Microsoft's directory service used to manage user accounts, passwords, and access rights on a company network." },
        { word: "account lockout", phonetic: "/əˈkaʊnt ˈlɒkaʊt/", definition: "A security feature that temporarily disables an account after too many incorrect password attempts." },
      ],
      suggestedReplies: [
        "Our policy requires you to change your password after a lockout. I'll set it to expire so you'll be prompted to create a new one.",
        "For security, our policy requires a password change after a lockout. You'll be prompted to set a new one when you log in.",
        "You'll need to create a new password. Our security policy requires this after any account lockout.",
      ],
    }),
    t("pr-8", "user", "Our security policy requires a password change after any account lockout. When you log in, you'll be prompted to create a new password. Please make sure it meets our requirements — at least 14 characters, with numbers and symbols."),
    t("pr-9", "ai", "I see, that makes sense. And is there a way to reset my own password in the future so I don't have to call IT every time? I feel bad bothering you for something like this!", {
      delayMs: 1300,
      vocabularyHighlights: [
        { word: "complexity requirements", phonetic: "/kəmˈpleksɪti rɪˈkwaɪərments/", definition: "The rules that a password must follow, such as minimum length and the use of numbers, symbols, and mixed case." },
      ],
      suggestedReplies: [
        "Absolutely! We have a Self-Service Password Reset feature. I can help you set it up right now.",
        "Yes! You can use our SSPR tool — it lets you reset your own password using your phone or email. I'll send you the setup link.",
        "Of course — we have a Self-Service Password Reset portal. Have you registered your phone number with it yet?",
      ],
    }),
    t("pr-10", "user", "Not at all, Sophie — that's exactly what we're here for! But yes, we do have a Self-Service Password Reset feature. Once you're logged in, I'd strongly recommend registering for it so you can reset your password yourself anytime, 24 hours a day.", {
      grammarNote: {
        triggerPhrase: "that's exactly what we're here for",
        correction: "This phrase is correct and very natural in English.",
        betterAlternative: "That's what the helpdesk is here for — please don't hesitate to call.",
        explanation: "Reassuring users that it's okay to call is good support practice. This phrase sounds warm and professional.",
      },
    }),
    t("sp-11b", "ai", "That sounds very useful! How do I register for it?", {
      delayMs: 800,
      suggestedReplies: [
        "Go to aka.ms/mysecurityinfo and sign in. You can add your mobile number and the Microsoft Authenticator app as reset methods.",
        "After you log in, visit the security settings page at mysignins.microsoft.com. You can register your phone number or authenticator app there.",
        "I'll send you an email with the setup link. Basically, you register your phone number and then you can reset your password by yourself.",
      ],
    }),
    t("pr-12", "user", "After you log in with your new password, please go to mysignins.microsoft.com and register your phone number or the Microsoft Authenticator app. That way, you'll be able to reset your password without calling us."),
    t("pr-13", "ai", "Perfect, I'll do that straight away. Thank you so much for your help and patience!", {
      delayMs: 800,
      vocabularyHighlights: [
        { word: "Self-Service Password Reset", phonetic: "/self ˈsɜːrvɪs ˈpæswɜːrd rɪˈset/", definition: "A feature (SSPR) that allows users to reset their own passwords without contacting IT, using a pre-registered phone or email." },
      ],
      suggestedReplies: [
        "You're welcome! Your account is now unlocked. Please try logging in now and let me know if anything else comes up.",
        "Happy to help! The account is unlocked — go ahead and try logging in. Have a great day, Sophie!",
        "My pleasure! The account should be unlocked now. Please call us if you have any trouble with the new password.",
      ],
    }),
    t("pr-14", "user", "You're welcome, Sophie! Your account is now unlocked. Please try logging in now and change your password when prompted. Don't forget to set up SSPR afterwards. Have a great day!"),
    t("pr-15", "ai", "I will, thank you! Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const mfamobile: ConversationScenario = {
  id: "mfamobile",
  title: "MFA Not Working on My Phone",
  description: "Help a user who can't complete multi-factor authentication on their mobile device after getting a new phone.",
  difficulty: "B1",
  estimatedMinutes: 10,
  category: "microsoft365",
  context: "David Chen from Sales got a new smartphone last week and can no longer receive Microsoft Authenticator codes. He can't sign into Microsoft 365 or any company applications. You need to help him re-enroll his MFA methods.",
  userRole: "IT Support Agent",
  aiRole: "Sales Representative",
  aiName: "David Chen",
  aiAvatar: "DC",
  tags: ["MFA", "authenticator", "microsoft365", "identity", "security"],
  xpReward: 70,
  script: [
    t("mfa-1", "ai", "Hi, I just got a new phone last week and now I can't log in to Outlook or Teams at all. It asks for an authentication code but my old phone is already reset. I'm completely stuck!", {
      delayMs: 1100,
      suggestedReplies: [
        "Hi! That's a common issue after getting a new phone. I'll need to reset your MFA methods and help you enroll your new device.",
        "Hello! Don't worry — when you change phones, you need to re-register the Authenticator app. I can help you do that.",
        "Hi, I understand the frustration. Can you confirm your name and email address so I can locate your account?",
      ],
    }),
    t("mfa-2", "user", "Hi David! That's a common issue when switching phones. I'll need to temporarily reset your MFA registration so you can enroll your new device. Can you confirm your name and email address first?"),
    t("mfa-3", "ai", "Sure, I'm David Chen, my email is david.chen@ourcompany.com. I really need access urgently — I have client calls starting in an hour.", {
      delayMs: 1000,
      suggestedReplies: [
        "Understood. I'll reset your MFA now. Can you also confirm the last four digits of your employee badge number?",
        "Got it, David. I need to verify your identity before making any changes. Can you confirm your manager's name?",
        "I can see your account. For security, can you tell me your job title and which department you're in?",
      ],
    }),
    t("mfa-4", "user", "Thanks David. Before I make any changes to your account, I need to verify your identity. Could you tell me your manager's name and your department?", {
      grammarNote: {
        triggerPhrase: "I need to verify your identity",
        correction: "This is correct and very natural.",
        betterAlternative: "For security purposes, I'll need to verify your identity before proceeding.",
        explanation: "Adding 'for security purposes' and 'before proceeding' is more formal and explains the reason to the user clearly.",
      },
    }),
    t("mfa-5", "ai", "Of course. My manager is Jessica Wong, Sales Director. I'm in the Enterprise Sales department.", {
      delayMs: 800,
      suggestedReplies: [
        "Perfect, that matches. I'm going to reset your MFA registration now. You'll receive a temporary access link by email.",
        "Great, that checks out. I'll reset your MFA methods in Entra ID and send you a setup link via your backup email.",
        "That matches our records. I'll clear your existing MFA registration. Do you have access to your work email on a computer?",
      ],
    }),
    t("mfa-6", "user", "That matches our records. I'll reset your MFA registration in Entra ID now. Do you have access to your work email via a browser — for example on a laptop or a shared computer?"),
    t("mfa-7", "ai", "Yes, I can use my colleague's laptop. I can access Outlook via the web browser. Will that work?", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "MFA", phonetic: "/ˌemˌefˈeɪ/", definition: "Multi-Factor Authentication — a security method that requires two or more verification steps to sign in." },
        { word: "Entra ID", phonetic: "/ˈentrə aɪˌdiː/", definition: "Microsoft's cloud-based identity service (formerly Azure AD) that manages user identities and access to applications." },
      ],
      suggestedReplies: [
        "Yes, perfect! On that browser, go to aka.ms/mfasetup — I'll have the link ready for you after I reset your account.",
        "That's exactly what we need. Please open a private/incognito window on that laptop for the setup.",
        "Yes, that will work perfectly. Please open a private browsing window so it doesn't use cached credentials.",
      ],
    }),
    t("mfa-8", "user", "Yes, that's perfect. Please open a private browsing window on your colleague's laptop to avoid any cached credentials. I'll reset your MFA now — this will take about 60 seconds."),
    t("mfa-9", "ai", "Okay, I'm opening the browser now. Let me ask my colleague for her laptop. Ready when you are.", {
      delayMs: 1200,
      suggestedReplies: [
        "Great. I've reset your MFA. Please go to aka.ms/mfasetup and sign in with your email. You'll need to verify by SMS this first time.",
        "Done — I've cleared your old MFA registration. Navigate to mysignins.microsoft.com and sign in. You'll get an SMS code since your phone is registered.",
        "The reset is complete. Go to office.com and try signing in. Since I've enabled a temporary bypass, you should get a one-time code by SMS.",
      ],
    }),
    t("mfa-10", "user", "I've reset your MFA registration. Please navigate to aka.ms/mfasetup in that private window and sign in with your work email. Since I've temporarily allowed SMS verification, you should receive a one-time code on your new phone."),
    t("mfa-11", "ai", "Okay I'm on the page... it's asking me to enter my password. Done. Now it says 'We need more information' and is asking to set up the authenticator. Should I install the Microsoft Authenticator app on my new phone now?", {
      delayMs: 1500,
      vocabularyHighlights: [
        { word: "one-time code", phonetic: "/wʌn taɪm koʊd/", definition: "A temporary numeric code sent to a phone or email that is valid only for a single use and expires quickly." },
        { word: "private window", phonetic: "/ˈpraɪvɪt ˈwɪndoʊ/", definition: "An incognito or private browsing session that doesn't save passwords, cookies, or browsing history." },
      ],
      suggestedReplies: [
        "Yes, please install Microsoft Authenticator on your new phone now. Then click 'Mobile app' as your verification method.",
        "Exactly — install the Authenticator app from the App Store or Google Play, then follow the setup wizard on screen.",
        "Yes! Download Microsoft Authenticator on your new phone, then come back to that browser page and select 'Authenticator app'.",
      ],
    }),
    t("mfa-12", "user", "Yes, please install the Microsoft Authenticator app on your new phone now — you'll find it on the App Store or Google Play. Once it's installed, come back to that browser page and click 'Mobile app' to continue the setup.", {
      grammarNote: {
        triggerPhrase: "you'll find it on the App Store or Google Play",
        correction: "This is correct.",
        betterAlternative: "You can download it from the App Store (iPhone) or Google Play Store (Android).",
        explanation: "Specifying iPhone and Android removes ambiguity and is more helpful for users who may not know which store to use.",
      },
    }),
    t("mfa-13", "ai", "Okay it's installed. I selected 'Mobile app' and it's showing me a QR code to scan. I scanned it with the app and it says 'Account added successfully'! And now it's asking me to approve a test notification.", {
      delayMs: 1500,
      suggestedReplies: [
        "Excellent! Please approve the test notification in the Authenticator app on your phone.",
        "Great progress! Tap 'Approve' in the Authenticator app when you see the notification.",
        "Perfect! Go ahead and approve the notification — that confirms the app is correctly linked to your account.",
      ],
    }),
    t("mfa-14", "user", "That's great, David! Please approve the test notification now by tapping 'Approve' in the Authenticator app on your phone."),
    t("mfa-15", "ai", "Done! It says 'Verification successful'. I can now see my Microsoft 365 apps again! This is such a relief. Thank you for walking me through all of this.", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "QR code", phonetic: "/ˌkjuːˈɑːr koʊd/", definition: "A square barcode that can be scanned with a phone camera to quickly link apps or open websites." },
      ],
      suggestedReplies: [
        "Brilliant! You're all set. From now on, use the Authenticator app whenever you're asked for MFA. Is there anything else?",
        "Wonderful! Your MFA is fully configured. I'll close the ticket now. Good luck with your client calls!",
        "Excellent! You're good to go, David. I'll log this as resolved. Let us know if you need anything else.",
      ],
    }),
    t("mfa-16", "user", "Wonderful! You're all set, David. From now on, the Authenticator app on your new phone will handle all your sign-in approvals. I'll close the ticket now. Have a great day and good luck with your calls!"),
    t("mfa-17", "ai", "Thank you so much! Really appreciate the patience. Goodbye!", { delayMs: 700 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const firewallbranch: ConversationScenario = {
  id: "firewallbranch",
  title: "Branch Office Has No Internet",
  description: "Troubleshoot a complete internet and VPN outage at a remote branch office with your network colleague.",
  difficulty: "B2",
  estimatedMinutes: 12,
  category: "networking",
  context: "Alex, a colleague managing the Lyon branch office infrastructure, calls you urgently. The entire branch has lost internet and VPN access since this morning. 45 users are affected and cannot work. You need to diagnose the FortiGate firewall remotely.",
  userRole: "Network Administrator (HQ)",
  aiRole: "IT Colleague (Lyon Branch)",
  aiName: "Alex Moreau",
  aiAvatar: "AM",
  tags: ["firewall", "fortigate", "networking", "VPN", "outage", "branch office"],
  xpReward: 90,
  script: [
    t("fw-1", "ai", "Hey, we have a serious problem at the Lyon branch. Everything is down — internet, VPN, the lot. 45 users can't do anything. It's been happening since about 7 AM. What can we do?", {
      delayMs: 1000,
      suggestedReplies: [
        "Okay, let's stay calm and troubleshoot this systematically. Can you confirm — is the FortiGate showing any lights?",
        "Understood. This sounds like a WAN link failure. Can you physically check the firewall and the modem at the branch?",
        "Right. Let's start at layer one. Is the FortiGate firewall physically powered on?",
      ],
    }),
    t("fw-2", "user", "Okay, let's troubleshoot this systematically. First, can you physically check the FortiGate at the branch? Is it powered on and are there any unusual indicator lights on the front panel?"),
    t("fw-3", "ai", "Yes, it's on. The power light is green. But the WAN1 port light is red — usually it's green. The WAN2 port seems completely off, no light at all.", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "WAN", phonetic: "/wæn/", definition: "Wide Area Network — the connection that links a branch office to the internet or to the main office network." },
        { word: "FortiGate", phonetic: "/ˈfɔːrtɪɡeɪt/", definition: "A next-generation firewall made by Fortinet that handles internet access, VPN, and network security." },
      ],
      suggestedReplies: [
        "A red WAN light usually means the link is down. Can you check if the cable from WAN1 is properly connected to the modem?",
        "That's significant. WAN1 red means the primary ISP link is down. Can you check if the ISP modem is also powered on?",
        "Okay, so the primary WAN link is down and WAN2 shows nothing. Let me try to reach the FortiGate remotely — can you give me the management IP?",
      ],
    }),
    t("fw-4", "user", "A red WAN1 light indicates the primary link is down. And WAN2 showing no light suggests it's either not configured or the cable isn't connected. Can you check whether the ISP router or modem is still powered on?", {
      grammarNote: {
        triggerPhrase: "indicates the primary link is down",
        correction: "This is correct and sounds very professional.",
        betterAlternative: "A red WAN1 indicator typically signals that the primary uplink has failed.",
        explanation: "'Uplink has failed' is common network engineering language. Both versions are correct; the alternative is more technical.",
      },
    }),
    t("fw-5", "ai", "I checked. The ISP modem has a red DSL light — it's not syncing. And now I remember, our ISP sent an email yesterday about scheduled maintenance this morning. I think I missed that email!", {
      delayMs: 1300,
      vocabularyHighlights: [
        { word: "DSL", phonetic: "/ˌdiːˌesˈel/", definition: "Digital Subscriber Line — a type of internet connection that uses telephone lines to deliver broadband internet." },
        { word: "syncing", phonetic: "/ˈsɪŋkɪŋ/", definition: "Establishing a stable connection with the ISP. A modem that isn't 'syncing' has failed to connect to the internet." },
      ],
      suggestedReplies: [
        "Okay, so the ISP is down due to scheduled maintenance. When does the maintenance window end?",
        "That explains it. Can you find the ISP email and check what time the maintenance is scheduled to end?",
        "Understood. If it's a planned ISP maintenance, we just need to wait for it to end. Did the email mention a restoration time?",
      ],
    }),
    t("fw-6", "user", "Okay, that explains the WAN1 failure — it's a planned ISP maintenance. Can you find that email and confirm the expected restoration time? In the meantime, let's focus on WAN2 as a failover. Is there a secondary ISP connection at Lyon?"),
    t("fw-7", "ai", "The email says maintenance ends at 11 AM — so we have about 2 more hours. And yes, we have a 4G backup modem for WAN2, but it seems to not be working. Should I check the cable?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "failover", phonetic: "/ˈfeɪloʊvər/", definition: "The automatic switching to a backup system or connection when the primary one fails." },
        { word: "backup modem", phonetic: "/ˈbækʌp ˈmoʊdem/", definition: "A secondary internet device (often using mobile/4G) that provides connectivity when the main connection fails." },
      ],
      suggestedReplies: [
        "Yes, please check the cable on the 4G modem and make sure it's powered on. Then tell me the signal indicator status.",
        "Please check the cable first. Also, can you confirm if the SIM card in the 4G modem has data coverage?",
        "Check the cable and also verify whether the 4G modem has any lights and what colour they are.",
      ],
    }),
    t("fw-8", "user", "Yes, check the cable connection first, and also confirm whether the 4G backup modem is powered on and has signal indicator lights showing. We might be able to bring the branch online through WAN2 as a temporary workaround while we wait for the ISP."),
    t("fw-9", "ai", "Found the problem — the 4G modem was unplugged from the wall! Someone must have pulled the power cable accidentally. I've plugged it back in and it's now showing a green signal light.", {
      delayMs: 1100,
      suggestedReplies: [
        "Great! Now the FortiGate should detect WAN2 is up. Is the WAN2 light on the FortiGate now green?",
        "Excellent. Check the WAN2 port light on the FortiGate — it should turn green now that the modem is online.",
        "Perfect. Give it about 30 seconds to establish a connection, then check the WAN2 indicator on the FortiGate.",
      ],
    }),
    t("fw-10", "user", "That explains it. Give the modem about 30 seconds to establish its connection, then check the WAN2 light on the FortiGate. If our WAN2 failover policy is configured correctly, the FortiGate should automatically route traffic through the 4G link.", {
      grammarNote: {
        triggerPhrase: "if our WAN2 failover policy is configured correctly",
        correction: "This is correct.",
        betterAlternative: "Assuming the SD-WAN failover policy is in place, the FortiGate should automatically switch to WAN2.",
        explanation: "'SD-WAN failover policy' is more precise technical language for FortiGate environments.",
      },
    }),
    t("fw-11", "ai", "WAN2 light is now green! And — users are saying they have internet back! The VPN is also reconnecting automatically. You're a genius! But what happens to WAN1 at 11 AM?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "SD-WAN", phonetic: "/ˌesˌdiːˈwæn/", definition: "Software-Defined WAN — technology that intelligently routes traffic across multiple WAN links based on performance and policy." },
        { word: "failover policy", phonetic: "/ˈfeɪloʊvər ˈpɒlɪsi/", definition: "A configuration rule that defines how and when traffic switches to a backup connection when the primary link fails." },
      ],
      suggestedReplies: [
        "The FortiGate will automatically detect when WAN1 comes back and switch primary traffic back. You don't need to do anything.",
        "When WAN1 is restored by the ISP, the FortiGate's SD-WAN policy will automatically fail back to it as the primary link.",
        "At 11 AM when the ISP restores service, WAN1 will come back up and the FortiGate will fail back automatically. Just monitor it.",
      ],
    }),
    t("fw-12", "user", "Great outcome! When WAN1 is restored by the ISP at 11 AM, the FortiGate's SD-WAN policy will automatically detect the link recovery and fail back to WAN1 as the primary. You don't need to intervene — just keep an eye on the WAN1 indicator around that time."),
    t("fw-13", "ai", "Perfect. That's a relief. And I'll make sure that power cable is secured properly so this doesn't happen again! Thank you for the calm troubleshooting — I was panicking.", {
      delayMs: 1000,
      suggestedReplies: [
        "Good thinking! I'll also raise a change request to add a cable label on that modem so it's clearly identified. I'll log this as an incident.",
        "Good idea. I'll document this in a post-incident review. Let me know if WAN1 doesn't come back by 11:30.",
        "No problem! I'll write up an incident report and we should probably add cable management to prevent this in future. Well done troubleshooting on site.",
      ],
    }),
    t("fw-14", "user", "Well done for finding it! I'll create an incident ticket and a post-incident review for this. I'd also recommend labelling that power cable clearly so it's not accidentally unplugged again. Keep me posted on WAN1 at 11 AM.", {
      grammarNote: {
        triggerPhrase: "I'd also recommend labelling",
        correction: "'Labelling' is the British English spelling. 'Labeling' is American English. Both are correct.",
        betterAlternative: "I'd also suggest clearly labelling all critical cables in the comms room to prevent accidental disconnection.",
        explanation: "Adding 'in the comms room' and 'accidental disconnection' makes the recommendation more actionable.",
      },
    }),
    t("fw-15", "ai", "Will do. Thanks again — you saved the whole branch today!", { delayMs: 700 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const serverincident: ConversationScenario = {
  id: "serverincident",
  title: "Domain Controller Is Down",
  description: "Manage a critical infrastructure incident: the primary domain controller has stopped responding, causing authentication failures across the company.",
  difficulty: "B2",
  estimatedMinutes: 14,
  category: "incidents",
  context: "It is 8:15 AM. James, your IT manager, calls you urgently. The primary domain controller (DC01) has stopped responding overnight. Over 200 users cannot log into their computers or access company resources. The business is at a standstill.",
  userRole: "Senior Engineer",
  aiRole: "IT Manager",
  aiName: "James Wilson",
  aiAvatar: "JW",
  tags: ["domain controller", "active directory", "incident", "Kerberos", "replication", "FSMO"],
  xpReward: 120,
  script: [
    t("si-1", "ai", "Alex, we have a major incident. DC01 is completely unresponsive. All authentication is failing — users can't log in anywhere. I've already called our MD. What's our first move?", {
      delayMs: 1000,
      suggestedReplies: [
        "Understood. First priority is to check if DC02 is healthy and taking over. Can you SSH or RDP into the secondary DC?",
        "Okay. Let me check DC02's status first — if it's healthy, we should be able to seize the FSMO roles and restore authentication.",
        "Right. I'll connect to DC02 immediately to check replication status and whether it's handling authentication requests.",
      ],
    }),
    t("si-2", "user", "Understood, James. I'll handle this. First, let me check the status of DC02 — the secondary domain controller. If it's operational, it should already be handling authentication requests. I'm connecting now."),
    t("si-3", "ai", "Good. I'm trying to ping DC01 from here — it's completely unreachable. Do you think it's a hardware failure or could it be a network issue?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "domain controller", phonetic: "/dəˈmeɪn kənˈtroʊlər/", definition: "A server that manages authentication and authorization in a Windows Active Directory environment." },
        { word: "FSMO", phonetic: "/ˈfɪzmoʊ/", definition: "Flexible Single Master Operations — special Active Directory roles held by specific domain controllers." },
      ],
      suggestedReplies: [
        "Could be either. I'm on DC02 now — it's online and replicating. But it's showing DC01 as failed in the replication topology.",
        "I'm on DC02. It's healthy. The last successful replication from DC01 was at 11 PM last night, so DC01 probably went down overnight.",
        "DC02 is responsive. I can see DC01 failed around 2 AM based on the replication timestamps. Let me check the event logs.",
      ],
    }),
    t("si-4", "user", "I'm on DC02 now — it's healthy and responding. The last successful AD replication from DC01 was at 23:47 last night, which suggests DC01 went down somewhere in the early hours. I'm checking the event logs on DC02 now to get more detail.", {
      grammarNote: {
        triggerPhrase: "which suggests DC01 went down",
        correction: "This is correct.",
        betterAlternative: "The replication timestamp indicates DC01 became unavailable sometime between midnight and 2 AM.",
        explanation: "'Became unavailable' is more precise and professional than 'went down' in incident reporting.",
      },
    }),
    t("si-5", "ai", "Okay. Are users going to be able to log in through DC02? And what about the FSMO roles — is DC02 holding them?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "replication", phonetic: "/ˌreplɪˈkeɪʃən/", definition: "The process of synchronising Active Directory data between domain controllers to keep them consistent." },
        { word: "event log", phonetic: "/ɪˈvent lɒɡ/", definition: "A Windows record of system, application, and security events used for troubleshooting and auditing." },
      ],
      suggestedReplies: [
        "DC02 holds the RID Master and Infrastructure Master roles, but DC01 has the PDC Emulator, which is critical. I'll need to seize it.",
        "DC01 holds all five FSMO roles. Since it's down, I'll need to seize the PDC Emulator role on DC02 to restore password changes and time sync.",
        "DC02 has some FSMO roles, but DC01 holds the PDC Emulator — that's why some logins are failing. I'm going to seize that role now.",
      ],
    }),
    t("si-6", "user", "DC02 is already handling Kerberos authentication for logged-in users, but new logins are failing because DC01 holds the PDC Emulator FSMO role. I'm going to seize the PDC Emulator role on DC02 now using ntdsutil — this should restore login capability quickly."),
    t("si-7", "ai", "Do it. How long will that take? And should I communicate anything to the business right now?", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "PDC Emulator", phonetic: "/ˌpiːˌdiːˈsiː ɪˈmjuːleɪtər/", definition: "The domain controller FSMO role that handles password changes, time synchronisation, and logon authentication for the domain." },
        { word: "seize", phonetic: "/siːz/", definition: "To forcibly take an FSMO role from an unavailable domain controller and assign it to another DC." },
      ],
      suggestedReplies: [
        "The role seizure takes about 2 minutes. Please send a communication now saying we're aware and are actively resolving the issue.",
        "Give me 5 minutes for the FSMO seizure. Yes, please communicate to the business now — acknowledge the issue and give a 30-minute ETA.",
        "The seizure itself is quick. Yes, please tell the business we have a major incident, we know the cause, and we expect resolution within 20 minutes.",
      ],
    }),
    t("si-8", "user", "The FSMO role seizure will take about three minutes. Yes, please communicate to the business now. Keep the message concise: acknowledge that we are aware of an authentication issue affecting logins, that we have identified the cause, and that we expect to restore service within 20 minutes.", {
      grammarNote: {
        triggerPhrase: "keep the message concise",
        correction: "This is correct.",
        betterAlternative: "Please send a brief incident communication: acknowledge the issue, state we've identified the root cause, and provide a 20-minute ETA for resolution.",
        explanation: "Using 'incident communication' and 'root cause' aligns with ITIL terminology commonly used in professional IT environments.",
      },
    }),
    t("si-9", "ai", "Done. I've sent an all-staff email. How's the seizure going?", {
      delayMs: 800,
      suggestedReplies: [
        "The PDC Emulator role is now on DC02. I'm testing a login — it's working. Domain authentication is restored.",
        "FSMO seizure complete. DC02 is now the PDC Emulator. I'm confirming with a test login — success. Authentication should be restored for all users.",
        "It's done. DC02 now holds all critical FSMO roles. Users should be able to log in again. Let's test and confirm.",
      ],
    }),
    t("si-10", "user", "The PDC Emulator seizure is complete — DC02 is now the authoritative domain controller. I've tested a login from a fresh workstation and it's successful. Users should be able to authenticate again now. Please send a recovery notification to staff."),
    t("si-11", "ai", "Excellent work! I'll send the recovery update. But what about DC01 — do we leave it down? And what was the root cause?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "ntdsutil", phonetic: "/en tiː diː es ˈjuːtɪl/", definition: "A command-line tool used by administrators to manage Active Directory, including seizing FSMO roles." },
        { word: "root cause", phonetic: "/ruːt kɔːz/", definition: "The fundamental underlying reason for a problem or failure — not just the symptom." },
      ],
      suggestedReplies: [
        "DC01 stays offline until we investigate. The event logs show a critical disk failure at 2:13 AM. We need to restore from backup.",
        "I'll investigate DC01 separately. The event log shows a BSOD at 2:13 AM with a storage-related stop code. We may need to restore from backup.",
        "I need to investigate DC01 before bringing it back online. If we rejoin it to the domain with DC01 as original PDC Emulator, we'll have a conflict.",
      ],
    }),
    t("si-12", "user", "DC01 stays offline until I investigate the root cause — I don't want to reconnect it while DC02 holds the FSMO roles without careful planning. The event log shows a critical stop error at 02:13, likely disk-related. I'll review that after we confirm the environment is stable. Can you give me 15 minutes?"),
    t("si-13", "ai", "Of course. Take your time. Do you need me to open a bridge call with the team, or are you okay handling this solo for now?", {
      delayMs: 1000,
      suggestedReplies: [
        "I can handle the initial recovery solo. But please stand by — I may need the network team if there's a VLAN issue involved.",
        "No need for a bridge call yet. Give me 15 minutes to diagnose DC01. If it's a disk failure, I'll need to involve the storage team.",
        "I'm fine for now. I'll call you if I need help. Let's reconvene in 15 minutes and I'll give you the full picture.",
      ],
    }),
    t("si-14", "user", "I'm fine to handle this for now. Let's reconvene in 15 minutes and I'll give you the full picture. If I determine we need a restore from backup, I'll need authorisation from you before I proceed. Please ensure our backup administrator is on standby.", {
      grammarNote: {
        triggerPhrase: "I'll need authorisation from you before I proceed",
        correction: "This is correct.",
        betterAlternative: "I'll require sign-off from you before initiating any restore procedure.",
        explanation: "'Sign-off' and 'initiating a restore procedure' are standard terms in change and incident management processes.",
      },
    }),
    t("si-15", "ai", "Understood. I'll put the backup admin on standby. Good work getting things back online so quickly. This could have been a disaster.", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "bridge call", phonetic: "/brɪdʒ kɔːl/", definition: "A conference call with multiple participants, typically used during a major incident to coordinate the response team." },
        { word: "stand by", phonetic: "/stænd baɪ/", definition: "To be ready and available to act immediately when needed." },
      ],
      suggestedReplies: [
        "Thank you. I'll update you in 15 minutes with the DC01 diagnosis and a plan for full recovery. Speak then.",
        "Agreed — we got lucky with DC02 being healthy. I'll have a full post-incident report ready by end of day. Speak in 15.",
        "We were in a good position because DC02 was fully synchronised. I'll send you the full diagnosis shortly.",
      ],
    }),
    t("si-16", "user", "We were in a good position because of the dual-DC setup and current replication. I'll send you a full diagnosis in 15 minutes and I'll have a post-incident report ready by end of day. Speak then, James."),
    t("si-17", "ai", "Perfect. Thank you, Alex. I'll brief the MD. Speak in 15.", { delayMs: 700 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const customermeeting: ConversationScenario = {
  id: "customermeeting",
  title: "Presenting the IT Upgrade Plan",
  description: "Present a cloud migration proposal to a business stakeholder and answer their questions professionally.",
  difficulty: "B2",
  estimatedMinutes: 11,
  category: "meetings",
  context: "You have a Microsoft Teams meeting with Emma Foster, the Operations Director, to present your proposal to migrate the company from on-premises Exchange and file servers to Microsoft 365. Emma is not technical but is concerned about costs and disruption.",
  userRole: "IT Administrator (Presenting)",
  aiRole: "Operations Director",
  aiName: "Emma Foster",
  aiAvatar: "EF",
  tags: ["meeting", "microsoft365", "migration", "presentation", "stakeholder", "cloud"],
  xpReward: 100,
  script: [
    t("cm-1", "ai", "Good morning, Alex. Thanks for setting this up. I've had a look at the summary you sent over. I must say, this migration sounds quite complex. Can you walk me through the key benefits before we talk about risks?", {
      delayMs: 1100,
      suggestedReplies: [
        "Good morning, Emma! Absolutely. The main benefits are reduced infrastructure costs, improved collaboration, and enhanced security.",
        "Good morning! Of course. At its core, moving to Microsoft 365 means no more on-premises servers to maintain, which reduces cost and complexity significantly.",
        "Good morning Emma, thanks for making time. I'd be happy to walk you through the business case first.",
      ],
    }),
    t("cm-2", "user", "Good morning Emma, thanks for making the time. I'd be happy to start with the benefits. In summary, migrating to Microsoft 365 will reduce our infrastructure maintenance costs, give your team access to best-in-class collaboration tools, and improve our security posture significantly."),
    t("cm-3", "ai", "That sounds promising. When you say 'reduce maintenance costs' — can you give me a rough figure? The board will certainly ask.", {
      delayMs: 1200,
      suggestedReplies: [
        "Based on our current server hardware and licensing costs, we estimate annual savings of approximately 35 to 40 percent over three years.",
        "A reasonable estimate based on comparable migrations is 30 to 45% in total infrastructure cost reduction over three years, once hardware refresh cycles are eliminated.",
        "Our analysis shows roughly 35% reduction in annual IT infrastructure spending, mainly by eliminating server hardware, maintenance contracts, and on-site backup costs.",
      ],
    }),
    t("cm-4", "user", "Based on our analysis of the current infrastructure costs, we estimate a 30 to 40 percent reduction in annual IT spending over three years. The biggest savings come from eliminating server hardware refresh cycles, reducing maintenance contracts, and removing the need for on-site backup infrastructure.", {
      grammarNote: {
        triggerPhrase: "Based on our analysis",
        correction: "This phrase is correct.",
        betterAlternative: "Based on our cost modelling, we project savings in the range of 30 to 40 percent annually over a three-year period.",
        explanation: "'Cost modelling' and 'we project' sound more formal and data-driven, which is appropriate for a board-level presentation.",
      },
    }),
    t("cm-5", "ai", "That's significant. And what about disruption to the business during the migration? I cannot have departments unable to work for days.", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "infrastructure", phonetic: "/ˈɪnfrəˌstrʌktʃər/", definition: "The underlying physical and virtual systems — servers, networks, storage — that support IT services." },
        { word: "cost modelling", phonetic: "/kɒst ˈmɒdəlɪŋ/", definition: "The process of estimating and forecasting costs associated with a project or decision." },
      ],
      suggestedReplies: [
        "The migration will be done in phases with zero downtime for users. Email is migrated in the background, and users keep access throughout.",
        "We've specifically designed this to be a zero-downtime migration. Mailboxes are migrated in batches overnight so users are never without access.",
        "Disruption will be minimal. We phase the migration over 8 weeks with weekend batches. Users only notice a sign-in prompt change.",
      ],
    }),
    t("cm-6", "user", "Disruption is something we've given a lot of thought to. The migration is designed to be a zero-downtime process. Mailboxes are moved in batches, typically overnight or over weekends, so users maintain full access to their email throughout. There is no 'cutover day' where everyone is offline."),
    t("cm-7", "ai", "That's reassuring. And what about our files? We have years of shared files on the current file server. Will they all transfer across safely?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "zero-downtime", phonetic: "/ˈzɪərəʊ ˈdaʊntaɪm/", definition: "A migration approach where users maintain full access to their data and services throughout the migration process." },
        { word: "batch migration", phonetic: "/bætʃ maɪˈɡreɪʃən/", definition: "Moving data in groups rather than all at once, allowing for staged and controlled transitions." },
      ],
      suggestedReplies: [
        "Yes. We'll use the SharePoint Migration Tool to move all shared files to SharePoint Online with full folder structure preserved.",
        "All shared files will be migrated to SharePoint Online. The folder structure is preserved and a shortcut replaces the old mapped drive.",
        "Absolutely. We use Microsoft's SharePoint Migration Tool which preserves folder structures, permissions, and version history.",
      ],
    }),
    t("cm-8", "user", "Absolutely, and that's a key concern we've addressed in the plan. We'll use the Microsoft SharePoint Migration Tool to transfer all shared files to SharePoint Online. The existing folder structure, file permissions, and version history are all preserved. Users will see a mapped drive on their computers pointing to the new location — they won't notice much difference.", {
      grammarNote: {
        triggerPhrase: "they won't notice much difference",
        correction: "This is correct.",
        betterAlternative: "The transition will be largely transparent to end users — they'll see a familiar folder structure in their mapped drives.",
        explanation: "'Transparent to end users' is standard professional language for describing a change that doesn't disrupt user workflow.",
      },
    }),
    t("cm-9", "ai", "I see. And what about security? We handle some sensitive client data. Will it be as secure in the cloud as on our own servers?", {
      delayMs: 1300,
      vocabularyHighlights: [
        { word: "SharePoint Migration Tool", phonetic: "/ˈʃerˌpɔɪnt maɪˈɡreɪʃən tuːl/", definition: "Microsoft's official tool for migrating file shares and other content into SharePoint Online." },
        { word: "version history", phonetic: "/ˈvɜːrʒən ˈhɪstəri/", definition: "A record of previous versions of a document, allowing users to restore earlier copies if needed." },
      ],
      suggestedReplies: [
        "Microsoft 365 actually exceeds most on-premises security standards. It includes encryption, DLP, and Conditional Access policies.",
        "In many ways, it's more secure. Microsoft holds ISO 27001, SOC 2, and GDPR certifications. We also gain DLP and Conditional Access controls we don't have today.",
        "Microsoft 365 provides enterprise-grade encryption, data loss prevention, and compliance tools that we currently don't have on our own servers.",
      ],
    }),
    t("cm-10", "user", "That's a great question. Microsoft 365 is actually held to a higher security standard than most on-premises environments. Microsoft holds ISO 27001, SOC 2 Type II, and GDPR compliance certifications. On top of that, we gain capabilities we don't currently have — such as Data Loss Prevention policies, Conditional Access, and full encryption at rest and in transit."),
    t("cm-11", "ai", "That does sound comprehensive. What's the proposed timeline for the full migration?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "ISO 27001", phonetic: "/ˌaɪˌesˈoʊ ˌtwentiˌsevən ˈθaʊzənd wʌn/", definition: "An international standard for information security management systems — a widely recognised security certification." },
        { word: "Conditional Access", phonetic: "/kənˈdɪʃənəl ˈækses/", definition: "A Microsoft policy engine that controls who can access what resources, based on conditions like device compliance or location." },
      ],
      suggestedReplies: [
        "We're proposing a 12-week timeline: planning in weeks 1-2, pilot with 20 users in weeks 3-5, full rollout in weeks 6-10, and closure in weeks 11-12.",
        "The full migration is planned over 12 weeks, including a 3-week pilot phase with a small group of users before the company-wide rollout.",
        "We propose a phased 12-week plan starting with a pilot group, then department-by-department migration, with full completion by week 12.",
      ],
    }),
    t("cm-12", "user", "We're proposing a 12-week programme. Weeks one and two are planning and preparation. Weeks three to five are a controlled pilot with a group of 20 users across different departments. Weeks six to ten are the full company rollout by department. And weeks eleven and twelve are stabilisation and training completion.", {
      grammarNote: {
        triggerPhrase: "Weeks one and two are planning and preparation",
        correction: "This is correct.",
        betterAlternative: "The first two weeks cover planning and preparation; the pilot phase runs from week three through to week five.",
        explanation: "Using 'through to' and separating clauses with semicolons sounds more polished in a formal presentation context.",
      },
    }),
    t("cm-13", "ai", "That timeline seems workable. One final question — what support will you need from my department during the migration? I need to manage my team's time carefully.", {
      delayMs: 1200,
      suggestedReplies: [
        "Mainly, we'll need department champions — one person per team who helps colleagues during the transition. About 2 hours of their time per week.",
        "We ask for two things: department champions to act as local support points, and about 30 minutes per employee for a brief Teams training session.",
        "We need one volunteer 'champion' from each department for about 2 hours per week. Everything else — migration, configuration, support — is handled by IT.",
      ],
    }),
    t("cm-14", "user", "Our main ask from your department is a 'change champion' — one person per team who helps their colleagues adopt the new tools and acts as a first point of contact for basic questions. This is typically a commitment of around two hours per week during the rollout phase. Everything else — the technical migration, configuration, and helpdesk support — is handled entirely by the IT team."),
    t("cm-15", "ai", "That sounds very manageable. I think I have everything I need to present this to the board. Can you send me a one-page summary and a cost comparison by end of this week?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "change champion", phonetic: "/tʃeɪndʒ ˈtʃæmpiən/", definition: "An employee who advocates for and supports a change initiative within their team, helping colleagues adapt." },
        { word: "rollout phase", phonetic: "/ˈroʊlaʊt feɪz/", definition: "The stage of a project where a solution is deployed to all users after a successful pilot." },
      ],
      suggestedReplies: [
        "Absolutely! I'll have the one-pager and cost comparison over to you by Thursday. Is there a specific format you'd prefer?",
        "Of course. I'll send a concise executive summary and a three-year cost comparison by Thursday at the latest. Do you need anything else?",
        "No problem. I'll prepare a one-page executive summary and a three-year cost model and send them to you by Thursday morning.",
      ],
    }),
    t("cm-16", "user", "Absolutely. I'll prepare a one-page executive summary and a three-year cost comparison and send them over by Thursday morning. Is there anything specific you'd like me to highlight for the board?"),
    t("cm-17", "ai", "Yes — please emphasise the security improvements and the return on investment timeline. The board is very focused on both of those. Thank you, Alex — this has been very helpful.", {
      delayMs: 1000,
      suggestedReplies: [
        "Noted! I'll make sure security and ROI are front and centre in the summary. Thank you for your time, Emma. I'll speak to you on Friday.",
        "Understood. I'll lead with security improvements and include a clear ROI timeline. Looking forward to hearing from the board. Thank you!",
        "Will do. I'll ensure the summary leads with the security improvements and the three-year ROI figure. Thank you, Emma. Have a great day!",
      ],
    }),
    t("cm-18", "user", "Noted — I'll make sure those are the headline points. Thank you for your time, Emma. I look forward to hearing back after the board meeting. Have a great rest of your day!"),
    t("cm-19", "ai", "Thank you, Alex. You too. Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const simpleplain: ConversationScenario = {
  id: "simpleplain",
  title: "Explaining IT to a Non-Techie",
  description: "Explain a necessary Windows upgrade to a non-technical manager using simple, jargon-free English.",
  difficulty: "B1",
  estimatedMinutes: 9,
  category: "meetings",
  context: "Robert Lecomte, the Finance Manager, has called you to understand why you need to upgrade all Finance department computers to Windows 11. He is not technical and becomes frustrated by jargon. You need to explain clearly and simply.",
  userRole: "IT Administrator (Explaining)",
  aiRole: "Finance Manager (Non-Technical)",
  aiName: "Robert Lecomte",
  aiAvatar: "RL",
  tags: ["communication", "plain english", "windows", "non-technical", "upgrade", "security"],
  xpReward: 80,
  script: [
    t("sp-1", "ai", "Alex, I got your email about upgrading all our computers to 'Windows 11'. I honestly don't understand why this is urgent. The computers work perfectly fine as they are. Why do we need to spend money on this?", {
      delayMs: 1100,
      suggestedReplies: [
        "I completely understand, Robert. Let me explain it in simple terms — it's mainly about security and the fact that Microsoft is stopping support for the current version.",
        "That's a fair question. Think of Windows like a car — eventually the manufacturer stops providing spare parts and safety updates, and that's exactly where we are.",
        "Hello Robert! I understand your concern. The short version is that Microsoft is ending support for Windows 10, which means it will no longer receive security updates.",
      ],
    }),
    t("sp-2", "user", "Hello Robert, thanks for calling. I completely understand — let me explain it in simple terms without any technical jargon. The short version is this: Microsoft is stopping all security updates for Windows 10 in October of this year. After that date, any new security vulnerabilities will never be fixed."),
    t("sp-3", "ai", "'Security vulnerabilities' — what does that actually mean for me and my team in practice?", {
      delayMs: 1000,
      suggestedReplies: [
        "Think of it like the locks on your office door becoming outdated. Criminals learn how to pick them and the manufacturer no longer makes new ones.",
        "Imagine your computer is a house. Windows provides the locks on all the doors and windows. After October, we can no longer get new locks, so if someone finds a way in, we can't stop them.",
        "A vulnerability is like a gap in your computer's defences. Criminals look for these gaps to steal data or cause damage. After October, those gaps will never be patched.",
      ],
    }),
    t("sp-4", "user", "Let me use an analogy. Think of Windows as the security system in your house. Every month, Microsoft sends us updates — new locks, new alarms — to keep criminals out. After October, they stop sending those updates. So if someone finds a new way to break in, we can't block them anymore.", {
      grammarNote: {
        triggerPhrase: "Let me use an analogy",
        correction: "This is a great technique in plain English communication.",
        betterAlternative: "Let me put that in everyday terms.",
        explanation: "Phrases like 'let me put that in everyday terms' or 'think of it this way' are excellent for bridging technical and non-technical audiences.",
      },
    }),
    t("sp-5", "ai", "Okay, I think I understand. But why Windows 11 specifically? Can't we just keep Windows 10 and accept the risk?", {
      delayMs: 1200,
      suggestedReplies: [
        "We could, but it would be like knowingly leaving your office unlocked. Our cyber insurance actually requires us to run supported software.",
        "We could choose to do nothing, but our company insurance and GDPR compliance both require us to use supported and up-to-date software.",
        "Accepting that risk isn't really an option — it could violate our data protection obligations and invalidate our cyber insurance policy.",
      ],
    }),
    t("sp-6", "user", "Technically we could keep Windows 10, but it would be like knowingly leaving the office door unlocked and hoping no one comes in. More practically, our cyber insurance policy requires us to run supported operating systems. If we had a breach on an unsupported system, the insurance company might not pay out."),
    t("sp-7", "ai", "Oh, I hadn't thought about the insurance angle. That makes sense. And how long will this upgrade take? I cannot have my team without their computers during busy periods.", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "cyber insurance", phonetic: "/ˈsaɪbər ɪnˈʃʊərəns/", definition: "Insurance that protects a company against financial losses caused by cyberattacks or data breaches." },
        { word: "GDPR", phonetic: "/ˌdʒiːˌdiːˌpiːˈɑːr/", definition: "General Data Protection Regulation — European law governing how companies handle personal data." },
      ],
      suggestedReplies: [
        "Each computer takes about 45 minutes to upgrade. We can schedule it outside of working hours so there's no disruption during the day.",
        "The upgrade takes roughly 45 minutes per machine. We'll do it over evenings and weekends so your team isn't interrupted.",
        "We'll do every computer overnight or on a weekend — each one takes about 45 minutes. Your team won't lose any working time.",
      ],
    }),
    t("sp-8", "user", "Each computer takes approximately 45 minutes to upgrade, and we do it overnight or over the weekend so your team doesn't lose any working time. When they arrive in the morning, the computer looks slightly different but works exactly the same way. There's a short 10-minute orientation session we can run with the team to show them the small changes.", {
      grammarNote: {
        triggerPhrase: "the computer looks slightly different but works exactly the same way",
        correction: "This is correct and very clear.",
        betterAlternative: "The interface has a slightly updated look, but all your programmes, files, and day-to-day tasks work exactly as before.",
        explanation: "Being explicit that 'all programmes and files' are unchanged is very reassuring for non-technical users who worry about losing data.",
      },
    }),
    t("sp-9", "ai", "A 10-minute session sounds reasonable. And will they lose any of their files or programmes? That's my team's biggest concern.", {
      delayMs: 1100,
      suggestedReplies: [
        "No, not at all. All files, programmes, and settings are preserved during the upgrade. Nothing is deleted or changed.",
        "No files, programmes, or personal settings are lost. The upgrade is in-place — it replaces only the Windows layer, not any data.",
        "Absolutely no data is lost. Their documents, emails, and all installed programmes stay exactly as they are.",
      ],
    }),
    t("sp-10", "user", "No, nothing at all. The upgrade is done in-place, which means we only update the Windows layer — think of it as repainting the walls of the house. All the furniture stays exactly where it is. Every file, every programme, and every personal setting is preserved exactly as it was."),
    t("sp-11", "ai", "That's very reassuring. I like the house analogy — it helps me explain it to my team too. When are you proposing to start?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "in-place upgrade", phonetic: "/ɪn pleɪs ˈʌpɡreɪd/", definition: "An upgrade performed directly on the existing system without reinstalling everything, preserving all data and settings." },
        { word: "operating system", phonetic: "/ˈɒpəreɪtɪŋ ˈsɪstəm/", definition: "The core software that runs a computer — such as Windows, macOS, or Linux — managing hardware and applications." },
      ],
      suggestedReplies: [
        "We're proposing to start with Finance in the first week of next month, outside of your quarter-end period. Does that work?",
        "We'd like to start next month, after your month-end closing. We can schedule it at the most convenient time for your team.",
        "We're planning to start with the Finance department next month. I'll send you a proposed schedule — please let me know if any dates clash with busy periods.",
      ],
    }),
    t("sp-12", "user", "We'd like to start with the Finance department in the first two weeks of next month, which I believe avoids your month-end closing period. I'll send you a proposed schedule and you can flag any dates that don't work. We have until October, so there's no rush — but I'd like to complete Finance by the end of next month."),
    t("sp-13", "ai", "Next month works well for us. October is indeed our quietest period before year-end. Thank you for explaining all of this clearly, Alex. I now understand why it's necessary and I'll let my team know.", {
      delayMs: 1000,
      suggestedReplies: [
        "Excellent! I'll send the schedule over this week. Please don't hesitate to call if any further questions come up.",
        "Great! I'm glad it was helpful. I'll send you the proposed schedule and a simple one-page FAQ for your team.",
        "Wonderful. I'll email the schedule and a short summary your team can read. Thank you for your time, Robert!",
      ],
    }),
    t("sp-14", "user", "Wonderful! I'll prepare a simple one-page summary that you can share with your team — plain English, no jargon, just what's happening, when, and what they need to do. I'll also include the schedule. Expect that by the end of this week."),
    t("sp-15", "ai", "That would be perfect. Thank you very much, Alex. I appreciate you taking the time to explain it so clearly. Goodbye!", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "year-end", phonetic: "/jɪər end/", definition: "The end of a company's financial year, often a busy period for finance and accounting teams." },
        { word: "jargon-free", phonetic: "/ˈdʒɑːrɡən friː/", definition: "Communication that avoids technical or specialised language, making it accessible to non-experts." },
      ],
      suggestedReplies: [
        "You're welcome, Robert! That's exactly what I'm here for. Have a great rest of your day. Goodbye!",
        "It's my pleasure! Thank you for taking the time to ask — it always helps to make sure everyone understands. Goodbye!",
        "Not at all — happy to help! I'll send that over by Friday. Have a great day, Robert. Goodbye!",
      ],
    }),
    t("sp-16", "user", "It's my pleasure, Robert. Happy to help whenever you need it. I'll have everything in your inbox by Friday. Have a great rest of your day. Goodbye!"),
  ],
}

// ═════════════════════════════════════════════════════════════════════════════
// ─────────────────────────────────────────────────────────────────────────────

const vpnRemoteAccess: ConversationScenario = {
  id: "vpnRemoteAccess",
  title: "VPN Won't Connect from Home",
  description: "Help a remote worker troubleshoot a VPN connection failure caused by an outdated client and a new antivirus blocking the tunnel.",
  difficulty: "B1",
  estimatedMinutes: 9,
  category: "networking",
  context: "David Chen, a developer, calls the IT helpdesk early Monday morning. He is working from home and cannot connect to the company VPN. He gets an error message and has an urgent stand-up meeting in 20 minutes.",
  userRole: "IT Support Agent",
  aiRole: "Remote Developer",
  aiName: "David Chen",
  aiAvatar: "DC",
  tags: ["vpn", "remote-work", "networking", "troubleshooting", "antivirus"],
  xpReward: 80,
  script: [
    t("vpn-1", "ai", "Hi, this is David Chen from the dev team. I can't connect to the VPN from home — it keeps giving me an error and I have a stand-up in 20 minutes. Can someone help me urgently?", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi David, I can help with that. What error message are you seeing exactly?",
        "Hello David! No worries, let's get this sorted. Can you read me the exact error message on screen?",
        "Hi David, IT support here. I'll look into this right away. What does the error say?",
      ],
    }),
    t("vpn-2", "user", "Hi David, IT support here. Don't worry, we'll sort this out before your meeting. Can you read me the exact error message you're seeing on screen?", {
      grammarNote: {
        triggerPhrase: "we'll sort this out",
        correction: "'Sort this out' is correct — a very common phrasal verb in IT support.",
        betterAlternative: "We'll get this resolved before your meeting.",
        explanation: "'Sort out' and 'resolve' are both natural in support contexts. 'Sort out' is more informal and conversational.",
      },
    }),
    t("vpn-3", "ai", "It says: 'Authentication failed. Please check your credentials or contact your IT administrator.' But I'm sure my password is correct — I logged in to my computer fine this morning.", {
      delayMs: 1300,
      vocabularyHighlights: [
        { word: "authentication", phonetic: "/ɔːˌθentɪˈkeɪʃən/", definition: "The process of verifying the identity of a user or device before granting access to a system." },
        { word: "credentials", phonetic: "/krɪˈdenʃəlz/", definition: "A username and password, or other login details, used to access a system." },
      ],
      suggestedReplies: [
        "I see. Which VPN client are you using, and do you know which version it is?",
        "Understood. Let me check your account status. Which VPN application are you connecting with?",
        "Okay. First, can you confirm you're using the correct VPN username — it should be your email address?",
      ],
    }),
    t("vpn-4", "user", "I see. That error can sometimes mean the VPN client is outdated. Which VPN application are you using, and can you check the version number — it's usually in Help > About?", {
      grammarNote: {
        triggerPhrase: "it's usually in Help > About",
        correction: "This is correct and clear.",
        betterAlternative: "You can usually find it under Help, then 'About', in the menu bar.",
        explanation: "When guiding users through menus, saying 'under Help, then About' is clearer than using the '>' symbol, which can confuse non-technical users.",
      },
    }),
    t("vpn-5", "ai", "I'm using GlobalProtect. The version says 5.1.4. Is that old? I haven't updated it in a while.", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "GlobalProtect", phonetic: "/ˈɡloʊbəl prəˈtekt/", definition: "A VPN client developed by Palo Alto Networks, commonly used in enterprise environments." },
      ],
      suggestedReplies: [
        "Yes, that version is outdated. I'll send you a link to download the latest version — it only takes a few minutes.",
        "That's quite old. The current version is 6.2. Can you uninstall the old one and install the new version I'll send you?",
        "That version has known issues. Please go to our intranet portal and download the latest GlobalProtect client.",
      ],
    }),
    t("vpn-6", "user", "Yes, 5.1.4 is outdated — the current version is 6.2. I'll send you the download link now via email. Please uninstall the old client first, then install the new one. It should take about five minutes."),
    t("vpn-7", "ai", "Okay I've installed the new version and restarted. But I'm still getting the same error. It's still saying authentication failed.", {
      delayMs: 1400,
      suggestedReplies: [
        "Alright. Did you install any new software recently — especially a new antivirus or firewall?",
        "Let's check your firewall settings. Did anything change on your computer recently?",
        "That's strange. Can you check if Windows Firewall or any antivirus is running and blocking the connection?",
      ],
    }),
    t("vpn-8", "user", "Hmm, that's unusual after an update. Did you install any new software recently — particularly a new antivirus or security tool? Sometimes those can block VPN traffic.", {
      grammarNote: {
        triggerPhrase: "particularly a new antivirus or security tool",
        correction: "This is correct. 'Particularly' is a professional alternative to 'especially'.",
        betterAlternative: "Did you install any new software recently, especially a new antivirus or firewall?",
        explanation: "'Particularly' and 'especially' are interchangeable here. Using them shows professional vocabulary in support contexts.",
      },
    }),
    t("vpn-9", "ai", "Oh yes! I installed Bitdefender on Friday evening. Could that be causing the problem? I didn't think it would block the VPN.", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "block", phonetic: "/blɒk/", definition: "To prevent data or a connection from passing through a network or security software." },
        { word: "firewall", phonetic: "/ˈfaɪərwɔːl/", definition: "Security software or hardware that monitors and controls incoming and outgoing network traffic." },
      ],
      suggestedReplies: [
        "That's very likely the issue. Can you open Bitdefender and add GlobalProtect as a trusted application?",
        "Yes, that's almost certainly it. You need to add an exception for GlobalProtect in Bitdefender's firewall settings.",
        "Exactly! Bitdefender sometimes blocks VPN tunnels. Let's add an exception for the VPN client.",
      ],
    }),
    t("vpn-10", "user", "That's almost certainly the issue. Bitdefender's firewall can block VPN tunnels by default. Can you open Bitdefender, go to Protection, then Firewall, and add GlobalProtect as a trusted application?", {
      grammarNote: {
        triggerPhrase: "That's almost certainly the issue",
        correction: "This is correct and sounds confident.",
        betterAlternative: "That's very likely the cause of the problem.",
        explanation: "'Almost certainly' expresses high confidence without being absolute. It sounds more professional than 'definitely' when you haven't confirmed yet.",
      },
    }),
    t("vpn-11", "ai", "Done! I added it as a trusted app and... yes! The VPN is connecting now! I can see the green connected status. That was it! Thank you so much!", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "trusted application", phonetic: "/ˈtrʌstɪd ˌæplɪˈkeɪʃən/", definition: "A program that security software is configured to allow through without blocking, even if it behaves like a network service." },
      ],
      suggestedReplies: [
        "Excellent! I'll log this as a VPN blocked by antivirus. Is there anything else before your stand-up?",
        "Great news! I'll create a ticket for this. As a tip, always check antivirus settings after installing new security software.",
        "Perfect! I'll update the ticket. For future reference, always whitelist VPN clients in new antivirus software.",
      ],
    }),
    t("vpn-12", "user", "Excellent! I'll log this as resolved — VPN blocked by new antivirus installation. As a tip for the future, always whitelist your VPN client when you install new security software. Is there anything else before your stand-up?", {
      grammarNote: {
        triggerPhrase: "always whitelist your VPN client",
        correction: "'Whitelist' is correct IT vocabulary meaning to add to an allowed list.",
        betterAlternative: "Always add your VPN client to the trusted list in any new security software.",
        explanation: "'Whitelist' is standard IT jargon. In professional communication with non-technical users, 'trusted list' or 'allowed list' may be clearer.",
      },
    }),
    t("vpn-13", "ai", "No, that's everything! You saved my morning. I still have 5 minutes before the stand-up. Thank you!", {
      delayMs: 800,
      suggestedReplies: [
        "Happy to help, David! Good luck with the stand-up. Don't hesitate to call if anything else comes up!",
        "Glad we got that sorted in time! Have a great meeting. Goodbye!",
        "You're welcome! I'll close the ticket now. Have a productive day!",
      ],
    }),
    t("vpn-14", "user", "Happy to help, David! I'll close the ticket now. Have a great stand-up and a productive day. Don't hesitate to call us if anything else comes up!"),
    t("vpn-15", "ai", "Will do. Thanks again. Bye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const blackScreenPC: ConversationScenario = {
  id: "blackScreenPC",
  title: "My PC Won't Start",
  description: "Guide an employee through diagnosing a black screen on startup — from basic checks to identifying a failed Windows update.",
  difficulty: "B1",
  estimatedMinutes: 8,
  category: "help-desk",
  context: "Sophie Laurent from the HR department calls the helpdesk. She arrived at the office and her computer shows a black screen with a blinking cursor. She has an interview to run in 45 minutes.",
  userRole: "IT Support Agent",
  aiRole: "HR Employee",
  aiName: "Sophie Laurent",
  aiAvatar: "SL",
  tags: ["black-screen", "startup", "windows", "troubleshooting", "helpdesk"],
  xpReward: 70,
  script: [
    t("bs-1", "ai", "Hello IT? My computer is completely black. I turned it on and nothing happened — just a blinking cursor. I have an interview to run in 45 minutes, this is a disaster!", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi Sophie, IT support here. Don't panic — let's work through this. Is the power light on the computer itself?",
        "Hello, I can help with that. First, is the monitor on? Can you check the power button on the screen?",
        "Hi! Let's sort this out. Can you describe what you see — is the screen completely black or is there any text on it?",
      ],
    }),
    t("bs-2", "user", "Hi Sophie, IT support here. Stay calm — we have time to fix this. First, can you check if the power light on the PC tower is on, and is there any text on the black screen?", {
      grammarNote: {
        triggerPhrase: "Stay calm — we have time to fix this",
        correction: "This is correct and reassuring.",
        betterAlternative: "Don't worry — we should be able to get this resolved in time.",
        explanation: "Reassuring the user before asking technical questions is good practice in IT support. It reduces panic and makes them more cooperative.",
      },
    }),
    t("bs-3", "ai", "The power light is on, yes. And there's text — it says something like 'Preparing Automatic Repair' and then it just goes black again.", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "Automatic Repair", phonetic: "/ˌɔːtəˈmætɪk rɪˈpeər/", definition: "A Windows recovery tool that starts automatically when the OS detects a startup failure." },
      ],
      suggestedReplies: [
        "That usually means a failed Windows update. Can you hold the power button for 10 seconds to force a shutdown?",
        "That message means Windows is trying to fix itself. Let's force a restart — hold the power button until it turns off.",
        "I see — that's a Windows startup repair loop. We need to force it off and try a different boot option.",
      ],
    }),
    t("bs-4", "user", "That message means Windows is stuck in a repair loop — usually caused by a failed update. Please hold the power button down for about 10 seconds until the PC turns off completely."),
    t("bs-5", "ai", "Okay, it's off. Should I just turn it back on normally?", {
      delayMs: 900,
      suggestedReplies: [
        "Yes, turn it on. This time, as soon as you see the manufacturer logo, press F8 repeatedly to access boot options.",
        "Yes — but this time, as soon as the screen shows anything, press F8 quickly to enter the Advanced Boot Options menu.",
        "Turn it on, and immediately start pressing F11 repeatedly. We want to get to the Windows recovery environment.",
      ],
    }),
    t("bs-6", "user", "Turn it back on, and this time immediately start pressing F8 repeatedly — about once per second. We want to get into the Advanced Boot Options before Windows tries to start.", {
      grammarNote: {
        triggerPhrase: "about once per second",
        correction: "This is correct and precise.",
        betterAlternative: "Press it repeatedly — roughly once every second.",
        explanation: "Giving a specific rhythm ('once per second') helps non-technical users execute the step correctly instead of pressing randomly.",
      },
    }),
    t("bs-7", "ai", "I see a blue menu — it says 'Choose an option'. There's 'Continue', 'Troubleshoot', and 'Turn off your PC'.", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "Troubleshoot", phonetic: "/ˈtrʌbəlʃuːt/", definition: "To identify and fix problems in a system or device." },
        { word: "boot options", phonetic: "/buːt ˈɒpʃənz/", definition: "A menu that allows you to choose how Windows starts up, including safe mode and recovery tools." },
      ],
      suggestedReplies: [
        "Perfect. Click 'Troubleshoot', then 'Advanced options', then 'Startup Repair'.",
        "Great. Select 'Troubleshoot', then 'Advanced options', and look for 'Uninstall Updates'.",
        "Click 'Troubleshoot', then 'Advanced options'. We'll try to uninstall the last Windows update.",
      ],
    }),
    t("bs-8", "user", "Perfect — you're in the Windows Recovery Environment. Click 'Troubleshoot', then 'Advanced options', then 'Uninstall Updates'. We'll remove the last update that caused this."),
    t("bs-9", "ai", "I see 'Uninstall latest quality update' and 'Uninstall latest feature update'. Which one should I choose?", {
      delayMs: 1000,
      suggestedReplies: [
        "Choose 'Uninstall latest quality update' — that's the most recent patch and most likely the cause.",
        "Go with 'Uninstall latest quality update' first. Feature updates are bigger changes and less likely to be the problem.",
        "Select 'Uninstall latest quality update'. If that doesn't fix it we can try the other one.",
      ],
    }),
    t("bs-10", "user", "Choose 'Uninstall latest quality update' — that's the smaller, more recent patch and the most likely culprit. The PC will restart after this."),
    t("bs-11", "ai", "It's restarting... and it's loading Windows normally now! The desktop is showing. Oh thank goodness! You're a lifesaver!", {
      delayMs: 1400,
      vocabularyHighlights: [
        { word: "culprit", phonetic: "/ˈkʌlprɪt/", definition: "The cause of a problem. In IT, often used informally to refer to the piece of software or hardware causing an issue." },
      ],
      suggestedReplies: [
        "Excellent! I'll log this as a failed Windows update. Our team will push a corrected update soon. Is everything else working?",
        "Great news! I'll create a ticket and flag this update with our team. Is there anything else you need for your interview?",
        "Brilliant! I'll block that update on your machine for now. Our team will investigate. Good luck with the interview!",
      ],
    }),
    t("bs-12", "user", "Excellent! I'll log this as a failed Windows update and flag it for our team to investigate. I'll also block that update on your machine for now. Is everything working for your interview?"),
    t("bs-13", "ai", "Yes, everything looks fine. Thank you so much — I was really panicking! I have 30 minutes to spare now.", {
      delayMs: 900,
      suggestedReplies: [
        "You're welcome, Sophie! Good luck with the interview. Call us if anything else comes up!",
        "Happy to help! I'll close the ticket as resolved. Have a great interview!",
        "Glad we sorted it! Don't hesitate to reach out if you need anything else. Goodbye!",
      ],
    }),
    t("bs-14", "user", "Glad we got that sorted in time! I'll close the ticket as resolved. Good luck with the interview, Sophie. Don't hesitate to call us if anything else comes up!"),
    t("bs-15", "ai", "Thank you! Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const lostNetworkFiles: ConversationScenario = {
  id: "lostNetworkFiles",
  title: "My Files Have Disappeared",
  description: "Help a panicked employee recover files that seem to have vanished from the shared network drive.",
  difficulty: "B1",
  estimatedMinutes: 8,
  category: "help-desk",
  context: "Thomas Bernard from the Sales team contacts IT via Teams chat. An entire folder of client proposals has disappeared from the shared network drive. His manager is asking for the files urgently.",
  userRole: "IT Support Agent",
  aiRole: "Sales Employee",
  aiName: "Thomas Bernard",
  aiAvatar: "TB",
  tags: ["files", "network-drive", "recovery", "backup", "helpdesk"],
  xpReward: 70,
  script: [
    t("nf-1", "ai", "Hi IT, urgent — a whole folder called 'Client Proposals Q2' has disappeared from the S: drive. I need it back immediately, my manager is furious.", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi Thomas, let me help you with that. First, can you confirm the exact path where the folder should be?",
        "Hello Thomas, I'm on it. Can you tell me the full path of the missing folder on the S: drive?",
        "Hi Thomas. Don't worry — files on network drives are usually recoverable. What's the exact location of the folder?",
      ],
    }),
    t("nf-2", "user", "Hi Thomas, I can help with this. Files on the network drive are usually recoverable. Can you confirm the exact path — something like S:\\Sales\\Client Proposals Q2?", {
      grammarNote: {
        triggerPhrase: "Files on the network drive are usually recoverable",
        correction: "This is correct and reassuring.",
        betterAlternative: "Network drive files are almost always recoverable — let's not panic yet.",
        explanation: "Starting with a positive statement ('usually recoverable') calms the user before diving into diagnostics. It's a key soft skill in IT support.",
      },
    }),
    t("nf-3", "ai", "Yes, it was at S:\\Sales\\2026\\Q2\\Client Proposals. I was working in it this morning and now it's just gone. Could someone have deleted it by accident?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "network drive", phonetic: "/ˈnetwɜːrk draɪv/", definition: "A shared storage location on a server, accessible by multiple users over a network, usually mapped to a drive letter like S: or Z:." },
        { word: "path", phonetic: "/pɑːθ/", definition: "The full address of a file or folder in a file system, showing each folder level separated by backslashes." },
      ],
      suggestedReplies: [
        "That's possible. Let me check the access logs and also look at the Previous Versions of that folder.",
        "It could be accidental deletion. I'm going to check the Previous Versions — we have shadow copies enabled.",
        "Let me check the audit log to see who last accessed or modified that path.",
      ],
    }),
    t("nf-4", "user", "It could be accidental deletion. Don't worry — we have shadow copies enabled on the file server, so I can restore a previous version. Give me two minutes to check."),
    t("nf-5", "ai", "Shadow copies? What are those? Will I lose any of today's work if you restore them?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "shadow copy", phonetic: "/ˈʃædoʊ ˌkɒpi/", definition: "An automatic snapshot of files or folders on a Windows server, created at regular intervals and used for recovery." },
      ],
      suggestedReplies: [
        "Shadow copies are automatic snapshots taken throughout the day. I can see versions from 8 AM, 12 PM, and 4 PM — what time were you last working in the folder?",
        "They're automatic backups taken every few hours. Tell me the last time you saved something in that folder and I'll restore to just before that.",
        "Shadow copies are point-in-time snapshots. We have ones from this morning. What was the last file you added today?",
      ],
    }),
    t("nf-6", "user", "Shadow copies are automatic snapshots of the drive taken several times a day. I can restore to this morning's version — you won't lose anything you saved before the folder disappeared. What time were you last working in it?", {
      grammarNote: {
        triggerPhrase: "you won't lose anything you saved before the folder disappeared",
        correction: "This is correct.",
        betterAlternative: "Any files saved before the deletion will be fully recovered.",
        explanation: "Explaining clearly what will and won't be lost is crucial in data recovery situations. It prevents users from making the situation worse.",
      },
    }),
    t("nf-7", "ai", "I was working in it until about 11:30 this morning. The last file I added was a proposal for Acme Corp.", {
      delayMs: 900,
      suggestedReplies: [
        "Perfect. I can see a shadow copy from 11:45 AM which includes that file. I'm restoring it now — it'll take about 60 seconds.",
        "I have a snapshot from 11:50 AM. That will include the Acme Corp file. Restoring it to the original location now.",
        "I can see the folder in the 12:00 PM snapshot with all your files. I'm restoring it now.",
      ],
    }),
    t("nf-8", "user", "I can see a shadow copy from 11:50 AM that includes all your files including the Acme Corp proposal. I'm restoring it to the original path now — this will take about 60 seconds."),
    t("nf-9", "ai", "Okay, I'm waiting... Oh! The folder is back! And all the files are there including the Acme Corp one. You're amazing!", {
      delayMs: 1300,
      suggestedReplies: [
        "Great! I'll also check the access log to see who deleted it, so we can prevent this from happening again.",
        "Glad it's back! I'll check the audit log to find out what happened. I'll also remind the team about accidental deletions.",
        "Excellent! I'll create an incident report and check who deleted the folder. I'll also brief your team on file management.",
      ],
    }),
    t("nf-10", "user", "The folder is fully restored. I'll check the audit log to identify who deleted it and send a reminder to your team about accidental deletions. I'll log this as an incident and close the ticket."),
    t("nf-11", "ai", "Thank you so much. My manager is relieved. Please do let us know what happened — we want to make sure it doesn't happen again.", {
      delayMs: 900,
      suggestedReplies: [
        "Of course! I'll send you and your manager a summary by email. Have a good rest of the day!",
        "Absolutely. I'll send a follow-up email with the findings. Call us if you need anything else!",
        "Will do. You'll receive an email with the incident report. Goodbye Thomas!",
      ],
    }),
    t("nf-12", "user", "Of course — I'll send you and your manager an incident summary by email once I've reviewed the audit log. Glad we got it sorted. Goodbye Thomas!"),
    t("nf-13", "ai", "Thank you again. Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const phishingClick: ConversationScenario = {
  id: "phishingClick",
  title: "I Clicked a Suspicious Link",
  description: "Handle a security incident where an employee has clicked on a phishing link and may have entered their credentials.",
  difficulty: "B2",
  estimatedMinutes: 10,
  category: "security",
  context: "Emma Wilson from the Finance department calls the IT security desk. She received an email that looked like it was from the CEO asking her to log in to a DocuSign link. She clicked and entered her Microsoft 365 password before realising something was wrong.",
  userRole: "IT Security Analyst",
  aiRole: "Finance Employee",
  aiName: "Emma Wilson",
  aiAvatar: "EW",
  tags: ["phishing", "security", "incident", "credentials", "microsoft365"],
  xpReward: 130,
  script: [
    t("ph-1", "ai", "Hi, I think I've done something really bad. I got an email from the CEO asking me to sign a document on DocuSign, but when I clicked the link and entered my password I noticed the URL looked strange. Was it a phishing email?", {
      delayMs: 1200,
      suggestedReplies: [
        "Hi Emma, thank you for calling immediately — that's exactly what you should do. Can you forward me that email right now?",
        "Hello Emma, you did the right thing by calling us. Don't panic. First, don't click anything else in that email. Can you send it to security@company.com?",
        "Hi, I'm glad you called. This sounds like a phishing attempt. Has the page already closed or is it still open?",
      ],
    }),
    t("ph-2", "user", "Hi Emma, you did absolutely the right thing by calling us immediately. Don't click anything else in that email. First — is the page still open on your screen?", {
      grammarNote: {
        triggerPhrase: "you did absolutely the right thing",
        correction: "This is correct — strong reassurance before action.",
        betterAlternative: "Calling us right away was exactly the right move.",
        explanation: "In security incidents, reassuring the user first is critical. If they feel judged, they may hide information or delay reporting future incidents.",
      },
    }),
    t("ph-3", "ai", "No, I closed it as soon as I noticed. The URL had something like 'microsofft.com' — with two f's. I entered my password and I think my username too.", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "phishing", phonetic: "/ˈfɪʃɪŋ/", definition: "A cyberattack where criminals impersonate trusted organisations to trick users into revealing credentials or sensitive information." },
        { word: "URL", phonetic: "/ˌjuːɑːrˈel/", definition: "Uniform Resource Locator — the web address of a page. Phishing sites often use URLs that look similar to legitimate ones." },
      ],
      suggestedReplies: [
        "That's a classic phishing domain. I'm resetting your Microsoft 365 password right now — you'll receive a prompt on your phone.",
        "Understood. I'm immediately revoking your active sessions in Entra ID and resetting your password. Do you have MFA enabled?",
        "Okay — I'm locking your account temporarily and resetting credentials. This will take 2 minutes. Do you use the same password elsewhere?",
      ],
    }),
    t("ph-4", "user", "That's a confirmed phishing site. I'm resetting your Microsoft 365 password and revoking all active sessions right now. This is the highest priority. Do you have MFA enabled on your account?", {
      grammarNote: {
        triggerPhrase: "revoking all active sessions",
        correction: "This is correct technical language.",
        betterAlternative: "I'm signing you out of all devices and revoking active tokens.",
        explanation: "'Revoking sessions' means forcing all devices to log out immediately. This limits the attacker's window even if they have the password.",
      },
    }),
    t("ph-5", "ai", "Yes, I have the Microsoft Authenticator app. Will that protect me even if they have my password?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "MFA", phonetic: "/ˌemˌefˈeɪ/", definition: "Multi-Factor Authentication — requires a second verification step beyond a password, such as a phone app approval." },
        { word: "session", phonetic: "/ˈseʃən/", definition: "An active login instance. Revoking sessions forces all devices to re-authenticate." },
      ],
      suggestedReplies: [
        "MFA makes it much harder, but some sophisticated phishing attacks can capture MFA tokens in real time. That's why I'm also revoking sessions.",
        "MFA helps significantly, but we can't rely on it alone here — some phishing kits can intercept MFA codes. We're taking full containment steps.",
        "Good — MFA adds a strong layer. However, since this site may have captured your session token, we're revoking everything to be safe.",
      ],
    }),
    t("ph-6", "user", "MFA significantly reduces the risk, but sophisticated phishing kits can capture session tokens in real time, bypassing MFA. That's why revoking all sessions is essential. Your password has been reset — you'll get a prompt on your Authenticator app now."),
    t("ph-7", "ai", "I got the prompt and approved it. So what happens now? Could the attackers have already accessed my emails or files?", {
      delayMs: 1200,
      suggestedReplies: [
        "I'm checking the Entra ID sign-in logs now to see if there were any successful logins from unusual locations in the last hour.",
        "Let me review the audit log for any activity on your account in the past 60 minutes — file access, email forwarding rules, anything suspicious.",
        "I'm pulling your sign-in log right now. Was there any sensitive data you access regularly that an attacker might target?",
      ],
    }),
    t("ph-8", "user", "I'm reviewing the Entra ID sign-in logs for your account right now to check for any unauthorised access in the last hour. Can you also tell me — do you have access to any sensitive financial data or shared mailboxes?", {
      grammarNote: {
        triggerPhrase: "unauthorised access",
        correction: "Correct — standard security terminology.",
        betterAlternative: "Any logins that weren't from you.",
        explanation: "'Unauthorised access' is the formal term in security reports. When speaking to non-technical users, 'logins that weren't from you' is clearer.",
      },
    }),
    t("ph-9", "ai", "Yes, I have access to the Finance shared mailbox and the payroll SharePoint site. Should I be worried?", {
      delayMs: 1000,
      suggestedReplies: [
        "Those are high-value targets. I'm immediately removing your access temporarily and will review the logs for both. We'll restore access once confirmed clean.",
        "I'm going to temporarily suspend access to those resources as a precaution while we investigate. I'll also check if any email forwarding rules were added.",
        "Given those accesses, I'm escalating this to a P1 incident. I'll suspend your access to Finance and payroll resources while we investigate.",
      ],
    }),
    t("ph-10", "user", "Given your access to Finance and payroll resources, I'm escalating this to a Priority 1 security incident. I'll temporarily suspend your access to those shared resources and check for any email forwarding rules or inbox changes.", {
      grammarNote: {
        triggerPhrase: "escalating this to a Priority 1 security incident",
        correction: "Correct — clear and professional.",
        betterAlternative: "I'm treating this as a critical security incident.",
        explanation: "'Priority 1' or 'P1' is standard incident management language. It signals urgency to all stakeholders and triggers a formal response process.",
      },
    }),
    t("ph-11", "ai", "I understand. I'm really sorry — I should have checked the link before clicking. What else can I do to help?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "escalate", phonetic: "/ˈeskəleɪt/", definition: "To increase the urgency or severity level of an incident, involving more senior staff or more urgent procedures." },
        { word: "forwarding rule", phonetic: "/ˈfɔːwədɪŋ ruːl/", definition: "An email setting that automatically redirects incoming messages to another address — a common tactic used by attackers after compromising an account." },
      ],
      suggestedReplies: [
        "Please don't blame yourself — these phishing emails are very convincing. Could you forward the original email to security@company.com before deleting it?",
        "Don't worry — these attacks are sophisticated and happen to everyone. Please forward the phishing email to our security team before deleting it.",
        "This is not your fault — phishing emails are designed to fool people. Can you forward the original email to security@company.com so we can analyse it?",
      ],
    }),
    t("ph-12", "user", "Please don't blame yourself — these phishing emails are extremely convincing. You did the right thing by calling immediately. Could you forward the original phishing email to security@company.com before deleting it? Our team will analyse it."),
    t("ph-13", "ai", "Of course, I'll do that now. Will you keep me updated on what the investigation finds?", {
      delayMs: 900,
      suggestedReplies: [
        "Absolutely — I'll send you and your manager a full incident report once our investigation is complete. We'll restore your access as soon as we confirm everything is clean.",
        "Yes, I'll keep you and your manager informed at every step. Expect an update within the hour. Thank you for reporting this so quickly.",
        "Yes, we'll send regular updates. Expect to hear from us within 30 minutes with initial findings.",
      ],
    }),
    t("ph-14", "user", "Absolutely. I'll send you and your manager an update within the hour. Thank you for reporting this so quickly, Emma — early reporting makes a huge difference in limiting the damage. Goodbye."),
    t("ph-15", "ai", "Thank you. I'll forward that email now. Goodbye.", { delayMs: 700 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const ransomwareDetected: ConversationScenario = {
  id: "ransomwareDetected",
  title: "Ransomware on My Computer",
  description: "Respond to a critical ransomware detection on a user's workstation — isolate the machine, contain the threat and open a P1 incident.",
  difficulty: "B2",
  estimatedMinutes: 9,
  category: "security",
  context: "James Parker from the Operations team calls the security helpdesk in a panic. His screen has been taken over by a ransomware message demanding payment in Bitcoin. His machine is still on and connected to the network.",
  userRole: "IT Security Analyst",
  aiRole: "Operations Employee",
  aiName: "James Parker",
  aiAvatar: "JP",
  tags: ["ransomware", "security", "incident", "malware", "containment"],
  xpReward: 150,
  script: [
    t("rw-1", "ai", "Hello IT, my screen has gone completely red with a message saying all my files are encrypted and I have to pay Bitcoin to get them back. Is this real? What do I do?", {
      delayMs: 1000,
      suggestedReplies: [
        "James, this is a ransomware attack. Do NOT click anything on that screen. Unplug the network cable from your PC right now.",
        "This is a critical security incident. First — stop everything and unplug your ethernet cable or disconnect from Wi-Fi immediately.",
        "Don't touch the keyboard. Unplug the network cable from the back of your PC right now — that's the most important step.",
      ],
    }),
    t("rw-2", "user", "James, this is a confirmed ransomware attack. Do not click anything on that screen. Your first priority right now: unplug the network cable from the back of your PC — or disable Wi-Fi immediately. Do it now.", {
      grammarNote: {
        triggerPhrase: "Do it now",
        correction: "Short and direct — correct in an emergency.",
        betterAlternative: "Please do this immediately — every second matters.",
        explanation: "In critical security incidents, short imperative sentences are appropriate and professional. Being direct saves time and reduces damage.",
      },
    }),
    t("rw-3", "ai", "Okay I unplugged the cable. The screen is still showing the message but I can't do anything. Did I lose all my files?", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "ransomware", phonetic: "/ˈrænsəmweər/", definition: "Malicious software that encrypts a victim's files and demands payment for the decryption key." },
        { word: "encrypt", phonetic: "/ɪnˈkrɪpt/", definition: "To convert data into a coded format that can only be read with a specific key. Ransomware uses this to make files inaccessible." },
      ],
      suggestedReplies: [
        "Good — isolating the machine was critical. Files on your local drive may be affected, but network drives are protected. Don't turn off the PC yet.",
        "Well done. Your local files may be encrypted, but we have backups. Don't shut down the PC — leave it exactly as it is for forensics.",
        "Good. Network files should be safe. Leave the PC on and don't shut it down — we need to preserve evidence. I'm escalating this to P1 now.",
      ],
    }),
    t("rw-4", "user", "Good — you've contained the machine. Files on your local drive may be affected, but network drives should be protected by our backups. Do not shut down the PC — leave it exactly as it is. I'm escalating this to a P1 incident right now."),
    t("rw-5", "ai", "What does P1 mean? And should I tell my manager? The message is asking for 0.5 Bitcoin — should we pay?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "P1 incident", phonetic: "/piː wʌn ˈɪnsɪdənt/", definition: "A Priority 1 incident — the highest severity level, requiring immediate response from security and management." },
        { word: "containment", phonetic: "/kənˈteɪnmənt/", definition: "The process of limiting the spread of a security threat by isolating affected systems." },
      ],
      suggestedReplies: [
        "P1 is our highest priority — it means all hands on deck. Yes, inform your manager. And absolutely do not pay — it doesn't guarantee file recovery and funds criminal activity.",
        "P1 means critical incident requiring immediate response. Please inform your manager now. We never pay ransoms — it's our policy and it rarely works.",
        "P1 means maximum urgency. Tell your manager immediately. Do not pay — we have backups and paying only encourages attackers.",
      ],
    }),
    t("rw-6", "user", "P1 means this is our highest severity — all security resources are now focused on this. Yes, please inform your manager immediately. And absolutely do not pay the ransom — it rarely results in file recovery and it funds criminal organisations. We have backups.", {
      grammarNote: {
        triggerPhrase: "it funds criminal organisations",
        correction: "Correct — clear justification for not paying.",
        betterAlternative: "Paying only encourages further attacks and rarely restores files.",
        explanation: "Explaining WHY not to pay is important. Users are under stress and may be tempted. A clear reason helps them resist and follow policy.",
      },
    }),
    t("rw-7", "ai", "Okay, I won't pay. My manager is here now and wants to know how long until we can restore my files.", {
      delayMs: 1000,
      suggestedReplies: [
        "We have nightly backups — files from yesterday will be fully restored once we rebuild the workstation. Expect 2-4 hours for a clean reinstall.",
        "Our last backup was last night at midnight. Once we reimage your machine, we can restore files to that point. Estimated time: 3-4 hours.",
        "We'll need to reimage the workstation and restore from last night's backup. Expect 2 to 4 hours total. Current files from today may not be recoverable.",
      ],
    }),
    t("rw-8", "user", "Our last backup was midnight last night. We'll need to reimage the workstation and restore files to that point — which means anything created today may be lost. Full recovery estimate: 2 to 4 hours. We'll keep your manager updated throughout."),
    t("rw-9", "ai", "Understood. What should I do in the meantime? Can I use another computer?", {
      delayMs: 900,
      suggestedReplies: [
        "Yes — you can use another machine, but log in with a temporary account while we verify your credentials haven't been compromised.",
        "Yes, we'll set you up with a loaner machine. Use your Microsoft 365 account but change your password immediately before logging in.",
        "Yes. We'll provide a loaner. Please change your Microsoft 365 password before using it — your current credentials may be compromised.",
      ],
    }),
    t("rw-10", "user", "Yes — we'll provide a loaner machine. Before logging in, please change your Microsoft 365 password immediately. Your current credentials may have been compromised by the malware.", {
      grammarNote: {
        triggerPhrase: "Your current credentials may have been compromised",
        correction: "Correct — 'may have been' is the right form for past possibility.",
        betterAlternative: "The malware might have captured your login details.",
        explanation: "'May have been compromised' uses the perfect modal correctly to describe a past action with present uncertainty. It's more formal and precise than 'might have'.",
      },
    }),
    t("rw-11", "ai", "I've changed my password. Is there anything else I can do to help? I feel terrible about this.", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "reimage", phonetic: "/riːˈɪmɪdʒ/", definition: "To wipe a computer and reinstall the operating system and software from a clean template, removing all malware." },
        { word: "loaner", phonetic: "/ˈloʊnər/", definition: "A temporary replacement device provided while a user's own device is being repaired or replaced." },
      ],
      suggestedReplies: [
        "Please don't blame yourself — ransomware is sophisticated. The most helpful thing is to leave the infected machine exactly as it is and answer any questions from our forensics team.",
        "Don't worry — this can happen to anyone. Just leave the infected PC as it is, and our team will come to collect it shortly for forensic analysis.",
        "You did everything right once you noticed. Leave the infected machine untouched — our security team will collect it for analysis. That's all we need from you for now.",
      ],
    }),
    t("rw-12", "user", "Please don't blame yourself — ransomware attacks are sophisticated and can affect anyone. You did the right thing by calling immediately. Leave the infected machine exactly as it is — our forensics team will collect it shortly. I'll keep you and your manager updated every hour."),
    t("rw-13", "ai", "Thank you. I feel better knowing the team is on it. I'll leave the PC alone. Goodbye.", {
      delayMs: 800,
      suggestedReplies: [
        "Thank you James. Stay on the loaner and we'll have you back up and running as soon as possible. Goodbye!",
        "We're on it. Expect an update within the hour. Goodbye James!",
        "We'll get you sorted. Thanks for acting fast — it made a big difference. Goodbye!",
      ],
    }),
    t("rw-14", "user", "Thank you James. Acting fast made a big difference today — you've helped limit the damage significantly. We'll update you every hour. Goodbye!"),
    t("rw-15", "ai", "Thank you. Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const exchangeSpam: ConversationScenario = {
  id: "exchangeSpam",
  title: "Emails Going to Spam",
  description: "Help an employee whose outgoing emails are being marked as spam by recipients, affecting a key client relationship.",
  difficulty: "B1",
  estimatedMinutes: 8,
  category: "microsoft365",
  context: "Rachel Green from the Business Development team contacts IT support. A key client has reported that all emails from Rachel are landing in their spam folder. She has an important proposal to send today.",
  userRole: "IT Support Agent",
  aiRole: "Business Development Manager",
  aiName: "Rachel Green",
  aiAvatar: "RG",
  tags: ["email", "spam", "exchange", "deliverability", "microsoft365"],
  xpReward: 80,
  script: [
    t("es-1", "ai", "Hi IT, I have a big problem — one of our key clients just told me that all my emails are going into their spam folder. I need to send them a proposal today. Can you help?", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi Rachel, I can help with that. First, can you tell me the client's email domain — for example, @clientcompany.com?",
        "Hello Rachel! This is a deliverability issue. Can you tell me the recipient's email address or domain?",
        "Hi Rachel. Let's get this sorted. Can you forward me one of the emails the client said went to spam?",
      ],
    }),
    t("es-2", "user", "Hi Rachel, I can help with that. Email deliverability issues are usually fixable. Can you tell me the client's email domain — for example, @clientcompany.com — so I can check our sending reputation?", {
      grammarNote: {
        triggerPhrase: "check our sending reputation",
        correction: "Correct — standard email deliverability term.",
        betterAlternative: "Check how our email server is seen by external providers.",
        explanation: "'Sending reputation' refers to how trustworthy mail servers perceive your email server. A poor reputation causes emails to be flagged as spam.",
      },
    }),
    t("es-3", "ai", "Their domain is @techventures.com. And another colleague told me the same thing happened with @globalcorp.net. Is it just me or is it a company-wide problem?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "spam filter", phonetic: "/spæm ˈfɪltər/", definition: "Software that automatically identifies and blocks unsolicited or suspicious emails." },
        { word: "deliverability", phonetic: "/dɪˌlɪvərəˈbɪlɪti/", definition: "The ability of an email to successfully reach the recipient's inbox rather than being blocked or marked as spam." },
      ],
      suggestedReplies: [
        "If it's affecting two different external domains, this sounds like a company-wide issue. I'll check our SPF, DKIM and DMARC records immediately.",
        "Two different domains reporting the same issue suggests our mail server reputation may be affected. Let me check our DNS records.",
        "That's a company-wide problem. I'll check our email authentication records — SPF, DKIM and DMARC — right now.",
      ],
    }),
    t("es-4", "user", "Two domains reporting the same issue suggests this is company-wide. I'm going to check our email authentication records — SPF, DKIM and DMARC — which tell external mail servers that our emails are legitimate. Give me a moment."),
    t("es-5", "ai", "What are SPF, DKIM and DMARC? I've never heard of those.", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "SPF", phonetic: "/ˌesˌpiːˈef/", definition: "Sender Policy Framework — a DNS record that lists which servers are authorised to send email on behalf of your domain." },
        { word: "DKIM", phonetic: "/ˌdiːˌkeɪˌaɪˈem/", definition: "DomainKeys Identified Mail — a digital signature added to outgoing emails to prove they haven't been tampered with." },
        { word: "DMARC", phonetic: "/ˈdiːmɑːrk/", definition: "Domain-based Message Authentication — a policy that tells receiving servers what to do with emails that fail SPF or DKIM checks." },
      ],
      suggestedReplies: [
        "They're email security standards that prove to other mail servers that our emails are legitimate and not spam or forgeries. If any of them are misconfigured, emails get flagged.",
        "Think of them as ID documents for our emails. They prove to other companies' mail servers that emails from us are genuine. If they're broken, emails go to spam.",
        "They're technical standards that verify our emails are authentic. Other companies' mail servers check these before deciding whether to deliver our emails or block them.",
      ],
    }),
    t("es-6", "user", "Think of them as ID documents for our emails. They prove to other mail servers that emails from our domain are genuine and not fake. If any of these records are missing or misconfigured, external servers will flag our emails as suspicious."),
    t("es-7", "ai", "I see. Did you find anything wrong?", {
      delayMs: 1000,
      suggestedReplies: [
        "Yes — our DKIM signature is missing. It seems it was accidentally removed during a DNS update last week. I'm adding it back now.",
        "Yes, our DMARC record has an error — it's set to 'reject' all failing emails but our DKIM key expired. I'm fixing that now.",
        "Yes — our SPF record is incomplete. A new sending IP wasn't added after last month's Exchange Online migration. I'm updating it now.",
      ],
    }),
    t("es-8", "user", "Yes — I found the issue. Our DKIM signature key expired last Friday and wasn't renewed. This means external servers can't verify our emails, so they're flagging them as spam. I'm generating a new DKIM key and updating the DNS record now.", {
      grammarNote: {
        triggerPhrase: "I'm generating a new DKIM key",
        correction: "Correct — present continuous for an action happening right now.",
        betterAlternative: "I'll generate a new key and update the DNS record.",
        explanation: "Using 'I'm generating' (present continuous) communicates that the action is already underway, which reassures the user more than 'I'll generate' (future intent).",
      },
    }),
    t("es-9", "ai", "How long will it take to fix? I really need to send that proposal today.", {
      delayMs: 800,
      suggestedReplies: [
        "The DNS update will propagate within 30 to 60 minutes. Your emails should reach inboxes normally after that. For today's proposal, I'll add your client's domain to our safe sender list as a short-term fix.",
        "DNS changes take 30-60 minutes to take effect. In the meantime, I can whitelist your client's domain on our end. Would that help?",
        "The fix will take about an hour to fully propagate. I can contact your client's IT team directly to whitelist your address in the meantime.",
      ],
    }),
    t("es-10", "user", "The DNS update will take 30 to 60 minutes to propagate across the internet. As a short-term workaround, I'm adding your client's domain to our safe sender list right now so your proposal goes through today. The permanent fix will be in place within the hour."),
    t("es-11", "ai", "That's a relief! Thank you. Should I send the proposal now or wait for the full fix?", {
      delayMs: 900,
      suggestedReplies: [
        "You can send it now — I've already added the whitelist entry. Also ask your client to mark your previous emails as 'Not spam' to help their filter learn.",
        "Send it now. I've already applied the short-term fix. Also ask the client to add your email address to their contacts or safe senders list.",
        "Go ahead and send it now. And ask your client to check their spam folder and mark your previous emails as legitimate — that will also help.",
      ],
    }),
    t("es-12", "user", "Go ahead and send the proposal now — the whitelist is active. Also ask your client to check their spam folder, find your previous emails, and mark them as 'Not Spam'. That will help train their filter to recognise you. I'll send you a confirmation once the DKIM fix is fully propagated."),
    t("es-13", "ai", "Perfect, thank you! I'll send the proposal and let the client know. You've saved the day again!", {
      delayMs: 800,
      suggestedReplies: [
        "Happy to help, Rachel! I'll send you an email confirmation once everything is fully resolved. Good luck with the proposal!",
        "Glad we got it sorted! I'll monitor the fix and update you by end of day. Have a great meeting!",
        "You're welcome! I'll close the ticket once the DNS has propagated. Let me know how the proposal goes!",
      ],
    }),
    t("es-14", "user", "Happy to help! I'll monitor the DNS propagation and send you a confirmation email once it's fully resolved — should be within the hour. Good luck with the proposal, Rachel!"),
    t("es-15", "ai", "Thank you so much! Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const teamsAudio: ConversationScenario = {
  id: "teamsAudio",
  title: "No Sound in Teams Meeting",
  description: "Troubleshoot a Microsoft Teams audio issue for a user who can't hear or be heard in an important client call.",
  difficulty: "B1",
  estimatedMinutes: 7,
  category: "microsoft365",
  context: "Kevin Morris from the Sales team messages IT support on Teams chat. He is about to start a client demonstration in 10 minutes and has just discovered that his microphone and speakers are not working in Teams.",
  userRole: "IT Support Agent",
  aiRole: "Sales Representative",
  aiName: "Kevin Morris",
  aiAvatar: "KM",
  tags: ["teams", "audio", "microphone", "troubleshooting", "microsoft365"],
  xpReward: 60,
  script: [
    t("ta-1", "ai", "URGENT — no audio in Teams at all. Can't hear anything and my mic isn't working. Client demo in 10 minutes. Help!", {
      delayMs: 800,
      suggestedReplies: [
        "On it Kevin. First, check Teams audio settings: click the three dots in a call, then Device settings. What audio devices do you see?",
        "Hi Kevin, let's fix this fast. In Teams, click your profile picture, then Settings, then Devices. Which microphone and speaker are selected?",
        "Kevin, go to Teams Settings > Devices right now. Check which microphone and speaker are selected and tell me what you see.",
      ],
    }),
    t("ta-2", "user", "Kevin, go to Teams Settings right now — click your profile picture top right, then Settings, then Devices. Tell me what microphone and speaker are selected.", {
      grammarNote: {
        triggerPhrase: "click your profile picture top right",
        correction: "Clear and correct for a chat support context.",
        betterAlternative: "Click on your profile picture in the top-right corner of Teams.",
        explanation: "In written support, being very specific about where to click ('top-right corner') prevents confusion. Users are stressed and will miss vague instructions.",
      },
    }),
    t("ta-3", "ai", "It says Speaker: Realtek Audio, Microphone: Realtek Audio. But I have a USB headset plugged in.", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "audio device", phonetic: "/ˈɔːdioʊ dɪˈvaɪs/", definition: "Hardware used for sound input (microphone) or output (speakers/headphones)." },
        { word: "USB headset", phonetic: "/ˌjuːˌesˈbiː ˈhedset/", definition: "A combined microphone and headphone device that connects via USB and registers as a separate audio device." },
      ],
      suggestedReplies: [
        "That's the issue — Teams is using the built-in audio instead of your headset. Change both Speaker and Microphone to your USB headset in that same settings page.",
        "Found it. Change the Speaker and Microphone dropdown to your USB headset. It should appear in the list with the headset brand name.",
        "Classic issue. In Teams Devices settings, change both the Speaker and Microphone dropdowns to your USB headset. It should appear in the list.",
      ],
    }),
    t("ta-4", "user", "That's the issue — Teams defaulted to the built-in audio. In that same Devices settings page, change both the Speaker dropdown and the Microphone dropdown to your USB headset. It should appear in the list by brand name."),
    t("ta-5", "ai", "I can see 'Jabra Evolve2 30' in both lists. I've selected it. Should I test it now?", {
      delayMs: 800,
      suggestedReplies: [
        "Yes — click 'Make a test call' on that same page. It'll play a tone and record your voice. Tell me if you can hear it.",
        "Yes, click the 'Make a test call' button right there in Teams Devices settings.",
        "Yes — there's a 'Make a test call' button on that page. Click it and tell me what happens.",
      ],
    }),
    t("ta-6", "user", "Good. Now click the 'Make a test call' button on that same Devices page. It will play a tone and record a short voice clip so you can check both speaker and microphone."),
    t("ta-7", "ai", "The test worked — I heard the tone and my voice played back. Everything sounds good now! That was quick!", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "default device", phonetic: "/dɪˈfɔːlt dɪˈvaɪs/", definition: "The audio device Windows or an application uses automatically unless another is selected." },
      ],
      suggestedReplies: [
        "Perfect! For future reference, Teams sometimes resets to the default device after updates. You can pin your headset as the preferred device in Settings.",
        "Great! One tip: this happens when Windows updates reset the default audio device. You may want to set your headset as the default in Windows Sound settings too.",
        "Excellent! I'd also recommend setting the Jabra as your default Windows audio device — that prevents Teams from reverting after updates.",
      ],
    }),
    t("ta-8", "user", "Great news! One tip for the future: Teams sometimes resets to the built-in audio after a Windows update. To prevent this, also set the Jabra as your default audio device in Windows Settings > Sound. Good luck with the demo, Kevin!"),
    t("ta-9", "ai", "Will do! Thank you so much — you saved my demo. Bye!", {
      delayMs: 700,
      suggestedReplies: [
        "Happy to help! I'll close the ticket. Good luck!",
        "Glad we sorted it in time! Bye Kevin!",
        "You're welcome! Have a great demo!",
      ],
    }),
    t("ta-10", "user", "Happy to help! I'll log this as resolved. Have a great demo and don't hesitate to reach out if anything else comes up. Goodbye Kevin!"),
    t("ta-11", "ai", "Thanks again. Bye!", { delayMs: 500 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const wifiSlow: ConversationScenario = {
  id: "wifiSlow",
  title: "Wi-Fi Is Extremely Slow",
  description: "Diagnose and resolve a Wi-Fi performance complaint from an employee, identifying channel congestion as the root cause.",
  difficulty: "B1",
  estimatedMinutes: 8,
  category: "networking",
  context: "Laura Mitchell from the Marketing department calls the IT helpdesk. The Wi-Fi on the third floor has been extremely slow all morning. Multiple colleagues are affected and she is struggling to upload files to SharePoint.",
  userRole: "IT Support Agent",
  aiRole: "Marketing Employee",
  aiName: "Laura Mitchell",
  aiAvatar: "LM",
  tags: ["wifi", "networking", "performance", "troubleshooting", "access-point"],
  xpReward: 75,
  script: [
    t("wf-1", "ai", "Hi IT, the Wi-Fi on the third floor is absolutely terrible today. Pages take forever to load and I can't upload anything to SharePoint. My whole team is affected. Can you help?", {
      delayMs: 1000,
      suggestedReplies: [
        "Hi Laura, I'll look into this. Is the issue on all devices, or just some? And are you connected to 'CorpWifi' or 'CorpWifi-5G'?",
        "Hello Laura! Multiple users affected suggests a network issue rather than a single device problem. Which access point are you near on the third floor?",
        "Hi Laura, I'll check the network now. Can you tell me how many people are affected and which Wi-Fi network name you're connected to?",
      ],
    }),
    t("wf-2", "user", "Hi Laura, multiple people affected on the same floor is a useful signal — it points to a network issue rather than a device problem. Which Wi-Fi network are you connected to, and roughly how many people on your floor are affected?", {
      grammarNote: {
        triggerPhrase: "it points to a network issue rather than a device problem",
        correction: "Correct — clear diagnostic reasoning.",
        betterAlternative: "That suggests the problem is with the network, not with individual devices.",
        explanation: "'Points to' is a professional way to express diagnostic reasoning. It shows structured thinking and helps users understand why you're asking specific questions.",
      },
    }),
    t("wf-3", "ai", "We're all on 'CorpWifi'. There are about 15 of us on this floor and everyone is complaining since around 9 this morning. The IT room is also on our floor — did something change?", {
      delayMs: 1200,
      vocabularyHighlights: [
        { word: "access point", phonetic: "/ˈækses pɔɪnt/", definition: "A networking device that creates a Wi-Fi network, allowing wireless devices to connect to a wired network." },
        { word: "bandwidth", phonetic: "/ˈbændwɪdθ/", definition: "The maximum rate of data transfer across a network connection, usually measured in Mbps or Gbps." },
      ],
      suggestedReplies: [
        "Since 9 AM and 15 users affected — let me check the access point logs for the third floor and also run a speed test on the wired side.",
        "Let me check our network monitoring dashboard. I can see the third-floor access point performance from here.",
        "I'll pull up the third-floor access point in our management console. Did anything change on your floor this morning — new equipment, a lot more people than usual?",
      ],
    }),
    t("wf-4", "user", "Let me check our network management console for the third-floor access point right now. Did you notice anything different on the floor this morning — more people than usual, or any new devices plugged in?"),
    t("wf-5", "ai", "Actually, the conference room on our floor has been booked all morning for an all-day workshop. There must be an extra 20 people in there.", {
      delayMs: 1000,
      suggestedReplies: [
        "That explains it. The access point is overloaded. I can see it's on channel 6 and so is the one in the conference room — they're interfering with each other.",
        "That's the cause — the access point is handling too many clients. I'm going to move the floor AP to a less congested channel.",
        "That's it — channel congestion. Too many devices on the same AP and channel. I'll reassign channels to balance the load.",
      ],
    }),
    t("wf-6", "user", "That explains everything. I can see the third-floor access point is overloaded — it has 48 connected clients, which is well above its recommended maximum. I'm also seeing channel interference between your AP and the conference room AP. I'm going to reassign channels now.", {
      grammarNote: {
        triggerPhrase: "well above its recommended maximum",
        correction: "Correct — 'well above' means significantly higher than.",
        betterAlternative: "significantly more than it should handle.",
        explanation: "'Well above' is a useful professional expression meaning 'much higher than expected or acceptable'. It's commonly used in technical reports and support conversations.",
      },
    }),
    t("wf-7", "ai", "What does 'reassigning channels' mean? Will it cause any disconnections?", {
      delayMs: 900,
      vocabularyHighlights: [
        { word: "channel", phonetic: "/ˈtʃænəl/", definition: "A specific frequency band used for Wi-Fi communication. When too many access points use the same channel, they interfere with each other and slow down the network." },
        { word: "congestion", phonetic: "/kənˈdʒestʃən/", definition: "A state of excessive network traffic that reduces performance, similar to a traffic jam on a road." },
      ],
      suggestedReplies: [
        "Wi-Fi channels are like lanes on a road. I'm moving your AP to a less crowded lane. Devices will reconnect automatically in about 30 seconds.",
        "Think of channels as radio frequencies. I'm moving the AP to a quieter frequency to reduce interference. You'll briefly disconnect for about 20-30 seconds.",
        "It means I'm moving the Wi-Fi to a different frequency to avoid interference. Your devices will disconnect momentarily — about 20 seconds — then reconnect automatically.",
      ],
    }),
    t("wf-8", "user", "Think of Wi-Fi channels like lanes on a road — I'm moving your access point to a less congested lane. Devices will briefly disconnect for about 20 to 30 seconds and then automatically reconnect. Please warn your colleagues now."),
    t("wf-9", "ai", "Okay, I've told everyone. Go ahead.", {
      delayMs: 600,
      suggestedReplies: [
        "Changing the channel now. You'll lose connection in 3... 2... 1...",
        "Applying the change now. Expect a brief drop.",
        "Making the change now — you'll reconnect shortly.",
      ],
    }),
    t("wf-10", "user", "Applying the channel change now. You'll have a brief disconnection."),
    t("wf-11", "ai", "We disconnected and... we're back! And it's already so much faster. I just uploaded a file to SharePoint in seconds. You're amazing!", {
      delayMs: 1300,
      suggestedReplies: [
        "Excellent! I'll also add a second access point on the third floor to handle large events in future. I'll log this and send you a summary.",
        "Great news! I'm going to recommend adding a dedicated AP for that conference room to avoid this happening again. I'll close the ticket.",
        "Brilliant! I'll log this and also adjust the conference room AP settings to better handle large meetings. Have a great rest of the day!",
      ],
    }),
    t("wf-12", "user", "Excellent! I'll log this as a channel congestion issue and also submit a request to add a dedicated access point for the conference room, so large events don't impact the floor in future. Is everything working well for everyone?"),
    t("wf-13", "ai", "Yes, everyone is happy now! Thank you so much. Much better. Goodbye!", {
      delayMs: 800,
      suggestedReplies: [
        "Happy to help! I'll close the ticket. Have a great rest of the day!",
        "Glad it's sorted! Goodbye Laura!",
        "You're welcome! Don't hesitate to call if it happens again. Goodbye!",
      ],
    }),
    t("wf-14", "user", "Glad it's all sorted! I'll close the ticket as resolved. Don't hesitate to contact us if it happens again. Goodbye Laura and team!"),
    t("wf-15", "ai", "Thank you! Goodbye!", { delayMs: 600 }),
  ],
}

// ─────────────────────────────────────────────────────────────────────────────

const diskFull: ConversationScenario = {
  id: "diskFull",
  title: "File Server Is Full",
  description: "Manage a critical incident where the main file server has run out of disk space, blocking all users from saving files.",
  difficulty: "B2",
  estimatedMinutes: 9,
  category: "incidents",
  context: "You receive an automated alert: the company file server FS01 is at 99% disk capacity. Users across the company are now receiving 'Disk full' errors when trying to save. You call the on-duty manager, Sarah Thompson, to coordinate the response.",
  userRole: "IT Systems Engineer",
  aiRole: "IT Manager (On-Call)",
  aiName: "Sarah Thompson",
  aiAvatar: "ST",
  tags: ["disk-space", "file-server", "incident", "storage", "windows-server"],
  xpReward: 130,
  script: [
    t("df-1", "ai", "Hi, this is Sarah. I just got paged. What's the situation with the file server?", {
      delayMs: 900,
      suggestedReplies: [
        "Hi Sarah, FS01 is at 99% disk capacity. Users company-wide are getting disk full errors. I need your approval to run emergency cleanup procedures.",
        "Sarah, FS01 hit 99% disk usage about 10 minutes ago. All users are blocked from saving. I'm requesting approval to begin immediate remediation.",
        "Hi Sarah — FS01 is critically full. Users across all departments can't save files. I've identified the cause and need your sign-off to act.",
      ],
    }),
    t("df-2", "user", "Hi Sarah, we have a P1 incident. FS01 hit 99% disk capacity approximately 10 minutes ago. Users company-wide are receiving disk full errors and cannot save any files. I've identified the cause — a backup job left 800GB of uncompressed temp files on the data volume. I need your approval to delete them.", {
      grammarNote: {
        triggerPhrase: "I've identified the cause",
        correction: "Correct — present perfect to describe a just-completed action.",
        betterAlternative: "I found the cause.",
        explanation: "'I've identified' (present perfect) is more formal and appropriate in incident reporting than 'I found'. It implies the action is complete and relevant to the current situation.",
      },
    }),
    t("df-3", "ai", "800GB of temp files? How did that happen? And are you certain these are safe to delete — we can't afford to lose anything important.", {
      delayMs: 1100,
      vocabularyHighlights: [
        { word: "temp files", phonetic: "/temp faɪlz/", definition: "Temporary files created by applications or processes that are intended to be deleted after use but can accumulate if not cleaned up." },
        { word: "data volume", phonetic: "/ˈdeɪtə ˈvɒljuːm/", definition: "A logical partition on a server dedicated to storing data, separate from the operating system partition." },
      ],
      suggestedReplies: [
        "The nightly backup job failed to clean up last night — it's a known bug in the backup software. These are all files in C:\\BackupTemp\\ with a .tmp extension — 100% safe to delete.",
        "Last night's backup didn't run its cleanup phase. The files are in the BackupTemp folder — they're staging files only, no user data. I've verified this.",
        "The backup agent failed to purge its staging directory. I've verified the path — it's BackupTemp only, no user documents. These are safe to remove.",
      ],
    }),
    t("df-4", "user", "The nightly backup agent failed to execute its post-job cleanup due to a timeout. The 800GB is entirely within the BackupTemp staging directory — path D:\\BackupTemp\\. I've verified there is no user data in this location. However, per our change policy, I need your verbal approval before deletion."),
    t("df-5", "ai", "Okay, I trust your assessment. You have my approval to delete those temp files. What's the estimated time to restore service?", {
      delayMs: 1000,
      vocabularyHighlights: [
        { word: "staging directory", phonetic: "/ˈsteɪdʒɪŋ dɪˈrektəri/", definition: "A temporary folder where data is held during a process, such as a backup, before being moved to its final destination." },
        { word: "remediation", phonetic: "/rɪˌmiːdiˈeɪʃən/", definition: "The process of fixing or correcting a problem in IT, particularly after a security or operational incident." },
      ],
      suggestedReplies: [
        "Deletion will take approximately 4 minutes for 800GB. Users should be able to save files again within 5 minutes. I'll update you once it's complete.",
        "Estimated 3 to 5 minutes for the deletion to complete. I'll send a company-wide Teams message once the server is back to normal capacity.",
        "About 5 minutes for deletion. I'll also fix the backup cleanup script immediately after to prevent recurrence. Update in 5 minutes.",
      ],
    }),
    t("df-6", "user", "Understood — deletion in progress. Estimated 4 to 5 minutes. I'll also need to fix the backup cleanup script immediately after to prevent recurrence. I'll post a Teams message to all staff once service is restored. Update in 5 minutes.", {
      grammarNote: {
        triggerPhrase: "to prevent recurrence",
        correction: "Correct — formal and precise.",
        betterAlternative: "to stop this from happening again.",
        explanation: "'Recurrence' means the same problem happening again. It's the standard term in incident post-mortems and root cause analysis. Using it shows professional incident management vocabulary.",
      },
    }),
    t("df-7", "ai", "Good. What caused the backup cleanup to fail? Is this likely to happen again?", {
      delayMs: 1000,
      suggestedReplies: [
        "The cleanup script has a hardcoded 30-minute timeout that's too short for large backups. Last night's backup took 47 minutes. I'll increase the timeout and add a disk space alert at 80%.",
        "The backup job exceeded its timeout threshold, which caused the cleanup phase to abort. I'll patch the script and add a low-disk alert so we catch this before it becomes critical.",
        "The cleanup phase is triggered only if the main backup completes within 30 minutes. Last night it took 50 minutes due to a large data transfer. I'm fixing the timeout and adding monitoring.",
      ],
    }),
    t("df-8", "user", "The root cause is a hardcoded 30-minute timeout in the backup cleanup script. Last night's backup took 47 minutes due to a large data migration, causing the cleanup phase to abort silently. I'll patch the timeout to 120 minutes and add a disk space monitoring alert at 80% capacity.", {
      grammarNote: {
        triggerPhrase: "abort silently",
        correction: "Correct — 'abort silently' means the process stopped without generating an error alert.",
        betterAlternative: "stopped without any warning or notification.",
        explanation: "In systems engineering, 'silent failure' or 'aborting silently' describes a process that stops without raising an error. Recognising and naming this pattern is important in root cause analysis.",
      },
    }),
    t("df-9", "ai", "Good. While you fix that, I'll draft a message to leadership about the incident. Can you give me a one-line summary I can use?", {
      delayMs: 900,
      suggestedReplies: [
        "Sure: 'FS01 experienced a disk-full incident caused by an uncleared backup staging directory. Service was restored within 15 minutes. Root cause fix and enhanced monitoring are being implemented.'",
        "Here's a draft: 'File server FS01 reached critical disk capacity due to a backup cleanup failure. Impact lasted approximately 15 minutes. Service is restored and corrective action is underway.'",
        "'A backup job failure caused FS01 to reach 99% disk capacity, temporarily blocking file saves company-wide. Service was restored in under 20 minutes. Root cause has been identified and fixed.'",
      ],
    }),
    t("df-10", "user", "Here's a draft summary: 'FS01 reached critical disk capacity due to a backup cleanup script failure. Service impact lasted approximately 15 minutes. Full service has been restored and a permanent fix is being applied. A post-incident report will follow within 24 hours.'"),
    t("df-11", "ai", "Perfect — I'll use that. Is the deletion done? Can users save files now?", {
      delayMs: 800,
      vocabularyHighlights: [
        { word: "post-incident report", phonetic: "/poʊst ˈɪnsɪdənt rɪˈpɔːrt/", definition: "A formal document written after an incident that details what happened, the root cause, the impact, and steps taken to prevent recurrence." },
        { word: "root cause", phonetic: "/ruːt kɔːz/", definition: "The fundamental reason an incident occurred, as opposed to its symptoms." },
      ],
      suggestedReplies: [
        "Deletion completed 2 minutes ago. FS01 is now at 41% capacity. I've verified that users can save files. Teams notification has been sent.",
        "Yes — deletion is done. Server is at 38% capacity. All users are able to save normally. I've posted the all-clear on Teams.",
        "Confirmed — deletion complete. FS01 is at 40% used. Service fully restored. Teams message sent to all staff.",
      ],
    }),
    t("df-12", "user", "Confirmed — deletion completed 3 minutes ago. FS01 is now at 40% capacity. I've verified file saves are working company-wide and sent the all-clear message on Teams. I'll have the post-incident report on your desk by tomorrow morning."),
    t("df-13", "ai", "Excellent work. Quick response. I'll let leadership know. Thank you.", {
      delayMs: 800,
      suggestedReplies: [
        "Thank you Sarah. I'll apply the script fix and monitoring now, and send you the report tomorrow. Have a good rest of the day.",
        "Thanks for the quick sign-off, Sarah. The fixes are already being applied. You'll have the full report tomorrow morning.",
        "Appreciate the fast approval, Sarah — it made all the difference. Report will be with you first thing tomorrow. Goodbye.",
      ],
    }),
    t("df-14", "user", "Thank you for the quick approval, Sarah — it was critical for keeping the response time short. I'll apply all corrective measures now and have the full incident report on your desk by 9 AM tomorrow. Goodbye."),
    t("df-15", "ai", "Good work. Goodbye.", { delayMs: 600 }),
  ],
}

// EXPORT
// ═════════════════════════════════════════════════════════════════════════════

export const conversations: ConversationScenario[] = [
  helpdeskprinter,
  m365sharepoint,
  passwordreset,
  mfamobile,
  firewallbranch,
  serverincident,
  customermeeting,
  simpleplain,
  vpnRemoteAccess,
  blackScreenPC,
  lostNetworkFiles,
  phishingClick,
  ransomwareDetected,
  exchangeSpam,
  teamsAudio,
  wifiSlow,
  diskFull,
]

export function getScenarioById(id: string): ConversationScenario | undefined {
  return conversations.find((s) => s.id === id)
}

export function getScenariosByCategory(category: ITConversationCategory): ConversationScenario[] {
  return conversations.filter((s) => s.category === category)
}

export function getScenariosByDifficulty(difficulty: CEFRLevel): ConversationScenario[] {
  return conversations.filter((s) => s.difficulty === difficulty)
}
