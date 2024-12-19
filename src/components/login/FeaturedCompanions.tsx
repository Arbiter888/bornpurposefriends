import { motion } from "framer-motion";
import { characters } from "@/lib/characters";
import { useState } from "react";
import { CharacterWidget } from "../character/CharacterWidget";
import { Button } from "../ui/button";

const FeaturedCompanions = () => {
  const [showPrayerWidget, setShowPrayerWidget] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#0EA5E9] to-[#2563EB] bg-clip-text text-transparent backdrop-blur-sm">
          Welcome to BornPurpose
        </h1>
        <p className="text-lg text-gray-700">
          Join our digital sanctuary for prayer, Bible study, and spiritual growth. Connect with our dedicated ministry team for meaningful conversations and biblical guidance.
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {characters.slice(0, 4).map((character, index) => (
          <motion.div
            key={character.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-bold">{character.name}</h3>
                <p className="text-sm text-gray-300">{character.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button
          onClick={() => setShowPrayerWidget(true)}
          className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white"
        >
          Try a Prayer Request
        </Button>
      </div>

      {showPrayerWidget && (
        <CharacterWidget
          widgetId={characters[0].widgetId}
          onClose={() => setShowPrayerWidget(false)}
        />
      )}
    </div>
  );
};

export default FeaturedCompanions;