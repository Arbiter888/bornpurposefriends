interface CharacterWidgetProps {
  widgetId: string;
  onClose: () => void;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        'agent-id': string;
      }, HTMLElement>;
    }
  }
}

export const CharacterWidget = ({ widgetId, onClose }: CharacterWidgetProps) => {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] animate-fade-in">
      <div 
        className="relative bg-black rounded-lg p-4 shadow-2xl"
        style={{ width: '300px' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          ×
        </button>
        <div>
          <elevenlabs-convai agent-id={widgetId}></elevenlabs-convai>
          <script src="https://elevenlabs.io/convai-widget/index.js" async type="text/javascript"></script>
        </div>
      </div>
    </div>
  );
};