import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, Bookmark, Globe, User, ShieldAlert, Utensils, Menu, X, Landmark, PartyPopper } from 'lucide-react';
import { t } from '../data/translations';

export default function Navbar({ activeTab, setActiveTab, currentLang, setCurrentLang, onOpenAuth, savedCount = 0 }) {
  const [langDropdown, setLangDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const languages = [
    { code: 'English', label: 'English (EN)', flag: '🇬🇧' },
    { code: 'Marathi', label: 'मराठी (MR)', flag: '🚩' },
    { code: 'Hindi', label: 'हिंदी (HI)', flag: '🇮🇳' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8EC]/95 backdrop-blur-md border-b border-[#E8DCCB] text-[#332A27] shadow-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand (India-Scalable) */}
          <div 
            onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#741C35] to-[#E87516] p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#FFF8EC] rounded-[10px] flex items-center justify-center">
                <Landmark className="w-6 h-6 text-[#741C35]" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-heritage text-2xl font-bold tracking-wide text-[#741C35]">HeritageAI</span>
                <span className="bg-[#E87516]/15 border border-[#E87516]/30 text-[#E87516] text-[10px] px-2 py-0.5 rounded-full font-mono uppercase tracking-wider font-extrabold">
                  India
                </span>
              </div>
              <p className="text-[11px] text-[#6F625D] font-medium tracking-tight">
                {t('tagline', currentLang)}
              </p>
            </div>
          </div>

          {/* Nav Links (Desktop - Light Theme) */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#741C35] text-white shadow-md'
                  : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#F8D8AD]/40'
              }`}
            >
              {t('navHome', currentLang)}
            </button>
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'explore'
                  ? 'bg-[#741C35] text-white shadow-md'
                  : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#F8D8AD]/40'
              }`}
            >
              <MapPin className="w-4 h-4 text-[#087F7B]" />
              <span>{t('navExplore', currentLang)}</span>
            </button>
            <button
              onClick={() => setActiveTab('planner')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'planner'
                  ? 'bg-[#E87516] text-white font-bold shadow-md'
                  : 'bg-[#E87516]/10 text-[#E87516] border border-[#E87516]/30 hover:bg-[#E87516]/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('navPlanner', currentLang)}</span>
            </button>
            <button
              onClick={() => setActiveTab('food')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'food'
                  ? 'bg-[#741C35] text-white shadow-md'
                  : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#F8D8AD]/40'
              }`}
            >
              <Utensils className="w-4 h-4 text-[#E87516]" />
              <span>{t('navTaste', currentLang)}</span>
            </button>
            <button
              onClick={() => setActiveTab('festivals')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${activeTab === 'festivals' ? 'bg-[#741C35] text-white shadow-md' : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#F8D8AD]/40'}`}
            >
              <PartyPopper className="w-4 h-4 text-[#E87516]" />
              <span>Festivals</span>
            </button>
            <button
              onClick={() => setActiveTab('safety')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer ${
                activeTab === 'safety'
                  ? 'bg-[#741C35] text-white shadow-md'
                  : 'text-[#6F625D] hover:text-[#741C35] hover:bg-[#F8D8AD]/40'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-[#087F7B]" />
              <span>{t('navSafety', currentLang)}</span>
            </button>
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center space-x-3">
            
            {/* Saved Trips Counter */}
            <button
              onClick={() => setActiveTab('saved')}
              className="relative p-2.5 rounded-xl bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] hover:border-[#E87516] transition-colors cursor-pointer shadow-sm"
              title="Saved Trips & Favorites"
            >
              <Bookmark className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#E87516] text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-semibold hover:border-[#741C35] transition-colors cursor-pointer shadow-sm"
              >
                <Globe className="w-4 h-4 text-[#087F7B]" />
                <span>{languages.find(l => l.code === currentLang)?.flag} {currentLang}</span>
              </button>

              {langDropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-[#FFF8EC] border border-[#E8DCCB] shadow-xl py-1 z-50 animate-in fade-in">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                        currentLang === lang.code
                          ? 'bg-[#741C35] text-white'
                          : 'text-[#332A27] hover:bg-[#F8D8AD]/30'
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span>{lang.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account / Login */}
            <button
              onClick={onOpenAuth}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#087F7B] hover:bg-[#066663] text-white text-xs font-semibold shadow-md transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-white" />
              <span className="hidden sm:inline">{t('navSignIn', currentLang)}</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden p-2 rounded-xl bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35]"
            >
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="lg:hidden bg-[#FFF8EC] border-b border-[#E8DCCB] px-4 pt-2 pb-6 space-y-2 text-sm font-semibold">
          <button
            onClick={() => { setActiveTab('home'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'home' ? 'bg-[#741C35] text-white' : 'text-[#332A27]'}`}
          >
            {t('navHome', currentLang)}
          </button>
          <button
            onClick={() => { setActiveTab('explore'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'explore' ? 'bg-[#741C35] text-white' : 'text-[#332A27]'}`}
          >
            {t('navExplore', currentLang)}
          </button>
          <button
            onClick={() => { setActiveTab('planner'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl bg-[#E87516] text-white font-bold`}
          >
            {t('navPlanner', currentLang)}
          </button>
          <button
            onClick={() => { setActiveTab('food'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'food' ? 'bg-[#741C35] text-white' : 'text-[#332A27]'}`}
          >
            {t('navTaste', currentLang)}
          </button>
          <button
            onClick={() => { setActiveTab('festivals'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'festivals' ? 'bg-[#741C35] text-white' : 'text-[#332A27]'}`}
          >
            Festivals
          </button>
          <button
            onClick={() => { setActiveTab('safety'); setMobileMenu(false); }}
            className={`w-full text-left py-2.5 px-4 rounded-xl ${activeTab === 'safety' ? 'bg-[#741C35] text-white' : 'text-[#332A27]'}`}
          >
            {t('navSafety', currentLang)}
          </button>
        </div>
      )}

    </header>
  );
}
