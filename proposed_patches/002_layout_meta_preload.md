Patch: `src/layouts/Layout.astro` (Head improvements)

But: ce patch ne modifie pas encore le code en place — il décrit le bloc <head> mis à jour prêt à être appliqué.

Objectifs:
- Rendre `title` et `description` dynamiques via props
- Ajouter meta Open Graph & Twitter
- Précharger Google Fonts de façon non bloquante

Remplacement proposé (section <head> à insérer dans `src/layouts/Layout.astro`):

```
---
const { title = 'Portfolio — Blake DJOSSOU', description = 'Portfolio personnel — Programmation et Design Graphique', canonical = Astro.site ?? '' } = Astro.props ?? {};
---
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content={description} />
  <link rel="icon" type="image/png" href="/Dev_icone.png?v=2" sizes="any" />
  <link rel="apple-touch-icon" href="/Dev_icone.png?v=2" />
  <meta name="generator" content={Astro.generator} />
  <title>{title}</title>

  <!-- Fonts: preconnect + preload pattern (non-blocking) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" as="style" onload="this.rel='stylesheet'" />
  <noscript>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  </noscript>

  <!-- Open Graph / Twitter -->
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonical + Astro.url.pathname} />
  <meta property="og:image" content="/secure-financial-future.png" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content="/secure-financial-future.png" />

  <link rel="canonical" href={canonical + Astro.url.pathname} />
</head>
```

Notes:
- Le `title`, `description` et `canonical` peuvent être passés par chaque page, par ex. dans `src/pages/index.astro` :

```
---
import Layout from '../layouts/Layout.astro';
---
<Layout title="Accueil — Blake DJOSSOU" description="...">
  ...
</Layout>
```

- Si vous préférez héberger les polices localement (meilleure perf), je peux ajouter le script et les fichiers à `public/fonts/` et convertir `preload` en `@font-face`.

Comment appliquer: remplacer le bloc `<head>` actuel dans `src/layouts/Layout.astro` par ce contenu et propager props `title`/`description` depuis les pages.
