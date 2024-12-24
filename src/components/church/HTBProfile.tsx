import { MapPin, Youtube, Link as LinkIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const locations = [
  {
    name: "HTB Brompton Road",
    mapLink: "https://maps.app.goo.gl/hUjmeNJQFim6b7zB9",
    services: [
      "9:30 am - Normal Sunday Services",
      "11:30 am (+ live stream) - Normal Sunday Services",
      "5 pm: Dec. 8th - Carols By Candlelight",
      "(No Service Dec. 15th)",
      "Dec. 22nd & 29th - Normal Sunday Services"
    ]
  },
  {
    name: "HTB Onslow Square",
    mapLink: "https://maps.app.goo.gl/NJCF9xdFyP174Nih8",
    services: [
      "10:30 am - Normal Sunday Services (No services on Dec. 29th)",
      "4:30 pm - (No services on Dec. 8th, 15th, 22nd, 29th)",
      "6:30 pm - (No services on Dec. 8th, 15th, 29th), Dec. 22nd - Acoustic Service"
    ]
  },
  {
    name: "HTB Courtfield Gardens",
    mapLink: "https://maps.app.goo.gl/28eBeDmDyfNbaNyW7",
    services: [
      "10:30 am - Normal Sunday Services (No service on Dec. 29th)"
    ]
  },
  {
    name: "HTB Earl's Court",
    mapLink: "https://maps.app.goo.gl/fNF5Z8dkv5rD72Xv5",
    services: [
      "11 am - Normal Sunday Services"
    ]
  },
  {
    name: "HTB Queen's Gate",
    mapLink: "https://maps.app.goo.gl/pKHG74TqBYAWHUJU8",
    services: [
      "10:30 am - Normal Sunday Services"
    ]
  },
  {
    name: "HTB Dalgarno Way",
    mapLink: "https://maps.app.goo.gl/pKHG74TqBYAWHUJU8",
    services: [
      "11 am - Normal Sunday Services (No service on Dec. 22nd, or 29th)"
    ]
  }
];

const HTBProfile = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 animate-fade-up">
          <img 
            src="/lovable-uploads/44ae675b-5dfb-4366-bb35-cb7fb69d75f0.png" 
            alt="HTB Logo" 
            className="w-32 h-32 mb-8 transform transition-all duration-500 hover:scale-110"
          />
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Holy Trinity Brompton (HTB)
          </h2>
          <p className="text-gray-600 max-w-2xl text-center mb-8 text-lg">
            We have 10 services and 6 sites. Find the one for you, we can't wait to see you.
            During the Christmas season, some services have been altered. Please see below for changes.
          </p>
          <div className="flex gap-4 mb-8">
            <Button 
              onClick={() => window.open("https://htb.org/alpha", "_blank")}
              className="bg-primary hover:bg-primary/90 transform transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Join Alpha
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open("https://htb.org", "_blank")}
              className="transform transition-all duration-300 hover:scale-105"
              size="lg"
            >
              Visit HTB Website
            </Button>
          </div>
        </div>

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.name} className="p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-primary hover:text-primary/90"
                    onClick={() => window.open(location.mapLink, "_blank")}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    View on Google Maps
                  </Button>
                </div>
              </div>
              <ul className="space-y-2 text-gray-600">
                {location.services.map((service, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HTBProfile;
