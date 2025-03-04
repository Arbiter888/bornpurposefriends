
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Church, Heart, Handshake, Users, Calendar, MapPin } from "lucide-react";
import { locations } from "./churchLocations";
import { motion } from "framer-motion";

const ChurchInfo = () => {
  const [showLocations, setShowLocations] = useState(false);

  const services = [
    {
      title: "Sunday Services",
      description: "Multiple services across 6 locations bringing the community together in faith and fellowship",
      icon: Church,
    },
    {
      title: "Alpha Course",
      description: "Explore life, faith and meaning in a welcoming environment",
      icon: Heart,
    },
    {
      title: "Youth & Children",
      description: "Dynamic programs for all ages, nurturing the next generation in faith",
      icon: Users,
    },
    {
      title: "Life Groups",
      description: "Weekly small group meetings for deeper spiritual growth and community",
      icon: Calendar,
    },
    {
      title: "Pastoral Care",
      description: "Comprehensive support and counseling for spiritual and personal growth",
      icon: Handshake,
    },
    {
      title: "Global Impact",
      description: "Supporting missions and initiatives that transform lives worldwide",
      icon: MapPin,
    },
  ];

  return (
    <motion.div 
      className="py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Our Services & Ministries</h2>
        <Button 
          onClick={() => setShowLocations(!showLocations)}
          className="mb-8"
        >
          {showLocations ? "View Ministries" : "View Service Locations"}
        </Button>
      </div>

      {!showLocations ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <Card className="bg-white/90 backdrop-blur-sm p-6 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <service.icon className="h-6 w-6 text-primary mr-3" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <Card className="bg-white/90 backdrop-blur-sm p-6 h-full">
                <CardContent className="p-0">
                  <div className="flex items-start gap-4 mb-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary hover:text-primary/90"
                        onClick={() => window.open(location.mapLink, "_blank")}
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        View on Google Maps
                      </Button>
                    </div>
                  </div>
                  <ul className="space-y-2 text-gray-600 mt-4">
                    {location.services.map((service, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {service}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ChurchInfo;
