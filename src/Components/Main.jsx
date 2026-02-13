import React from 'react';
import { Canvas } from '@react-three/fiber';
import Hearts from './common/Heart';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Main = () => {
      const navigate = useNavigate();
  return (
    <section className="pink-bg min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Canvas in background */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0, // behind the text
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <Hearts count={40} />
      </Canvas>

      {/* Content on top of the canvas */}
       <motion.div
        className="relative z-10 text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.h1
          className="text-7xl font-semibold mb-8 love-font leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Heyy! BabyGirl <br /> I Have Something For You
        </motion.h1>

        <motion.button
          onClick={() => navigate("/login")}
          className="mt-6 px-8 py-3 bg-white text-pink-600 rounded-full shadow-lg hover:scale-105 transition"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Click Here 💌
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Main;
