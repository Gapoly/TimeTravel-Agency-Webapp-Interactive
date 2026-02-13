export const destinations = [
  {
    id: 'paris-1889',
    title: 'Paris 1889',
    subtitle: 'La Belle Époque',
    date: '1889',
    era: 'XIXe siècle',
    shortDescription: 'Vivez l\'effervescence de l\'Exposition Universelle et découvrez la Tour Eiffel fraîchement inaugurée.',
    fullDescription: `Plongez au cœur de la Belle Époque, cette période d'optimisme et d'innovation qui a façonné le Paris moderne. L'année 1889 marque le centenaire de la Révolution française, célébré par une Exposition Universelle spectaculaire qui attire des millions de visiteurs du monde entier.

La Tour Eiffel, merveille d'ingénierie de 300 mètres, vient tout juste d'être achevée. Vous aurez le privilège de la contempler dans sa splendeur originelle, avec sa peinture rouge-brun d'origine, avant qu'elle ne devienne le symbole éternel de Paris.`,
    highlights: [
      'Accès VIP à l\'Exposition Universelle',
      'Dîner au premier étage de la Tour Eiffel',
      'Soirée au Moulin Rouge avec Toulouse-Lautrec',
      'Visite de l\'atelier de Gustave Eiffel',
      'Promenade en calèche sur les Champs-Élysées'
    ],
    activities: [
      {
        title: 'Inauguration privée',
        description: 'Assistez à une reconstitution de l\'inauguration de la Tour Eiffel en compagnie de l\'élite parisienne.'
      },
      {
        title: 'Café littéraire',
        description: 'Partagez un café avec les grands esprits de l\'époque dans les salons du Quartier Latin.'
      },
      {
        title: 'Atelier impressionniste',
        description: 'Initiez-vous à la peinture aux côtés de maîtres impressionnistes dans leur atelier de Montmartre.'
      }
    ],
    price: '24 500',
    duration: '3 jours',
    difficulty: 'Accessible',
    image: '/images/paris.png',
    heroImage: '/images/paris.png',
    color: '#c9a962',
    icon: '🗼'
  },
  {
    id: 'cretace',
    title: 'Crétacé',
    subtitle: 'L\'Ère des Titans',
    date: '-65 000 000',
    era: 'Mésozoïque',
    shortDescription: 'Observez les dinosaures dans leur habitat naturel, juste avant la grande extinction.',
    fullDescription: `Remontez 65 millions d'années dans le passé, à l'aube de la plus grande extinction de masse que notre planète ait connue. Le Crétacé supérieur représente l'apogée du règne des dinosaures, une époque où ces créatures majestueuses dominaient tous les écosystèmes terrestres.

Notre expédition vous emmène dans ce monde primitif avec toutes les garanties de sécurité offertes par notre technologie temporelle de pointe. Vous observerez le T-Rex, le Tricératops et le majestueux Ptéranodon depuis nos plateformes d'observation invisibles.`,
    highlights: [
      'Observation du T-Rex en chasse',
      'Survol en module sécurisé des plaines du Crétacé',
      'Rencontre avec un troupeau de Tricératops',
      'Collecte de fossiles pré-formation',
      'Nuit sous les étoiles préhistoriques'
    ],
    activities: [
      {
        title: 'Safari préhistorique',
        description: 'Parcourez les vastes plaines du Crétacé à bord de notre véhicule temporel tout-terrain.'
      },
      {
        title: 'Vol ptérodactyle',
        description: 'Survolez les canyons aux côtés des grands reptiles volants dans notre module aérien.'
      },
      {
        title: 'Nidification',
        description: 'Observez l\'éclosion des œufs de dinosaures dans les sites de nidification protégés.'
      }
    ],
    price: '89 000',
    duration: '5 jours',
    difficulty: 'Aventurier',
    image: '/images/crétacé.png',
    heroImage: '/images/crétacé.png',
    color: '#5a8a6a',
    icon: '🦖'
  },
  {
    id: 'florence-1504',
    title: 'Florence 1504',
    subtitle: 'Renaissance Italienne',
    date: '1504',
    era: 'Renaissance',
    shortDescription: 'Assistez au dévoilement du David de Michel-Ange et côtoyez les génies de la Renaissance.',
    fullDescription: `Florence, 1504. La cité des Médicis est au sommet de sa gloire artistique et intellectuelle. Cette année marque l'achèvement du David de Michel-Ange, chef-d'œuvre absolu de la sculpture occidentale, qui sera bientôt installé sur la Piazza della Signoria.

Léonard de Vinci travaille sur la Joconde dans son atelier, tandis que Raphaël perfectionne son art. Vous aurez l'opportunité unique de rencontrer ces génies, de visiter leurs ateliers et d'assister à la création d'œuvres qui définiront l'art occidental pour les siècles à venir.`,
    highlights: [
      'Visite privée de l\'atelier de Michel-Ange',
      'Audience avec Léonard de Vinci',
      'Dîner au Palazzo Médicis',
      'Cérémonie du dévoilement du David',
      'Cours de dessin avec les maîtres'
    ],
    activities: [
      {
        title: 'Atelier du Maître',
        description: 'Observez Michel-Ange mettre les dernières touches au David dans son atelier secret.'
      },
      {
        title: 'Banquet Renaissance',
        description: 'Participez à un somptueux banquet au Palazzo Vecchio avec les nobles florentins.'
      },
      {
        title: 'Leçon de génie',
        description: 'Assistez à une démonstration des machines volantes de Léonard de Vinci.'
      }
    ],
    price: '45 000',
    duration: '4 jours',
    difficulty: 'Culturel',
    image: '/images/florense.png',
    heroImage: '/images/florense.png',
    color: '#a86a4a',
    icon: '🎨'
  }
];

export const getDestinationById = (id) => destinations.find(d => d.id === id);
