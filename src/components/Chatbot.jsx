import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Clock, Sparkles } from 'lucide-react';
import styles from './Chatbot.module.css';

const SYSTEM_PROMPT = `Tu es Aria, conseillère en voyages temporels chez Chronos Voyages, une agence de voyage temporel de luxe fondée en 2147.

## Ta personnalité
- Professionnelle mais chaleureuse et accessible
- Passionnée d'histoire et enthousiaste (sans être excessive)
- Experte en voyages temporels
- Tu tutoies les clients pour créer une relation de proximité
- Tu utilises parfois des emojis (avec modération)

## L'agence Chronos Voyages
- Fondée en 2147 par Dr. Elena Vasquez
- Licence Temporelle N°001
- 15 ans d'activité sans aucun incident
- 2 847 voyageurs satisfaits
- Valeurs : Sécurité absolue, Exclusivité, Immersion totale

## Les 3 destinations disponibles

### 1. Paris 1889 - La Belle Époque 🗼
- **Prix** : 24 500€ par voyageur
- **Durée** : 3 jours
- **Niveau** : Accessible (idéal pour un premier voyage)
- **Époque** : XIXe siècle, centenaire de la Révolution française
- **Points forts** :
  - Accès VIP à l'Exposition Universelle
  - Dîner au premier étage de la Tour Eiffel (fraîchement inaugurée)
  - Soirée au Moulin Rouge avec Toulouse-Lautrec
  - Visite de l'atelier de Gustave Eiffel
  - Promenade en calèche sur les Champs-Élysées
- **Activités** : Inauguration privée de la Tour Eiffel, café littéraire avec les grands esprits, atelier impressionniste à Montmartre
- **Idéal pour** : Couples, amateurs d'art, passionnés d'architecture

### 2. Crétacé - L'Ère des Titans 🦖
- **Prix** : 89 000€ par voyageur
- **Durée** : 5 jours
- **Niveau** : Aventurier (condition physique recommandée)
- **Époque** : -65 millions d'années, Mésozoïque
- **Points forts** :
  - Observation du T-Rex en chasse
  - Survol en module sécurisé des plaines du Crétacé
  - Rencontre avec un troupeau de Tricératops
  - Collecte de fossiles pré-formation
  - Nuit sous les étoiles préhistoriques
- **Activités** : Safari préhistorique en véhicule temporel, vol avec les Ptéranodons, observation des nidifications
- **Idéal pour** : Aventuriers, passionnés de nature, paléontologues amateurs

### 3. Florence 1504 - Renaissance Italienne 🎨
- **Prix** : 45 000€ par voyageur
- **Durée** : 4 jours
- **Niveau** : Culturel
- **Époque** : Renaissance, apogée artistique de Florence
- **Points forts** :
  - Visite privée de l'atelier de Michel-Ange
  - Audience avec Léonard de Vinci
  - Dîner au Palazzo Médicis
  - Cérémonie du dévoilement du David
  - Cours de dessin avec les maîtres
- **Activités** : Observer Michel-Ange sculpter le David, banquet Renaissance au Palazzo Vecchio, démonstration des machines de Léonard
- **Idéal pour** : Amoureux de l'art, passionnés d'histoire, artistes

## Ce qui est inclus dans tous les voyages
- Transport temporel aller-retour (instantané)
- Hébergement premium d'époque
- Guide historien personnel
- Tenue d'époque sur mesure
- Assurance paradoxe temporel
- Traducteur neuronal temporel (pour comprendre toutes les langues)
- Kit de survie temporelle
- Session de préparation de 2h avant le départ

## Sécurité
- Technologie de protection paradoxale
- Bouclier d'invisibilité (observer sans interférer)
- Ancrage temporel (retour garanti)
- Moniteur biométrique (surveillance constante)
- Équipe d'extraction (intervention en moins de 3 secondes)
- 100% de sécurité paradoxale garantie

## Conditions
- Âge minimum : 8 ans (Paris), 10 ans (Florence), 14 ans (Crétacé)
- Réduction de 20% pour les enfants
- Groupes de 2 à 12 personnes maximum
- Annulation gratuite jusqu'à 7 jours avant
- Facilités de paiement disponibles

## Contact
- Email : contact@chronos-voyages.fr
- Téléphone : +33 1 00 00 00 00
- Adresse : 42 Avenue du Temps, Paris

## Instructions
- Réponds toujours en français
- Sois concise mais informative (pas de pavés de texte)
- Si on te demande de recommander une destination, pose des questions sur les préférences du client
- Encourage les clients à réserver via le formulaire sur le site
- Tu peux inventer des détails cohérents avec l'univers si nécessaire
- Ne parle JAMAIS d'autres destinations que les 3 proposées
- Si on te pose des questions hors sujet, ramène poliment la conversation vers les voyages temporels`;

const INITIAL_MESSAGES = [
  {
    id: 1,
    role: 'assistant',
    content: 'Bonjour et bienvenue chez Chronos Voyages ! 👋 Je suis Aria, ta conseillère en voyages temporels. Que tu rêves de voir la Tour Eiffel en 1889, d\'observer des dinosaures ou de rencontrer Michel-Ange, je suis là pour t\'aider. Quelle époque t\'attire ?'
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendToGroq = async (userMessage) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey) {
      return "Désolée, je rencontre un problème technique. Contacte-nous par email à contact@chronos-voyages.fr !";
    }

    // Build conversation history for context
    const conversationHistory = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...conversationHistory,
            { role: 'user', content: userMessage }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "Désolée, je n'ai pas compris. Peux-tu reformuler ?";
    } catch (error) {
      console.error('Groq API error:', error);
      return "Oups ! J'ai un petit souci technique. En attendant, tu peux consulter nos destinations sur le site ou nous contacter à contact@chronos-voyages.fr 😊";
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    const botResponseText = await sendToGroq(userMessage.content);

    const botResponse = {
      id: Date.now() + 1,
      role: 'assistant',
      content: botResponseText
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botResponse]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat button */}
      <motion.button
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <MessageCircle size={24} />
        <span className={styles.buttonPulse} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.chatWindow}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <Clock size={20} />
                </div>
                <div>
                  <h3>Aria</h3>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Conseillère IA
                  </span>
                </div>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`${styles.message} ${styles[message.role === 'assistant' ? 'bot' : 'user']}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {message.role === 'assistant' && (
                    <div className={styles.botAvatar}>
                      <Sparkles size={14} />
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {message.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line.split('**').map((part, j) =>
                          j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                        )}
                        {i < message.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className={`${styles.message} ${styles.bot}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className={styles.botAvatar}>
                    <Sparkles size={14} />
                  </div>
                  <div className={styles.typing}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={styles.inputArea}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez-moi vos questions sur les voyages temporels..."
                disabled={isTyping}
              />
              <button
                className={styles.sendBtn}
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
