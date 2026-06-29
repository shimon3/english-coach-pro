---
name: add-vocabulary
description: Génère et ajoute de nouveaux mots de vocabulaire IT à data/vocabulary.ts dans le projet English Coach Pro. Utilise ce skill quand l'utilisateur demande d'ajouter des mots, du vocabulaire, des termes IT, ou dit des choses comme "ajoute des mots sur X", "plus de vocab networking", "génère 10 mots sur la cybersécurité", "enrichis le vocabulaire". Lit la structure existante et injecte des VocabularyWord complets et valides en respectant les IDs et catégories existants.
---

# add-vocabulary

Génère de nouveaux mots de vocabulaire IT et les insère dans `data/vocabulary.ts`.

## Inputs attendus

L'utilisateur fournit :
- **Catégorie** : `microsoft365` | `active-directory` | `networking` | `cybersecurity` | `help-desk` | `windows-server` | `general-it` | `business-english` | `phrasal-verbs` | `idioms`
- **Nombre** : entier (défaut : 10)
- **Niveau** optionnel : `A1` | `A2` | `B1` | `B2` | `C1` | `C2`

## Processus

### 1. Lire le fichier existant
Lis `data/vocabulary.ts` pour comprendre :
- La structure exacte de `VocabularyWord`
- Le pattern des IDs (`cat-slug`, ex. `net-bgp`, `sec-phishing`, `m365-tenant`)
- Les mots déjà présents (pour éviter les doublons)
- Les préfixes d'ID par catégorie

**Préfixes d'ID par catégorie** :
- `microsoft365` → `m365-`
- `active-directory` → `ad-`
- `networking` → `net-`
- `cybersecurity` → `sec-`
- `help-desk` → `hd-`
- `windows-server` → `ws-`
- `general-it` → `it-`
- `business-english` → `biz-`
- `phrasal-verbs` → `pv-`
- `idioms` → `idm-`

### 2. Générer les mots

**Structure de chaque mot** :
```typescript
{
  id: "prefix-slug",           // ex: "net-ospf", "sec-ransomware"
  word: "terme exact",          // tel qu'utilisé dans le domaine IT
  phonetic: "/fəˈnetɪk/",      // transcription IPA réelle
  partOfSpeech: "noun",         // noun | verb | adjective | adverb | phrase | abbreviation
  definition: "Définition claire et concise en anglais, orientée contexte IT professionnel.",
  exampleSentence: "A realistic sentence showing the word in an IT/sysadmin context.",
  level: "B1",                  // CEFR approprié au mot
  category: "networking",       // catégorie exacte
  synonyms: ["syn1", "syn2"],   // 0-3 synonymes ou termes liés
  tags: ["tag1", "tag2"]        // 2-4 tags thématiques
}
```

**Règles de qualité** :
- La définition doit être en anglais, concise (1-2 phrases max), centrée sur l'usage IT réel
- L'exemple doit être une phrase complète qu'un sysadmin dirait vraiment
- Le niveau CEFR doit refléter la difficulté réelle du terme (A1-A2 = mots courants, C1-C2 = très spécialisés)
- Les IDs doivent être uniques — vérifie qu'ils n'existent pas déjà dans le fichier
- Ne génère pas de mots déjà présents dans le fichier

### 3. Insérer dans le fichier

Ajoute les nouveaux mots à la fin du tableau `vocabulary`, avant le `]` fermant.
Respecte l'indentation et le style existants.

**Ne touche à rien d'autre dans le fichier.**

### 4. Confirmer

Dis à l'utilisateur :
- Le nombre de mots ajoutés et leur catégorie
- 3 exemples des mots générés
- "Va sur http://localhost:3000/vocabulary pour les voir"
