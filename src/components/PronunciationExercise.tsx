import React, { useState, useRef } from 'react';
import { Mic, Square, Loader2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { evaluatePronunciation } from '../services/aiService';

interface PronunciationExerciseProps {
  targetWord: string;
  onResult: (isCorrect: boolean, score: number, feedback: string) => void;
  disabled?: boolean;
}

const PronunciationExercise: React.FC<PronunciationExerciseProps> = ({ targetWord, onResult, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        
        // Convert to base64 for AI
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          analyzePronunciation(base64Audio);
        };
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (err) {
      console.error("Erreur d'accès au microphone :", err);
      alert("Impossible d'accéder au microphone. Veuillez vérifier vos permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const analyzePronunciation = async (base64Audio: string) => {
    setIsAnalyzing(true);
    try {
      const result = await evaluatePronunciation(base64Audio, targetWord);
      onResult(result.isCorrect, result.score, result.feedback);
    } catch (error) {
      console.error("Erreur analyse :", error);
      onResult(false, 0, "Erreur lors de l'analyse.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-blue-50/50 rounded-[2.5rem] border-2 border-blue-100">
      <div className="text-center">
        <p className="text-slate-500 font-bold mb-2">Cliquez pour enregistrer</p>
        <h3 className="text-4xl font-black text-blue-600 mb-4">{targetWord}</h3>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          {!isRecording ? (
            <motion.button
              key="start"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              disabled={disabled || isAnalyzing}
              className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-blue-200 disabled:opacity-50"
            >
              <Mic className="w-10 h-10" />
            </motion.button>
          ) : (
            <motion.button
              key="stop"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-200"
            >
              <Square className="w-10 h-10 fill-current" />
            </motion.button>
          )}
        </AnimatePresence>

        {isRecording && (
          <motion.div
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 bg-red-500 rounded-full -z-10"
          />
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        {isRecording && (
          <p className="text-red-500 font-black animate-pulse">
            Enregistrement... {recordingTime}s
          </p>
        )}
        
        {isAnalyzing && (
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <Loader2 className="w-5 h-5 animate-spin" />
            Analyse de la prononciation...
          </div>
        )}

        {audioUrl && !isRecording && !isAnalyzing && (
          <button
            onClick={playRecording}
            className="flex items-center gap-2 text-slate-600 font-bold hover:text-blue-600 transition-colors"
          >
            <Play className="w-4 h-4 fill-current" /> Réécouter votre essai
          </button>
        )}
      </div>
    </div>
  );
};

export default PronunciationExercise;
