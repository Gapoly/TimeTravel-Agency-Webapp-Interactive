import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Users, Shield, Star, CheckCircle } from 'lucide-react';
import { getDestinationById } from '../data/destinations';
import styles from './DestinationDetail.module.css';

const DestinationDetail = ({ destinationId, onBack, onReserve }) => {
  const destination = getDestinationById(destinationId);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [destinationId]);

  if (!destination) {
    return (
      <div className={styles.notFound}>
        <p>Destination non trouvée</p>
        <button onClick={onBack}>Retour</button>
      </div>
    );
  }

  return (
    <motion.div
      className={styles.detail}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero section */}
      <section className={styles.hero}>
        <img
          src={destination.heroImage}
          alt={destination.title}
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <motion.button
          className={styles.backButton}
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          Retour
        </motion.button>

        <div className={styles.heroContent}>
          <motion.span
            className={styles.heroEra}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {destination.era}
          </motion.span>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {destination.title}
          </motion.h1>

          <motion.p
            className={styles.heroSubtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {destination.subtitle}
          </motion.p>

          <motion.div
            className={styles.heroMeta}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <span><Calendar size={16} /> {destination.date}</span>
            <span><Clock size={16} /> {destination.duration}</span>
            <span><Users size={16} /> Max 12 voyageurs</span>
            <span><Shield size={16} /> {destination.difficulty}</span>
          </motion.div>
        </div>

        <div className={styles.heroDecor}>
          <span className={styles.heroIcon}>{destination.icon}</span>
        </div>
      </section>

      {/* Main content */}
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.mainGrid}>
            {/* Left column - Description */}
            <div className={styles.description}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className={styles.sectionTitle}>L'Expérience</h2>
                <div className={styles.descriptionText}>
                  {destination.fullDescription.split('\n\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                className={styles.highlights}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h2 className={styles.sectionTitle}>Points Forts</h2>
                <ul className={styles.highlightsList}>
                  {destination.highlights.map((highlight, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <CheckCircle size={18} />
                      <span>{highlight}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Activities */}
              <motion.div
                className={styles.activities}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className={styles.sectionTitle}>Activités Proposées</h2>
                <div className={styles.activitiesGrid}>
                  {destination.activities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className={styles.activityCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.15 }}
                    >
                      <Star size={20} className={styles.activityIcon} />
                      <h3>{activity.title}</h3>
                      <p>{activity.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right column - Booking card */}
            <motion.aside
              className={styles.bookingCard}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className={styles.bookingHeader}>
                <span className={styles.bookingLabel}>À partir de</span>
                <div className={styles.bookingPrice}>
                  <span className={styles.priceValue}>{destination.price} €</span>
                  <span className={styles.priceUnit}>par voyageur</span>
                </div>
              </div>

              <div className={styles.bookingDetails}>
                <div className={styles.bookingDetail}>
                  <Clock size={18} />
                  <div>
                    <span className={styles.detailLabel}>Durée</span>
                    <span className={styles.detailValue}>{destination.duration}</span>
                  </div>
                </div>
                <div className={styles.bookingDetail}>
                  <Users size={18} />
                  <div>
                    <span className={styles.detailLabel}>Groupe</span>
                    <span className={styles.detailValue}>2-12 personnes</span>
                  </div>
                </div>
                <div className={styles.bookingDetail}>
                  <Shield size={18} />
                  <div>
                    <span className={styles.detailLabel}>Niveau</span>
                    <span className={styles.detailValue}>{destination.difficulty}</span>
                  </div>
                </div>
              </div>

              <div className={styles.bookingIncludes}>
                <h4>Ce voyage inclut</h4>
                <ul>
                  <li>Transport temporel aller-retour</li>
                  <li>Hébergement d'époque premium</li>
                  <li>Guide historien personnel</li>
                  <li>Tenue d'époque sur mesure</li>
                  <li>Assurance paradoxe temporel</li>
                </ul>
              </div>

              <motion.button
                className={styles.bookingButton}
                onClick={() => onReserve(destination.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Réserver ce voyage
              </motion.button>

              <p className={styles.bookingNote}>
                Annulation gratuite jusqu'à 48h avant le départ
              </p>
            </motion.aside>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default DestinationDetail;
