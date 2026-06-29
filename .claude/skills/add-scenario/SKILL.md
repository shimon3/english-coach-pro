---
name: add-scenario
description: Génère et ajoute un nouveau scénario de conversation IT à data/conversations.ts dans le projet English Coach Pro. Utilise ce skill quand l'utilisateur demande d'ajouter un scénario, une conversation, un roleplay IT, ou dit des choses comme "ajoute un scénario sur X", "crée une conversation sur Y", "nouveau scénario networking/helpdesk/sécurité". Le skill lit la structure existante du fichier et injecte un ConversationScenario complet et valide avec script, grammar notes, vocab highlights et suggested replies.
---

# add-scenario

Génère un nouveau scénario de conversation IT et l'insère dans `data/conversations.ts`.

## Inputs attendus

L'utilisateur fournit (dans n'importe quel ordre, en français ou anglais) :
- **Sujet** : ex. "VPN troubleshooting", "Active Directory password reset", "Teams meeting gone wrong"
- **Catégorie** : `help-desk` | `microsoft365` | `security` | `networking` | `incidents` | `meetings`
- **Difficulté** : `B1` (intermédiaire, 8-10 turns) | `B2` (avancé, 10-12 turns)

Si l'utilisateur n'en donne pas, choisis des valeurs sensées selon le sujet.

## Processus

### 1. Lire le fichier existant
Lis `data/conversations.ts` en entier pour comprendre :
- La structure exacte de `ConversationScenario` et `ConversationTurn`
- Le pattern de l'helper `t()` utilisé pour créer les turns
- Les IDs et noms de variables déjà utilisés (pour éviter les doublons)
- Le style des grammar notes et vocab highlights existants

### 2. Générer le scénario

**ID** : camelCase sans espaces, ex. `vpnBranchOffice`, `adPasswordReset`

**Structure du scénario** :
```typescript
const monScenario: ConversationScenario = {
  id: "identifiantUnique",
  title: "Titre court et descriptif",
  description: "Une phrase décrivant le scénario du point de vue de l'utilisateur.",
  difficulty: "B1", // ou B2
  estimatedMinutes: 8, // 6-15 selon le nombre de turns
  category: "help-desk", // une des 6 catégories
  context: "Phrase(s) décrivant la situation : qui appelle, pourquoi, quel est le problème.",
  userRole: "IT Support Agent", // rôle que joue l'apprenant
  aiRole: "Employee / Manager / Client / etc.", // ce que joue l'IA
  aiName: "Prénom Nom", // personnage réaliste
  aiAvatar: "XX", // 2 initiales majuscules
  tags: ["tag1", "tag2", "tag3"], // 3-5 tags pertinents
  xpReward: 120, // 80-200 selon la difficulté
  script: [ ... ]
}
```

**Script** : Alterne `role: "ai"` (l'IA commence toujours) et `role: "user"` (l'apprenant).

Pour chaque turn AI, ajoute :
- `delayMs: 1200` (ou 800-2000 selon la longueur)
- `vocabularyHighlights` sur 1-2 mots techniques du message
- `suggestedReplies` : 2-3 réponses plausibles pour guider l'apprenant

Pour chaque turn user, ajoute :
- `grammarNote` sur UNE structure grammaticale clé utilisée dans la réponse suggérée

**VocabHighlight** :
```typescript
{ word: "mot", phonetic: "/fəˈnetɪk/", definition: "définition courte en anglais" }
```

**GrammarNote** :
```typescript
{
  triggerPhrase: "phrase exacte dans la réponse",
  correction: "version correcte ou meilleure",
  explanation: "explication courte en anglais de pourquoi c'est important"
}
```

### 3. Insérer dans le fichier

Ajoute la variable du scénario AVANT le tableau `export const conversations`.
Ajoute ensuite la référence dans le tableau `conversations` existant.

**Ne touche à rien d'autre dans le fichier.**

### 4. Confirmer

Dis à l'utilisateur :
- Le titre et l'ID du scénario créé
- Le nombre de turns générés
- Comment le tester : "Va sur http://localhost:3000/conversations"

## Règles de qualité

- Le dialogue doit sonner naturel et professionnel, comme une vraie conversation sysadmin
- Les mots du vocab highlight doivent être des termes IT réels et utiles
- Les grammar notes doivent cibler des structures que les francophones trouvent difficiles (conditional, present perfect, phrasal verbs)
- Les suggested replies doivent couvrir 3 styles : formel, neutre, direct
- Ne génère jamais deux turns consécutifs du même rôle
