import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explore from './pages/Explore';
import Planner from './pages/Planner';
import FoodDiscovery from './components/FoodDiscovery';
import LocalCommerce from './components/LocalCommerce';
import SafetySection from './components/SafetySection';
import DestinationCard from './components/DestinationCard';
import DestinationModal from './components/DestinationModal';
import AiChatAssistant from './components/AiChatAssistant';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import SplashScreen from './components/SplashScreen';
import FestivalGuide from './components/FestivalGuide';

import { PUNE_DESTINATIONS } from './data/puneData';
import { t } from './data/translations';
import { Sparkles, MapPin, Heart, Bookmark, Trash2, ArrowRight, Compass, ShieldAlert, Globe, IndianRupee, Utensils, HeartHandshake, Landmark } from 'lucide-react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [currentLang, setCurrentLang] = useState('English');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [savedTrips, setSavedTrips] = useState([]);
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Pune');

  const handleFavoriteToggle = (dest) => {
    setFavorites(prev => {
      const exists = prev.some(f => f.id === dest.id);
      if (exists) {
        return prev.filter(f => f.id !== dest.id);
      } else {
        return [...prev, dest];
      }
    });
  };

  const handleSaveTrip = (tripData) => {
    setSavedTrips(prev => [
      { id: Date.now(), title: `${tripData.daysCount} Days ${selectedCity} Journey (${tripData.language})`, ...tripData },
      ...prev
    ]);
  };

  const handleHeroSearchPrompt = (promptText) => {
    setInitialPrompt(promptText);
    setActiveTab('planner');
  };

  const handleAddToTripFromModal = (dest) => {
    handleFavoriteToggle(dest);
    setActiveTab('planner');
  };

  return (
    <div className="min-h-screen bg-[#F8D8AD] text-[#332A27] flex flex-col font-sans selection:bg-[#741C35] selection:text-white">

      {/* Mandatory Traditional Indian Splash Screen Overlay */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* Top Sticky Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        onOpenAuth={() => setIsAuthOpen(true)}
        savedCount={favorites.length + savedTrips.length}
      />

      {/* Main Body Routing */}
      <main className="flex-grow">

        {/* HOME TAB: Storytelling Journey */}
        {activeTab === 'home' && (
          <div>
            
            {/* SECTION 1: Hero */}
            <Hero
              onStartPlanner={() => setActiveTab('planner')}
              onExplore={() => setActiveTab('explore')}
              onSearchPrompt={handleHeroSearchPrompt}
              currentLang={currentLang}
            />

            {/* SECTION 2: Why India / City Selection Showcase */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E8DCCB]">
              <div className="max-w-4xl mx-auto text-center space-y-4">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold shadow-sm">
                  <Compass className="w-3.5 h-3.5 text-[#E87516]" />
                  <span>Scalable Smart Tourism across Indian Cities</span>
                </div>
                
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                  Explore <span className="text-[#E87516]">India's Living Heritage</span>
                </h2>
                
                <p className="text-[#6F625D] text-base leading-relaxed font-medium">
                  From Maratha fortresses in Pune to imperial palaces in Jaipur and ancient ghats in Varanasi — HeritageAI brings India's cultural stories to life with AI trip planning and multilingual narration.
                </p>

                {/* City Selector Pills */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                  {['Pune', 'Jaipur', 'Varanasi', 'Delhi', 'Hyderabad', 'Mysuru'].map(city => (
                    <button
                      key={city}
                      onClick={() => setSelectedCity(city)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCity === city
                          ? 'bg-[#741C35] text-white shadow-md'
                          : 'bg-[#FFF8EC] text-[#741C35] border border-[#E8DCCB] hover:border-[#E87516]'
                      }`}
                    >
                      📍 {city}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 3: Explore India's Heritage */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#E8DCCB]">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold mb-3">
                    <Landmark className="w-3.5 h-3.5 text-[#E87516]" />
                    <span>Featured Monuments & Fortresses</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                    Explore <span className="text-[#E87516]">{selectedCity} Heritage</span>
                  </h2>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="btn-teal px-5 py-2.5 text-xs flex items-center space-x-2 cursor-pointer shadow-md self-start sm:self-auto"
                >
                  <span>Explore All Monuments</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Grid Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PUNE_DESTINATIONS.slice(0, 4).map((dest) => (
                  <DestinationCard
                    key={dest.id}
                    destination={dest}
                    onSelect={setSelectedDestination}
                    onFavorite={handleFavoriteToggle}
                    isFavorite={favorites.some(f => f.id === dest.id)}
                    currentLang={currentLang}
                  />
                ))}
              </div>
            </section>

            {/* SECTION 4: Let AI Plan Your Journey */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              <div className="bg-[#FFF8EC] p-8 sm:p-12 rounded-3xl border border-[#E8DCCB] text-[#332A27] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-4 max-w-2xl">
                  <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#F8D8AD] border border-[#E8DCCB] text-[#741C35] text-xs font-bold">
                    <Sparkles className="w-4 h-4 text-[#E87516]" />
                    <span>AI Cultural Travel Engine</span>
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-extrabold font-heritage text-[#741C35]">
                    Plan Your <span className="text-[#E87516]">Cultural Journey</span>
                  </h2>
                  <p className="text-[#6F625D] text-sm leading-relaxed font-normal">
                    Select your custom days, budget, interests, and language. HeritageAI generates dynamic routes, cost breakdowns, and authentic cultural stops in seconds.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('planner')}
                  className="btn-saffron px-8 py-4 text-sm flex items-center space-x-3 shadow-xl cursor-pointer flex-shrink-0"
                >
                  <Sparkles className="w-5 h-5 fill-white" />
                  <span>✨ Plan My Journey</span>
                </button>
              </div>
            </section>

            {/* SECTION 5: Taste India */}
            <FoodDiscovery currentLang={currentLang} />

            {/* SECTION 6: Travel Smarter */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#E8DCCB]">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#E87516]" />
                  <span>Integrated Digital Tourism Stack</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage mb-4">
                  Travel <span className="text-[#E87516]">Smarter</span>
                </h2>
                <p className="text-[#6F625D] text-sm sm:text-base leading-relaxed font-medium">
                  Designed to solve the complete end-to-end heritage tourism workflow for travelers in India.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <Globe className="w-8 h-8 text-[#087F7B] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat1Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat1Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <IndianRupee className="w-8 h-8 text-[#667A3A] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat2Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat2Desc', currentLang)}
                  </p>
                </div>

                <div className="bg-[#FFF8EC] p-6 rounded-2xl border border-[#E8DCCB] shadow-sm">
                  <ShieldAlert className="w-8 h-8 text-[#087F7B] mb-3" />
                  <h3 className="text-lg font-bold text-[#741C35] font-heritage mb-2">{t('feat3Title', currentLang)}</h3>
                  <p className="text-xs text-[#6F625D] leading-relaxed">
                    {t('feat3Desc', currentLang)}
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION 7: Meet India's Local Makers */}
            <LocalCommerce currentLang={currentLang} />

            {/* SECTION 8: Final CTA */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
              <div className="bg-[#FFF8EC] p-10 sm:p-14 rounded-3xl border border-[#E8DCCB] shadow-xl space-y-6">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">
                  Your Cultural Journey <span className="text-[#E87516]">Starts Here.</span>
                </h2>
                <p className="text-[#6F625D] text-base max-w-2xl mx-auto font-medium">
                  Experience imperial heritage, Sahyadri fortresses, authentic cuisine, and local craft culture with HeritageAI.
                </p>
                <button
                  onClick={() => setActiveTab('planner')}
                  className="btn-saffron px-8 py-4 text-sm inline-flex items-center space-x-3 cursor-pointer shadow-lg"
                >
                  <Sparkles className="w-5 h-5 text-white" />
                  <span>✨ Plan My Journey Now</span>
                </button>
              </div>
            </section>

          </div>
        )}

        {/* EXPLORE TAB */}
        {activeTab === 'explore' && (
          <Explore
            onSelectDestination={setSelectedDestination}
            onFavorite={handleFavoriteToggle}
            favorites={favorites}
            currentLang={currentLang}
          />
        )}

        {/* AI TRIP PLANNER TAB */}
        {activeTab === 'planner' && (
          <Planner
            initialPrompt={initialPrompt}
            onSaveTrip={handleSaveTrip}
            currentLang={currentLang}
            setCurrentLang={setCurrentLang}
          />
        )}

        {/* FOOD TAB */}
        {activeTab === 'food' && (
          <FoodDiscovery currentLang={currentLang} />
        )}

        {/* FESTIVALS TAB */}
        {activeTab === 'festivals' && <FestivalGuide />}

        {/* SAFETY TAB */}
        {activeTab === 'safety' && (
          <SafetySection currentLang={currentLang} />
        )}

        {/* SAVED TRIPS & FAVORITES TAB */}
        {activeTab === 'saved' && (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12 font-sans">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] mb-2 font-heritage">
                {t('savedTitle', currentLang)}
              </h1>
              <p className="text-[#6F625D] text-sm font-medium">
                {t('savedSub', currentLang)}
              </p>
            </div>

            {/* Saved Destinations Grid */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 font-heritage">
                <Heart className="w-5 h-5 text-[#E87516] fill-current" />
                <span>{t('bookmarkedSites', currentLang)} ({favorites.length})</span>
              </h3>

              {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favorites.map(dest => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      onSelect={setSelectedDestination}
                      onFavorite={handleFavoriteToggle}
                      isFavorite={true}
                      currentLang={currentLang}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFF8EC] p-8 rounded-2xl border border-[#E8DCCB] text-center text-[#6F625D] text-xs font-medium">
                  {t('noBookmarks', currentLang)} Browse <button onClick={() => setActiveTab('explore')} className="text-[#741C35] font-bold underline cursor-pointer">Explore Sites</button> to add your favorites!
                </div>
              )}
            </div>

            {/* Saved AI Itineraries */}
            <div className="space-y-4 pt-6 border-t border-[#E8DCCB]">
              <h3 className="text-lg font-bold text-[#741C35] flex items-center space-x-2 font-heritage">
                <Bookmark className="w-5 h-5 text-[#E87516]" />
                <span>{t('savedItineraries', currentLang)} ({savedTrips.length})</span>
              </h3>

              {savedTrips.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {savedTrips.map(trip => (
                    <div key={trip.id} className="bg-[#FFF8EC] p-5 rounded-2xl border border-[#E8DCCB] shadow-sm space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-[#741C35] text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                          {trip.title}
                        </span>
                        <button
                          onClick={() => setSavedTrips(savedTrips.filter(t => t.id !== trip.id))}
                          className="p-1.5 rounded-lg text-[#6F625D] hover:text-rose-600 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs text-[#332A27] font-medium">
                        {trip.daysCount} Days • Budget: ₹{trip.budget.toLocaleString()} • Sustainability Score: {trip.sustainabilityScore}/100
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#FFF8EC] p-8 rounded-2xl border border-[#E8DCCB] text-center text-[#6F625D] text-xs font-medium">
                  {t('noSavedTrips', currentLang)} Use the <button onClick={() => setActiveTab('planner')} className="text-[#741C35] font-bold underline cursor-pointer">✨ AI Trip Planner</button> to create a customized itinerary!
                </div>
              )}
            </div>

          </div>
        )}

      </main>

      {/* Destination Detailed Story Modal */}
      {selectedDestination && (
        <DestinationModal
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
          onAskAi={(prompt) => {
            setInitialPrompt(prompt);
            setActiveTab('planner');
          }}
          onAddToTrip={handleAddToTripFromModal}
          isFavorite={favorites.some(f => f.id === selectedDestination.id)}
          onFavorite={handleFavoriteToggle}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
        />
      )}

      {/* Floating Multilingual AI Assistant */}
      <AiChatAssistant currentLang={currentLang} />

      {/* Firebase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} currentLang={currentLang} />

    </div>
  );
}
