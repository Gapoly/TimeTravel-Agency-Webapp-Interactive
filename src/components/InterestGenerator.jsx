import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Check, RefreshCw } from 'lucide-react';
import { destinations } from '../data/destinations';
import styles from './InterestGenerator.module.css';

const INTERESTS = [
  { id: 'art', label: 'Art', icon: '🎨' },
  { id: 'nature', label: 'Nature', icon: '🌿' },
  { id: 'architecture', label: 'Architecture', icon: '🏛️' },
  { id: 'gastronomie', label: 'Gastronomie', icon: '🍷' },
  { id: 'histoire', label: 'Histoire', icon: '📜' },
  { id: 'aventure', label: 'Aventure', icon: '⚔️' },
  { id: 'romantisme', label: 'Romantisme', icon: '💫' },
  { id: 'science', label: 'Science', icon: '🔬' },
];

const generateDescription = (destinationId, selectedInterests) => {
  const templates = {
    'paris-1889': {
      art: "Les galeries de l'Exposition Universelle vous dévoileront les chefs-d'œuvre de l'impressionnisme naissant, avec des œuvres de Monet, Renoir et Degas exposées pour la première fois.",
      nature: "Les jardins du Champ-de-Mars, spécialement aménagés pour l'Exposition, offrent une oasis de verdure au pied de la Tour Eiffel, avec des espèces botaniques du monde entier.",
      architecture: "La Tour Eiffel, prouesse d'ingénierie de 300 mètres, vous révélera ses secrets de construction. Vous découvrirez également les pavillons innovants de l'Exposition aux architectures révolutionnaires.",
      gastronomie: "Les restaurants parisiens de la Belle Époque vous initieront à la haute gastronomie française. Dégustez les créations des grands chefs dans les brasseries historiques de Montmartre.",
      histoire: "Vivez le centenaire de la Révolution française avec les Parisiens. Assistez aux cérémonies commémoratives et découvrez comment 1889 a façonné la France moderne.",
      aventure: "Montez au sommet de la Tour Eiffel par les escaliers originaux, une ascension de 1 665 marches ! Explorez les coulisses de l'Exposition, des tunnels souterrains aux machineries cachées.",
      romantisme: "Paris, ville lumière et capitale de l'amour, vous accueille dans ses cafés littéraires et ses jardins secrets. Une promenade en calèche au clair de lune sera inoubliable.",
      science: "L'Exposition Universelle présente les dernières innovations : électricité, phonographe d'Edison, premières automobiles. Rencontrez les inventeurs qui façonnent le XXe siècle."
    },
    'cretace': {
      art: "La nature préhistorique est l'artiste ultime. Photographiez des paysages vierges, des aurores boréales primitives et des formations géologiques uniques qui n'existent plus.",
      nature: "Immergez-vous dans un écosystème intact vieux de 65 millions d'années. Observez la faune et la flore du Crétacé, des fougères géantes aux insectes primitifs.",
      architecture: "Découvrez l'architecture naturelle des nids de dinosaures, véritables constructions complexes. Explorez les formations rocheuses sculptées par des millions d'années d'érosion.",
      gastronomie: "Notre chef temporel a reconstitué les saveurs primitives comestibles du Crétacé. Une expérience culinaire unique avec des plantes ancestrales disparues depuis.",
      histoire: "Vivez la préhistoire, bien avant l'humanité. Comprenez comment la vie a évolué et pourquoi cette ère s'est terminée par la plus grande extinction de masse.",
      aventure: "Safari en véhicule temporel blindé, survol des territoires de chasse du T-Rex, observation nocturne des prédateurs... L'aventure ultime vous attend !",
      romantisme: "Contemplez le coucher de soleil sur un monde vierge, sous des étoiles différentes de celles d'aujourd'hui. Une nuit sous le ciel du Crétacé, à deux, est magique.",
      science: "Étudiez les dinosaures in vivo ! Observez leur comportement, leur physiologie, leurs interactions. Une opportunité unique pour la paléontologie vivante."
    },
    'florence-1504': {
      art: "L'atelier de Michel-Ange vous ouvre ses portes. Observez la création du David, visitez les fresques de la Chapelle Sixtine en cours de réalisation, rencontrez Raphaël et Botticelli.",
      nature: "Les collines toscanes offrent des paysages immortalisés par les maîtres de la Renaissance. Promenez-vous dans les vignobles et oliveraies qui entourent Florence.",
      architecture: "Le Duomo de Brunelleschi, le Palazzo Vecchio, les ponts de l'Arno... Découvrez l'architecture qui a inspiré le monde occidental pendant des siècles.",
      gastronomie: "Les banquets des Médicis sont légendaires. Savourez la cuisine toscane authentique : ribollita, bistecca fiorentina, et les vins du Chianti servis dans les palais.",
      histoire: "Florence 1504 est le cœur battant de la Renaissance. Assistez aux intrigues politiques, aux alliances des grandes familles, aux débuts de la pensée moderne.",
      aventure: "Infiltrez-vous dans les cercles secrets des artistes et mécènes. Participez à une joute médiévale ou explorez les passages souterrains du Palazzo Pitti.",
      romantisme: "Florence est la ville de Dante et Béatrice. Récitez des sonnets au bord de l'Arno, dansez lors d'un bal Renaissance, vivez une romance digne des plus beaux tableaux.",
      science: "Léonard de Vinci perfectionne ses machines. Assistez à ses expériences, découvrez ses carnets secrets, comprenez le génie qui a anticipé l'aviation et la robotique."
    }
  };

  const destination = destinations.find(d => d.id === destinationId);
  if (!destination || selectedInterests.length === 0) return null;

  const descriptions = selectedInterests
    .map(interest => templates[destinationId]?.[interest])
    .filter(Boolean);

  const intro = {
    'paris-1889': "Votre voyage à Paris 1889 sera une expérience sur-mesure, façonnée par vos passions.",
    'cretace': "Votre expédition au Crétacé sera personnalisée selon vos centres d'intérêt.",
    'florence-1504': "Votre séjour à Florence 1504 sera une immersion totale dans vos domaines de prédilection."
  };

  return {
    destination,
    intro: intro[destinationId],
    descriptions
  };
};

const InterestGenerator = () => {
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(i => i !== interestId)
        : prev.length < 4 ? [...prev, interestId] : prev
    );
    setGeneratedContent(null);
  };

  const handleGenerate = async () => {
    if (!selectedDestination || selectedInterests.length === 0) return;

    setIsGenerating(true);

    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const content = generateDescription(selectedDestination, selectedInterests);
    setGeneratedContent(content);
    setIsGenerating(false);
  };

  const handleReset = () => {
    setSelectedInterests([]);
    setGeneratedContent(null);
  };

  return (
    <section className={styles.generator} id="generator">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Personnalisation IA</span>
          <h2 className={styles.title}>
            Créez votre <span className={styles.accent}>voyage sur-mesure</span>
          </h2>
          <p className={styles.description}>
            Sélectionnez vos centres d'intérêt et notre IA générera une description
            personnalisée de votre voyage idéal.
          </p>
        </motion.div>

        <motion.div
          className={styles.generatorContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Step 1: Choose destination */}
          <div className={styles.step}>
            <h3>
              <span className={styles.stepNumber}>1</span>
              Choisissez votre destination
            </h3>
            <div className={styles.destinationGrid}>
              {destinations.map(dest => (
                <button
                  key={dest.id}
                  className={`${styles.destinationBtn} ${selectedDestination === dest.id ? styles.selected : ''}`}
                  onClick={() => {
                    setSelectedDestination(dest.id);
                    setGeneratedContent(null);
                  }}
                >
                  <span className={styles.destIcon}>{dest.icon}</span>
                  <span className={styles.destTitle}>{dest.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose interests */}
          <div className={styles.step}>
            <h3>
              <span className={styles.stepNumber}>2</span>
              Sélectionnez vos intérêts (max 4)
            </h3>
            <div className={styles.interestsGrid}>
              {INTERESTS.map(interest => (
                <button
                  key={interest.id}
                  className={`${styles.interestBtn} ${selectedInterests.includes(interest.id) ? styles.selected : ''}`}
                  onClick={() => toggleInterest(interest.id)}
                  disabled={!selectedInterests.includes(interest.id) && selectedInterests.length >= 4}
                >
                  <span className={styles.interestIcon}>{interest.icon}</span>
                  <span>{interest.label}</span>
                  {selectedInterests.includes(interest.id) && (
                    <Check size={16} className={styles.checkIcon} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className={styles.generateSection}>
            <motion.button
              className={styles.generateBtn}
              onClick={handleGenerate}
              disabled={!selectedDestination || selectedInterests.length === 0 || isGenerating}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={18} className={styles.spinning} />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Wand2 size={18} />
                  Générer ma description personnalisée
                </>
              )}
            </motion.button>
          </div>

          {/* Generated content */}
          <AnimatePresence>
            {generatedContent && (
              <motion.div
                className={styles.result}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className={styles.resultHeader}>
                  <span className={styles.resultIcon}>{generatedContent.destination.icon}</span>
                  <div>
                    <h4>{generatedContent.destination.title}</h4>
                    <p className={styles.resultSubtitle}>{generatedContent.destination.subtitle}</p>
                  </div>
                </div>

                <p className={styles.resultIntro}>{generatedContent.intro}</p>

                <div className={styles.resultDescriptions}>
                  {generatedContent.descriptions.map((desc, index) => (
                    <motion.div
                      key={index}
                      className={styles.descriptionCard}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <span className={styles.descIcon}>
                        {INTERESTS.find(i => i.id === selectedInterests[index])?.icon}
                      </span>
                      <p>{desc}</p>
                    </motion.div>
                  ))}
                </div>

                <button className={styles.resetBtn} onClick={handleReset}>
                  <RefreshCw size={16} />
                  Recommencer
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default InterestGenerator;
