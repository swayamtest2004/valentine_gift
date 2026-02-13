import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = ({ login }) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [lastErrorIndex, setLastErrorIndex] = useState(-1);
    const navigate = useNavigate();
    const messages = [
        "That’s not it 😭 Try again, my love.",
        "Close… but not our magic number 💖",
        "Nope! Think about our first date 🌙"
    ];

    const correctCode = "270122"; // change this to something meaningful

    const handleNumberClick = (num) => {
        setCode(prev => prev + num);
    };
    const handleClear = () => {
        setCode("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (code === correctCode) {
            login();
            navigate("/letter");
        } else {
            // pick random index that isn't the same as lastErrorIndex
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * messages.length);
            } while (randomIndex === lastErrorIndex);

            setLastErrorIndex(randomIndex);
            setError(messages[randomIndex]);
            setCode(""); // clear input after wrong attempt
        }
    };
    return (
        <>
           
            <motion.section
                className="pink-bg flex justify-center items-center min-h-screen p-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="flex justify-center"><img src="/images/login-img copy.jpeg" alt="" className="w-full shadow-xl rounded-lg" /></div>
                        <div>
                            <div className="login-container text-center">
                                <h2 className="love-font text-2xl md:text-[2rem]">Enter Our Special Number 💖</h2>
                                <div className="mt-3"><span className="text-sm">[HINT - First Message DDMMYY]</span></div>
                                <form onSubmit={handleSubmit} className="mt-5">
                                    <input
                                        type="password"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Our number..."
                                        className="bg-pink-50 rounded-2xl p-4 w-full md:w-10/12 shadow-lg"
                                    />
                                    <div className="grid grid-cols-3 gap-3 mt-5 w-full md:w-10/12 mx-auto">

                                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                                            <button
                                                key={num}
                                                type="button"
                                                onClick={() => handleNumberClick(num)}
                                                className="bg-pink-200 p-4 rounded-xl shadow hover:bg-pink-300 transition cursor-pointer"
                                            >
                                                {num}
                                            </button>
                                        ))}

                                        <button
                                            type="button"
                                            onClick={handleClear}
                                            className="bg-red-300 p-4 rounded-xl shadow hover:bg-red-400 transition"
                                        >
                                            Clear
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleNumberClick(0)}
                                            className="bg-pink-200 p-4 rounded-xl shadow hover:bg-pink-300 transition"
                                        >
                                            0
                                        </button>

                                        <button
                                            type="submit"
                                            className="bg-green-300 p-4 rounded-xl shadow hover:bg-green-400 transition"
                                        >
                                            Enter
                                        </button>

                                    </div>
                                </form>
                                {error && <p style={{ color: "red" }}>{error}</p>}
                            </div>
                        </div>
                    </div>

                </div>
            </motion.section>            

        </>
    )
}

export default Login