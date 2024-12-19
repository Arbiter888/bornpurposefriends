import { Character } from "@/lib/characters";

interface CharacterStatsProps {
  character: Character;
}

const CharacterStats = ({ character }: CharacterStatsProps) => {
  return (
    <div className="space-y-3 mb-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Trust Level</span>
        <span className="text-primary">{character.relationshipStats.trustLevel}%</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Years Known</span>
        <span className="text-primary">{character.relationshipStats.yearsKnown}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-400">Meetings/Month</span>
        <span className="text-primary">{character.relationshipStats.meetingsPerMonth}</span>
      </div>
    </div>
  );
};

export default CharacterStats;