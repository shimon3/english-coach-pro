---
name: check-site
description: Audite le site English Coach Pro en navigant dans chaque page via le navigateur et retourne un rapport de bugs. Utilise ce skill quand l'utilisateur dit "vérifie le site", "check le site", "audit", "teste les pages", "est-ce que tout fonctionne", "quelque chose est cassé ?", "regarde si ça marche", ou après avoir appliqué des modifications au code. Nécessite que le serveur tourne sur http://localhost:3000.
---

# check-site

Audite le site English Coach Pro en naviguant dans toutes les pages et retourne un rapport de bugs concis.

## Prérequis

Le serveur dev doit tourner sur `http://localhost:3000`. Si ce n'est pas le cas, dis-le à l'utilisateur.

## Pages à auditer (dans cet ordre)

1. `/dashboard`
2. `/vocabulary`
3. `/vocabulary/flashcards`
4. `/conversations`
5. `/conversations/helpdeskprinter` (ou le premier scénario dispo)
6. `/grammar`
7. `/pronunciation`
8. `/listening`
9. `/it-english`
10. `/profile`

## Processus pour chaque page

Utilise les outils Claude-in-Chrome MCP (`mcp__Claude_in_Chrome__*`) :

### Navigation
```
mcp__Claude_in_Chrome__navigate(url, tabId)
```

### Vérifications via javascript_tool
Pour chaque page, exécute ce script :
```javascript
({
  url: location.href,
  errors: window.__errors || [],
  buttons: Array.from(document.querySelectorAll('button'))
    .map(b => ({text: b.textContent.trim().slice(0,50), disabled: b.disabled})),
  brokenLinks: Array.from(document.querySelectorAll('a[href]'))
    .filter(a => a.href.includes('undefined') || a.href.includes('null') || a.href === '')
    .map(a => a.href),
  pageText: document.body.innerText.slice(0, 200)
})
```

### Points à vérifier sur chaque page
- **Erreurs console** : `window.__errors` non vide = bug
- **Boutons disabled à tort** : boutons désactivés qui devraient être actifs
- **Liens cassés** : href contenant `undefined`, `null`, ou vide
- **Page vide ou contenu manquant** : `pageText` trop court ou manquant de contenu attendu
- **Éléments clés présents** : voir liste ci-dessous

### Contenu attendu par page

| Page | Contenu minimum attendu |
|------|------------------------|
| dashboard | "Alex", XP ring, streak, "Continue Learning" |
| vocabulary | filtres catégorie, au moins 10 word cards, bouton Flashcards |
| flashcards | numéro de carte "1 / N" avec N > 0, bouton Flip |
| conversations | au moins 5 scénarios listés, filtres catégorie |
| conversation session | bulle de message IA, input de chat actif |
| grammar | message "en cours de développement", lien vers Conversations |
| pronunciation | message "en cours de développement", lien vers Vocabulaire |
| listening | message "en cours de développement", lien vers Conversations |
| it-english | message "en cours de développement", liens fonctionnels |
| profile | nom "Alex", barre de progression XP, achievements |

## Rapport de sortie

Produis un rapport en markdown structuré comme suit :

```markdown
## Audit English Coach Pro — [date]

### ✅ Pages OK
- /dashboard — [résumé 1 ligne]
- ...

### 🐛 Bugs trouvés
**[Page]** — [description du bug]
- Impact : [bloquant / mineur / cosmétique]
- Cause probable : [si identifiable]

### ⚠️ Avertissements
- [observations non bloquantes]

### Résumé
X pages OK, Y bugs, Z avertissements.
```

Si aucun bug : dis-le clairement et félicite le travail.

## Gestion des erreurs

- Si le serveur ne répond pas → arrête et dis à l'utilisateur de lancer `npm run dev`
- Si le MCP Chrome n'est pas connecté → dis à l'utilisateur d'ouvrir Chrome avec l'extension
- Si une page plante (erreur React) → note-le comme bug bloquant avec le message d'erreur
