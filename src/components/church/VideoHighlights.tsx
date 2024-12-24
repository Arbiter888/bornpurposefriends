import { Card } from "../ui/card";
import { Heart, Handshake, Users } from "lucide-react";

const VideoHighlights = () => {
  const highlights = [
    {
      title: "Community Support",
      description: "Supporting local families through our food bank and community initiatives",
      icon: Users,
    },
    {
      title: "Global Missions",
      description: "Partnering with organizations worldwide to make a difference",
      icon: Heart,
    },
    {
      title: "Local Partnerships",
      description: "Working with local charities to serve our community",
      icon: Handshake,
    },
  ];

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-center">Featured Initiatives</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center mb-4">
              <highlight.icon className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">{highlight.title}</h3>
            </div>
            <p className="text-gray-600">{highlight.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VideoHighlights;