import type { CEFRLevel } from "@/lib/utils"

export type GeneralConversationCategory =
  | "daily-life"
  | "travel"
  | "food-restaurant"
  | "health"
  | "social"
  | "work-general"

export interface GrammarNoteGeneral {
  triggerPhrase: string
  correction: string
  betterAlternative?: string
  explanation: string
}

export interface VocabHighlightGeneral {
  word: string
  phonetic: string
  definition: string
}

export interface ConversationTurnGeneral {
  id: string
  role: "user" | "ai"
  content: string
  delayMs?: number
  grammarNote?: GrammarNoteGeneral
  vocabularyHighlights?: VocabHighlightGeneral[]
  suggestedReplies?: string[]
}

export interface ConversationScenarioGeneral {
  id: string
  title: string
  description: string
  difficulty: CEFRLevel
  estimatedMinutes: number
  category: GeneralConversationCategory
  context: string
  userRole: string
  aiRole: string
  aiName: string
  aiAvatar: string
  tags: string[]
  xpReward: number
  script: ConversationTurnGeneral[]
}

export const CATEGORY_META_GENERAL: Record<GeneralConversationCategory, { label: string; color: string; bg: string; border: string }> = {
  "daily-life":      { label: "Daily Life",      color: "text-sky-400",     bg: "bg-sky-400/10",     border: "border-sky-400/25" },
  "travel":          { label: "Travel",           color: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/25" },
  "food-restaurant": { label: "Food & Restaurant",color: "text-orange-400",  bg: "bg-orange-400/10",  border: "border-orange-400/25" },
  "health":          { label: "Health",           color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/25" },
  "social":          { label: "Social",           color: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/25" },
  "work-general":    { label: "Work & Career",    color: "text-brand-400",   bg: "bg-brand-400/10",   border: "border-brand-400/25" },
}

export const conversationsGeneral: ConversationScenarioGeneral[] = [

  // ─── 1. Restaurant ────────────────────────────────────────────────────────────
  {
    id: "gen-restaurant-01",
    title: "Ordering at a Restaurant",
    description: "Practice ordering food and handling common restaurant situations in English.",
    difficulty: "A2",
    estimatedMinutes: 8,
    category: "food-restaurant",
    context: "You are at a mid-range restaurant for dinner. The waiter approaches your table to take your order.",
    userRole: "Customer",
    aiRole: "Waiter",
    aiName: "James",
    aiAvatar: "👨‍🍳",
    tags: ["ordering","food","restaurant","dining"],
    xpReward: 60,
    script: [
      {
        id: "r1-1",
        role: "ai",
        content: "Good evening! Welcome to The Green Table. My name is James and I'll be your server tonight. Can I start you off with something to drink?",
        delayMs: 600,
        vocabularyHighlights: [
          { word: "server", phonetic: "/ˈsɜːrvər/", definition: "A waiter or waitress in a restaurant." }
        ],
        suggestedReplies: [
          "Could I have a glass of sparkling water, please?",
          "I'd like a glass of red wine to start.",
          "Just tap water for now, thank you."
        ]
      },
      {
        id: "r1-2",
        role: "user",
        content: "Could I have a glass of sparkling water, please?",
      },
      {
        id: "r1-3",
        role: "ai",
        content: "Of course! And are you ready to order, or would you like a few more minutes to look at the menu?",
        delayMs: 500,
        suggestedReplies: [
          "I think I'm ready. I'd like the grilled salmon, please.",
          "Could you tell me about today's specials?",
          "I need a couple more minutes, if that's okay."
        ]
      },
      {
        id: "r1-4",
        role: "user",
        content: "Could you tell me about today's specials?",
      },
      {
        id: "r1-5",
        role: "ai",
        content: "Certainly! Tonight we have pan-seared duck breast with a cherry reduction, served with roasted vegetables. And for vegetarians, we have a butternut squash risotto. Both come with your choice of side dish.",
        delayMs: 800,
        vocabularyHighlights: [
          { word: "pan-seared", phonetic: "/pæn sɪrd/", definition: "Cooked quickly in a hot pan with a small amount of oil." },
          { word: "reduction", phonetic: "/rɪˈdʌkʃən/", definition: "A sauce made by simmering a liquid until it thickens." }
        ],
        suggestedReplies: [
          "The duck sounds lovely. I'll have that, please.",
          "I'll go with the risotto. What are the side options?",
          "I think I'll stick with the menu. I'd like the grilled chicken."
        ]
      },
      {
        id: "r1-6",
        role: "user",
        content: "I'll go with the risotto. What are the side options?",
        grammarNote: {
          triggerPhrase: "I'll go with",
          correction: "'I'll go with' is perfectly natural.",
          betterAlternative: "You can also say 'I'd like the risotto' or 'I'll have the risotto'.",
          explanation: "'I'll go with X' is a common informal way to express a choice, especially in restaurants."
        }
      },
      {
        id: "r1-7",
        role: "ai",
        content: "Great choice! For sides you can have a green salad, French fries, or seasonal vegetables. Which would you prefer?",
        delayMs: 500,
        suggestedReplies: [
          "I'll have the seasonal vegetables, please.",
          "French fries for me, thank you.",
          "A green salad would be perfect."
        ]
      },
      {
        id: "r1-8",
        role: "user",
        content: "A green salad would be perfect.",
      },
      {
        id: "r1-9",
        role: "ai",
        content: "Excellent! I'll put that order in for you right away. Your sparkling water will be with you shortly. Is there anything else you need?",
        delayMs: 600,
        suggestedReplies: [
          "Could we also have some bread while we wait?",
          "No, that's everything, thank you.",
          "Could I also see the wine list?"
        ]
      },
      {
        id: "r1-10",
        role: "user",
        content: "Could we also have some bread while we wait?",
      },
      {
        id: "r1-11",
        role: "ai",
        content: "Of course! I'll bring that straight over. Enjoy your evening!",
        delayMs: 400,
      }
    ]
  },

  // ─── 2. Hotel Check-in ────────────────────────────────────────────────────────
  {
    id: "gen-hotel-01",
    title: "Checking into a Hotel",
    description: "Handle the check-in process at a hotel, including common requests and problems.",
    difficulty: "A2",
    estimatedMinutes: 8,
    category: "travel",
    context: "You arrive at your hotel after a long flight. You approach the reception desk to check in.",
    userRole: "Guest",
    aiRole: "Receptionist",
    aiName: "Sophie",
    aiAvatar: "🏨",
    tags: ["hotel","travel","check-in","accommodation"],
    xpReward: 65,
    script: [
      {
        id: "h1-1",
        role: "ai",
        content: "Good afternoon! Welcome to The Grand View Hotel. Do you have a reservation with us?",
        delayMs: 500,
        vocabularyHighlights: [
          { word: "reservation", phonetic: "/ˌrɛzərˈveɪʃən/", definition: "An advance booking of a room or service." }
        ],
        suggestedReplies: [
          "Yes, I have a booking under the name Martin.",
          "I do — it's under Johnson, first name Alex.",
          "Yes, I booked online last week."
        ]
      },
      {
        id: "h1-2",
        role: "user",
        content: "Yes, I have a booking under the name Martin.",
      },
      {
        id: "h1-3",
        role: "ai",
        content: "Let me pull that up for you... Yes, I can see a reservation for two nights — a standard double room with breakfast included. Could I see your passport or ID, please?",
        delayMs: 700,
        vocabularyHighlights: [
          { word: "pull that up", phonetic: "/pʊl ðæt ʌp/", definition: "To retrieve information on a computer screen." }
        ],
        suggestedReplies: [
          "Of course, here you go.",
          "Sure, here's my passport.",
          "I only have my driving licence — is that okay?"
        ]
      },
      {
        id: "h1-4",
        role: "user",
        content: "Of course, here you go.",
      },
      {
        id: "h1-5",
        role: "ai",
        content: "Thank you. And could I take a credit card for the incidentals, please? We place a small hold which is released at check-out.",
        delayMs: 600,
        vocabularyHighlights: [
          { word: "incidentals", phonetic: "/ˌɪnsɪˈdɛntlz/", definition: "Additional charges such as room service or minibar use." },
          { word: "hold", phonetic: "/hoʊld/", definition: "A temporary block on funds on a card as security." }
        ],
        suggestedReplies: [
          "Yes, here's my credit card.",
          "Is a debit card okay?",
          "Of course. How much is the hold?"
        ]
      },
      {
        id: "h1-6",
        role: "user",
        content: "Of course. How much is the hold?",
      },
      {
        id: "h1-7",
        role: "ai",
        content: "It's just £50 as a security deposit. It will be released within 48 hours of check-out. Your room is ready — you're in room 412 on the fourth floor. Here are your key cards.",
        delayMs: 800,
        suggestedReplies: [
          "Thank you. What time is breakfast served?",
          "Is there a gym in the hotel?",
          "Could I get a wake-up call for 7 am?"
        ]
      },
      {
        id: "h1-8",
        role: "user",
        content: "Thank you. What time is breakfast served?",
      },
      {
        id: "h1-9",
        role: "ai",
        content: "Breakfast is served from 7 to 10:30 am in the dining room on the ground floor. The lift is to your left. Enjoy your stay, and don't hesitate to call reception if you need anything!",
        delayMs: 700,
        vocabularyHighlights: [
          { word: "don't hesitate", phonetic: "/doʊnt ˈhɛzɪteɪt/", definition: "Feel free to — a polite way of saying 'please do'." }
        ],
        suggestedReplies: [
          "Thank you, that's very helpful.",
          "One more thing — is there parking available?",
          "Perfect, thank you very much."
        ]
      }
    ]
  },

  // ─── 3. Doctor Appointment ───────────────────────────────────────────────────
  {
    id: "gen-doctor-01",
    title: "At the Doctor's",
    description: "Describe symptoms and understand medical advice during a doctor's appointment.",
    difficulty: "B1",
    estimatedMinutes: 10,
    category: "health",
    context: "You are at the doctor's surgery feeling unwell. The doctor calls you in for your appointment.",
    userRole: "Patient",
    aiRole: "Doctor",
    aiName: "Dr. Williams",
    aiAvatar: "👨‍⚕️",
    tags: ["health","medical","symptoms","doctor"],
    xpReward: 80,
    script: [
      {
        id: "d1-1",
        role: "ai",
        content: "Hello, come in and take a seat. So, what seems to be the problem today?",
        delayMs: 500,
        suggestedReplies: [
          "I've had a sore throat and a fever for the past three days.",
          "I've been feeling really tired and I have a bad headache.",
          "I've been having chest pains and I'm a bit worried."
        ]
      },
      {
        id: "d1-2",
        role: "user",
        content: "I've had a sore throat and a fever for the past three days.",
      },
      {
        id: "d1-3",
        role: "ai",
        content: "I see. Have you noticed any other symptoms — a runny nose, a cough, or any difficulty swallowing?",
        delayMs: 600,
        vocabularyHighlights: [
          { word: "difficulty swallowing", phonetic: "/ˈdɪfɪkəlti ˈswɒloʊɪŋ/", definition: "Pain or discomfort when swallowing food or liquid." }
        ],
        suggestedReplies: [
          "Yes, I have a cough and it hurts when I swallow.",
          "I have a runny nose but no cough.",
          "Not really, just the sore throat and fever."
        ]
      },
      {
        id: "d1-4",
        role: "user",
        content: "Yes, I have a cough and it hurts when I swallow.",
      },
      {
        id: "d1-5",
        role: "ai",
        content: "How high has the fever been? And have you taken anything for it so far?",
        delayMs: 500,
        suggestedReplies: [
          "It's been around 38.5 degrees. I've been taking paracetamol.",
          "About 39 degrees. I haven't taken anything yet.",
          "I'm not sure — I don't have a thermometer."
        ]
      },
      {
        id: "d1-6",
        role: "user",
        content: "It's been around 38.5 degrees. I've been taking paracetamol.",
        grammarNote: {
          triggerPhrase: "I've been taking",
          correction: "Perfect use of the present perfect continuous!",
          betterAlternative: undefined,
          explanation: "We use 'have been + -ing' to describe an action that started in the past and is still ongoing. 'I've been taking paracetamol' is exactly right here."
        }
      },
      {
        id: "d1-7",
        role: "ai",
        content: "Good. Let me have a look at your throat... Yes, it's quite red and inflamed. I think this might be a bacterial throat infection — what we call tonsillitis. I'm going to prescribe you a course of antibiotics. It's important that you complete the full course, even if you start feeling better.",
        delayMs: 1000,
        vocabularyHighlights: [
          { word: "inflamed", phonetic: "/ɪnˈfleɪmd/", definition: "Red, swollen, and painful due to infection or injury." },
          { word: "prescribe", phonetic: "/prɪˈskraɪb/", definition: "To officially authorize a medicine for a patient." },
          { word: "antibiotics", phonetic: "/ˌæntɪbaɪˈɒtɪks/", definition: "Medicines that kill bacterial infections." }
        ],
        suggestedReplies: [
          "How long should I take them for?",
          "Are there any side effects I should know about?",
          "Should I take time off work?"
        ]
      },
      {
        id: "d1-8",
        role: "user",
        content: "Are there any side effects I should know about?",
      },
      {
        id: "d1-9",
        role: "ai",
        content: "The most common side effects are mild nausea or an upset stomach. Taking the tablets with food should help with that. Come back to see me if you're not feeling better in five days, or sooner if things get worse.",
        delayMs: 800,
        vocabularyHighlights: [
          { word: "nausea", phonetic: "/ˈnɔːziə/", definition: "A feeling of sickness and the urge to vomit." }
        ],
        suggestedReplies: [
          "Thank you, doctor. Should I rest at home?",
          "Is there anything else I can do to recover faster?",
          "Thank you, that's very helpful."
        ]
      }
    ]
  },

  // ─── 4. Job Interview ────────────────────────────────────────────────────────
  {
    id: "gen-interview-01",
    title: "Job Interview in English",
    description: "Practice answering common interview questions confidently and professionally.",
    difficulty: "B2",
    estimatedMinutes: 12,
    category: "work-general",
    context: "You are being interviewed for a position at an international company. The interviewer has just welcomed you.",
    userRole: "Candidate",
    aiRole: "Interviewer",
    aiName: "Ms. Clarke",
    aiAvatar: "👩‍💼",
    tags: ["interview","career","professional","speaking"],
    xpReward: 100,
    script: [
      {
        id: "i1-1",
        role: "ai",
        content: "Good morning! Thank you for coming in today. Please take a seat. I'm Sarah Clarke from HR. To start, could you tell me a little bit about yourself?",
        delayMs: 600,
        vocabularyHighlights: [
          { word: "HR", phonetic: "/eɪtʃ ɑːr/", definition: "Human Resources — the department that manages employees." }
        ],
        suggestedReplies: [
          "Of course. I have five years of experience in project management, most recently at a tech startup.",
          "Certainly. I studied business administration and have been working in marketing for three years.",
          "Sure. I'm a software developer with experience in both front-end and back-end development."
        ]
      },
      {
        id: "i1-2",
        role: "user",
        content: "Of course. I have five years of experience in project management, most recently at a tech startup.",
      },
      {
        id: "i1-3",
        role: "ai",
        content: "That's great. And what attracted you to this particular role and our company?",
        delayMs: 500,
        suggestedReplies: [
          "I've been following your company's growth and I'm impressed by your commitment to innovation.",
          "The role aligns perfectly with my skills, and I'm excited by the international scope of the position.",
          "I'm drawn to your company culture and the opportunity to work on challenging projects."
        ]
      },
      {
        id: "i1-4",
        role: "user",
        content: "The role aligns perfectly with my skills, and I'm excited by the international scope of the position.",
        grammarNote: {
          triggerPhrase: "aligns perfectly with",
          correction: "Excellent professional vocabulary!",
          betterAlternative: undefined,
          explanation: "'Align with' is a strong business expression meaning 'to match' or 'to be in agreement with'. It's widely used in formal and professional contexts."
        }
      },
      {
        id: "i1-5",
        role: "ai",
        content: "Good. Can you give me an example of a challenging situation you faced at work and how you handled it?",
        delayMs: 600,
        vocabularyHighlights: [
          { word: "challenging situation", phonetic: "/ˈtʃælɪndʒɪŋ ˌsɪtʃuˈeɪʃən/", definition: "A difficult problem or circumstance that requires effort to overcome." }
        ],
        suggestedReplies: [
          "Certainly. In my last role, we had a major project deadline moved forward by two weeks. I reorganised the team's priorities and we delivered on time.",
          "Sure. I once had to manage a conflict between two team members. I arranged a mediation meeting and we found a solution together.",
          "Yes. When our main supplier fell through last minute, I sourced an alternative within 24 hours to avoid delays."
        ]
      },
      {
        id: "i1-6",
        role: "user",
        content: "In my last role, we had a major project deadline moved forward by two weeks. I reorganised the team's priorities and we delivered on time.",
      },
      {
        id: "i1-7",
        role: "ai",
        content: "Impressive. Finally, where do you see yourself in five years?",
        delayMs: 500,
        suggestedReplies: [
          "I'd like to grow into a senior management role and contribute to the company's strategic direction.",
          "I hope to have developed deep expertise in this field and be mentoring junior colleagues.",
          "I see myself taking on more responsibility and leading larger projects with a cross-functional team."
        ]
      },
      {
        id: "i1-8",
        role: "user",
        content: "I'd like to grow into a senior management role and contribute to the company's strategic direction.",
      },
      {
        id: "i1-9",
        role: "ai",
        content: "That sounds very ambitious. Do you have any questions for me?",
        delayMs: 500,
        suggestedReplies: [
          "Yes — what does the onboarding process look like?",
          "Could you tell me more about the team I'd be working with?",
          "What are the biggest challenges someone in this role typically faces?"
        ]
      },
      {
        id: "i1-10",
        role: "user",
        content: "Could you tell me more about the team I'd be working with?",
      },
      {
        id: "i1-11",
        role: "ai",
        content: "Of course. You'd be joining a team of eight, working closely with both the operations and sales departments. It's a collaborative, fast-paced environment. We'll be in touch about next steps — thank you so much for coming in!",
        delayMs: 800,
        vocabularyHighlights: [
          { word: "fast-paced", phonetic: "/fɑːst peɪst/", definition: "Moving or happening quickly; requiring quick reactions." },
          { word: "be in touch", phonetic: "/biː ɪn tʌtʃ/", definition: "To contact someone again." }
        ]
      }
    ]
  },

  // ─── 5. Making Plans with Friends ────────────────────────────────────────────
  {
    id: "gen-social-01",
    title: "Making Plans with Friends",
    description: "Practice suggesting activities, negotiating times, and making informal plans.",
    difficulty: "A2",
    estimatedMinutes: 7,
    category: "social",
    context: "You're texting your friend Sam to make plans for the weekend. Sam calls you to discuss.",
    userRole: "Yourself",
    aiRole: "Friend",
    aiName: "Sam",
    aiAvatar: "🧑‍🤝‍🧑",
    tags: ["social","friends","planning","informal"],
    xpReward: 50,
    script: [
      {
        id: "s1-1",
        role: "ai",
        content: "Hey! I saw your message. You want to do something this weekend? I'm free on Saturday and Sunday afternoon.",
        delayMs: 400,
        suggestedReplies: [
          "Great! How about we go to that new café everyone's been talking about?",
          "Yeah! Do you fancy going for a hike on Saturday?",
          "Perfect. Maybe we could see a film and grab dinner afterwards?"
        ]
      },
      {
        id: "s1-2",
        role: "user",
        content: "Great! How about we go to that new café everyone's been talking about?",
      },
      {
        id: "s1-3",
        role: "ai",
        content: "Oh, I've heard it's really good! What's it called again? Is it the one on George Street?",
        delayMs: 500,
        suggestedReplies: [
          "Yes, that's the one — Bloom & Roast. Apparently the brunch is amazing.",
          "I think so. Let me check — yeah, it's called The Corner Cup.",
          "I'm not sure of the name, but I can look it up."
        ]
      },
      {
        id: "s1-4",
        role: "user",
        content: "Yes, that's the one — Bloom & Roast. Apparently the brunch is amazing.",
        vocabularyHighlights: [
          { word: "apparently", phonetic: "/əˈpærəntli/", definition: "Used when reporting something you heard but can't confirm yourself." }
        ]
      },
      {
        id: "s1-5",
        role: "ai",
        content: "Sounds brilliant! Should we go on Saturday morning then? I could meet you there around 11?",
        delayMs: 500,
        suggestedReplies: [
          "11 works perfectly for me. See you there!",
          "Could we make it 11:30 instead? I have something in the morning.",
          "Actually, Sunday would work better for me — are you free then too?"
        ]
      },
      {
        id: "s1-6",
        role: "user",
        content: "Could we make it 11:30 instead? I have something in the morning.",
      },
      {
        id: "s1-7",
        role: "ai",
        content: "11:30 is fine with me! Should I book a table, or do you think we can just turn up?",
        delayMs: 400,
        vocabularyHighlights: [
          { word: "turn up", phonetic: "/tɜːrn ʌp/", definition: "To arrive somewhere without a prior booking or appointment." }
        ],
        suggestedReplies: [
          "Better to book — it might be busy on a Saturday. I'll do it now.",
          "I think we'll be fine just turning up, especially at that time.",
          "Let me check their website and I'll let you know."
        ]
      },
      {
        id: "s1-8",
        role: "user",
        content: "Better to book — it might be busy on a Saturday. I'll do it now.",
      },
      {
        id: "s1-9",
        role: "ai",
        content: "Perfect! Let me know what they say. Can't wait — it's been ages since we've caught up properly!",
        delayMs: 400,
        vocabularyHighlights: [
          { word: "it's been ages", phonetic: "/ɪts biːn eɪdʒɪz/", definition: "An informal expression meaning 'it has been a very long time'." }
        ],
        suggestedReplies: [
          "I know! It'll be great to catch up. I'll send you the confirmation.",
          "Same! I have so much to tell you. I'll text you once it's booked.",
          "Totally! Looking forward to it already."
        ]
      }
    ]
  },

  // ─── 6. Renting a Flat ───────────────────────────────────────────────────────
  {
    id: "gen-dailylife-01",
    title: "Enquiring About a Flat to Rent",
    description: "Practice asking questions and negotiating when looking for accommodation.",
    difficulty: "B1",
    estimatedMinutes: 10,
    category: "daily-life",
    context: "You saw a flat listing online and called the estate agent to find out more.",
    userRole: "Potential Tenant",
    aiRole: "Estate Agent",
    aiName: "David",
    aiAvatar: "🏠",
    tags: ["housing","renting","flat","accommodation"],
    xpReward: 75,
    script: [
      {
        id: "f1-1",
        role: "ai",
        content: "Good afternoon, Prestige Properties, David speaking. How can I help you?",
        delayMs: 400,
        suggestedReplies: [
          "Hi, I'm calling about the two-bedroom flat on Maple Street. Is it still available?",
          "Hello, I saw your listing for a flat on Church Road. Could you tell me more about it?",
          "Hi, I'm interested in the apartment you advertised online."
        ]
      },
      {
        id: "f1-2",
        role: "user",
        content: "Hi, I'm calling about the two-bedroom flat on Maple Street. Is it still available?",
      },
      {
        id: "f1-3",
        role: "ai",
        content: "Yes, it's still available! It's a lovely flat on the second floor — two double bedrooms, a modern fitted kitchen, and a private balcony. It's available from the first of next month. Were you looking for somewhere long-term?",
        delayMs: 800,
        vocabularyHighlights: [
          { word: "fitted kitchen", phonetic: "/ˈfɪtɪd ˈkɪtʃɪn/", definition: "A kitchen with built-in units and appliances." },
          { word: "long-term", phonetic: "/lɒŋ tɜːrm/", definition: "Over a long period of time, typically more than 6 months." }
        ],
        suggestedReplies: [
          "Yes, I'm looking for at least 12 months. What's the monthly rent?",
          "Ideally yes. Is the landlord open to a shorter lease?",
          "Yes, definitely. Are bills included in the rent?"
        ]
      },
      {
        id: "f1-4",
        role: "user",
        content: "Yes, I'm looking for at least 12 months. What's the monthly rent?",
      },
      {
        id: "f1-5",
        role: "ai",
        content: "The rent is £1,400 per month, which doesn't include utilities. A deposit of six weeks' rent is required upfront. There's also a referencing fee. Have you rented before?",
        delayMs: 700,
        vocabularyHighlights: [
          { word: "deposit", phonetic: "/dɪˈpɒzɪt/", definition: "Money paid upfront as security, returned if no damage is caused." },
          { word: "referencing fee", phonetic: "/ˈrɛfrənsɪŋ fiː/", definition: "A charge for checking a tenant's employment and credit history." }
        ],
        suggestedReplies: [
          "Yes, I have. Could I arrange a viewing this week?",
          "Is there any flexibility on the rent?",
          "Six weeks' deposit seems steep. Is that negotiable?"
        ]
      },
      {
        id: "f1-6",
        role: "user",
        content: "Is there any flexibility on the rent?",
      },
      {
        id: "f1-7",
        role: "ai",
        content: "I can have a word with the landlord, but I don't think there's much room to move on the price — it's already competitively priced for the area. What I can do is arrange a viewing so you can see it for yourself. When would suit you?",
        delayMs: 800,
        vocabularyHighlights: [
          { word: "have a word with", phonetic: "/hæv ə wɜːrd wɪð/", definition: "To speak briefly to someone about something." },
          { word: "competitively priced", phonetic: "/kəmˈpɛtɪtɪvli praɪst/", definition: "Priced fairly compared to similar options on the market." }
        ],
        suggestedReplies: [
          "Could I come and see it on Thursday afternoon?",
          "Would Saturday morning work?",
          "I'm free any day this week after 5 pm."
        ]
      },
      {
        id: "f1-8",
        role: "user",
        content: "Could I come and see it on Thursday afternoon?",
      },
      {
        id: "f1-9",
        role: "ai",
        content: "Thursday at 3 pm works perfectly. I'll send you the exact address by email. Could I take your name and contact number?",
        delayMs: 500,
        suggestedReplies: [
          "Of course. It's Alex Martin and my number is 07890 123456.",
          "Sure — the name is Jordan Lee, and you can reach me on 07712 345678.",
          "Yes, it's Sam Taylor. Let me give you my email instead."
        ]
      }
    ]
  },
]
