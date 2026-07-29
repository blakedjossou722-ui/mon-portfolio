#!/usr/bin/env python3
from pathlib import Path

projects = {
    'xcms': (
        'Xcms Architecture',
        'Une interface de gestion stylisée pour une expérience éditoriale rapide, structurée et sélective.',
        "Conception d'une architecture, composants modulaires et système de design. Collaboration entre design et développement pour un outil professionnel."
    ),
    'quest-api': (
        'Quest-API',
        "Plateforme d'API imaginaire pour explorer une architecture d'expérience utilisateur moderne.",
        'Illustrations de flux d\'authentification, documentation interactive et structure REST/GraphQL. Idéal pour un design technique et net.'
    ),
    'manifesto': (
        'The Manifesto Of Modernism',
        'Campagne éditoriale. Design graphique et mise en page typographique.',
        "Projet visuel engagé autour du modernisme, avec direction artistique, typographie expressive et supports imprimés de haute qualité."
    ),
    'synapse-ui': (
        'Synapse UI',
        'Librairie de composants. Accessibilité, thématisation et documentation complète.',
        'Système de design optimisé pour productivité, cohérence visuelle et interface fluide sur desktop et mobile.'
    ),
    'affiches': (
        'Affiches',
        'Création d\'affiches impactantes pour campagnes et événements.',
        'Visuels audacieux, hiérarchie typographique et photographies traitées pour une identité forte en affichage.'
    ),
    'cartes-visite': (
        'Cartes de visite',
        'Cartes de visite modernes et mémorables pour professionnels.',
        'Design minimal, impression premium et cohérence de marque pour laisser une première impression solide.'
    ),
    'flyers': (
        'Flyers',
        'Supports imprimés et numériques pour événements et promotions.',
        'Mise en page structurée, call-to-action clair et visuels dynamiques adaptés à une communication rapide.'
    ),
    'logos': (
        'Logos',
        'Identités visuelles et symboles uniques.',
        'Création de logos conceptuels, adaptables à différents supports et reconnaissables en un instant.'
    ),
}

root = Path('src/pages/projects')
root.mkdir(parents=True, exist_ok=True)

template = (
    "---\n"
    "import Layout from '../../../layouts/Layout.astro';\n"
    "import Header from '../../../components/Header.astro';\n"
    "import Footer from '../../../components/Footer.astro';\n"
    "---\n\n"
    "<Layout>\n"
    "  <Header />\n"
    "  <main>\n"
    "    <section class=\"section project-detail-hero\">\n"
    "      <div class=\"section-heading\">\n"
    "        <span class=\"eyebrow\">// PROJET</span>\n"
    "        <h1>{title}</h1>\n"
    "        <p class=\"intro-text\">{summary}</p>\n"
    "      </div>\n\n"
    "      <div class=\"project-overview\">\n"
    "        <p>{detail}</p>\n"
    "        <p>Ce projet est une démonstration de mon travail de conception et de développement. Si vous souhaitez voir des maquettes, des prototypes ou une stratégie de mise en œuvre, contactez-moi directement.</p>\n"
    "      </div>\n\n"
    "      <div class=\"project-actions\">\n"
    "        <a href=\"/projects\" class=\"button secondary\">Retour aux projets</a>\n"
    "        <a href=\"/contact\" class=\"button primary\">Me contacter</a>\n"
    "      </div>\n"
    "    </section>\n"
    "  </main>\n"
    "  <Footer />\n"
    "</Layout>\n\n"
    "<style>\n"
    "  .project-detail-hero {{ padding: var(--space-xl) 0; }}\n"
    "  .intro-text {{ max-width: 760px; color: var(--on-surface-variant); }}\n"
    "  .project-overview {{ margin-top: var(--space-lg); background: rgba(42,42,42,0.35); border:1px solid var(--outline); border-radius:1rem; padding:var(--space-lg); }}\n"
    "  .project-actions {{ display:flex; gap:var(--space-md); flex-wrap:wrap; margin-top:var(--space-xl); }}\n"
    "  .button.secondary {{ background:transparent; border-color: rgba(141, 209, 224, 0.3); color: var(--on-surface); }}\n"
    "  @media (max-width:768px) {{ .project-actions {{ flex-direction:column; }} }}\n"
    "</style>\n"
)

for slug, (title, summary, detail) in projects.items():
    folder = root / slug
    folder.mkdir(parents=True, exist_ok=True)
    page = folder / 'index.astro'
    content = template.format(title=title, summary=summary, detail=detail)
    page.write_text(content, encoding='utf-8')

print('Created project pages:', ', '.join(projects.keys()))
