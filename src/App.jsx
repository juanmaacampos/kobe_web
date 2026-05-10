import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './webSections/Header/Header.jsx';
import MenuDropdownOptimized from './components/MenuDropdownOptimized/MenuDropdownOptimized.jsx';
import BodyAds from './webSections/bodyAds/BodyAds.jsx';
import Footer from './webSections/Footer/Footer.jsx';
import Info from './webSections/Info/Info.jsx';
import Reviews from './webSections/Reviews/Reviews.jsx';
import EventReservation from './webSections/EventReservation/EventReservation.jsx';
import FirebaseProvider from './firebase/FirebaseProvider.jsx';
import FeaturedModal from './components/FeaturedModal/FeaturedModal.jsx';
import TopButton from './components/topButton/TopButton.jsx';
import { useFeaturedModal } from './hooks/useFeaturedModal.js';
import { useAnnouncementsOptimized } from './firebase/useMenuOptimized.js';
import LandingModal from './components/LandingModal/LandingModal.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import { useFirebase } from './firebase/FirebaseProvider.jsx';
import { useBusinessInfo } from './firebase/useMenu.js';

function App() {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [activeSlide, setActiveSlide] = useState(null);
  const [manualClickKey, setManualClickKey] = useState(0);
  
  const handleManualSelection = (menuType) => {
    setSelectedMenu(menuType);
    setManualClickKey(prev => prev + 1);
  };
  
  return (
    <FirebaseProvider>
      <AppContent 
        onSelectMenu={handleManualSelection} 
        selectedMenu={selectedMenu}
        onSlideChange={setActiveSlide}
        activeSlide={activeSlide}
        manualClickKey={manualClickKey}
      />
    </FirebaseProvider>
  );
}

function AppContent({ onSelectMenu, selectedMenu, onSlideChange, activeSlide, manualClickKey }) {
  const { menuSDK } = useFirebase();
  const { business } = useBusinessInfo(menuSDK);

  const { announcements } = useAnnouncementsOptimized(menuSDK, {
    enableRealtime: true,
    cacheOnly: false,
    maxAge: 5 * 60 * 1000
  });
  
  const { isModalOpen, featuredAnnouncement, closeModal } = useFeaturedModal(announcements);
  const [showLanding, setShowLanding] = useState(true);
  
  return (
    <div className="app-shell">
      <Navbar />
      <Header onSelect={onSelectMenu} onSlideChange={onSlideChange} />

      {(activeSlide || selectedMenu) && (
        <MenuDropdownOptimized 
          key={selectedMenu ? `manual-${selectedMenu}-${manualClickKey}` : `auto-${activeSlide}`}
          menuType={selectedMenu || activeSlide} 
          autoScroll={!!selectedMenu}
        />
      )}
      <BodyAds />
      <Reviews />
      <EventReservation />
      <Info businessHours={business?.businessHours} />
      <Footer />
      
      <LandingModal
        open={showLanding}
        onClose={() => setShowLanding(false)}
      />

      <FeaturedModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        announcement={featuredAnnouncement}
      />

      <TopButton />

    </div>
  );
}

export default App;
