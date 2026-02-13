import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Spotify = () => {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    const toggleSong = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) {
            audio.play();
            setPlaying(true);
        } else {
            audio.pause();
            setPlaying(false);
        }
    };

    // When song ends, reset button to play
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnd = () => {
            setPlaying(false);
        };

        audio.addEventListener("ended", handleEnd);

        return () => {
            audio.removeEventListener("ended", handleEnd);
        };
    }, []);


    return (
        <>
            <motion.section
                className="relative z-10 py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    {/* Heading */}
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-center love-font mb-12"
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        How can we forget our favourite song! 🎵💖
                    </motion.h2>

                    {/* Music Card */}
                    <div className="flex justify-center">
                        <motion.div
                            className="md:w-4/12 w-full rounded-xl bg-pink-50 shadow-xl"
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ type: "spring", stiffness: 100 }}
                        >
                            <div className="music-img relative">
                                <img
                                    src="/images/samjho-na.png"
                                    alt=""
                                    className="w-full grayscale rounded-t-xl"
                                />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-3xl text-white dancing-font">
                                        Samjho Na
                                    </h3>
                                    <h3 className="text-sm font-base text-white mt-2">
                                        ~ ft Kiyu
                                    </h3>
                                </div>
                            </div>

                            <div className="py-5 flex flex-col items-center">
                                <motion.div
                                    className="flex items-center justify-evenly w-full"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
                                >
                                    <i className="fa-solid text-3xl fa-backward-step"></i>

                                    <button
                                        onClick={toggleSong}
                                        className="rounded-full bg-gradient-to-b from-pink-600 to-violet-500 w-14 h-14 flex justify-center items-center shadow-lg hover:scale-105 transition-all duration-300"
                                    >
                                        {playing ? (
                                            <i className="fa-solid fa-pause text-2xl text-white"></i>
                                        ) : (
                                            <i className="fa-solid fa-play text-2xl text-white ml-1"></i>
                                        )}
                                    </button>

                                    <i className="fa-solid text-3xl fa-forward-step"></i>
                                </motion.div>

                                <audio
                                    ref={audioRef}
                                    src="/music/Samjho_Na_48KBPS.mp4"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Lyrics */}
                    <motion.div
                        className="mt-10 text-center text-pink-700 space-y-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <span className="text-2xl">
                            जानां, समझो ना, हम डरते हैं
                        </span>
                        <br />
                        <span className="text-lg">
                            देखन दूर से तुझको, जी भरते हैं
                        </span>
                        <br />
                        <span className="text-lg">
                            जानां, समझो ना, हम डरते हैं
                        </span>
                        <br />
                        <span className="text-sm">
                            प्यार करते हैं तुमसे, जीते-मरते हैं इश्क में तेरे
                        </span>
                    </motion.div>

                     <motion.div
                        className="mt-10 text-center "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                    >
                          <div className="mt-10">
                            <Link to={"/ask-her"} className="px-8 py-3 w-32 bg-white text-pink-600 text-xl rounded-full shadow-lg hover:scale-105 transition">Click Me !</Link>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    )
}

export default Spotify