import { Link } from "react-router";
import { motion } from "framer-motion";

const Error404 = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-md w-full text-center bg-slate-800/60 backdrop-blur rounded-2xl shadow-xl p-8"
            >
                <motion.h1
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-7xl font-extrabold tracking-tight"
                >
                    404
                </motion.h1>

                <p className="mt-4 text-lg text-slate-300">
                    Oops! The page you’re looking for doesn’t exist.
                </p>

                <p className="mt-2 text-sm text-slate-400">
                    It might have been moved, deleted, or the URL could be incorrect.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    {/* <Link
                        to="/"
                        className="px-6 py-3 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-200 transition"
                    >
                        Go Home
                    </Link> */}

                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 rounded-xl border border-slate-500 text-slate-200 hover:bg-slate-700 transition"
                    >
                        Go Back
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default Error404;
