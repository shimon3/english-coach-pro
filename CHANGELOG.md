# Changelog — English Coach Pro

---

## [2026-06-14]

### 🐛 Bugs corrigés

- **Flashcards — session vide au premier lancement**
  - `app/vocabulary/flashcards/page.tsx` — ajout d'un `useEffect` qui appelle `restart()` une fois le deck chargé. Le hook s'initialisait avec un tableau vide et posait `isComplete: true` avant que les mots soient prêts.

- **Dashboard — "Continue Learning" pointait vers une page vide**
  - `data/user.ts` — "Writing Help Desk Reports" redirige maintenant vers `/conversations` au lieu de `/it-english`.
  - `data/user.ts` — "Mastering the TH Sound" redirige maintenant vers `/vocabulary` au lieu de `/pronunciation`.

- **Pages placeholder — UX morte**
  - `app/grammar/page.tsx` — message clair + lien vers Conversations.
  - `app/pronunciation/page.tsx` — message clair + lien vers Vocabulaire.
  - `app/listening/page.tsx` — message clair + lien vers Conversations.
  - `app/it-english/page.tsx` — message clair + liens vers Conversations et Vocabulaire.

---

### ✨ Nouvelles fonctionnalités

#### Persistance des données (XP + Streak)
- `lib/hooks/useStreak.ts` — nouveau hook : lecture/écriture du streak en localStorage (`ecp-streak`). Logique automatique : jour consécutif → +1, gap → reset à 1.
- `lib/hooks/useXPSync.ts` — `addXP()` appelle maintenant `markActiveToday()` à chaque gain d'XP.
- `components/dashboard/DashboardProgress.tsx` — nouveau wrapper client qui lit streak + XP depuis localStorage et rend WelcomeBanner + StreakCard avec les valeurs live.
- `app/dashboard/page.tsx` — utilise `DashboardProgress` au lieu des valeurs hardcodées.
- `components/profile/LiveStats.tsx` — nouveau wrapper client pour la page profil (streak + XP live).
- `app/profile/page.tsx` — utilise `LiveStats`.

#### Settings profil fonctionnels
- `lib/hooks/useSettings.ts` — nouveau hook : sauvegarde les préférences en localStorage (`ecp-settings`). Champs : `dailyGoalXP`, `preferredAccent`, `remindersEnabled`.
- `components/profile/SettingsPanel.tsx` — nouveau composant client : Daily Goal (4 options), Preferred Accent (US/UK/AU/CA), toggle Reminders. Édition inline, sauvegarde immédiate.
- `app/profile/page.tsx` — utilise `SettingsPanel` au lieu des spans statiques.

#### Nouveaux scénarios de conversation (9 ajoutés)
- `data/conversations.ts` — scénario `vpnRemoteAccess` : "VPN Won't Connect from Home", Networking B1.
- `data/conversations.ts` — scénario `blackScreenPC` : "My PC Won't Start", Help Desk B1, 15 turns. Diagnostic écran noir + Windows Recovery.
- `data/conversations.ts` — scénario `lostNetworkFiles` : "My Files Have Disappeared", Help Desk B1, 13 turns. Récupération via shadow copies.
- `data/conversations.ts` — scénario `phishingClick` : "I Clicked a Suspicious Link", Security B2, 15 turns. Incident phishing + révocation sessions M365.
- `data/conversations.ts` — scénario `ransomwareDetected` : "Ransomware on My Computer", Security B2, 15 turns. Containment + P1 incident + post-mortem.
- `data/conversations.ts` — scénario `exchangeSpam` : "Emails Going to Spam", Microsoft 365 B1, 15 turns. DKIM expiré + workaround whitelist.
- `data/conversations.ts` — scénario `teamsAudio` : "No Sound in Teams Meeting", Microsoft 365 B1, 11 turns. Teams device settings + test call.
- `data/conversations.ts` — scénario `wifiSlow` : "Wi-Fi Is Extremely Slow", Networking B1, 15 turns. Channel congestion + AP management.
- `data/conversations.ts` — scénario `diskFull` : "File Server Is Full", Incidents B2, 15 turns. Disk full P1 + cleanup + post-incident report.
- Total : 17 scénarios dans le tableau `conversations[]`.

---

#### Skill Radar dynamique (Étape 4)
- `lib/hooks/useSkillActivity.ts` — nouveau hook : compteurs d'activité en localStorage (`ecp-skill-activity`). Champs : `userTurnsSent`, `aiTurnsReceived`, `grammarNotesEncountered`, `flashcardsReviewed`, `vocabWordsFlipped`, `conversationsCompleted`. Fonctions : `readActivity()`, `incrementActivity()`, `countSRSWordsLearned()`.
- `lib/hooks/useSkillScores.ts` — calcule des scores 0-100 depuis l'activité réelle. Speaking/Writing : +1% par 2 turns. Listening : +1% par 2 turns AI. Grammar : +2% par note rencontrée. Vocabulary : mots SRS avec `repetitions > 0` / 280 mots total. Reading : +1% par 3 cartes retournées. Scores ne descendent jamais sous le baseline.
- `components/dashboard/SkillRadarWrapper.tsx` — wrapper client qui lit les scores live depuis localStorage et les passe à `SkillRadar`.
- `app/dashboard/page.tsx` — utilise `SkillRadarWrapper` au lieu de `SkillRadar` avec valeurs hardcodées.
- `lib/hooks/useConversationChat.ts` — tracker l'activité à chaque turn : `userTurnsSent++` et `grammarNotesEncountered++` à chaque message envoyé, `aiTurnsReceived++` à chaque réponse AI, `conversationsCompleted++` à la fin.
- `lib/hooks/useFlashcardSession.ts` — tracker `vocabWordsFlipped++` à chaque flip front→back, `flashcardsReviewed++` à chaque rating.

#### Corrections bugs (audit site)
- `components/dashboard/WelcomeBanner.tsx` — "1 day" / "N days" grammaticalement correct (singulier/pluriel).
- `lib/hooks/useStreak.ts` — `DEFAULT.lastActiveDate` maintenant dynamique (aujourd'hui) via `getDefaultStreak()`, évite le reset à 1 au premier chargement.
- `components/dashboard/XPRingWrapper.tsx` — daily goal lu depuis `readSettings()` (localStorage) au lieu de `currentUser.dailyGoalXP` (hardcodé).

---

#### Étape 2 — Page Grammaire avec vraies leçons
- `data/grammar.ts` — 8 leçons IT complètes : Present Perfect, Conditionals, Modal Verbs, Passive Voice, Reported Speech, Connectors, Questions en IT, Imperatives. Chaque leçon : règles avec structure, exemples IT avec highlight grammatical, quick tip, common mistake, XP reward.
- `app/grammar/page.tsx` — navigateur de leçons reécrit : filtres par catégorie, compteur "X/8 complétées · XP gagnés", cards cliquables avec niveau CEFR et badge "Done".
- `app/grammar/[lessonId]/page.tsx` — page détail : règles, exemples surlignés, quick tip, common mistake, bouton "Mark as complete · +N XP".

#### Étape 3 — Tracking de complétion (grammar + scénarios)
- `lib/hooks/useCompletedItems.ts` — persistance localStorage : `ecp-completed-grammar` (Set d'IDs), `ecp-completed-scenarios` (array avec date + XP). Fonctions : `readCompletedLessons()`, `markLessonComplete()`, `readCompletedScenarios()`, `markScenarioComplete()` (idempotente), `getCompletedScenarioIds()`.
- `lib/hooks/useConversationChat.ts` — appelle `markScenarioComplete()` à la fin de chaque conversation.
- `app/conversations/page.tsx` — affiche "X/17 completed" dans le header, passe `isCompleted` à `ScenarioCard`.

---

### 🛠️ Agents créés
- `.claude/skills/add-scenario/SKILL.md` — génère et insère un scénario IT complet dans `data/conversations.ts`.
- `.claude/skills/add-vocabulary/SKILL.md` — génère et insère des mots de vocabulaire dans `data/vocabulary.ts`.
- `.claude/skills/check-site/SKILL.md` — audite toutes les pages du site et retourne un rapport de bugs.
