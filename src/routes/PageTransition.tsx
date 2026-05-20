import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Loader from "../components/common/Loader";

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 🔥 loading duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{
        duration: 0.5,
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
