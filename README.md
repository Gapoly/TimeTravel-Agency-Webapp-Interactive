# TimeTravel Agency - Chronos Voyages 🕰️

Webapp interactive pour une agence de voyage temporel fictive de luxe, créée avec assistance IA générative.

![React](https://img.shields.io/badge/React-19.1.0-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF?logo=vite) ![License](https://img.shields.io/badge/License-Pédagogique-green)

## 🛠️ Stack Technique

- **Framework** : React 19.1 + Vite
- **Animations** : Framer Motion
- **Styling** : CSS Modules (dark theme premium)
- **IA Chatbot** : Groq API (Llama 3.3 70B)
- **Icons** : Lucide React
- **Hébergement** : Compatible Vercel / Netlify

## ✨ Features

### Landing Page
- Hero section immersive avec animation de particules canvas
- Présentation de l'agence avec valeurs (sécurité, exclusivité, immersion)
- Navigation fluide avec scroll smooth

### Galerie de Destinations
3 destinations temporelles avec cartes interactives :
- 🗼 **Paris 1889** - Belle Époque, Exposition Universelle
- 🦖 **Crétacé** - -65 millions d'années, ère des dinosaures
- 🎨 **Florence 1504** - Renaissance italienne, Michel-Ange

### Pages Détail
- Hero image immersive par destination
- Description complète de l'expérience
- Points forts et activités proposées
- Carte de réservation avec prix

### Quiz de Recommandation
- 4 questions interactives
- Algorithme de scoring personnalisé
- Recommandation IA basée sur les préférences

### Chatbot IA Conversationnel
- Assistant "Aria" - conseillère en voyages temporels
- Intégration Groq API avec Llama 3.3 70B
- Contexte complet de l'agence et des destinations
- Historique de conversation

### Système de Réservation
- Formulaire complet (destination, date, voyageurs, coordonnées)
- Suggestions IA contextuelles par destination
- Page de paiement sécurisé (simulé)
- Confirmation avec code de réservation

## 🤖 IA Utilisées

| Usage | Outil | Modèle |
|-------|-------|--------|
| Maquette UI | v0.dev (Vercel) | - |
| Développement code | Claude Code | Claude Opus 4.5 |
| Chatbot intégré | Groq API | Llama 3.3 70B Versatile |
| Génération d'images | Gemini | Nano Banana |

## 📦 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repo
git clone https://github.com/Gapoly/TimeTravel-Agency-Webapp-Interactive.git
cd TimeTravel-Agency-Webapp-Interactive

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés API

# Lancer le serveur de développement
npm run dev
```

### Variables d'environnement

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

Obtenez une clé API gratuite sur [console.groq.com](https://console.groq.com)

## 📁 Structure du Projet

```
chronos-voyages/
├── public/
│   └── images/          # Images des destinations
├── src/
│   ├── components/      # Composants React
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── AboutSection.jsx
│   │   ├── DestinationsSection.jsx
│   │   ├── QuizSection.jsx
│   │   ├── ReservationSection.jsx
│   │   ├── Chatbot.jsx
│   │   └── Footer.jsx
│   ├── pages/
│   │   ├── DestinationDetail.jsx
│   │   └── PaymentPage.jsx
│   ├── data/
│   │   └── destinations.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
└── README.md
```

## 🎨 Design

- **Theme** : Dark mode premium avec accents dorés
- **Typographie** : Cormorant Garamond (display) + Montserrat (body)
- **Palette** : Noir profond, or (#C9A962), perle, argent
- **Animations** : Particules canvas, transitions Framer Motion, hover effects

## 📄 Crédits

### APIs & Services
- [Groq](https://groq.com) - API LLM pour le chatbot
- [Lucide](https://lucide.dev) - Icônes

### Frameworks & Librairies
- [React](https://react.dev)
- [Vite](https://vite.dev)
- [Framer Motion](https://www.framer.com/motion/)

## 📄 Licence

Projet pédagogique - M1/M2 Digital & IA - Ynov Campus

---

*Créé avec ❤️ et assistance IA*
