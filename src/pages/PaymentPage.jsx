import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Shield,
  Check,
  Calendar,
  Users,
  MapPin,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { getDestinationById } from '../data/destinations';
import styles from './PaymentPage.module.css';

const PaymentPage = ({ reservationData, onBack, onSuccess }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');

  const destination = getDestinationById(reservationData.destination);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Calculate total price
  const basePrice = parseInt(destination?.price.replace(/\s/g, '')) || 0;
  const travelers = reservationData.travelers || 1;
  const subtotal = basePrice * travelers;
  const insuranceFee = Math.round(subtotal * 0.05);
  const bookingFee = 450;
  const total = subtotal + insuranceFee + bookingFee;

  // Format card number with spaces
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  // Format expiry date
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value.replace('/', ''));
    } else if (name === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setPaymentData(prev => ({ ...prev, [name]: formattedValue }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }
    if (!paymentData.cardName || paymentData.cardName.length < 3) {
      newErrors.cardName = 'Nom requis';
    }
    if (!paymentData.expiry || paymentData.expiry.length < 5) {
      newErrors.expiry = 'Date invalide';
    }
    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'CVV invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    const code = 'CHR-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setConfirmationCode(code);
    setPaymentSuccess(true);
    setIsProcessing(false);
  };

  if (paymentSuccess) {
    return (
      <motion.div
        className={styles.successPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className={styles.successContainer}>
          <motion.div
            className={styles.successIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          >
            <Check size={48} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Paiement confirmé !
          </motion.h1>

          <motion.p
            className={styles.successMessage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Votre voyage temporel vers <strong>{destination?.title}</strong> est réservé.
            Un email de confirmation a été envoyé à <strong>{reservationData.email}</strong>.
          </motion.p>

          <motion.div
            className={styles.confirmationCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.confirmationHeader}>
              <Sparkles size={20} />
              <span>Confirmation de réservation</span>
            </div>
            <div className={styles.confirmationCode}>
              <span>Code de réservation</span>
              <strong>{confirmationCode}</strong>
            </div>
            <div className={styles.confirmationDetails}>
              <div>
                <span>Destination</span>
                <strong>{destination?.icon} {destination?.title}</strong>
              </div>
              <div>
                <span>Date de départ</span>
                <strong>{new Date(reservationData.date).toLocaleDateString('fr-FR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</strong>
              </div>
              <div>
                <span>Voyageurs</span>
                <strong>{reservationData.travelers} personne{reservationData.travelers > 1 ? 's' : ''}</strong>
              </div>
              <div>
                <span>Montant payé</span>
                <strong>{total.toLocaleString('fr-FR')} €</strong>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.nextSteps}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3>Prochaines étapes</h3>
            <ul>
              <li>
                <Check size={16} />
                <span>Vous recevrez un email avec tous les détails sous 24h</span>
              </li>
              <li>
                <Check size={16} />
                <span>Un conseiller vous contactera pour la session de préparation</span>
              </li>
              <li>
                <Check size={16} />
                <span>Vos tenues d'époque seront confectionnées sur mesure</span>
              </li>
            </ul>
          </motion.div>

          <motion.button
            className={styles.backHomeBtn}
            onClick={onSuccess}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Retour à l'accueil
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles.paymentPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className={styles.container}>
        {/* Back button */}
        <motion.button
          className={styles.backButton}
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} />
          Retour
        </motion.button>

        <div className={styles.content}>
          {/* Left: Payment form */}
          <motion.div
            className={styles.paymentForm}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.formHeader}>
              <h1>Paiement sécurisé</h1>
              <div className={styles.securityBadge}>
                <Lock size={14} />
                <span>Connexion sécurisée SSL</span>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Card number */}
              <div className={styles.field}>
                <label htmlFor="cardNumber">
                  <CreditCard size={16} />
                  Numéro de carte
                </label>
                <div className={styles.cardInput}>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    disabled={isProcessing}
                  />
                  <div className={styles.cardIcons}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/100px-Visa_Inc._logo.svg.png" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/100px-Mastercard-logo.svg.png" alt="Mastercard" />
                  </div>
                </div>
                {errors.cardNumber && (
                  <span className={styles.error}>
                    <AlertCircle size={14} />
                    {errors.cardNumber}
                  </span>
                )}
              </div>

              {/* Card name */}
              <div className={styles.field}>
                <label htmlFor="cardName">Nom sur la carte</label>
                <input
                  type="text"
                  id="cardName"
                  name="cardName"
                  value={paymentData.cardName}
                  onChange={handleChange}
                  placeholder="JEAN DUPONT"
                  style={{ textTransform: 'uppercase' }}
                  disabled={isProcessing}
                />
                {errors.cardName && (
                  <span className={styles.error}>
                    <AlertCircle size={14} />
                    {errors.cardName}
                  </span>
                )}
              </div>

              {/* Expiry and CVV */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="expiry">Date d'expiration</label>
                  <input
                    type="text"
                    id="expiry"
                    name="expiry"
                    value={paymentData.expiry}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    disabled={isProcessing}
                  />
                  {errors.expiry && (
                    <span className={styles.error}>
                      <AlertCircle size={14} />
                      {errors.expiry}
                    </span>
                  )}
                </div>

                <div className={styles.field}>
                  <label htmlFor="cvv">
                    CVV
                    <span className={styles.tooltip}>
                      <Shield size={14} />
                      <span className={styles.tooltipText}>Les 3 chiffres au dos de votre carte</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                    disabled={isProcessing}
                  />
                  {errors.cvv && (
                    <span className={styles.error}>
                      <AlertCircle size={14} />
                      {errors.cvv}
                    </span>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                className={styles.payButton}
                disabled={isProcessing}
                whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                whileTap={{ scale: isProcessing ? 1 : 0.98 }}
              >
                {isProcessing ? (
                  <span className={styles.processing}>
                    <span className={styles.spinner}></span>
                    Traitement en cours...
                  </span>
                ) : (
                  <>
                    <Lock size={18} />
                    Payer {total.toLocaleString('fr-FR')} €
                  </>
                )}
              </motion.button>

              <p className={styles.securityNote}>
                <Shield size={14} />
                Vos données de paiement sont cryptées et sécurisées
              </p>
            </form>
          </motion.div>

          {/* Right: Order summary */}
          <motion.div
            className={styles.orderSummary}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Récapitulatif</h2>

            {/* Destination card */}
            <div className={styles.destinationCard}>
              <img src={destination?.image} alt={destination?.title} />
              <div className={styles.destinationInfo}>
                <span className={styles.destinationIcon}>{destination?.icon}</span>
                <div>
                  <h3>{destination?.title}</h3>
                  <p>{destination?.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Reservation details */}
            <div className={styles.reservationDetails}>
              <div className={styles.detailItem}>
                <Calendar size={16} />
                <div>
                  <span>Date de départ</span>
                  <strong>{new Date(reservationData.date).toLocaleDateString('fr-FR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</strong>
                </div>
              </div>
              <div className={styles.detailItem}>
                <Users size={16} />
                <div>
                  <span>Voyageurs</span>
                  <strong>{reservationData.travelers} personne{reservationData.travelers > 1 ? 's' : ''}</strong>
                </div>
              </div>
              <div className={styles.detailItem}>
                <MapPin size={16} />
                <div>
                  <span>Durée</span>
                  <strong>{destination?.duration}</strong>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>{destination?.price} € × {travelers} voyageur{travelers > 1 ? 's' : ''}</span>
                <span>{subtotal.toLocaleString('fr-FR')} €</span>
              </div>
              <div className={styles.priceRow}>
                <span>Assurance paradoxe temporel</span>
                <span>{insuranceFee.toLocaleString('fr-FR')} €</span>
              </div>
              <div className={styles.priceRow}>
                <span>Frais de réservation</span>
                <span>{bookingFee.toLocaleString('fr-FR')} €</span>
              </div>
              <div className={`${styles.priceRow} ${styles.total}`}>
                <span>Total</span>
                <span>{total.toLocaleString('fr-FR')} €</span>
              </div>
            </div>

            {/* What's included */}
            <div className={styles.included}>
              <h4>Ce prix inclut</h4>
              <ul>
                <li><Check size={14} /> Transport temporel aller-retour</li>
                <li><Check size={14} /> Hébergement premium d'époque</li>
                <li><Check size={14} /> Guide historien personnel</li>
                <li><Check size={14} /> Tenue d'époque sur mesure</li>
                <li><Check size={14} /> Assurance paradoxe temporel</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
