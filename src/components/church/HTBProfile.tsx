import HTBHeader from "./HTBHeader";
import VideoHighlights from "./VideoHighlights";
import ChurchInfo from "./ChurchInfo";
import GivingDashboard from "../giving/GivingDashboard";

const HTBProfile = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <HTBHeader />

        <div className="mb-16 animate-fade-up">
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
        </div>

        <VideoHighlights />
        <ChurchInfo />

        <div className="mt-16">
          <GivingDashboard />
        </div>
      </div>
    </div>
  );
};

export default HTBProfile;