import { useParams } from 'react-router-dom';
import { characters } from '@/lib/characters';
import ChatInterface from '@/components/ChatInterface';

const ChatPage = () => {
  const { characterId } = useParams();
  const character = characters.find(c => c.id === characterId);

  if (!character) {
    return <div className="p-8 text-center">Character not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="max-w-4xl mx-auto h-[800px]">
          <ChatInterface character={character} onClose={() => window.close()} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;