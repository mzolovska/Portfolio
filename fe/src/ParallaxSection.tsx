import React from "react";
import { motion } from "framer-motion";

const ParallaxSection: React.FC = () => {
  return (
    <section className="h-screen relative overflow-hidden bg-blue-200">
      <motion.div
        className="absolute top-20 left-10 text-4xl font-bold"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Parallax Effect
      </motion.div>
      <motion.img
        src="/path-to-image.jpg"
        className="absolute bottom-0 right-0 w-1/2"
        initial={{ scale: 1.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
    </section>
  );
};

export default ParallaxSection;
