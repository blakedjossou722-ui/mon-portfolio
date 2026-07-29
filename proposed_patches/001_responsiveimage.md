Patch: `src/components/ResponsiveImage.astro`

But: ce patch ne modifie pas encore le code en place — il décrit le fichier mis à jour prêt à être appliqué.

Objectif:
- Ajouter support `sizes` et `fetchpriority`
- Ajouter `decoding="async"` et respecter `loading` prop
- Préparer pour `srcset` futurs (si vous générez des variantes d'images)

Remplacement proposé (nouveau contenu complet du fichier `src/components/ResponsiveImage.astro`):

```
---
export interface Props {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  class?: string;
  loading?: 'lazy' | 'eager';
  sizes?: string; // ex: "(max-width: 600px) 100vw, 50vw"
  fetchpriority?: 'high' | 'low' | 'auto';
}
const { src, alt = '', width, height, class: cls = '', loading = 'lazy', sizes = '100vw', fetchpriority = 'auto' } = Astro.props as Props;
const avif = src.replace(/\.(png|jpe?g|gif)$/i, '.avif');
const webp = src.replace(/\.(png|jpe?g|gif)$/i, '.webp');
---

<picture>
  <source srcset={avif} type="image/avif" />
  <source srcset={webp} type="image/webp" />
  <img src={src}
       alt={alt}
       loading={loading}
       decoding="async"
       fetchpriority={fetchpriority}
       sizes={sizes}
       class={cls}
       width={width}
       height={height}
       />
</picture>
```

Notes:
- Pour obtenir de vrais bénéfices `srcset` multi-tailles, il est recommandé d'ajouter un pipeline de génération d'images (par ex. `convert-media.js` / `optimize-images.js`) qui produit des variantes `-400.jpg`, `-800.jpg`, etc., ou d'utiliser un CDN (Cloudinary, Supabase/Storage, ImageKit) qui supporte `?width=`.
- Ce patch améliore quand même le rendu via `decoding` et `fetchpriority` et permet de fournir `sizes` depuis le composant appelant.

Comment appliquer: remplacer le fichier existant `src/components/ResponsiveImage.astro` par ce contenu.
