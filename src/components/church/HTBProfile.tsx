
import HTBHeader from "./HTBHeader";
import ChurchInfo from "./ChurchInfo";
import GivingDashboard from "../giving/GivingDashboard";
import CommunityConnections from "./CommunityConnections";
import FeatureInitiatives from "./FeatureInitiatives";
import { motion } from "framer-motion";

const HTBProfile = () => {
  return (
    <motion.div 
      className="py-8 bg-gradient-to-b from-background to-gray-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <HTBHeader />

        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Latest Service</h3>
          <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-xl">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/vMvAyWVp0j0"
              title="HTB Sunday Service"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>

        <FeatureInitiatives />
        <CommunityConnections />
        <ChurchInfo />

        <motion.div 
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <GivingDashboard />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HTBProfile;
