import { Card } from "../ui/card";
import { Heart, Users, Handshake } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import SubscriptionButton from "../SubscriptionButton";

const VideoHighlights = () => {
  const highlights = [
    {
      title: "Community Support",
      description: "Supporting local families through our food bank and community initiatives",
      icon: Users,
      details: "Our food bank serves over 200 families weekly, providing essential groceries and household items. We also offer emergency assistance and support services.",
      charityName: "HTB Food Bank Initiative"
    },
    {
      title: "Global Missions",
      description: "Partnering with organizations worldwide to make a difference",
      icon: Heart,
      details: "Supporting mission work in 15 countries, focusing on education, healthcare, and community development projects.",
      charityName: "HTB Global Outreach"
    },
    {
      title: "Local Partnerships",
      description: "Working with local charities to serve our community",
      icon: Handshake,
      details: "Collaborating with local organizations to provide shelter, counseling, and support services to those in need.",
      charityName: "HTB Community Alliance"
    },
  ];

  return (
    <div className="my-12">
      <h3 className="text-2xl font-bold mb-6 text-center">Featured Initiatives</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {highlights.map((highlight, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <Card className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="flex items-center mb-4">
                  <highlight.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{highlight.title}</h3>
                </div>
                <p className="text-gray-600">{highlight.description}</p>
              </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-4 bg-white/95 backdrop-blur-sm">
              <div className="space-y-4">
                <h4 className="font-semibold text-lg">{highlight.charityName}</h4>
                <p className="text-sm text-gray-600">{highlight.details}</p>
                <SubscriptionButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </div>
  );
};

export default VideoHighlights;