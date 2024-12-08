interface ElevenLabsWidgetProps {
  widgetId: string;
}

export const ElevenLabsWidget = ({ widgetId }: ElevenLabsWidgetProps) => {
  return (
    <div className="w-full h-[600px] elevenlabs-convai-widget">
      <iframe
        src={`https://elevenlabs.io/widget/${widgetId}`}
        allow="microphone"
        style={{ border: "none" }}
        className="w-full h-full"
      />
    </div>
  );
};