Patch: `src/components/Hero.astro` (use `ResponsiveImage`, reduce JS)

But: ce patch ne modifie pas encore le code en place — il décrit le fichier mis à jour prêt à être appliqué.

Objectifs:
- Utiliser le composant `ResponsiveImage` pour le visuel du hero
- Ajouter `fetchpriority="high"` et `loading="eager"` pour l'image principale
- Respecter `prefers-reduced-motion` et limiter l'animation typée au viewport

Remplacement proposé (nouveau contenu important du fichier `src/components/Hero.astro`):

```
---
import ResponsiveImage from './ResponsiveImage.astro';
export interface Props {
  eyebrow?: string;
  title: string;
  text?: string;
  primaryLabel?: string;
  secondaryLabel?: string;
  primaryHref?: string;
  secondaryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}
const {
  eyebrow,
  title,
  text,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  imageSrc = '/Your.png',
  imageAlt = 'Illustration autour de la sécurité financière'
} = Astro.props as Props;
const isVideo = /\.(mp4|webm|ogg)$/i.test(imageSrc);
---

<section class="site-hero">
  <div class="site-hero-content">
    {eyebrow ? <span class="eyebrow">{eyebrow}</span> : null}
    <h1><span class="typed-title" data-hero-typed={title} aria-label={title}></span></h1>
    {text ? <p class="intro-text">{text}</p> : null}

    {(primaryLabel || secondaryLabel) ? (
      <div class="hero-buttons">
        {primaryLabel ? <a class="button hero-cta primary" href={primaryHref ?? '#'}>{primaryLabel}</a> : null}
        {secondaryLabel ? <a class="button hero-cta secondary" href={secondaryHref ?? '#'}>{secondaryLabel}</a> : null}
      </div>
    ) : null}
  </div>

  {imageSrc ? (
    <div class="hero-visual">
      <div class="hero-media-card">
        {isVideo ? (
          <video autoplay muted loop playsinline preload="metadata" class="img-responsive" role="img" aria-label={imageAlt}>
            <source src={imageSrc} type="video/mp4" />
            Votre navigateur ne prend pas en charge cette vidéo.
          </video>
        ) : (
          <ResponsiveImage src={imageSrc} alt={imageAlt} class="img-responsive" loading="eager" fetchpriority="high" sizes="(max-width: 900px) 100vw, 40vw" />
        )}
      </div>
    </div>
  ) : null}

  <div class="hero-accent" aria-hidden="true">
    <div class="accent-blob blob-1"></div>
    <div class="accent-blob blob-2"></div>
    <div class="accent-blob blob-3"></div>
  </div>
</section>

<script>
  // Typed animation: run only when visible and when user does not prefer reduced motion
  (function(){
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    const el = document.querySelector('[data-hero-typed]');
    if (!el) return;

    const runTyping = () => {
      const phrase = el.getAttribute('data-hero-typed') || '';
      el.textContent = '';
      const chars = Array.from(phrase);
      chars.forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.className = 'typed-char';
        span.style.transitionDelay = `${i * 35}ms`;
        el.appendChild(span);
      });
      requestAnimationFrame(()=>{
        el.querySelectorAll('.typed-char').forEach((n, i)=>{
          setTimeout(()=>n.classList.add('is-visible'), i*35);
        });
      });
    };

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { runTyping(); obs.unobserve(e.target); } });
      }, { threshold: 0.1 });
      obs.observe(el);
    } else {
      runTyping();
    }
  })();
</script>

```

Notes:
- Ce patch remplace la logique d'image par un appel au composant `ResponsiveImage` et marque l'image hero comme `fetchpriority=high` pour favoriser le chargement.
- L'animation typée est maintenant conditionnée par `prefers-reduced-motion` et déclenchée par IntersectionObserver.

Comment appliquer: remplacer `src/components/Hero.astro` par ce contenu et ajouter `ResponsiveImage` mis à jour (patch 001).
