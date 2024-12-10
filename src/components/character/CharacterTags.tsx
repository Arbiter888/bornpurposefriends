import { Character } from "@/lib/characters";

interface CharacterTagsProps {
  character: Character;
}

const CharacterTags = ({ character }: CharacterTagsProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm text-gray-400 mb-2">Languages:</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {character.languages.map((language, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-[#8B0000]/10 text-[#FF0000]"
          >
            {language}
          </span>
        ))}
      </div>
      
      <h4 className="text-sm text-gray-400 mb-2">Common Topics:</h4>
      <div className="flex flex-wrap gap-2">
        {character.conversationTopics.map((topic, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-secondary/50 text-gray-300"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CharacterTags;