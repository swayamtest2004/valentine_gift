import React from "react";
import { motion } from "framer-motion";
import pic1 from "/images/IMG_3502.JPG.jpeg";
import pic2 from "/images/IMG_3496.JPG.jpeg";
import pic3 from "/images/IMG_3501.JPG.jpeg";
import pic4 from "/images/IMG_3497.JPG.jpeg";
import pic5 from "/images/IMG_3505.JPG.jpeg";
import pic6 from "/images/IMG_7795.png";
import { Link } from "react-router-dom";

const polaroids = [
    { img: pic1, text: "You & Me ❤️" },
    { img: pic2, text: "Forever Us 💌" },
    { img: pic3, text: "What'u Looki'n at 🤨" },
    { img: pic4, text: "My BabyGirl 😘" },
    { img: pic5, text: "Best Day Ever 🌸" },
    { img: pic6, text: "Forever Us 💌" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const polaroidVariants = {
  hidden: { opacity: 0, y: 30, rotate: 0 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: i % 2 === 0 ? -2 : 2,
    transition: { type: "spring", stiffness: 80, damping: 12 },
  }),
};

const Memories = () => {
  return (
    <>
   <motion.section
      className="relative z-10 p-16"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center love-font">
          Us Together Forever
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8 w-full"
          variants={containerVariants}
        >
          {polaroids.map((p, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={polaroidVariants}
              whileHover={{
                y: -10,
                rotate: i % 2 === 0 ? -5 : 5,
                scale: 1.05,
                transition: { type: "spring", stiffness: 120 },
              }}
              className="relative justify-center bg-white shadow-lg rounded-xl w-full md:w-60 md:h-72 flex flex-col items-center p-4 cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.text}
                className="w-full h-48 object-cover rounded-md"
              />
              <p className="mt-4 text-center text-lg font-handwriting text-pink-700">
                {p.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Link
              to={"/spotify"}
              className="relative z-20 mt-20 px-8 py-3 bg-white text-pink-600 rounded-full shadow-lg"
            >
              Click here
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
    </>
  )
}

export default Memories