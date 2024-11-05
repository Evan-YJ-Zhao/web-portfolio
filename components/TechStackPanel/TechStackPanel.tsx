import { motion } from "framer-motion";

const TechStackPanel = () => {
  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50, transition: {duration: 0.2} }}
      >
        TechStack Panel
      </motion.div>
    </div>
  );
};

export default TechStackPanel;
