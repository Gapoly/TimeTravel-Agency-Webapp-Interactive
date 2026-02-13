import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Clock } from 'lucide-react';
import styles from './Navbar.module.css';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'about', label: 'L\'Agence' },
    { id: 'reservation', label: 'Réserver' },
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.7, 0, 0.3, 1] }}
      >
        <div className={styles.container}>
          <motion.div
            className={styles.logo}
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Clock className={styles.logoIcon} />
            <span className={styles.logoText}>Chronos</span>
            <span className={styles.logoAccent}>Voyages</span>
          </motion.div>

          <div className={styles.navLinks}>
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`${styles.navLink} ${currentPage === item.id ? styles.active : ''}`}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {currentPage === item.id && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick('reservation')}
          >
            Voyager
          </motion.button>

          <button
            className={styles.mobileMenuButton}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={styles.mobileNavLink}
                onClick={() => handleNavClick(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              className={styles.mobileCta}
              onClick={() => handleNavClick('reservation')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Réserver maintenant
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
