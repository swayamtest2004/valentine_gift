import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Ask = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ image: "", message: "" });
  const [showYesGif, setShowYesGif] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const [sheSaidYes, setSheSaidYes] = useState(false);

  const popupOptions = [
    { image: "/gifs/cat-gun.png", message: "Think Again 😊" },
    { image: "/gifs/side-eye-cat.gif", message: "Are you sure? 😠" },
    { image: "/gifs/Cat Crying GIF.gif", message: "How Dare You 😭" },    
  ];

  const handleNoClick = () => {
    const randomIndex = Math.floor(Math.random() * popupOptions.length);
    setPopupContent(popupOptions[randomIndex]);
    setShowPopup(true);

    clearTimeout(window.popupTimer);
    window.popupTimer = setTimeout(() => setShowPopup(false), 4000);
  };

  const handleYesClick = () => {
    setShowYesGif(true);
    setShowCountdown(true);
    setSheSaidYes(true);

    setTimeout(() => setShowYesGif(false), 3000);
  };

  useEffect(() => {
    if (!showCountdown) return;

    const targetDate = new Date("February 14, 2026 20:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft({ expired: true });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / 1000 / 60) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showCountdown]);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center relative z-10"
    >
      <AnimatePresence mode="wait">
        {!sheSaidYes ? (
          <motion.div
            key="ask-headers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h3 className="text-3xl font-base">इम्तिहान की घड़ी</h3>
            <h1 className="text-3xl font-bold love-font my-6">
              I have Something to ask You Babygirl
            </h1>
            <h1 className="text-6xl font-semibold text-rose-500 mt-3 love-font">
              Will you be my Valentine? 💌
            </h1>

            <div className="mt-20 space-x-4 flex justify-center">
              <button
                className="px-8 py-3 w-32 bg-white text-pink-600 text-xl rounded-full shadow-lg hover:scale-105 transition love-font"
                onClick={handleYesClick}
              >
                Yes !!
              </button>

              <button
                className="px-6 py-3 w-32 bg-red-600 text-white text-xl rounded-full hover:bg-red-400 shadow-lg hover:scale-105 transition love-font"
                onClick={handleNoClick}
              >
                No
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="she-said-yes"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold text-rose-500 mb-10">
              She said Yes 💖
            </h1>

            {showCountdown && (
              <div>
                {timeLeft.expired ? (
                  <h2 className="text-4xl font-bold text-rose-500">
                    It’s 8PM Babygirl 😘
                  </h2>
                ) : (
                  <>
                    <h3 className="text-2xl mb-3 text-rose-400 font-semibold">
                      Time Remaining 💖
                    </h3>
                    <div className="text-3xl font-bold space-x-3 text-white flex gap-5 justify-center">
                      <div className="bg-white px-4 py-4 rounded-lg">
                        <span className="text-rose-500">{timeLeft.days}d</span>
                      </div>
                      <div className="bg-white px-4 py-4 rounded-lg">
                        <span className="text-rose-500">{timeLeft.hours}h</span>
                      </div>
                      <div className="bg-white px-4 py-4 rounded-lg">
                        <span className="text-rose-500">{timeLeft.minutes}m</span>
                      </div>
                      <div className="bg-white px-4 py-4 rounded-lg">
                        <span className="text-rose-500">{timeLeft.seconds}s</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center flex-col justify-center bg-black/50 z-50"
          >
            <img
              src={popupContent.image}
              alt="Popup"
              className="w-4/12 object-contain"
            />
            <h2 className="mt-5 text-4xl text-white font-bold">
              {popupContent.message}
            </h2>
            <div className="absolute top-10 right-10">
              <button
                onClick={() => setShowPopup(false)}
                className="bg-white p-2 rounded-lg shaodw-pink-200 shadow-lg"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YES GIF */}
      <AnimatePresence>
        {showYesGif && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <img
              src="/gifs/Cats Dancing GIF.gif"
              alt="Happy"
              className="w-10/12 md:w-4/12 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Ask;
