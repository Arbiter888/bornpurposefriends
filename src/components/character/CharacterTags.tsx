import { Character } from "@/lib/characters";

interface CharacterTagsProps {
  character: Character;
}

const CharacterTags = ({ character }: CharacterTagsProps) => {
  return (
    <div className="mb-4">
      <h4 className="text-sm text-gray-400 mb-2">Skills:</h4>
      <div className="flex flex-wrap gap-2 mb-3">
        {character.skills.map((skill, index) => (
          <span 
            key={index}
            className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500"
          >
            {skill}
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