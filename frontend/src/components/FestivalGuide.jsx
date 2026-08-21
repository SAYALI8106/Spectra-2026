import React, { useEffect, useRef, useState } from 'react';
import { CalendarDays, MapPin, ScrollText, ShieldCheck, Sparkles, Volume2, Pause, Play, Square } from 'lucide-react';
import { getFestivals } from '../services/api';

export default function FestivalGuide() {
  const [festivals, setFestivals] = useState([]);
  const [selectedFestival, setSelectedFestival] = useState(null);
  const [status, setStatus] = useState('loading');
  const [speechState, setSpeechState] = useState('idle');
  const utteranceRef = useRef(null);

  useEffect(() => {
    getFestivals()
      .then((data) => {
        setFestivals(data);
        setSelectedFestival(data[0] || null);
        setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, []);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const stopSpeech = () => {
    window.speechSynthesis?.cancel();
    utteranceRef.current = null;
    setSpeechState('idle');
  };

  const speakFestival = () => {
    if (!('speechSynthesis' in window) || !selectedFestival) return;
    if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
      return;
    }
    stopSpeech();
    const speech = new SpeechSynthesisUtterance(`${selectedFestival.name}. ${selectedFestival.overview} History and meaning. ${selectedFestival.history} Visitor etiquette. ${selectedFestival.visitorEtiquette}`);
    speech.rate = 0.92;
    speech.onend = () => setSpeechState('idle');
    speech.onerror = () => setSpeechState('idle');
    utteranceRef.current = speech;
    window.speechSynthesis.speak(speech);
    setSpeechState('speaking');
  };

  const togglePause = () => {
    if (speechState === 'speaking') {
      window.speechSynthesis.pause();
      setSpeechState('paused');
    } else if (speechState === 'paused') {
      window.speechSynthesis.resume();
      setSpeechState('speaking');
    }
  };

  if (status === 'loading') {
    return <div className="py-20 text-center text-[#6F625D] font-medium">Loading India&apos;s festival guide…</div>;
  }

  if (status === 'error') {
    return <div className="py-20 text-center text-[#6F625D] font-medium">The festival guide is temporarily unavailable. Please make sure the backend is running on port 5000.</div>;
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF8EC] border border-[#E8DCCB] text-[#741C35] text-xs font-bold mb-3">
          <Sparkles className="w-4 h-4 text-[#E87516]" /> Indian cultural calendar
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#741C35] font-heritage">Celebrate <span className="text-[#E87516]">India&apos;s Festivals</span></h1>
        <p className="mt-4 text-[#6F625D] leading-relaxed">Discover traditions, histories, and respectful ways to experience India&apos;s major celebrations.</p>
      </div>

      <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
          {festivals.map((festival) => (
            <button key={festival.id} onClick={() => { stopSpeech(); setSelectedFestival(festival); }} className={`text-left rounded-2xl p-4 border transition-all cursor-pointer ${selectedFestival?.id === festival.id ? 'bg-[#741C35] border-[#741C35] text-white shadow-lg' : 'bg-[#FFF8EC] border-[#E8DCCB] text-[#332A27] hover:border-[#E87516]'}`}>
              <p className="font-bold font-heritage text-lg">{festival.name}</p>
              <p className={`text-xs mt-1 ${selectedFestival?.id === festival.id ? 'text-[#F8D8AD]' : 'text-[#6F625D]'}`}>{festival.alternateName} · {festival.usualPeriod}</p>
            </button>
          ))}
        </div>

        {selectedFestival && (
          <article className="overflow-hidden rounded-3xl bg-[#FFF8EC] border border-[#E8DCCB] shadow-lg">
            <img src={selectedFestival.image} alt={`${selectedFestival.name} celebration`} className="w-full h-64 sm:h-80 object-cover" />
            <div className="p-6 sm:p-8 space-y-5">
              <div><p className="text-[#E87516] text-sm font-bold">{selectedFestival.alternateName}</p><h2 className="text-3xl sm:text-4xl font-extrabold text-[#741C35] font-heritage">{selectedFestival.name}</h2></div>
              <p className="text-[#6F625D] leading-relaxed">{selectedFestival.overview}</p>
              {'speechSynthesis' in window && (
                <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E8DCCB] bg-white/60 p-3">
                  <button onClick={speakFestival} className="inline-flex items-center gap-2 rounded-lg bg-[#087F7B] px-3 py-2 text-xs font-bold text-white cursor-pointer hover:bg-[#066663]">
                    {speechState === 'idle' ? <Volume2 className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {speechState === 'paused' ? 'Resume narration' : speechState === 'speaking' ? 'Restart narration' : 'Listen to this festival'}
                  </button>
                  {speechState !== 'idle' && <button onClick={togglePause} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-[#741C35] hover:bg-[#F8D8AD] cursor-pointer">{speechState === 'speaking' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}{speechState === 'speaking' ? 'Pause' : 'Resume'}</button>}
                  {speechState !== 'idle' && <button onClick={stopSpeech} className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-[#6F625D] hover:bg-[#F8D8AD] cursor-pointer"><Square className="w-3.5 h-3.5" />Stop</button>}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex gap-2"><CalendarDays className="w-5 h-5 text-[#E87516] shrink-0" /><span><b>Usually:</b> {selectedFestival.usualPeriod}</span></div>
                <div className="flex gap-2"><MapPin className="w-5 h-5 text-[#087F7B] shrink-0" /><span><b>Where:</b> {selectedFestival.regions.join(', ')}</span></div>
              </div>
              <div className="border-t border-[#E8DCCB] pt-5"><h3 className="flex items-center gap-2 font-bold text-[#741C35]"><ScrollText className="w-5 h-5 text-[#E87516]" /> History & meaning</h3><p className="mt-2 text-sm text-[#6F625D] leading-relaxed">{selectedFestival.history}</p></div>
              <div className="rounded-xl bg-[#F8D8AD]/55 p-4 text-sm text-[#332A27]"><h3 className="flex items-center gap-2 font-bold text-[#741C35]"><ShieldCheck className="w-5 h-5 text-[#087F7B]" /> Visitor etiquette</h3><p className="mt-1 leading-relaxed">{selectedFestival.visitorEtiquette}</p></div>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
