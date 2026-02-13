import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { destinations } from '../data/destinations';
import styles from './DestinationsSection.module.css';

const DestinationsSection = ({ onSelectDestination }) => {
  return (
    <section className={styles.destinations} id="destinations">
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Destinations</span>
          <h2 className={styles.title}>
            Choisissez votre <span className={styles.accent}>époque</span>
          </h2>
          <p className={styles.description}>
            Trois destinations d'exception, soigneusement sélectionnées pour leur
            richesse historique et leur potentiel d'émerveillement.
          </p>
        </motion.div>

        {/* Destinations grid */}
        <div className={styles.grid}>
          {destinations.map((destination, index) => (
            <motion.article
              key={destination.id}
              className={styles.card}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => onSelectDestination(destination.id)}
            >
              {/* Image container */}
              <div className={styles.imageWrapper}>
                <img
                  src={destination.image}
                  alt={destination.title}
                  className={styles.image}
                />
                <div className={styles.imageOverlay} />

                {/* Era badge */}
                <span className={styles.eraBadge}>{destination.era}</span>

                {/* Icon */}
                <span className={styles.destinationIcon}>{destination.icon}</span>
              </div>

              {/* Content */}
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <Calendar size={14} />
                    {destination.date}
                  </span>
                  <span className={styles.metaItem}>
                    <MapPin size={14} />
                    {destination.duration}
                  </span>
                </div>

                <h3 className={styles.cardTitle}>{destination.title}</h3>
                <p className={styles.subtitle}>{destination.subtitle}</p>
                <p className={styles.cardDescription}>{destination.shortDescription}</p>

                <div className={styles.footer}>
                  <div className={styles.price}>
                    <span className={styles.priceValue}>{destination.price} €</span>
                    <span className={styles.priceLabel}>par voyageur</span>
                  </div>

                  <motion.button
                    className={styles.discoverBtn}
                    whileHover={{ x: 4 }}
                  >
                    Découvrir
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>

              {/* Hover border effect */}
              <div
                className={styles.borderGlow}
                style={{ '--accent-color': destination.color }}
              />
            </motion.article>
          ))}
        </div>
      </div>

      {/* Background decoration */}
      <div className={styles.bgGradient} />
    </section>
  );
};

export default DestinationsSection;
