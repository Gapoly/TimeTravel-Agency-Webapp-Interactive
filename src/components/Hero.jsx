import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import styles from './Hero.module.css';

const Hero = ({ onScrollToDestinations }) => {
  return (
    <section className={styles.hero}>
      {/* Gradient overlays */}
      <div className={styles.gradientTop} />
      <div className={styles.gradientBottom} />

      {/* Main content */}
      <div className={styles.content}>
        <motion.div
          className={styles.badge}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Sparkles size={14} />
          <span>Depuis 2147 • Licence Temporelle N°001</span>
        </motion.div>

        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.7, 0, 0.3, 1] }}
        >
          <span className={styles.titleLine}>Voyagez</span>
          <span className={styles.titleAccent}>au-delà du temps</span>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          Explorez les époques les plus fascinantes de l'histoire avec notre technologie
          de voyage temporel exclusive. Une expérience immersive, sécurisée et inoubliable.
        </motion.p>

        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.button
            className={styles.primaryCta}
            onClick={onScrollToDestinations}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Découvrir nos destinations</span>
            <div className={styles.ctaGlow} />
          </motion.button>

          <motion.button
            className={styles.secondaryCta}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            En savoir plus
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <div className={styles.stat}>
            <span className={styles.statNumber}>4.6B</span>
            <span className={styles.statLabel}>Années accessibles</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Sécurité paradoxale</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>2,847</span>
            <span className={styles.statLabel}>Voyageurs satisfaits</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onClick={onScrollToDestinations}
      >
        <span>Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <div className={styles.decorLine} />
      <div className={styles.decorCircle} />
    </section>
  );
};

export default Hero;
