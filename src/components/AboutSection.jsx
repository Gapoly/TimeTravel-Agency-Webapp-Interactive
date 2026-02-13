import { motion } from 'framer-motion';
import { Shield, Gem, Eye, Clock, Users, Award } from 'lucide-react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const values = [
    {
      icon: Shield,
      title: 'Sécurité Absolue',
      description: 'Notre technologie de protection paradoxale garantit l\'intégrité de la ligne temporelle et votre sécurité totale.'
    },
    {
      icon: Gem,
      title: 'Exclusivité',
      description: 'Des expériences sur-mesure, limitées à 12 voyageurs par époque pour préserver l\'authenticité de chaque instant.'
    },
    {
      icon: Eye,
      title: 'Immersion Totale',
      description: 'Vivez l\'histoire comme si vous y étiez, avec nos combinaisons d\'intégration temporelle de dernière génération.'
    }
  ];

  const stats = [
    { icon: Clock, value: '127', label: 'Époques accessibles' },
    { icon: Users, value: '2,847', label: 'Voyageurs' },
    { icon: Award, value: '15', label: 'Prix d\'excellence' }
  ];

  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        {/* Section header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>L'Agence</span>
          <h2 className={styles.title}>
            Pionniers du <span className={styles.accent}>voyage temporel</span>
          </h2>
          <p className={styles.description}>
            Depuis 2147, Chronos Voyages repousse les frontières du possible. Notre équipe
            d'historiens, de physiciens quantiques et d'experts en hospitalité de luxe
            vous ouvre les portes des époques les plus fascinantes de l'humanité.
          </p>
        </motion.div>

        {/* Values grid */}
        <div className={styles.valuesGrid}>
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              className={styles.valueCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div className={styles.iconWrapper}>
                <value.icon className={styles.icon} />
                <div className={styles.iconGlow} />
              </div>
              <h3 className={styles.valueTitle}>{value.title}</h3>
              <p className={styles.valueDescription}>{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className={styles.statsBar}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className={styles.statItem}>
              <stat.icon className={styles.statIcon} />
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
              {index < stats.length - 1 && <div className={styles.statDivider} />}
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.blockquote
          className={styles.quote}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p>
            "Le temps n'est pas une contrainte, c'est une invitation au voyage."
          </p>
          <cite>— Dr. Elena Vasquez, Fondatrice de Chronos Voyages</cite>
        </motion.blockquote>
      </div>

      {/* Decorative elements */}
      <div className={styles.bgPattern} />
    </section>
  );
};

export default AboutSection;
