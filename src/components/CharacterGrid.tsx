import { characters } from "@/lib/characters";
import { useState } from "react";
import CharacterCard from "./CharacterCard";
import { motion } from "framer-motion";

const CharacterGrid = () => {
  const [activeWidgetId, setActiveWidgetId] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        >
          Meet Your Ministry Team
        </motion.h2>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {characters.map((character) => (
            <motion.div key={character.id} variants={item}>
              <CharacterCard 
                character={character}
                onWidgetOpen={() => setActiveWidgetId(character.id)}
                isWidgetActive={activeWidgetId === character.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CharacterGrid;