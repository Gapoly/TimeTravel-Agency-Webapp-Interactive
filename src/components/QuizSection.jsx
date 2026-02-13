import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, RotateCcw, Compass } from 'lucide-react';
import { destinations } from '../data/destinations';
import styles from './QuizSection.module.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Quel type d'expérience recherchez-vous ?",
    options: [
      { text: "Aventure et sensations fortes", scores: { 'cretace': 3, 'paris-1889': 1, 'florence-1504': 0 } },
      { text: "Culture et apprentissage", scores: { 'cretace': 0, 'paris-1889': 2, 'florence-1504': 3 } },
      { text: "Romantisme et élégance", scores: { 'cretace': 0, 'paris-1889': 3, 'florence-1504': 2 } },
      { text: "Découverte scientifique", scores: { 'cretace': 3, 'paris-1889': 2, 'florence-1504': 1 } }
    ]
  },
  {
    id: 2,
    question: "Quelle est votre passion principale ?",
    options: [
      { text: "L'art et la créativité", scores: { 'cretace': 0, 'paris-1889': 2, 'florence-1504': 3 } },
      { text: "La nature et les animaux", scores: { 'cretace': 3, 'paris-1889': 1, 'florence-1504': 0 } },
      { text: "L'architecture et l'ingénierie", scores: { 'cretace': 0, 'paris-1889': 3, 'florence-1504': 2 } },
      { text: "L'histoire et les civilisations", scores: { 'cretace': 2, 'paris-1889': 2, 'florence-1504': 3 } }
    ]
  },
  {
    id: 3,
    question: "Quel est votre niveau d'aventure ?",
    options: [
      { text: "Prudent - Je préfère le confort", scores: { 'cretace': 0, 'paris-1889': 3, 'florence-1504': 2 } },
      { text: "Modéré - Un peu de tout", scores: { 'cretace': 1, 'paris-1889': 2, 'florence-1504': 3 } },
      { text: "Aventurier - J'aime les défis", scores: { 'cretace': 3, 'paris-1889': 1, 'florence-1504': 1 } },
      { text: "Extrême - Plus c'est fou, mieux c'est", scores: { 'cretace': 3, 'paris-1889': 0, 'florence-1504': 0 } }
    ]
  },
  {
    id: 4,
    question: "Quel budget êtes-vous prêt à investir ?",
    options: [
      { text: "Raisonnable (< 30 000€)", scores: { 'cretace': 0, 'paris-1889': 3, 'florence-1504': 1 } },
      { text: "Confortable (30 000€ - 50 000€)", scores: { 'cretace': 1, 'paris-1889': 2, 'florence-1504': 3 } },
      { text: "Premium (50 000€ - 80 000€)", scores: { 'cretace': 2, 'paris-1889': 1, 'florence-1504': 2 } },
      { text: "Illimité - L'expérience avant tout", scores: { 'cretace': 3, 'paris-1889': 2, 'florence-1504': 2 } }
    ]
  }
];

const generateRecommendation = (destination, answers) => {
  const dest = destinations.find(d => d.id === destination);
  if (!dest) return '';

  const recommendations = {
    'paris-1889': {
      intro: "L'élégance parisienne vous correspond parfaitement !",
      details: [
        "Votre attrait pour la culture et le raffinement fait de Paris 1889 votre destination idéale.",
        "L'Exposition Universelle comblera votre curiosité avec ses innovations révolutionnaires.",
        "La Tour Eiffel, symbole de modernité, vous éblouira par son audace architecturale.",
        "Les cafés littéraires et les salons artistiques vous ouvriront leurs portes."
      ],
      highlight: "Nous vous recommandons particulièrement le dîner au premier étage de la Tour Eiffel et la soirée au Moulin Rouge."
    },
    'cretace': {
      intro: "L'aventure préhistorique est faite pour vous !",
      details: [
        "Votre esprit aventurier et votre fascination pour la nature primitive font du Crétacé votre terrain de jeu idéal.",
        "Observer les dinosaures dans leur habitat naturel sera une expérience inoubliable.",
        "Votre courage sera récompensé par des rencontres uniques avec les titans du passé.",
        "Les paysages vierges de toute civilisation vous reconnecteront avec la Terre originelle."
      ],
      highlight: "Nous vous recommandons le safari en véhicule temporel et le survol des canyons avec les Ptéranodons."
    },
    'florence-1504': {
      intro: "La Renaissance italienne vous tend les bras !",
      details: [
        "Votre sensibilité artistique et votre amour de l'histoire font de Florence 1504 votre destination de cœur.",
        "Côtoyer Michel-Ange et Léonard de Vinci enrichira votre âme pour l'éternité.",
        "L'architecture florentine et les palais des Médicis vous transporteront dans un monde de beauté.",
        "Chaque rue, chaque place raconte une histoire que vous êtes prêt à vivre."
      ],
      highlight: "Nous vous recommandons la visite privée de l'atelier de Michel-Ange et le banquet au Palazzo Vecchio."
    }
  };

  return recommendations[destination];
};

const QuizSection = ({ onSelectDestination }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(null);
  const [isStarted, setIsStarted] = useState(false);

  const calculateResult = (allAnswers) => {
    const scores = {
      'paris-1889': 0,
      'cretace': 0,
      'florence-1504': 0
    };

    allAnswers.forEach(answer => {
      Object.entries(answer.scores).forEach(([dest, score]) => {
        scores[dest] += score;
      });
    });

    const winner = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    const destination = destinations.find(d => d.id === winner);
    const recommendation = generateRecommendation(winner, allAnswers);

    return {
      destination,
      scores,
      recommendation,
      matchPercentage: Math.round((scores[winner] / (QUIZ_QUESTIONS.length * 3)) * 100)
    };
  };

  const handleAnswer = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const calculatedResult = calculateResult(newAnswers);
      setResult(calculatedResult);
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setResult(null);
    setIsStarted(false);
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  return (
    <section className={styles.quiz} id="quiz">
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Recommandation IA</span>
          <h2 className={styles.title}>
            Trouvez votre <span className={styles.accent}>époque idéale</span>
          </h2>
          <p className={styles.description}>
            Notre algorithme intelligent analyse vos préférences pour vous recommander
            la destination temporelle qui vous correspond le mieux.
          </p>
        </motion.div>

        {/* Quiz container */}
        <motion.div
          className={styles.quizContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!isStarted ? (
              <motion.div
                key="start"
                className={styles.startScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className={styles.startIcon}>
                  <Compass size={48} />
                </div>
                <h3>Découvrez votre destination idéale</h3>
                <p>
                  Répondez à 4 questions simples et notre IA analysera vos préférences
                  pour vous recommander l'époque qui vous correspond le mieux.
                </p>
                <motion.button
                  className={styles.startButton}
                  onClick={handleStart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Sparkles size={18} />
                  Commencer le quiz
                </motion.button>
              </motion.div>
            ) : !showResult ? (
              <motion.div
                key={`question-${currentQuestion}`}
                className={styles.questionContainer}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {/* Progress bar */}
                <div className={styles.progress}>
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                    />
                  </div>
                  <span className={styles.progressText}>
                    Question {currentQuestion + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                </div>

                {/* Question */}
                <h3 className={styles.question}>
                  {QUIZ_QUESTIONS[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className={styles.options}>
                  {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={styles.option}
                      onClick={() => handleAnswer(option)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 8 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className={styles.optionNumber}>{index + 1}</span>
                      <span className={styles.optionText}>{option.text}</span>
                      <ArrowRight size={18} className={styles.optionArrow} />
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                {currentQuestion > 0 && (
                  <button className={styles.backButton} onClick={handleBack}>
                    <ArrowLeft size={16} />
                    Question précédente
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className={styles.resultContainer}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Match percentage */}
                <div className={styles.matchBadge}>
                  <Sparkles size={16} />
                  {result.matchPercentage}% de compatibilité
                </div>

                {/* Destination card */}
                <div className={styles.resultCard}>
                  <div className={styles.resultImage}>
                    <img src={result.destination.image} alt={result.destination.title} />
                    <div className={styles.resultOverlay} />
                    <span className={styles.resultIcon}>{result.destination.icon}</span>
                  </div>

                  <div className={styles.resultContent}>
                    <h3>{result.destination.title}</h3>
                    <p className={styles.resultSubtitle}>{result.destination.subtitle}</p>

                    <div className={styles.recommendation}>
                      <h4>{result.recommendation.intro}</h4>
                      <ul>
                        {result.recommendation.details.map((detail, i) => (
                          <li key={i}>{detail}</li>
                        ))}
                      </ul>
                      <p className={styles.highlight}>
                        <Sparkles size={14} />
                        {result.recommendation.highlight}
                      </p>
                    </div>

                    <div className={styles.resultMeta}>
                      <span>{result.destination.duration}</span>
                      <span>•</span>
                      <span>{result.destination.price} €</span>
                      <span>•</span>
                      <span>{result.destination.difficulty}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className={styles.resultActions}>
                  <motion.button
                    className={styles.primaryAction}
                    onClick={() => onSelectDestination(result.destination.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Découvrir {result.destination.title}
                    <ArrowRight size={18} />
                  </motion.button>
                  <button className={styles.secondaryAction} onClick={handleReset}>
                    <RotateCcw size={16} />
                    Refaire le quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background */}
      <div className={styles.bgGradient} />
    </section>
  );
};

export default QuizSection;
