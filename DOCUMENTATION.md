# Premiere Collection Ltd — Documentation Technique & Guide d'Utilisation

> **Version** : 1.0.0
> **Date** : Mars 2026
> **Projet** : Site vitrine & CMS — Premiere Collection Ltd
> **Stack** : Next.js 16 / React 19 / Tailwind CSS 4 / Vercel

---

## Table des Matieres

1. [Introduction](#1-introduction)
2. [Choix Technologiques & Justification](#2-choix-technologiques--justification)
3. [Architecture du Projet](#3-architecture-du-projet)
4. [Design System](#4-design-system)
5. [Guide d'Utilisation — Site Public](#5-guide-dutilisation--site-public)
6. [Guide d'Utilisation — Panneau Admin](#6-guide-dutilisation--panneau-admin)
7. [API Reference](#7-api-reference)
8. [Deploiement & Configuration](#8-deploiement--configuration)
9. [Securite](#9-securite)
10. [Maintenance & Evolution](#10-maintenance--evolution)

---

## 1. Introduction

### 1.1 Contexte

Premiere Collection Ltd est une entreprise de sourcing et de production specialisee dans les produits de luxe personnalises : trophees, accessoires de marque, packaging sur mesure et bijoux. Le site web est son principal outil de communication et d'acquisition clients.

### 1.2 Objectifs du site

| Objectif | Description |
|----------|-------------|
| **Vitrine** | Presenter les 4 gammes de produits avec une identite visuelle haut de gamme |
| **Acquisition** | Convertir les visiteurs en leads via le formulaire de devis structure |
| **Contact** | Permettre la prise de contact rapide |
| **Autonomie** | Offrir un panneau d'administration permettant de modifier textes et images sans developpeur |

### 1.3 Perimetre fonctionnel

- Site vitrine responsive (mobile, tablette, desktop)
- Formulaire de demande de devis en 4 etapes
- Formulaire de contact
- Panneau d'administration (images + textes)
- Envoi d'emails automatise
- SEO optimise (sitemap, robots.txt, Open Graph)
- Conformite RGPD (mentions legales, bandeau cookies)

---

## 2. Choix Technologiques & Justification

### 2.1 Pourquoi Next.js 16 et pas un CMS (WordPress, Webflow, Wix) ?

| Critere | CMS Traditionnel (WordPress) | No-Code (Webflow/Wix) | **Next.js 16 (Notre choix)** |
|---------|------|--------|---------|
| **Performance** | Mediocre (PHP, plugins lourds, BDD MySQL) | Correcte mais limitee | **Excellente** — SSR/SSG, optimisation image native, zero bloat |
| **Personnalisation DA** | Limitee aux themes, CSS override complexe | Templates rigides, customisation limitee | **Totale** — pixel-perfect, palette champagne/beige sur mesure |
| **Formulaire de devis** | Plugin + extensions payantes | Limites sur les formulaires multi-etapes | **Sur mesure** — 4 sections, upload fichiers, validation, envoi email |
| **Securite** | Vulnerable (plugins, BDD, mises a jour critiques) | Depend du provider | **Minimale surface d'attaque** — pas de BDD, pas de plugins tiers |
| **SEO** | Correct avec plugins (Yoast) | Basique | **Natif** — sitemap, robots, OG tags, SSR |
| **Cout hebergement** | 10-50 EUR/mois (hosting + BDD + SSL) | 15-40 EUR/mois (abonnement) | **0 EUR** — Vercel free tier (suffisant pour ce volume) |
| **Autonomie client** | Interface admin complexe, risque de casser le site | Interface limitee | **Admin sur mesure** — interface simple, modifiable sans risque |
| **Scalabilite** | Lente, serveur unique | Limitee | **Infinie** — serverless, CDN global, edge computing |
| **Temps de chargement** | 2-5s (First Contentful Paint) | 1-3s | **< 1s** — pre-rendu, CDN, optimisation automatique |

### 2.2 Pourquoi pas de base de donnees ?

Le projet stocke ses donnees dans **Vercel Blob** (stockage cloud de fichiers) :

| Critere | Base de donnees (PostgreSQL, MongoDB) | **Vercel Blob (Notre choix)** |
|---------|------|---------|
| **Complexite** | Necessite un serveur BDD, ORM, migrations, schemas | **Zero config** — lecture/ecriture de fichiers JSON |
| **Cout** | 5-20 EUR/mois minimum | **Inclus** dans le plan Vercel |
| **Volume de donnees** | Surpuissant pour ce besoin | **Parfaitement adapte** — < 20 champs texte, < 15 images |
| **Backup** | Configuration manuelle | **Automatique** par Vercel |
| **Latence** | Requete BDD + reseau | **CDN global** — fichiers servis au plus proche |

**Conclusion** : une BDD serait du sur-engineering pour un site vitrine avec un admin simple. Vercel Blob offre la persistance necessaire avec zero complexite.

### 2.3 Stack technique detaillee

| Technologie | Version | Role | Justification |
|-------------|---------|------|---------------|
| **Next.js** | 16.1.6 | Framework React full-stack | SSR, App Router, API Routes, Image Optimization |
| **React** | 19.2.3 | Bibliotheque UI | Composants server/client, async components |
| **TypeScript** | 5.x | Typage statique | Securite du code, autocompletion, maintenabilite |
| **Tailwind CSS** | 4.x | Framework CSS utilitaire | Design system sur mesure, responsive rapide, zero CSS mort |
| **Vercel Blob** | 2.3.1 | Stockage cloud | Images, manifestes JSON, fichiers uploades |
| **Resend** | 6.9.3 | Service d'envoi d'emails | Emails transactionnels (devis, contact) |
| **Vercel** | — | Plateforme de deploiement | CDN global, SSL automatique, CI/CD, serverless |

### 2.4 Pourquoi Tailwind CSS et pas un framework UI (Material UI, Shadcn) ?

- **DA sur mesure** : la palette champagne/beige/gris nacre ne correspond a aucun framework UI existant
- **Poids minimal** : Tailwind purge les classes inutilisees = < 10KB de CSS en production
- **Controle total** : chaque pixel est maitrise, pas de style par defaut a surcharger
- **Coherence** : les tokens de design (couleurs, espacements, typographies) sont definis une seule fois

### 2.5 Pourquoi Resend et pas EmailJS, Nodemailer, SendGrid ?

| Service | Avantage | Inconvenient | Verdict |
|---------|----------|--------------|---------|
| EmailJS | Simple, client-side | Expose les credentials cote client | Non securise |
| Nodemailer | Gratuit, auto-heberge | Necessite un serveur SMTP, complexe | Trop complexe |
| SendGrid | Robuste, scalable | Interface complexe, pricing opaque | Surpuissant |
| **Resend** | **API moderne, SDK TypeScript, 3000 emails/mois gratuits** | Recente (2023) | **Ideal** |

---

## 3. Architecture du Projet

### 3.1 Structure des fichiers

```
arribas-site/
├── app/                              # Next.js App Router
│   ├── (admin)/                     # Route group — Admin (sans navbar/footer)
│   │   └── admin/
│   │       ├── layout.tsx           # Layout admin minimaliste
│   │       └── page.tsx             # Dashboard admin (images + textes)
│   │
│   ├── (site)/                      # Route group — Site public (avec navbar/footer)
│   │   ├── layout.tsx               # Layout site (Navbar + Footer + CookieBanner)
│   │   ├── page.tsx                 # Page d'accueil
│   │   ├── quote/page.tsx           # Page formulaire de devis
│   │   └── legal/page.tsx           # Page mentions legales
│   │
│   ├── api/                         # Routes API serverless
│   │   ├── admin/                   # Routes protegees (auth cookie)
│   │   │   ├── login/route.ts       # Authentification admin
│   │   │   ├── logout/route.ts      # Deconnexion admin
│   │   │   ├── images/route.ts      # Lecture manifest images
│   │   │   ├── upload/route.ts      # Upload d'images
│   │   │   ├── delete/route.ts      # Suppression d'images
│   │   │   └── content/route.ts     # CRUD contenu texte
│   │   ├── public/                  # Routes publiques
│   │   │   ├── content/route.ts     # Lecture contenu (pour composants client)
│   │   │   └── logo/route.ts        # Chemin du logo
│   │   ├── contact/route.ts         # Envoi email contact
│   │   └── quote/
│   │       ├── route.ts             # Envoi email devis
│   │       └── upload/route.ts      # Upload fichiers branding
│   │
│   ├── layout.tsx                   # Root layout (fonts, metadata, OG tags)
│   ├── globals.css                  # Design system (couleurs, animations)
│   ├── sitemap.ts                   # Sitemap SEO dynamique
│   └── robots.ts                    # Robots.txt SEO
│
├── components/                       # Composants React
│   ├── Navbar.tsx                   # Navigation sticky + logo dynamique
│   ├── Hero.tsx                     # Section hero avec image de fond
│   ├── Collection.tsx               # Grille de 4 produits
│   ├── Strategy.tsx                 # 3 piliers strategiques
│   ├── About.tsx                    # Section a propos
│   ├── JoinUs.tsx                   # Section recrutement/partenariats
│   ├── Contact.tsx                  # Formulaire de contact
│   ├── Footer.tsx                   # Pied de page
│   ├── QuoteForm.tsx                # Formulaire de devis (4 sections)
│   ├── DynamicImage.tsx             # Image dynamique depuis Vercel Blob
│   ├── Text.tsx                     # Texte dynamique depuis le CMS
│   └── CookieBanner.tsx             # Bandeau cookies RGPD
│
├── lib/                              # Logique metier
│   ├── image-manifest.ts            # Gestion images (Vercel Blob)
│   └── content-manifest.ts          # Gestion contenu texte (Vercel Blob)
│
├── hooks/                            # React Hooks
│   └── useLogo.ts                   # Hook client pour le logo dynamique
│
├── public/                           # Assets statiques
│   └── images/logo.png              # Logo par defaut
│
├── .env.local                        # Variables d'environnement (secrets)
├── next.config.ts                    # Configuration Next.js
├── tailwind.config.ts                # (integre dans globals.css via Tailwind v4)
├── tsconfig.json                     # Configuration TypeScript
└── package.json                      # Dependances
```

### 3.2 Flux de donnees

```
┌─────────────────────────────────────────────────────┐
│                   VERCEL BLOB                        │
│                                                     │
│  manifest/images.json    manifest/content.json      │
│  images/logo.png         images/collection-0.jpg    │
│  uploads/branding.pdf    ...                        │
└──────────────┬──────────────────────┬───────────────┘
               │                      │
               ▼                      ▼
┌──────────────────────┐  ┌──────────────────────────┐
│   API Routes (SSR)   │  │  Server Components (SSR)  │
│                      │  │                            │
│  /api/admin/*        │  │  Hero, Collection,         │
│  /api/public/*       │  │  Strategy, About,          │
│  /api/contact        │  │  JoinUs, Footer            │
│  /api/quote          │  │  → getText(), getImagePath()│
└──────────┬───────────┘  └─────────────┬──────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────┐  ┌──────────────────────────┐
│  Client Components   │  │     HTML rendu (SSR)      │
│                      │  │                            │
│  Navbar (useLogo)    │  │  Servi au navigateur       │
│  Contact (fetch)     │  │  via CDN Vercel            │
│  QuoteForm           │  │                            │
│  Admin Dashboard     │  │                            │
└──────────────────────┘  └──────────────────────────┘
```

### 3.3 Route Groups — Pourquoi ?

Next.js App Router utilise des **route groups** `(site)` et `(admin)` pour :

- `(site)` : inclut Navbar + Footer + CookieBanner → pour les pages publiques
- `(admin)` : layout minimal sans navigation → pour le panneau d'administration

Les parentheses dans le nom signifient que le groupe **n'affecte pas l'URL** :
- `app/(site)/page.tsx` → accessible a `/` (pas `/site`)
- `app/(admin)/admin/page.tsx` → accessible a `/admin`

---

## 4. Design System

### 4.1 Palette de couleurs

| Token | Hex | Utilisation |
|-------|-----|-------------|
| `background` | `#FAF8F5` | Fond de page principal |
| `foreground` | `#2D2D2D` | Texte principal |
| `champagne` | `#B8956A` | **Accent principal** — titres, CTA, liens |
| `champagne-dark` | `#9A7B55` | Hover des CTA |
| `champagne-light` | `#D4B896` | Bordures decoratives |
| `beige` | `#F5F0EB` | Fonds de sections alternees |
| `beige-dark` | `#E8E0D6` | Bordures, separateurs |
| `grey` | `#9B9B9B` | Texte secondaire |
| `white-nacre` | `#FDFCFA` | Fond navbar, cards |

### 4.2 Typographie

| Police | Poids | Utilisation |
|--------|-------|-------------|
| **Cormorant Garamond** | 300-700, italic | Titres, headings, citations — esprit luxe serif |
| **Inter** | 300-600 | Corps de texte, labels, boutons — lisibilite moderne |

**Hierarchie** :
- Hero : `text-5xl` a `text-8xl` (responsive)
- Titres de section : `text-4xl` a `text-5xl`
- Sous-titres : `text-xs` avec `tracking-[0.3em]` uppercase
- Corps : `text-sm`
- Labels : `text-xs` uppercase

### 4.3 Animations

| Animation | Duree | Usage |
|-----------|-------|-------|
| `fadeInUp` | 0.8s | Apparition du hero au chargement |
| Scroll shrink navbar | 0.5s | Reduction de la navbar au scroll |
| Hover transitions | 0.3s | Changement de couleur, bordures |
| Bounce | infini | Indicateur de scroll (hero) |

---

## 5. Guide d'Utilisation — Site Public

### 5.1 Pages disponibles

| URL | Page | Description |
|-----|------|-------------|
| `/` | Accueil | Hero + toutes les sections |
| `/quote` | Demande de devis | Formulaire en 4 etapes |
| `/legal` | Mentions legales | Politique de confidentialite, cookies, PI |

### 5.2 Navigation

La navbar est **fixe en haut** de l'ecran et contient :
- **Logo** (si uploade via l'admin)
- **5 liens** vers les sections : Our Collection, Our Strategy, About Us, Join Us, Contact Us
- **Bouton "Request a Quote"** en champagne

Au scroll, la navbar se **retracte** avec une transition fluide pour laisser plus d'espace au contenu.

Sur **mobile**, un menu hamburger remplace les liens avec un menu deroulant.

### 5.3 Formulaire de devis

Le formulaire est organise en **4 sections** :

1. **Contact Information** : Nom, Entreprise, Email, Telephone, Pays
2. **Project Information** : Categorie produit (dropdown), Reference, Quantite
3. **Customization Details** : Type de personnalisation (boutons toggle), Upload branding (multi-fichiers), Description
4. **Additional Information** : Packaging requis (Yes/No/Not sure), Lieu de livraison, Notes

A la soumission :
- Les donnees sont envoyees a l'API `/api/quote`
- Un email structure est envoye a l'adresse configuree dans `CONTACT_EMAIL`
- L'utilisateur voit un message de confirmation

### 5.4 Bandeau cookies

Au premier acces, un bandeau apparait en bas de page. Il disparait apres clic sur "Accept" et ne reapparait plus (stocke dans `localStorage`).

---

## 6. Guide d'Utilisation — Panneau Admin

### 6.1 Acces

| | |
|---|---|
| **URL** | `/admin` |
| **Mot de passe** | Configure dans la variable `ADMIN_PASSWORD` |

### 6.2 Onglet "Images"

Le dashboard affiche **10 emplacements** organises par section :

| Section | Emplacements | Ratio recommande |
|---------|-------------|-----------------|
| **Logo** | 1 (logo du site) | PNG transparent recommande |
| **Hero** | 1 (image de fond) | Paysage, haute resolution |
| **Our Collection** | 4 (images produits) | Portrait 3:4 |
| **Our Strategy** | 3 (images strategies) | Paysage 4:3 |
| **About Us** | 1 (image section) | Portrait 4:5 |

**Actions possibles** :
- **Uploader** : cliquer sur "Upload Image" ou glisser-deposer une image sur la zone
- **Remplacer** : cliquer "Replace" pour mettre a jour une image existante
- **Supprimer** : cliquer "Delete" pour revenir au placeholder

**Formats acceptes** : JPG, PNG, WebP, SVG — **Max 10 MB**

### 6.3 Onglet "Content"

Tous les textes du site sont editables, organises par section :

| Section | Champs editables |
|---------|-----------------|
| **Hero** | Sous-titre, 3 lignes de titre, description, texte du CTA |
| **Our Collection** | Sous-titre, titre + pour chaque produit : nom, categorie, reference, description |
| **Our Strategy** | Sous-titre, titre + pour chaque strategie : titre, description |
| **About Us** | Sous-titre, 2 paragraphes, citation |
| **Join Us** | Sous-titre, description + 4 raisons (titre + description) |
| **Contact Us** | Sous-titre, description, email, localisation |
| **Footer** | Description |

**Fonctionnement** :
- Modifie le texte dans le champ
- Le texte se **sauvegarde automatiquement** quand tu cliques en dehors du champ
- L'indicateur "Saving..." confirme la sauvegarde
- Le bouton **"Reset"** remet le texte par defaut
- Les changements sont **visibles immediatement** sur le site (rafraichir la page)

### 6.4 Logout

Le bouton "Logout" en haut a droite deconnecte la session admin (supprime le cookie d'authentification).

---

## 7. API Reference

### 7.1 Routes Admin (protegees par cookie `admin_token`)

| Methode | Route | Description | Body |
|---------|-------|-------------|------|
| `POST` | `/api/admin/login` | Connexion admin | `{ password: string }` |
| `POST` | `/api/admin/logout` | Deconnexion | — |
| `GET` | `/api/admin/images` | Liste des images | — |
| `POST` | `/api/admin/upload` | Upload image | `FormData { file, slot }` |
| `POST` | `/api/admin/delete` | Suppression image | `{ slot: string }` |
| `GET` | `/api/admin/content` | Liste du contenu | — |
| `POST` | `/api/admin/content` | Mise a jour texte | `{ key: string, value: string }` |

### 7.2 Routes Publiques

| Methode | Route | Description | Body |
|---------|-------|-------------|------|
| `GET` | `/api/public/content` | Contenu texte (JSON) | — |
| `GET` | `/api/public/logo` | Chemin du logo | — |
| `POST` | `/api/contact` | Envoi message contact | `{ name, company, email, message }` |
| `POST` | `/api/quote` | Envoi demande de devis | `{ fullName, companyName, email, phone, country, productCategory, ... }` |
| `POST` | `/api/quote/upload` | Upload fichiers branding | `FormData { files[] }` |

### 7.3 Stockage Vercel Blob

| Chemin Blob | Contenu |
|-------------|---------|
| `manifest/images.json` | Manifest des images (slot → URL) |
| `manifest/content.json` | Manifest du contenu texte (key → value) |
| `images/{slot}.{ext}` | Images uploadees |
| `uploads/{timestamp}_{name}` | Fichiers branding des devis |

---

## 8. Deploiement & Configuration

### 8.1 Pre-requis

- Compte **Vercel** (gratuit)
- Compte **Resend** (gratuit, 3000 emails/mois)
- Compte **GitHub** (pour le code source)

### 8.2 Variables d'environnement

| Variable | Description | Ou l'obtenir |
|----------|-------------|--------------|
| `ADMIN_PASSWORD` | Mot de passe du panneau admin | Choix libre |
| `BLOB_READ_WRITE_TOKEN` | Token Vercel Blob | Vercel Dashboard > Storage > Blob > .env.local |
| `RESEND_API_KEY` | Cle API Resend | resend.com > API Keys |
| `CONTACT_EMAIL` | Email de reception des devis/contacts | Votre adresse email |

### 8.3 Procedure de deploiement

1. **Pusher le code** sur GitHub
2. **Importer le repo** sur vercel.com/new
3. **Creer un Blob Store** dans Vercel > Storage
4. **Ajouter les variables** dans Settings > Environment Variables
5. **Deployer** — Vercel build automatiquement

Chaque `git push` declenche un **redeploiement automatique**.

### 8.4 Domaine personnalise

1. Vercel Dashboard > Settings > Domains
2. Ajouter votre domaine (ex: `premierecollection.com`)
3. Configurer les DNS chez votre registrar :
   - Type `A` : `76.76.21.21`
   - Type `CNAME` : `cname.vercel-dns.com`
4. SSL est automatique (Let's Encrypt)

---

## 9. Securite

### 9.1 Mesures implementees

| Mesure | Detail |
|--------|--------|
| **Authentification admin** | Cookie HTTP-only, Secure, SameSite=strict, expiration 24h |
| **Pas de BDD exposee** | Aucune base de donnees, donc aucune injection SQL possible |
| **Validation des uploads** | Types de fichiers restreints (JPG, PNG, WebP, SVG), taille max 10-15 MB |
| **Variables secretes** | Cles API et mots de passe dans les variables d'environnement (jamais dans le code) |
| **Robots.txt** | `/admin` et `/api/` exclus du crawling |
| **HTTPS** | Automatique sur Vercel (certificat SSL Let's Encrypt) |

### 9.2 Recommandations

- Changer regulierement le mot de passe admin
- Ne jamais commiter le fichier `.env.local`
- Surveiller l'utilisation du Blob Store dans le dashboard Vercel
- Configurer un domaine email verifie dans Resend pour les emails de production

---

## 10. Maintenance & Evolution

### 10.1 Mises a jour

| Composant | Frequence | Commande |
|-----------|-----------|----------|
| Dependances npm | Mensuelle | `npm update` |
| Next.js | Trimestrielle | `npm install next@latest react@latest react-dom@latest` |
| Vercel Blob | Selon besoins | `npm install @vercel/blob@latest` |

### 10.2 Evolutions possibles

| Evolution | Complexite | Description |
|-----------|-----------|-------------|
| Pages produits detaillees | Moyenne | Creer des pages `/products/[slug]` avec galerie d'images |
| Multi-langue (FR/EN) | Moyenne | Ajouter `next-intl` pour l'internationalisation |
| Blog / Actualites | Moyenne | Ajouter une section blog avec MDX ou un CMS headless |
| Analytics | Simple | Integrer Google Analytics ou Plausible |
| Chat en direct | Simple | Integrer Crisp, Intercom ou Tawk.to |
| Paiement en ligne | Complexe | Integrer Stripe pour les commandes directes |

### 10.3 Support

Pour toute question technique ou modification, contacter l'equipe de developpement.

---

*Document genere pour Premiere Collection Ltd — Mars 2026*
