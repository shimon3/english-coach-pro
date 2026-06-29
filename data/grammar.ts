import type { CEFRLevel } from "@/lib/utils"

export type GrammarCategory =
  | "tenses"
  | "conditionals"
  | "modal-verbs"
  | "passive-voice"
  | "reported-speech"
  | "connectors"
  | "questions"
  | "imperatives"

export interface GrammarRule {
  title: string
  structure: string
  examples: string[]
}

export interface ITExample {
  label: string
  sentence: string
  grammarHighlight: string
}

export interface GeneralExample {
  label: string
  sentence: string
  grammarHighlight: string
}

export interface GrammarLesson {
  id: string
  title: string
  subtitle: string
  category: GrammarCategory
  level: CEFRLevel
  estimatedMinutes: number
  xpReward: number
  icon: string
  intro: string
  generalIntro: string
  rules: GrammarRule[]
  itExamples: ITExample[]
  generalExamples: GeneralExample[]
  quickTip: string
  commonMistake: string
}

export const GRAMMAR_CATEGORY_META: Record<GrammarCategory, { label: string; color: string; bg: string; border: string }> = {
  "tenses":          { label: "Tenses",          color: "text-blue-400",    bg: "bg-blue-400/10",    border: "border-blue-400/25" },
  "conditionals":    { label: "Conditionals",     color: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/25" },
  "modal-verbs":     { label: "Modal Verbs",      color: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/25" },
  "passive-voice":   { label: "Passive Voice",    color: "text-rose-400",    bg: "bg-rose-400/10",    border: "border-rose-400/25" },
  "reported-speech": { label: "Reported Speech",  color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/25" },
  "connectors":      { label: "Connectors",       color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/25" },
  "questions":       { label: "Questions",        color: "text-teal-400",    bg: "bg-teal-400/10",    border: "border-teal-400/25" },
  "imperatives":     { label: "Imperatives",      color: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/25" },
}

export const grammarLessons: GrammarLesson[] = [
  {
    id: "present-perfect",
    title: "Present Perfect in IT",
    subtitle: "Reporting issues, updates and completed actions",
    category: "tenses",
    level: "B1",
    estimatedMinutes: 8,
    xpReward: 60,
    icon: "⏱️",
    intro: "The present perfect is one of the most used tenses in IT English. You use it to report what has happened to a system, whether a fix has been applied, or whether a user has experienced a problem — without specifying the exact time. Mastering it will make your incident reports, ticket updates, and support conversations sound professional.",
    generalIntro: "The present perfect connects the past to the present — it's perfect for talking about life experiences, recent news, and actions that still affect you now. You'll use it constantly in everyday conversation: 'Have you ever been to Tokyo?', 'I've just finished the book', 'She has lived here for ten years.'",
    rules: [
      {
        title: "Completed action with present relevance",
        structure: "Subject + have / has + past participle",
        examples: [
          "The server has crashed three times since this morning.",
          "We have deployed the patch to all workstations.",
        ],
      },
      {
        title: "Negative — action not completed yet",
        structure: "Subject + have / has + not + past participle",
        examples: [
          "The backup has not run successfully since last Tuesday.",
          "The user has not received the password reset email.",
        ],
      },
      {
        title: "Question — checking current state",
        structure: "Have / Has + subject + past participle ?",
        examples: [
          "Has the firewall rule been applied to the production environment?",
          "Have you rebooted the machine since the update was installed?",
        ],
      },
    ],
    itExamples: [
      { label: "In a support ticket update:", sentence: "The technician has identified the root cause of the issue.", grammarHighlight: "has identified" },
      { label: "In a status email:", sentence: "We have restored full connectivity to the Lyon branch office.", grammarHighlight: "have restored" },
      { label: "In a Teams chat:", sentence: "I have checked the event logs and found no critical errors.", grammarHighlight: "have checked" },
      { label: "Asking a user:", sentence: "Have you tried clearing the browser cache before logging in again?", grammarHighlight: "Have you tried" },
    ],
    generalExamples: [
      { label: "Talking about life experience:", sentence: "I have never been to Japan, but I'd really love to go one day.", grammarHighlight: "have never been" },
      { label: "Recent news:", sentence: "Have you heard? They have just announced a new restaurant downtown.", grammarHighlight: "have just announced" },
      { label: "At the doctor's:", sentence: "She has been feeling unwell since Monday morning.", grammarHighlight: "has been feeling" },
      { label: "Making conversation:", sentence: "I have lived in this city for five years now — I really love it.", grammarHighlight: "have lived" },
    ],
    quickTip: "Use present perfect when the RESULT matters now, not when it happened. 'The server crashed at 9am' (past simple) vs 'The server has crashed' (it affects us now).",
    commonMistake: "❌ 'We deployed the patch yesterday and it solved the issue.' → ✅ Use past simple when the time is specified: 'We deployed the patch at 14:00 and it resolved the issue.'",
  },

  {
    id: "conditionals",
    title: "Conditionals in IT Support",
    subtitle: "Troubleshooting steps, risks, and hypothetical solutions",
    category: "conditionals",
    level: "B1",
    estimatedMinutes: 10,
    xpReward: 70,
    icon: "🔀",
    intro: "Conditionals are essential in IT support conversations. You use them constantly to explain troubleshooting steps ('If you restart the service, the connection will drop'), to warn about risks ('If we update during peak hours, users will be affected'), and to describe hypothetical solutions. The two most useful types are Type 1 (real possibility) and Type 2 (hypothetical).",
    generalIntro: "Conditionals let you talk about possibilities, hypothetical situations, and consequences in everyday life. You'll use them for travel plans ('If you book early, you'll save money'), advice ('If I were you, I'd apologise'), and imagining different outcomes ('If I had more time, I'd learn Italian').",
    rules: [
      {
        title: "Type 1 — Real and likely condition",
        structure: "If + present simple, will + base verb",
        examples: [
          "If the DNS record propagates correctly, users will be able to access the site within the hour.",
          "If you restart the VPN client, it will reconnect automatically.",
        ],
      },
      {
        title: "Type 2 — Hypothetical or unlikely condition",
        structure: "If + past simple, would + base verb",
        examples: [
          "If we had a redundant domain controller, the outage would not have affected authentication.",
          "If the firewall allowed port 443 outbound, the sync would work correctly.",
        ],
      },
      {
        title: "Zero conditional — Always true rules and facts",
        structure: "If + present simple, present simple",
        examples: [
          "If the service account password expires, all dependent services stop automatically.",
          "If a user fails MFA three times, their account locks out.",
        ],
      },
    ],
    itExamples: [
      { label: "In a troubleshooting call:", sentence: "If you disable the antivirus temporarily, we can confirm whether it is blocking the connection.", grammarHighlight: "If you disable" },
      { label: "In an incident report:", sentence: "If the monitoring alert had triggered correctly, the team would have responded 30 minutes earlier.", grammarHighlight: "If the alert had triggered" },
      { label: "In a change request:", sentence: "If we apply the patch during the maintenance window, it will minimise the impact on users.", grammarHighlight: "If we apply" },
      { label: "Explaining a policy:", sentence: "If a machine is offline for more than 30 days, it automatically falls out of compliance.", grammarHighlight: "If a machine is offline" },
    ],
    generalExamples: [
      { label: "Travel planning:", sentence: "If you book your flights early, you'll get a much better deal.", grammarHighlight: "If you book" },
      { label: "Giving advice:", sentence: "If I were you, I'd apologise — she's clearly upset about what happened.", grammarHighlight: "If I were you" },
      { label: "Everyday fact:", sentence: "If you heat water to 100°C, it boils — it's just basic science.", grammarHighlight: "If you heat" },
      { label: "Imagining a different situation:", sentence: "If I had more free time, I would definitely learn to play the guitar.", grammarHighlight: "If I had" },
    ],
    quickTip: "Type 1 = a real plan or warning. Type 2 = a hypothetical idea or past regret. In IT support, Type 1 is the most common — use it for step-by-step troubleshooting.",
    commonMistake: "❌ 'If you will restart the server, it will fix the issue.' → ✅ 'If you restart the server, it will fix the issue.' (no 'will' in the If clause).",
  },

  {
    id: "modal-verbs",
    title: "Modal Verbs for IT Professionals",
    subtitle: "Recommendations, possibilities, obligations and polite requests",
    category: "modal-verbs",
    level: "B1",
    estimatedMinutes: 9,
    xpReward: 65,
    icon: "🎛️",
    intro: "Modal verbs are the tools that let you express degrees of certainty, give recommendations, describe obligations, and make polite requests — all critical in professional IT communication. Choosing the right modal changes the tone completely: 'You must restart' (obligation) vs 'You could restart' (suggestion) vs 'You should restart' (recommendation).",
    generalIntro: "Modal verbs are essential for everyday communication. They let you give advice ('You should see a doctor'), talk about possibilities ('It might rain later'), make polite requests ('Could you help me?'), and express obligation ('You must wear a seatbelt'). Getting these right makes your English sound both natural and polite.",
    rules: [
      {
        title: "Obligation and necessity",
        structure: "must / have to / need to + base verb",
        examples: [
          "The administrator must enable MFA for all privileged accounts.",
          "You need to reboot the server after applying this kernel patch.",
        ],
      },
      {
        title: "Recommendation and advice",
        structure: "should / ought to + base verb",
        examples: [
          "You should back up the configuration file before making any changes.",
          "We ought to escalate this to the security team given the severity.",
        ],
      },
      {
        title: "Possibility and deduction",
        structure: "might / may / could + base verb",
        examples: [
          "The latency issue could be caused by a misconfigured QoS policy.",
          "The account might have been locked out by a failed automated script.",
        ],
      },
      {
        title: "Polite requests in support",
        structure: "Could / Would / Can you + base verb ?",
        examples: [
          "Could you confirm the exact error message you are seeing?",
          "Would you be able to send me a screenshot of the issue?",
        ],
      },
    ],
    itExamples: [
      { label: "In a change advisory board:", sentence: "We should schedule the migration during the weekend maintenance window to minimise risk.", grammarHighlight: "should schedule" },
      { label: "Diagnosing a problem:", sentence: "The connectivity issue might be related to the recent firmware update on the switch.", grammarHighlight: "might be related" },
      { label: "In a support call:", sentence: "Could you open the Event Viewer and tell me if you see any red errors under System?", grammarHighlight: "Could you open" },
      { label: "In a security policy:", sentence: "All service accounts must have their passwords rotated every 90 days.", grammarHighlight: "must have" },
    ],
    generalExamples: [
      { label: "Giving health advice:", sentence: "You should see a doctor if the pain hasn't improved after a few days.", grammarHighlight: "should see" },
      { label: "Talking about the weather:", sentence: "It might rain this afternoon, so you could bring an umbrella just in case.", grammarHighlight: "might rain / could bring" },
      { label: "Polite request:", sentence: "Could you pass me the salt, please? And would you like some more bread?", grammarHighlight: "Could you pass" },
      { label: "Travel rule:", sentence: "You must carry your passport at all times when travelling internationally.", grammarHighlight: "must carry" },
    ],
    quickTip: "In formal IT communication, prefer 'should' over 'must' for recommendations — it sounds professional without being aggressive. Use 'must' only for true non-negotiable requirements.",
    commonMistake: "❌ 'The problem could be is a DNS issue.' → ✅ 'The problem could be a DNS issue.' (modal + base verb, never modal + is).",
  },

  {
    id: "passive-voice",
    title: "Passive Voice in IT Documentation",
    subtitle: "Incident reports, changelogs, and technical procedures",
    category: "passive-voice",
    level: "B1",
    estimatedMinutes: 8,
    xpReward: 60,
    icon: "📋",
    intro: "The passive voice is extremely common in IT documentation, incident reports, and changelogs. It shifts focus from WHO did the action to WHAT happened — which is often more important in technical writing. 'The server was rebooted at 02:00' is more professional than 'John rebooted the server at 02:00' in a formal report.",
    generalIntro: "The passive voice appears everywhere in everyday English — in news, announcements, signs, and formal writing. It lets you focus on what happened rather than who did it: 'The concert was cancelled', 'Breakfast is served until 10am', 'The Eiffel Tower was built in 1889'. It's especially useful when the 'doer' is unknown or unimportant.",
    rules: [
      {
        title: "Present passive — current state or ongoing process",
        structure: "is / are + past participle (+ by ...)",
        examples: [
          "All endpoints are managed by Microsoft Intune.",
          "The traffic is being routed through the backup ISP.",
        ],
      },
      {
        title: "Past passive — what happened during an incident",
        structure: "was / were + past participle (+ by ...)",
        examples: [
          "The patch was deployed to all servers during the maintenance window.",
          "The affected user accounts were locked as a precautionary measure.",
        ],
      },
      {
        title: "Perfect passive — reporting completed actions",
        structure: "has / have + been + past participle",
        examples: [
          "The root cause has been identified as a misconfigured firewall rule.",
          "All users have been notified of the scheduled downtime.",
        ],
      },
    ],
    itExamples: [
      { label: "In an incident report:", sentence: "The primary domain controller was restarted at 03:14 and services were restored within 12 minutes.", grammarHighlight: "was restarted / were restored" },
      { label: "In a change log:", sentence: "The SSL certificate has been renewed and the new expiry date is set for June 2027.", grammarHighlight: "has been renewed" },
      { label: "In a security bulletin:", sentence: "Two critical vulnerabilities were discovered in the VPN client and have been patched in version 7.4.2.", grammarHighlight: "were discovered / have been patched" },
      { label: "In a procedure document:", sentence: "New user accounts are provisioned automatically when a request is approved in the HR system.", grammarHighlight: "are provisioned / is approved" },
    ],
    generalExamples: [
      { label: "News headline:", sentence: "Three people were injured when the bridge was closed due to high winds.", grammarHighlight: "were injured / was closed" },
      { label: "At a hotel:", sentence: "Breakfast is served in the dining room from 7 to 10 am.", grammarHighlight: "is served" },
      { label: "Historical fact:", sentence: "The Eiffel Tower was built between 1887 and 1889 by Gustave Eiffel.", grammarHighlight: "was built" },
      { label: "Public notice:", sentence: "Bags must not be left unattended in the station at any time.", grammarHighlight: "must not be left" },
    ],
    quickTip: "Use passive when the action is more important than who did it, or when you don't know who did it. Avoid passive in spoken support — it sounds distant. Prefer it in written documentation.",
    commonMistake: "❌ 'The server has been restarted by me.' → ✅ Just say 'I restarted the server' in speech. Save passive for formal written reports.",
  },

  {
    id: "reported-speech",
    title: "Reported Speech in IT",
    subtitle: "Relaying user complaints, escalating issues, writing summaries",
    category: "reported-speech",
    level: "B2",
    estimatedMinutes: 10,
    xpReward: 80,
    icon: "💬",
    intro: "When you write a ticket summary, escalate an issue, or debrief your manager, you need to report what users and colleagues said. Reported speech lets you relay information professionally without quoting word-for-word. In IT, it's used constantly in incident summaries, escalation emails, and handover notes.",
    generalIntro: "Reported speech lets you pass on what someone said without quoting them directly. You'll use it constantly in everyday life: telling a friend what your doctor said, relaying a message from a colleague, or summarising what happened in a conversation. The key skill is shifting the tenses correctly when you report.",
    rules: [
      {
        title: "Reporting statements — tense shift back",
        structure: "Subject + said (that) + [shifted tense]",
        examples: [
          "The user said that she couldn't access SharePoint. (can → could)",
          "The network engineer reported that the BGP session had dropped. (dropped → had dropped)",
        ],
      },
      {
        title: "Reporting questions",
        structure: "Subject + asked + if/whether + [statement order]",
        examples: [
          "The manager asked whether the issue had been resolved. (Has it been resolved?)",
          "The user asked if they needed to restart their computer. (Do I need to restart?)",
        ],
      },
      {
        title: "Reporting requests and instructions",
        structure: "Subject + told / asked + object + to + base verb",
        examples: [
          "The technician told the user to clear the browser cache and try again.",
          "The security team asked all employees to change their passwords immediately.",
        ],
      },
    ],
    itExamples: [
      { label: "In a ticket escalation:", sentence: "The user reported that the application had been crashing every time she tried to open a PDF attachment.", grammarHighlight: "reported that / had been crashing" },
      { label: "In a handover note:", sentence: "The on-call engineer confirmed that the failover had completed successfully and that monitoring was back to normal.", grammarHighlight: "confirmed that / had completed" },
      { label: "In a post-incident summary:", sentence: "The branch manager asked whether users would be able to work normally the following morning.", grammarHighlight: "asked whether / would be able" },
      { label: "In an email to management:", sentence: "The vendor's support team advised us to upgrade to version 12.3 before applying the security patch.", grammarHighlight: "advised us to upgrade" },
    ],
    generalExamples: [
      { label: "Telling a friend:", sentence: "She said she was feeling much better and that she'd be back at work on Monday.", grammarHighlight: "said she was feeling" },
      { label: "Relaying a message:", sentence: "The receptionist told me that the doctor would be with me shortly.", grammarHighlight: "told me that / would be" },
      { label: "Summarising a conversation:", sentence: "He asked whether I had enjoyed the concert and if I would go again.", grammarHighlight: "asked whether / had enjoyed" },
      { label: "Passing on advice:", sentence: "My teacher advised me to practise speaking every day, even for just ten minutes.", grammarHighlight: "advised me to practise" },
    ],
    quickTip: "The key tense shifts: present → past, will → would, can → could, may → might, has → had. But if something is still true now, you can keep the present tense: 'She said the server IS still down.'",
    commonMistake: "❌ 'He said me that the network was fine.' → ✅ 'He told me that the network was fine.' (told + object) or 'He said that the network was fine.' (said, no object).",
  },

  {
    id: "connectors",
    title: "Connectors & Transitions in IT Writing",
    subtitle: "Structuring incident reports, proposals, and technical emails",
    category: "connectors",
    level: "B2",
    estimatedMinutes: 8,
    xpReward: 65,
    icon: "🔗",
    intro: "Professional IT writing — whether a post-incident report, a change proposal, or a technical email — requires clear logical flow. Connectors are the words and phrases that link your ideas and signal the relationship between them. Using the right connector makes the difference between a confusing report and a clear, professional one.",
    generalIntro: "Connectors are the glue of good English writing and speaking. They help you link ideas, show contrast, explain causes, and sequence events. Whether you're writing a travel blog, an email, or a university essay — or just telling a story to a friend — the right connector makes your English flow naturally and logically.",
    rules: [
      {
        title: "Contrast and unexpected results",
        structure: "However / Nevertheless / Although / Despite + clause",
        examples: [
          "The patch was applied successfully. However, the performance issue persisted.",
          "Although the firewall rule was updated, users were still unable to connect.",
        ],
      },
      {
        title: "Cause and consequence",
        structure: "Therefore / As a result / Consequently / Due to + clause",
        examples: [
          "The disk was at 99% capacity. As a result, the backup job failed silently.",
          "Due to the expired SSL certificate, all browser connections were flagged as insecure.",
        ],
      },
      {
        title: "Adding information",
        structure: "Furthermore / In addition / Moreover / Additionally + clause",
        examples: [
          "The server was misconfigured. Furthermore, no monitoring alert was in place to detect it.",
          "We recommend upgrading the firmware. Additionally, the VLAN configuration should be reviewed.",
        ],
      },
      {
        title: "Sequencing steps and events",
        structure: "First / Then / Subsequently / Finally + clause",
        examples: [
          "First, the backup staging directory was deleted. Then, the server was reimaged. Finally, data was restored from the previous night's backup.",
          "Subsequently, the affected user accounts were re-enabled and passwords were reset.",
        ],
      },
    ],
    itExamples: [
      { label: "In a post-incident report:", sentence: "The root cause was a failed cleanup script. Consequently, 800 GB of temporary files accumulated on the production volume.", grammarHighlight: "Consequently" },
      { label: "In a change proposal:", sentence: "The current firewall is end-of-life. Furthermore, it no longer receives security updates from the vendor.", grammarHighlight: "Furthermore" },
      { label: "In an escalation email:", sentence: "Although the service was restored within 15 minutes, three departments were unable to access shared drives during the outage.", grammarHighlight: "Although" },
      { label: "In a procedure document:", sentence: "First, verify that the backup completed successfully. Then, proceed with the OS upgrade.", grammarHighlight: "First / Then" },
    ],
    generalExamples: [
      { label: "Travel review:", sentence: "The hotel was beautifully located. However, the rooms were quite small and the Wi-Fi was unreliable.", grammarHighlight: "However" },
      { label: "Telling a story:", sentence: "First, we visited the old town. Then, we had lunch by the harbour. Finally, we watched the sunset from the hill.", grammarHighlight: "First / Then / Finally" },
      { label: "Explaining a decision:", sentence: "She missed her train. As a result, she arrived at the meeting an hour late.", grammarHighlight: "As a result" },
      { label: "Adding a point:", sentence: "The course was very expensive. Furthermore, it required a full day away from work each week.", grammarHighlight: "Furthermore" },
    ],
    quickTip: "Don't overuse connectors — one per paragraph is usually enough. 'However' and 'Therefore' are your most powerful tools in IT reports. Use them to highlight contrast and consequence.",
    commonMistake: "❌ 'The server crashed. Despite the patch was applied.' → ✅ 'The server crashed despite the patch being applied.' or 'The server crashed. Despite this, the patch had been applied.' (Despite + noun/gerund, not Despite + clause).",
  },

  {
    id: "questions-it",
    title: "Asking Effective Questions in IT Support",
    subtitle: "Open questions, polite clarification, and diagnostic questions",
    category: "questions",
    level: "B1",
    estimatedMinutes: 7,
    xpReward: 55,
    icon: "❓",
    intro: "Asking good questions is a core IT support skill. The way you phrase a question affects whether the user gives you useful information, stays calm, and trusts you. English has specific structures for different types of questions — diagnostic, clarifying, polite — and each has its place in a support conversation.",
    generalIntro: "Asking questions well is one of the most important skills in English conversation. Whether you're making plans, ordering in a restaurant, chatting with someone new, or navigating a foreign country, knowing how to form questions correctly — and politely — will take you a long way.",
    rules: [
      {
        title: "Open diagnostic questions",
        structure: "What / When / How long / How often + auxiliary + subject + verb ?",
        examples: [
          "When did the issue first occur — was it before or after the Windows update?",
          "How long has the printer been showing this error message?",
        ],
      },
      {
        title: "Polite clarifying questions",
        structure: "Could you + base verb ... ? / Would you mind + gerund ... ?",
        examples: [
          "Could you describe exactly what happens when you click the button?",
          "Would you mind sending me a screenshot of the error screen?",
        ],
      },
      {
        title: "Yes/No diagnostic questions",
        structure: "Have / Has / Did / Is / Are + subject + verb ... ?",
        examples: [
          "Has this issue occurred before, or is this the first time?",
          "Did you receive any error notification before the system went offline?",
        ],
      },
    ],
    itExamples: [
      { label: "Opening a support call:", sentence: "Could you walk me through exactly what you were doing when the error appeared?", grammarHighlight: "Could you walk me through" },
      { label: "Narrowing down the cause:", sentence: "Is the issue affecting just your machine, or have your colleagues reported the same problem?", grammarHighlight: "Is the issue / have your colleagues reported" },
      { label: "After a user restart:", sentence: "Has the error appeared again since you restarted, or does the system seem to be working normally now?", grammarHighlight: "Has the error appeared" },
      { label: "Checking impact:", sentence: "How many users in your department are currently experiencing this issue?", grammarHighlight: "How many users" },
    ],
    generalExamples: [
      { label: "At a restaurant:", sentence: "Could you tell me what today's specials are, please?", grammarHighlight: "Could you tell me" },
      { label: "Making plans:", sentence: "When are you free this week? Would Thursday evening work for you?", grammarHighlight: "When are you free" },
      { label: "Meeting someone new:", sentence: "Have you been to this part of the city before? What do you think of it?", grammarHighlight: "Have you been" },
      { label: "At the doctor's:", sentence: "How long have you been experiencing these symptoms? Does it get worse at night?", grammarHighlight: "How long have you been" },
    ],
    quickTip: "Start with open questions ('What happened?', 'How long?') to gather context, then narrow down with yes/no questions ('Is it just you?', 'Did it start today?'). This mirrors how a doctor takes a patient history.",
    commonMistake: "❌ 'When it started?' → ✅ 'When did it start?' (Always need auxiliary verb in English questions — you can't just invert the subject).",
  },

  {
    id: "imperatives",
    title: "Imperatives & Instructions in IT",
    subtitle: "Step-by-step guides, procedures, and support instructions",
    category: "imperatives",
    level: "B1",
    estimatedMinutes: 6,
    xpReward: 50,
    icon: "📌",
    intro: "Giving clear, unambiguous instructions is one of the most important communication skills in IT support. Whether you're guiding a user over the phone, writing a runbook, or documenting a procedure, the imperative form lets you state each step directly and professionally. The key is balancing clarity with politeness.",
    generalIntro: "Imperatives are used every day in English — in recipes, travel guides, signs, and conversations. They let you give directions ('Turn left at the roundabout'), offer instructions ('Add the eggs and mix well'), make requests ('Please take a seat'), and issue warnings ('Don't forget your passport!'). They're direct, clear, and easy to use.",
    rules: [
      {
        title: "Basic imperative — direct instruction",
        structure: "Base verb + object/complement",
        examples: [
          "Open the Settings menu and navigate to the Accounts section.",
          "Restart the VPN client and wait 30 seconds before reconnecting.",
        ],
      },
      {
        title: "Polite imperative — adding please or softeners",
        structure: "Please + base verb / Could you please + base verb",
        examples: [
          "Please hold the power button for 10 seconds until the device turns off completely.",
          "Could you please confirm your username so I can locate your account?",
        ],
      },
      {
        title: "Negative imperative — warning the user",
        structure: "Do not / Don't + base verb",
        examples: [
          "Do not click anything on the suspicious email — close it immediately.",
          "Don't shut down the server until the backup has fully completed.",
        ],
      },
    ],
    itExamples: [
      { label: "On a support call:", sentence: "Click the Start menu, type 'cmd', right-click on Command Prompt, and select 'Run as administrator'.", grammarHighlight: "Click / type / right-click / select" },
      { label: "In a security alert:", sentence: "Do not open any attachments in emails from unknown senders and report suspicious messages to security@company.com immediately.", grammarHighlight: "Do not open / report" },
      { label: "In a runbook:", sentence: "Verify that the backup completed successfully before proceeding with the next step.", grammarHighlight: "Verify / proceeding" },
      { label: "During an incident:", sentence: "Unplug the network cable from the infected machine immediately — do not shut it down.", grammarHighlight: "Unplug / do not shut" },
    ],
    generalExamples: [
      { label: "In a recipe:", sentence: "Preheat the oven to 180°C, then mix the flour and butter together until crumbly.", grammarHighlight: "Preheat / mix" },
      { label: "Travel tip:", sentence: "Don't forget to book your accommodation in advance — it gets very busy in summer.", grammarHighlight: "Don't forget" },
      { label: "In a waiting room:", sentence: "Please take a number and wait to be called. Do not approach the counter before your number is shown.", grammarHighlight: "Please take / Do not approach" },
      { label: "Giving directions:", sentence: "Turn left at the roundabout, go straight for about 200 metres, then take the first right.", grammarHighlight: "Turn / go / take" },
    ],
    quickTip: "When guiding a non-technical user, add 'Please' and explain WHY after each instruction: 'Please restart the PC — this will clear the stuck process.' It builds trust and gets better cooperation.",
    commonMistake: "❌ 'You should to click here and then you restart.' → ✅ 'Click here, then restart the machine.' (Imperatives are cleaner and clearer in step-by-step instructions).",
  },
]

export function getLessonById(id: string): GrammarLesson | undefined {
  return grammarLessons.find((l) => l.id === id)
}
