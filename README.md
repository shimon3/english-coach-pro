# English Coach Pro

A personal English-learning web app with a focus on **work English for IT professionals**. Practice real-world scenarios (incident calls, client meetings, phishing alerts), study grammar and vocabulary, and track your progress with XP, streaks and skill scores.

Built with [Next.js](https://nextjs.org), React, TypeScript and Tailwind CSS.

## Features

- **Conversation scenarios** — role-play chats with an AI character (for example, managing a domain-controller outage or briefing a manager on a security investment).
- **Grammar lessons** — short lessons with rules and examples, including IT-specific sentences.
- **Vocabulary and flashcards** — study word lists and review them with a flashcard session.
- **Listening and pronunciation** — practice pages with text-to-speech support in the browser.
- **IT English module** — terminology and phrases used in technical work.
- **Dashboard and profile** — XP, level, daily goal, weekly activity, skill radar, streaks and achievements.

Progress is stored in your browser (`localStorage`). No account or server database is needed.

## Getting started

Requirements: Node.js 20.9 or later (required by Next.js 16).

```bash
git clone https://github.com/shimon3/english-coach-pro.git
cd english-coach-pro
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build
```

## Project structure

```text
app/          Pages (dashboard, conversations, grammar, vocabulary, listening, pronunciation, profile, IT English)
components/   Reusable UI components, grouped by feature
data/         Lesson content, scenarios, vocabulary and the demo user profile
lib/          Hooks (XP, streaks, skill scores) and helpers
public/       Static assets
```

## Customising the content

- **Demo user:** edit `data/user.ts` to change the name, level, goals and starting XP.
- **Scenarios:** edit `data/conversations.ts` to add or change role-play dialogues.
- **Grammar and vocabulary:** edit `data/grammar.ts` and `data/vocabulary.ts`.

## Screenshots

_Add screenshots of the dashboard, a conversation and a flashcard session here._

## Licence

MIT — see [LICENSE](LICENSE).
