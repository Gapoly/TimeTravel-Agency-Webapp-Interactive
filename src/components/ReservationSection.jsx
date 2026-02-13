import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Check, Sparkles, Send, Lightbulb, Wand2 } from 'lucide-react';
import { destinations } from '../data/destinations';
import styles from './ReservationSection.module.css';

// AI suggestions based on destination
const AI_SUGGESTIONS = {
  'paris-1889': {
    messages: [
      "Je souhaite assister à l'inauguration de la Tour Eiffel et dîner au premier étage.",
      "Je voudrais visiter l'Exposition Universelle et rencontrer des artistes impressionnistes.",
      "Je rêve d'une soirée au Moulin Rouge et d'une promenade en calèche sur les Champs-Élysées.",
      "Je suis passionné d'architecture et j'aimerais comprendre la construction de la Tour Eiffel."
    ],
    tips: [
      "Période idéale : Mai à Octobre 1889 pour l'Exposition Universelle",
      "Recommandé pour les couples et les amateurs d'art",
      "Prévoyez des tenues élégantes pour les soirées parisiennes"
    ]
  },
  'cretace': {
    messages: [
      "Je veux observer le T-Rex en chasse et survoler les plaines avec les Ptéranodons.",
      "Je suis paléontologue amateur et je souhaite étudier les dinosaures de près.",
      "Je recherche l'aventure ultime : safari préhistorique et nuit sous les étoiles du Crétacé.",
      "Je voudrais photographier les dinosaures et ramener des souvenirs uniques."
    ],
    tips: [
      "Condition physique recommandée pour les expéditions",
      "Idéal pour les aventuriers et passionnés de nature",
      "Équipement de protection fourni par nos équipes"
    ]
  },
  'florence-1504': {
    messages: [
      "Je souhaite visiter l'atelier de Michel-Ange et assister au dévoilement du David.",
      "Je veux rencontrer Léonard de Vinci et découvrir ses inventions secrètes.",
      "Je rêve d'un banquet au Palazzo Médicis avec la noblesse florentine.",
      "Je suis artiste et j'aimerais prendre des cours avec les maîtres de la Renaissance."
    ],
    tips: [
      "Maîtrise de l'italien non requise grâce au traducteur neuronal",
      "Parfait pour les amoureux de l'art et de l'histoire",
      "Possibilité de commissionner une œuvre d'art personnalisée"
    ]
  }
};

const ReservationSection = ({ preselectedDestination, onProceedToPayment }) => {
  const [formData, setFormData] = useState({
    destination: preselectedDestination || '',
    date: '',
    travelers: 2,
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (preselectedDestination) {
      setFormData(prev => ({ ...prev, destination: preselectedDestination }));
    }
  }, [preselectedDestination]);

  // Show suggestions when destination changes
  useEffect(() => {
    if (formData.destination) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [formData.destination]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTravelersChange = (delta) => {
    setFormData(prev => ({
      ...prev,
      travelers: Math.max(1, Math.min(12, prev.travelers + delta))
    }));
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, message: suggestion }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.destination || !formData.date || !formData.name || !formData.email) {
      return;
    }

    setIsSubmitting(true);

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));

    setIsSubmitting(false);

    // Navigate to payment page with form data
    if (onProceedToPayment) {
      onProceedToPayment(formData);
    } else {
      // Fallback to old behavior if no callback provided
      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setFormData({
      destination: '',
      date: '',
      travelers: 2,
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setIsSubmitted(false);
    setShowSuggestions(false);
  };

  const currentSuggestions = AI_SUGGESTIONS[formData.destination];

  return (
    <section className={styles.reservation} id="reservation">
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Réservation</span>
          <h2 className={styles.title}>
            Prêt à <span className={styles.accent}>voyager</span> ?
          </h2>
          <p className={styles.description}>
            Remplissez ce formulaire pour réserver votre voyage temporel.
            Vous serez ensuite redirigé vers notre page de paiement sécurisé.
          </p>
        </motion.div>

        {/* Form container */}
        <motion.div
          className={styles.formContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {isSubmitted ? (
            <motion.div
              className={styles.success}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className={styles.successIcon}>
                <Sparkles size={48} />
              </div>
              <h3>Voyage confirmé !</h3>
              <p>
                Votre demande de réservation a été enregistrée avec succès.
                Un conseiller temporel vous contactera dans les 24 heures
                pour finaliser les détails de votre voyage.
              </p>
              <div className={styles.confirmationNumber}>
                <span>Numéro de confirmation</span>
                <strong>CHR-{Date.now().toString(36).toUpperCase()}</strong>
              </div>
              <button className={styles.resetButton} onClick={resetForm}>
                Nouvelle réservation
              </button>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGrid}>
                {/* Destination */}
                <div className={styles.field}>
                  <label htmlFor="destination">
                    <MapPin size={16} />
                    Destination
                  </label>
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choisir une époque</option>
                    {destinations.map(dest => (
                      <option key={dest.id} value={dest.id}>
                        {dest.icon} {dest.title} — {dest.subtitle}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div className={styles.field}>
                  <label htmlFor="date">
                    <Calendar size={16} />
                    Date de départ
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Travelers */}
                <div className={styles.field}>
                  <label>
                    <Users size={16} />
                    Voyageurs
                  </label>
                  <div className={styles.counter}>
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(-1)}
                      disabled={formData.travelers <= 1}
                    >
                      −
                    </button>
                    <span>{formData.travelers}</span>
                    <button
                      type="button"
                      onClick={() => handleTravelersChange(1)}
                      disabled={formData.travelers >= 12}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Name */}
                <div className={styles.field}>
                  <label htmlFor="name">Nom complet</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>

                {/* Email */}
                <div className={styles.field}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                {/* Phone */}
                <div className={styles.field}>
                  <label htmlFor="phone">Téléphone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 00 00 00 00"
                  />
                </div>

                {/* Message with AI suggestions */}
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label htmlFor="message">
                    <Wand2 size={16} />
                    Message (suggestions IA disponibles)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Décrivez vos souhaits pour ce voyage..."
                    rows={3}
                  />

                  {/* AI Suggestions */}
                  <AnimatePresence>
                    {showSuggestions && currentSuggestions && (
                      <motion.div
                        className={styles.suggestionsBox}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <div className={styles.suggestionsHeader}>
                          <Lightbulb size={16} />
                          <span>Suggestions IA pour votre voyage</span>
                        </div>

                        <div className={styles.suggestionsList}>
                          {currentSuggestions.messages.map((suggestion, index) => (
                            <motion.button
                              key={index}
                              type="button"
                              className={styles.suggestionBtn}
                              onClick={() => handleSuggestionClick(suggestion)}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              whileHover={{ x: 4 }}
                            >
                              <span className={styles.suggestionIcon}>✨</span>
                              <span>{suggestion}</span>
                            </motion.button>
                          ))}
                        </div>

                        <div className={styles.tipsSection}>
                          <span className={styles.tipsTitle}>Conseils pour ce voyage :</span>
                          <ul className={styles.tipsList}>
                            {currentSuggestions.tips.map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className={styles.formFooter}>
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <span className={styles.loading}>
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  ) : (
                    <>
                      <Send size={18} />
                      Procéder au paiement
                    </>
                  )}
                </motion.button>
                <p className={styles.note}>
                  En soumettant ce formulaire, vous acceptez nos conditions générales de voyage temporel.
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      {/* Background decorations */}
      <div className={styles.bgGradient} />
      <div className={styles.bgPattern} />
    </section>
  );
};

export default ReservationSection;
