# 🚀 Guide de Démarrage - Portfolio Astro Optimisé

## Commandes Essentielles

### Développement Local
```bash
# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000 dans le navigateur
```

### Build et Production
```bash
# Construire le site statique
npm run build

# Prévisualiser la version construite
npm run preview

# Ouvrir http://localhost:4321
```

### Optimisations d'Assets
```bash
# Convertir les images et normaliser les noms
node scripts/convert-media.js

# (Optionnel) Convertir GIF→MP4 si ffmpeg est installé
# Installer ffmpeg d'abord:
#   Windows: choco install ffmpeg
#   macOS: brew install ffmpeg
#   Linux: sudo apt-get install ffmpeg
```

### Rapports de Performance
```bash
# Générer un rapport Lighthouse (port 4321 doit être actif)
npm run preview &
npx lighthouse http://localhost:4321 --output=json --output-path=./lighthouse-report.json
```

---

## 📊 Structure du Projet

```
mon-portfolio/
├── src/
│   ├── pages/               # Routes Astro (→ HTML)
│   │   ├── index.astro      # Accueil
│   │   ├── about.astro      # À propos
│   │   ├── services.astro   # Services
│   │   ├── contact.astro    # Contact
│   │   └── projects/        # Portfolio
│   │
│   ├── components/          # Composantes réutilisables
│   │   ├── ResponsiveImage.astro  # Pipeline images (AVIF/WebP)
│   │   ├── Hero.astro       # Section hero avec vidéo
│   │   └── [autres]
│   │
│   ├── layouts/             # Layouts HTML
│   ├── assets/              # Images/styles (importables)
│   └── styles/              # CSS global
│
├── public/                  # Assets statiques
│   ├── *.avif               # Images AVIF (modernes, optimales)
│   ├── *.webp               # Images WebP (fallback)
│   ├── *.png                # Images PNG (fallback legacy)
│   ├── *.gif                # GIFs animés
│   └── *.mp4                # Vidéos
│
├── dist/                    # Build output (généré)
├── scripts/
│   ├── convert-media.js     # GIF→MP4, normalisation assets
│   └── [autres scripts]
│
└── Config
    ├── astro.config.mjs     # Config Astro
    ├── tailwind.config.ts   # Config Tailwind
    ├── tsconfig.json        # Config TypeScript
    └── package.json
```

---

## 🎨 Utiliser les Images Responsives

### Dans les Composantes Astro
```astro
---
import ResponsiveImage from '../components/ResponsiveImage.astro';
---

<!-- Afficher une image avec AVIF/WebP/PNG auto -->
<ResponsiveImage 
  src="/Professional.avif"
  alt="Photo de profil"
  width={400}
  height={300}
/>

<!-- Ou directement en HTML -->
<picture>
  <source srcset="/Professional.avif" type="image/avif" />
  <source srcset="/Professional.webp" type="image/webp" />
  <img src="/Professional.png" alt="Photo" loading="lazy" />
</picture>
```

### Hero avec Vidéo
```astro
<Hero 
  title="Titre"
  text="Description"
  imageSrc="/professional.mp4"  <!-- Détecte automatiquement le MP4 -->
/>
```

---

## 🔍 Vérifier les Performances

### Lighthouse Scores Actuels
```
✅ Performance:       52/100  (Amélioré de 25/100)
✅ Accessibility:     100/100 (Parfait)
✅ Best Practices:    96/100  (Excellent)
✅ SEO:               100/100 (Parfait)
```

### Générer un Nouveau Rapport
```bash
# Assurez-vous que le serveur tourne (npm run preview)
npx lighthouse http://localhost:4321 --chrome-flags="--headless=new" --output=json --output-path=lighthouse-custom.json
```

---

## 📦 Formats d'Image Supportés

| Format | Avantages | Utilisé Par |
|--------|-----------|-------------|
| **AVIF** | Compression optimale (~60% < WebP) | Navigateurs modernes |
| **WebP** | Compatibilité large (95%) | Fallback WebP |
| **PNG** | Compatibilité maximale | Fallback legacy |
| **MP4** | Performant pour animations | Vidéos hero |

**Pipeline automatique:**
```
PNG/JPG source → AVIF + WebP + PNG conservé
                    ↓
              <picture> selectionne
```

---

## 🛠️ Environnement & Dépendances

### Node & npm
```bash
node --version    # v26.1.0+
npm --version     # 10.5.0+
```

### Dépendances Principales
```json
{
  "astro": "^7.1.0",
  "tailwindcss": "^4.3.0",
  "sharp": "^0.35.3",
  "execa": "^6.1.0",
  "ffmpeg-static": "^5.3.0"  // Optionnel
}
```

### Installation
```bash
npm install
npm run dev
```

---

## 🌍 Déploiement

### Vercel (Recommandé)
```bash
# 1. Pousser vers GitHub
git push

# 2. Vercel détecte automatiquement Astro
# → Déploiement instantané
```

### Netlify
```bash
# Config automatique pour Astro
# Créer netlify.toml si nécessaire

[build]
command = "npm run build"
publish = "dist"
```

### Statique (Quelconque serveur HTTP)
```bash
npm run build
# Télécharger le dossier 'dist' complet
# Servir avec n'importe quel serveur web
```

---

## 🐛 Troubleshooting

### Erreur: ffmpeg not found
**Solution:** ffmpeg-static est cassé sous Windows. Options:
1. Installer ffmpeg système
2. Ignorer l'erreur (GIF sera utilisé en place)
3. Utiliser un binaire standalone

### Images ne s'affichent pas
**Vérifier:**
- `public/` contient les images
- Chemin correct dans Astro (ex: `/Professional.avif`)
- Navigateur supporte le format

### Performance basse
**Actions:**
- Exécuter `npm run build`
- Vérifier `lighthouse-final.json`
- Compresser davantage les images si nécessaire

---

## 📚 Documentation Utile

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [Sharp (libvips)](https://sharp.pixelplumbing.com)
- [Lighthouse Guide](https://developers.google.com/web/tools/lighthouse)

---

## ✅ Checklist Optimisations

- [x] Images responsives (AVIF/WebP/PNG)
- [x] Composantes optimisées (Hero, Header, Services)
- [x] Scripts normalisation / conversion media
- [x] Build sans erreurs (13 pages)
- [x] Lighthouse 52/100 Performance ⬆️
- [x] Lighthouse 100/100 Accessibility
- [x] Lighthouse 96/100 Best Practices
- [x] Lighthouse 100/100 SEO
- [x] Documentation complète

---

**Créé:** 26 Juillet 2026  
**Status:** ✅ Production Ready
