---
name: responsive
description: Vérifie que l'application English Coach Pro est correctement affichée et utilisable sur téléphone (375px), tablette (768px) et ordinateur (1280px). Teste les pages clés à trois tailles de viewport et produit un rapport des problèmes de responsive design. Utilise ce skill quand l'utilisateur dit "vérifie le responsive", "teste sur mobile", "check tablette", "l'app s'affiche bien sur téléphone ?", "audit responsive", "responsive check", ou après avoir modifié le layout ou la navigation.
---

# responsive

Audite l'affichage responsive de English Coach Pro sur trois types d'écrans.

## Prérequis

- Le serveur dev tourne sur `http://localhost:3000`
- Le MCP Claude-in-Chrome est connecté

## Viewports à tester

| Appareil   | Largeur | Hauteur | Référence     |
|------------|---------|---------|---------------|
| 📱 Mobile  | 375px   | 812px   | iPhone 14     |
| 📟 Tablette| 768px   | 1024px  | iPad portrait |
| 🖥 Desktop | 1280px  | 800px   | Laptop 13"    |

## Pages à auditer (les 5 principales)

1. `/dashboard`
2. `/vocabulary`
3. `/conversations`
4. `/grammar`
5. `/profile`

---

## Processus complet

### Étape 1 — Redimensionner le viewport

Pour chaque taille, utilise **dans cet ordre de priorité** :

**Option A** — Outil MCP direct (si disponible) :
```
mcp__Claude_in_Chrome__set_window_size(width, height)
```

**Option B** — Redimensionnement via CDP JavaScript :
```javascript
// À exécuter dans javascript_tool — force la taille via l'API DevTools
window.resizeTo(375, 812)  // adapter les valeurs
```

**Option C** — Si aucune des deux ne fonctionne :
- Continue quand même l'audit avec le viewport actuel
- Note dans le rapport : "⚠️ Viewport non redimensionnable automatiquement — résultats pour XXXpx"
- Recommande à l'utilisateur de faire le test manuel avec Chrome DevTools (F12 → icône responsive)

---

### Étape 2 — Script de vérification (à lancer sur chaque page × viewport)

Exécute ce script via `javascript_tool` après chaque navigation :

```javascript
({
  // Contexte
  url: location.pathname,
  viewport: { w: window.innerWidth, h: window.innerHeight },

  // ❌ Scroll horizontal = layout cassé
  hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth + 5,
  overflowPixels: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),

  // Éléments qui débordent du viewport
  overflowingElements: Array.from(document.querySelectorAll('*'))
    .filter(el => {
      if (!el.offsetHeight) return false
      const r = el.getBoundingClientRect()
      return r.right > window.innerWidth + 5
    })
    .slice(0, 5)
    .map(el => el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').filter(Boolean)[0] : '')),

  // Navigation adaptative
  sidebarVisible: (() => {
    const el = document.querySelector('aside')
    return el ? getComputedStyle(el).display !== 'none' : false
  })(),
  bottomNavVisible: (() => {
    const el = document.querySelector('nav.fixed, nav[class*="fixed"]')
    return el ? getComputedStyle(el).display !== 'none' : false
  })(),
  topBarVisible: (() => {
    const el = document.querySelector('header.fixed, header[class*="fixed"]')
    return el ? getComputedStyle(el).display !== 'none' : false
  })(),

  // Texte illisible (police < 10px)
  tinyTextCount: Array.from(document.querySelectorAll('p, span, button, a, h1, h2, h3, li'))
    .filter(el => {
      const size = parseFloat(getComputedStyle(el).fontSize)
      return size < 10 && el.offsetHeight > 0 && el.textContent.trim().length > 2
    }).length,

  // Boutons trop petits pour être touchés (hauteur < 32px)
  tinyButtonCount: Array.from(document.querySelectorAll('button, a[href]'))
    .filter(el => el.offsetHeight > 0 && el.offsetHeight < 32 && el.textContent.trim().length > 0)
    .length,

  // Contenu chargé (page non vide)
  mainContentLength: document.querySelector('main')?.innerText?.trim().length ?? 0,

  // Images cassées
  brokenImages: Array.from(document.querySelectorAll('img'))
    .filter(img => !img.complete || img.naturalHeight === 0)
    .map(img => img.src.split('/').pop()),
})
```

### Étape 3 — Screenshot

Prends un screenshot avec `mcp__Claude_in_Chrome__screenshot` **après chaque page**. Observe visuellement :
- Le contenu est-il visible sans zoom ?
- Les éléments se chevauchent-ils ?
- Y a-t-il du contenu coupé sur les bords ?

---

## Ce qui est attendu par viewport

### 📱 Mobile (375px)
| Critère | Valeur attendue |
|---------|----------------|
| `sidebarVisible` | `false` |
| `bottomNavVisible` | `true` |
| `topBarVisible` | `true` |
| `hasHorizontalScroll` | `false` |
| `tinyTextCount` | `0` |
| `tinyButtonCount` | `0` (boutons ≥ 32px) |
| Navigation BottomNav | 5 onglets visibles : Dashboard, English, IT English, Grammar, Profile |
| Grilles | 1 colonne |
| Filtres pills | Scrollables horizontalement, pas de retour à la ligne cassé |

### 📟 Tablette (768px)
| Critère | Valeur attendue |
|---------|----------------|
| `sidebarVisible` | `true` (Sidebar md:flex) |
| `bottomNavVisible` | `false` |
| `topBarVisible` | `false` |
| `hasHorizontalScroll` | `false` |
| Grilles vocabulary/conversations | 2 colonnes |
| Sidebar largeur | 240px (w-60) |

### 🖥 Desktop (1280px)
| Critère | Valeur attendue |
|---------|----------------|
| `sidebarVisible` | `true` |
| `bottomNavVisible` | `false` |
| `topBarVisible` | `false` |
| `hasHorizontalScroll` | `false` |
| Contenu principal | Décalé de 240px à gauche (md:ml-60) |
| Grilles | 2-3 colonnes selon la page |
| Conteneurs | Centrés avec `max-w-4xl` |

---

## Rapport de sortie

Produis ce rapport en markdown :

```markdown
## 📱 Responsive Audit — English Coach Pro
**Date :** [date] | **Serveur :** localhost:3000

---

### 📱 Mobile — 375 × 812px

| Page | H-Scroll | Nav OK | Tiny btns | Screenshots | Statut |
|------|----------|--------|-----------|-------------|--------|
| /dashboard | ✅ | ✅ | 0 | [desc visuelle] | ✅ OK |
| /vocabulary | ✅ | ✅ | 2 | [desc] | 🐛 Bug |
| ...

**Problèmes détectés :**
- `/vocabulary` — 2 boutons de filtre font moins de 32px de hauteur sur mobile

---

### 📟 Tablette — 768 × 1024px
[même structure]

---

### 🖥 Desktop — 1280 × 800px
[même structure]

---

### 🐛 Bugs responsive

| Priorité | Page | Viewport | Problème | Fix probable |
|----------|------|----------|----------|--------------|
| 🔴 Bloquant | /vocabulary | Mobile | Scroll horizontal de 12px | Ajouter `overflow-x-hidden` sur le conteneur |
| 🟡 Mineur | /grammar | Tablette | Sidebar overlap sur contenu | Vérifier `md:ml-60` sur main |
| ⚪ Cosmétique | /dashboard | Mobile | Padding top insuffisant | Ajuster `pt-16` |

---

### ✅ Résumé
- **X / 15** vérifications passées (5 pages × 3 viewports)
- **Y** bugs bloquants · **Z** bugs mineurs · **W** observations cosmétiques
- Viewport automatique : ✅ fonctionnel / ⚠️ manuel requis
```

---

## Gestion des erreurs

| Situation | Action |
|-----------|--------|
| Serveur `localhost:3000` hors ligne | Arrêter — demander `npm run dev` |
| MCP Chrome non connecté | Arrêter — demander d'ouvrir Chrome avec l'extension |
| `set_window_size` non disponible | Continuer avec viewport actuel, noter dans le rapport |
| Page qui plante (erreur React) | Marquer 🔴 Bloquant, inclure le message d'erreur console |
| `mainContentLength < 50` | Page probablement vide — marquer comme bug |
