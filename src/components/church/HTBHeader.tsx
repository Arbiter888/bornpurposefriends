
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const HTBHeader = () => {
  return (
    <motion.div 
      className="flex flex-col items-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.img 
        src="/lovable-uploads/44ae675b-5dfb-4366-bb35-cb7fb69d75f0.png" 
        alt="HTB Logo" 
        className="w-32 h-32 mb-8"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      />
      <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Holy Trinity Brompton (HTB)
      </h2>
      <p className="text-gray-600 max-w-2xl text-center mb-8 text-lg">
        We have 10 services and 6 sites. Find the one for you, we can't wait to see you.
        During the Christmas season, some services have been altered. Please see below for changes.
      </p>
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Button 
          onClick={() => window.open("https://htb.org/alpha", "_blank")}
          className="bg-[#E11D48] hover:bg-[#BE123C] transform transition-all duration-300 hover:scale-105"
          size="lg"
        >
          Join Alpha
        </Button>
        <Button 
          variant="outline"
          onClick={() => window.open("https://htb.org", "_blank")}
          className="transform transition-all duration-300 hover:scale-105"
          size="lg"
        >
          Visit HTB Website
        </Button>
      </div>
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 mb-6">
        <p className="text-center">
          <strong>Christmas Notice:</strong> Special services on December 24th and 25th at all locations. 
          Check the schedule below for details.
        </p>
      </div>
    </motion.div>
  );
};

export default HTBHeader;
