import { useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import DestinationsSection from './components/DestinationsSection';
import QuizSection from './components/QuizSection';
import DestinationDetail from './pages/DestinationDetail';
import ReservationSection from './components/ReservationSection';
import PaymentPage from './pages/PaymentPage';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [reservationDestination, setReservationDestination] = useState('');
  const [reservationData, setReservationData] = useState(null);
  const destinationsRef = useRef(null);
  const reservationRef = useRef(null);

  const handleNavigate = (page) => {
    if (page === 'home') {
      setSelectedDestination(null);
      setCurrentPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (page === 'destinations') {
      setSelectedDestination(null);
      setCurrentPage('home');
      setTimeout(() => {
        destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (page === 'about') {
      setSelectedDestination(null);
      setCurrentPage('home');
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (page === 'reservation') {
      setSelectedDestination(null);
      setCurrentPage('home');
      setTimeout(() => {
        reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleSelectDestination = (destinationId) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedDestination(destinationId);
    setCurrentPage('destination');
  };

  const handleBackFromDestination = () => {
    setSelectedDestination(null);
    setCurrentPage('home');
    setTimeout(() => {
      destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReserve = (destinationId) => {
    setReservationDestination(destinationId);
    setSelectedDestination(null);
    setCurrentPage('home');
    setTimeout(() => {
      reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleProceedToPayment = (data) => {
    setReservationData(data);
    setCurrentPage('payment');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackFromPayment = () => {
    setCurrentPage('home');
    setTimeout(() => {
      reservationRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handlePaymentSuccess = () => {
    setReservationData(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDestinations = () => {
    destinationsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Particle background */}
      <ParticleBackground />

      {/* Navigation */}
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />

      {/* Main content */}
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'payment' && reservationData ? (
            <PaymentPage
              key="payment-page"
              reservationData={reservationData}
              onBack={handleBackFromPayment}
              onSuccess={handlePaymentSuccess}
            />
          ) : selectedDestination ? (
            <DestinationDetail
              key="destination-detail"
              destinationId={selectedDestination}
              onBack={handleBackFromDestination}
              onReserve={handleReserve}
            />
          ) : (
            <div key="home-page">
              <Hero onScrollToDestinations={scrollToDestinations} />

              <AboutSection />

              <div ref={destinationsRef}>
                <DestinationsSection onSelectDestination={handleSelectDestination} />
              </div>

              <QuizSection onSelectDestination={handleSelectDestination} />

              <div ref={reservationRef}>
                <ReservationSection
                  preselectedDestination={reservationDestination}
                  onProceedToPayment={handleProceedToPayment}
                />
              </div>

              <Footer />
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
}

export default App;
