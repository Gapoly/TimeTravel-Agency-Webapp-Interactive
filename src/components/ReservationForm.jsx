import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Check, Sparkles } from 'lucide-react';
import { destinations } from '../data/destinations';
import styles from './ReservationForm.module.css';

const ReservationForm = ({ isOpen, onClose, preselectedDestination }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
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
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetForm, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={handleClose}>
              <X size={24} />
            </button>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <div className={styles.successIcon}>
                    <Sparkles size={48} />
                  </div>
                  <h2>Voyage confirmé !</h2>
                  <p>
                    Votre demande de réservation a été enregistrée avec succès.
                    Un conseiller temporel vous contactera dans les 24 heures
                    pour finaliser les détails de votre voyage.
                  </p>
                  <div className={styles.confirmationNumber}>
                    <span>Numéro de confirmation</span>
                    <strong>CHR-{Date.now().toString(36).toUpperCase()}</strong>
                  </div>
                  <button className={styles.successButton} onClick={handleClose}>
                    Fermer
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  className={styles.form}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className={styles.header}>
                    <h2>Réserver votre voyage</h2>
                    <p>Remplissez ce formulaire et notre équipe vous contactera pour organiser votre expérience temporelle.</p>
                  </div>

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
                        Date de départ souhaitée
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
                        Nombre de voyageurs
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

                    {/* Message */}
                    <div className={`${styles.field} ${styles.fullWidth}`}>
                      <label htmlFor="message">Message (optionnel)</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Des souhaits particuliers ou questions..."
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className={styles.formFooter}>
                    <p className={styles.note}>
                      En soumettant ce formulaire, vous acceptez nos conditions générales de voyage temporel.
                    </p>
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
                          <Check size={18} />
                          Confirmer la réservation
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReservationForm;
