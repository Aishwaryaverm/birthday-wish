import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Heart, Gift } from "lucide-react";

export default function BirthdayForJhunjhunDii() {
  const [started, setStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [heartCount, setHeartCount] = useState(12);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const audioRef = useRef(null);

  const birthdayDate = new Date("2025-12-28T00:00:00");
  const [timeLeft, setTimeLeft] = useState({});

  /* ⏳ Countdown */
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = birthdayDate - now;
      setTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  /* 💗 Hearts count */
  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeartCount(window.innerWidth < 640 ? 8 : 16);
    }
  }, []);

  /* 🪄 Cursor fairy light */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* 🎵 Music fade-in */
  const fadeAudio = (from, to, duration = 1200) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = from;
    audio.play();

    const steps = 25;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      audio.volume = Math.min(1, from + ((to - from) / steps) * step);
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  };

  const handleSurprise = () => {
    fadeAudio(0, 0.8); // 🎵 MUSIC STARTS HERE
    setShowConfetti(true);
    setShowPopup(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  return (
    <div
      className="font-elegant relative min-h-screen overflow-hidden bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-100"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {showConfetti && <Confetti />}

      {/* 🪄 Cursor Fairy Light */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none bg-pink-300/50 blur-xl z-50 hidden sm:block"
        animate={{ x: cursor.x - 12, y: cursor.y - 12 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* 🌟 Stars */}
      {[...Array(30)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
        />
      ))}

      {/* 💗 Floating Hearts */}
      {[...Array(heartCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-400"
          initial={{ y: "100vh", opacity: 0.4 }}
          animate={{ y: "-10vh", opacity: 1 }}
          transition={{ duration: 12 + Math.random() * 8, repeat: Infinity }}
          style={{ left: `${Math.random() * 100}%` }}
        >
          <Heart size={18} />
        </motion.div>
      ))}

      <audio ref={audioRef} loop src="/birthday-music.mp3" />

      {/* 🕯️ Intro */}
      <AnimatePresence>
        {!started && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <motion.div className="bg-white rounded-3xl p-6 sm:p-10 text-center shadow-xl max-w-md mx-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-pink-500 mb-4">
                For You, Jhunjhun Dii 🕯️
              </h1>
              <p className="text-gray-600 mb-6">
                A small piece of my heart, wrapped in love.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setStarted(true)}
                className="px-6 py-3 bg-pink-500 text-white rounded-full shadow"
              >
                Open With Love 💖
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🌸 MAIN CONTENT */}
      {started && (
        <div className="relative z-10 flex flex-col items-center text-center px-4 py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-600">
            Happy Birthday, Jhunjhun Dii 🎂
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-gray-700 leading-relaxed">
            You are not just my sister, you are my comfort, my strength,
            and my safest place.
          </p>

          {/* 🎁 SURPRISE BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleSurprise}
            className="mt-10 flex items-center gap-2 px-8 py-4 bg-purple-500 text-white rounded-full shadow-lg"
          >
            <Gift /> A Small Surprise 🎁
          </motion.button>

          {/* 🧚 FAIRY IMAGE CARDS */}
          <div className="mt-24 sm:flex-row flex flex-col gap-8 overflow-x-auto px-6 snap-x">
            {[
              { src: "/img-1.png", text: "A smile that feels like home 💖" },
              { src: "/img-2.png", text: "Forever my safe place 🌸" },
              { src: "/img-3.jpg", text: "A fairy tale in real life ✨" },
            ].map((img, i) => (
              <motion.div
                key={i}
                className="relative min-w-[260px] sm:min-w-[300px] h-[420px] rounded-3xl overflow-hidden snap-center"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6 + i, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-0 bg-pink-300/30"
                  animate={{ filter: ["blur(20px)", "blur(30px)", "blur(20px)"] }}
                  transition={{ duration: 5, repeat: Infinity }}
                />
                <img
                  src={img.src}
                  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                />
                <div className="absolute bottom-6 left-4 right-4 text-white text-center z-10">
                  {img.text}
                </div>
              </motion.div>
            ))}
          </div>

          {/* ✍️ Signature */}
          <p className="mt-20 text-gray-700 text-sm">
            — Made with endless love 🤍
          </p>
        </div>
      )}
    </div>
  );
}
