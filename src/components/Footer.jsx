import { Clock, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <Clock size={28} />
              <span>Chronos <em>Voyages</em></span>
            </div>
            <p className={styles.tagline}>
              Explorez le passé, vivez l'histoire. Depuis 2147, nous rendons
              l'impossible accessible aux voyageurs les plus audacieux.
            </p>
            <div className={styles.license}>
              <span>Licence Temporelle N°001</span>
              <span>Certifié ISO 9001-T</span>
            </div>
          </div>

          {/* Destinations */}
          <div className={styles.column}>
            <h4>Destinations</h4>
            <ul>
              <li><a href="#paris">Paris 1889</a></li>
              <li><a href="#cretace">Crétacé (-65M)</a></li>
              <li><a href="#florence">Florence 1504</a></li>
              <li><a href="#soon">Prochainement...</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h4>Services</h4>
            <ul>
              <li><a href="#voyages">Voyages individuels</a></li>
              <li><a href="#groupes">Voyages de groupe</a></li>
              <li><a href="#corporate">Corporate Events</a></li>
              <li><a href="#sur-mesure">Expériences sur-mesure</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h4>Contact</h4>
            <ul className={styles.contactList}>
              <li>
                <Mail size={16} />
                <a href="mailto:contact@chronos-voyages.fr">contact@chronos-voyages.fr</a>
              </li>
              <li>
                <Phone size={16} />
                <a href="tel:+33100000000">+33 1 00 00 00 00</a>
              </li>
              <li>
                <MapPin size={16} />
                <span>42 Avenue du Temps, Paris</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={styles.newsletter}>
            <h4>Restez informé</h4>
            <p>Recevez en avant-première nos nouvelles destinations.</p>
            <form className={styles.newsletterForm}>
              <input type="email" placeholder="Votre email" />
              <button type="submit">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={styles.bottom}>
          <p>&copy; {currentYear} Chronos Voyages. Tous droits réservés à travers le temps.</p>
          <div className={styles.links}>
            <a href="#mentions">Mentions légales</a>
            <a href="#confidentialite">Confidentialité</a>
            <a href="#cgv">CGV Temporelles</a>
          </div>
        </div>
      </div>

      {/* Decorative border */}
      <div className={styles.topBorder} />
    </footer>
  );
};

export default Footer;
