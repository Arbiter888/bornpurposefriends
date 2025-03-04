
import HTBProfile from "./church/HTBProfile";
import { motion } from "framer-motion";

const PartnerChurchSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HTBProfile />
    </motion.div>
  );
};

export default PartnerChurchSection;
