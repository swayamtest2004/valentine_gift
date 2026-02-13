import React, { useEffect, useState } from "react";
import letterPage from '../assets/letter.png'
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Letter = () => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const text = `
You know that i can't express my feelings completely...
But that doesn't mean that I love you less.

your presence only makes me feel more alive, more relief then anyone, more complete, and more loved than I ever thought possible. 
and I’m grateful for you more than you know.

So Here's a small gift for you !!

❤️
— Yours Gadhedoo
`;

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, 20); // typing speed

            return () => clearTimeout(timeout);
        }
    }, [index]);


    return (
        <>

            <motion.section
                className="mockup-wrap flex justify-center items-center min-h-screen bg-pink-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="letter-mockup no-scrollbar relative"
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 70, damping: 12 }}
                >
                    <motion.img
                        src={letterPage}
                        alt="Love Letter"
                        className="shadow-[0_35px_35px_rgba(0,0,0,0.25)] rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                    />
                    <pre className="mockup-text no-scrollbar mt-5 text-lg md:text-xl text-pink-700">
                        {displayedText}
                    </pre>
                </motion.div>
            </motion.section>

        </>
    )
}

export default Letter