---
name: project-manager
description: Chef de projet pour English Coach Pro. Coordonne les autres agents, lit l'état réel du code et des données, et produit un rapport complet de la situation du projet. Utilise ce skill quand l'utilisateur dit "état du projet", "où j'en suis", "résumé du projet", "qu'est-ce qui manque", "que faire ensuite", "rapport", "bilan", "status", "project manager", "manager", ou quand il veut une vue d'ensemble avant de décider quoi faire.
---

# project-manager

Donne un état complet et précis du projet English Coach Pro en lisant directement les fichiers source et le CHANGELOG. Ne se base pas sur la mémoire — lit tout à l'instant T.

## Ce que tu lis (dans l'ordre)

### 1. CHANGELOG.md
```
Read: CHANGELOG.md
```
Extrais : quelles étapes sont complètes, quels bugs ont été corrigés, quelles fonctionnalités existent.

### 2. État du contenu
```
Read: data/conversations.ts  (dernières lignes — le tableau export)
Read: data/vocabulary.ts     (compte les mots dans le tableau)
```
Compte exactement :
- Nombre de scénarios dans `export const conversations = [...]`
- Nombre de mots dans `export const vocabulary = [...]`
- Catégories présentes

### 3. État des skills disponibles
Liste les skills dans `.claude/skills/` :
```
Glob: .claude/skills/*/SKILL.md
```
Pour chaque skill trouvé, lis son `name` et `description` depuis le frontmatter YAML.

### 4. État des hooks et fonctionnalités
Vérifie que ces fichiers existent (leur présence = fonctionnalité implémentée) :
- `lib/hooks/useXPSync.ts` → XP persistence
- `lib/hooks/useStreak.ts` → Streak persistence
- `lib/hooks/useSettings.ts` → Settings persistence
- `lib/hooks/useSkillActivity.ts` → Skill Radar dynamique
- `lib/hooks/useSkillScores.ts` → Score computation
- `components/profile/SettingsPanel.tsx` → Settings UI
- `components/profile/LiveStats.tsx` → Live stats on profile

### 5. Pages et leur état
Vérifie l'existence de ces pages :
```
Glob: app/**/page.tsx
```
Classe-les en : **fonctionnelles** (contenu réel) vs **placeholder** (en cours de développement).

Pages fonctionnelles attendues : `dashboard`, `vocabulary`, `vocabulary/flashcards`, `conversations`, `conversations/[scenarioId]`, `profile`  
Pages placeholder : `grammar`, `pronunciation`, `listening`, `it-english`

### 6. Dernière ligne du CHANGELOG
Pour savoir ce qui a été fait en dernier et ce qui est prévu.

---

## Rapport à produire

Produis le rapport dans ce format exact :

```markdown
## 📊 English Coach Pro — Rapport de projet
**Date :** [date du jour]

---

### ✅ Fonctionnalités implémentées

| Fonctionnalité | Détail |
|---|---|
| Conversations | X scénarios — catégories : ... |
| Vocabulaire | X mots — X catégories |
| Flashcards SRS | Algorithme SM-2, X mots dus aujourd'hui |
| XP & Streak | Persistence localStorage |
| Skill Radar | Dynamique — calculé depuis l'activité réelle |
| Settings profil | Daily goal, accent, reminders |
| [autres] | ... |

---

### 🤖 Agents disponibles

| Agent | Commande | Utilité |
|---|---|---|
| [nom] | /[nom] | [ce qu'il fait en 1 ligne] |

---

### 📄 Pages

| Page | État | Notes |
|---|---|---|
| /dashboard | ✅ Fonctionnelle | ... |
| /grammar | 🚧 Placeholder | Contenu prévu : ... |

---

### 🔜 Prochaines étapes suggérées

Propose 3-5 étapes concrètes classées par impact, avec pour chacune :
- Ce que ça apporte à l'utilisateur
- Difficulté estimée (facile / moyen / complexe)
- Quel agent utiliser si applicable

Bases-toi sur ce qui manque réellement dans le code, pas sur des suppositions.

---

### ⚠️ Points d'attention

Liste les choses fragiles, hardcodées, ou à surveiller (ex: données utilisateur hardcodées dans data/user.ts, pages placeholder, etc.)
```

---

## Règles

- Lis toujours les fichiers — ne te base jamais sur la mémoire de la conversation
- Les chiffres (nombre de scénarios, mots) doivent être exacts — compte-les
- Si tu ne peux pas lire un fichier, dis-le dans le rapport plutôt que d'inventer
- Le rapport doit tenir en une page — sois concis mais précis
- Termine toujours par une question : "Quelle étape veux-tu attaquer ?"
