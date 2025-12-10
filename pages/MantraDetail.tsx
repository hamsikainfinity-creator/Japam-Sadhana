import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RefreshCw, Volume2, Plus } from 'lucide-react';
import Layout from '../components/Layout';
import { MANTRAS } from '../constants';
import { playOmSound } from '../utils/audioUtils';

const LOOP_COUNT_TARGET = 5;

const MantraDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const mantraId = Number(id);
  
  // Find mantra data (flatten the groups)
  const mantra = MANTRAS.flatMap(g => g.mantras).find(m => m.id === mantraId);

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLoop, setCurrentLoop] = useState(0);
  const [chantCount, setChantCount] = useState(0);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  
  // Refs for managing audio loop efficiently without re-renders causing issues
  const isPlayingRef = useRef(false);
  const loopCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load count from local storage
  useEffect(() => {
    const savedCount = localStorage.getItem(`chant_count_${mantraId}`);
    if (savedCount) {
      setChantCount(parseInt(savedCount, 10));
    }
  }, [mantraId]);

  // Persist count
  const incrementCount = useCallback(() => {
    setChantCount(prev => {
      const newVal = prev + 1;
      localStorage.setItem(`chant_count_${mantraId}`, newVal.toString());
      return newVal;
    });
  }, [mantraId]);

  // Audio Loop Logic
  const startAudioLoop = async () => {
    if (isPlayingRef.current) return;
    
    setIsPlaying(true);
    setIsAudioInitialized(true);
    isPlayingRef.current = true;
    loopCountRef.current = 0;
    setCurrentLoop(0);

    // Create a controller to cancel the loop sequence if stopped
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      while (loopCountRef.current < LOOP_COUNT_TARGET && isPlayingRef.current) {
        if (signal.aborted) break;

        // Visual update
        setCurrentLoop(loopCountRef.current + 1);

        // Play Sound (4 seconds duration approx)
        await playOmSound(4);

        if (signal.aborted || !isPlayingRef.current) break;

        // Wait a small gap between chants
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        loopCountRef.current += 1;
      }
    } catch (error) {
      console.error("Audio loop interrupted", error);
    } finally {
      // Reset state when loop finishes or is stopped
      setIsPlaying(false);
      isPlayingRef.current = false;
      setCurrentLoop(0);
    }
  };

  const stopAudio = () => {
    setIsPlaying(false);
    isPlayingRef.current = false;
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudioLoop();
    }
  };

  if (!mantra) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-gray-500">Mantra not found.</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg"
          >
            Go Back
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="animate-in zoom-in-95 duration-500">
        {/* Nav */}
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-orange-700 mb-6 hover:bg-orange-100 p-2 rounded-lg transition-colors w-fit"
        >
          <ArrowLeft size={20} className="mr-1" />
          <span className="font-medium">వెనుకకు (Back)</span>
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-orange-100 overflow-hidden relative">
          
          {/* Header Image Pattern */}
          <div className="h-32 bg-gradient-to-r from-orange-400 to-red-500 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/mandala.png')]"></div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-3xl font-bold text-orange-600">{mantra.id}</span>
            </div>
          </div>

          <div className="pt-12 pb-8 px-6 text-center space-y-6">
            
            {/* Title & Text */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-4">
                {mantra.title}
              </h1>
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 inline-block w-full max-w-md">
                <p className="text-xl md:text-2xl font-serif text-orange-800 leading-relaxed font-medium">
                   {mantra.title}
                </p>
                <p className="text-sm text-orange-400 mt-2 opacity-75 italic">
                  (Chant with devotion)
                </p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={togglePlay}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isPlaying 
                      ? 'bg-red-50 text-red-600 border-2 border-red-100 scale-110' 
                      : 'bg-orange-600 text-white hover:bg-orange-700 hover:scale-105 shadow-orange-200'
                  }`}
                >
                  {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                </button>
              </div>
              
              <div className="h-6 flex items-center justify-center gap-2">
                {isPlaying && (
                  <>
                    <Volume2 size={16} className="text-orange-500 animate-pulse" />
                    <span className="text-sm font-medium text-orange-600">
                      Playing {currentLoop} / {LOOP_COUNT_TARGET}
                    </span>
                  </>
                )}
                {!isPlaying && isAudioInitialized && (
                  <span className="text-sm text-gray-400">Audio Paused</span>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 my-4 w-full"></div>

            {/* Counter Section */}
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-gray-500 font-medium uppercase tracking-widest text-xs">Japam Counter</h3>
              
              <div className="relative">
                <div className="text-6xl font-bold text-gray-800 tabular-nums tracking-tight">
                  {chantCount}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setChantCount(0)}
                  className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Reset Counter"
                >
                  <RefreshCw size={20} />
                </button>

                <button
                  onClick={incrementCount}
                  className="group flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  <span className="font-semibold text-lg">Count</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MantraDetail;
