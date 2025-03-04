
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Heart, Globe, Calendar, Handshake, Award, Church } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const CommunityConnections = () => {
  const [expandedInitiative, setExpandedInitiative] = useState<number | null>(null);

  const initiatives = [
    {
      title: "Alpha",
      description: "Explore life, faith, and meaning in a welcoming environment",
      icon: BookOpen,
      color: "bg-htb-red/10 text-htb-red",
      url: "https://alpha.org",
      impact: "Over 30 million people have tried Alpha in 169 countries",
      callToAction: "Join the next Alpha course",
      details: "Alpha is a series of sessions exploring the Christian faith. Each session includes food, a short talk and discussion where you can share your thoughts and ask questions."
    },
    {
      title: "Marriage Course",
      description: "Strengthen your relationship through meaningful conversations",
      icon: Heart,
      color: "bg-htb-blue/10 text-htb-blue",
      url: "https://themarriagecourse.org",
      impact: "Helped over 2 million couples in 125 countries",
      callToAction: "Sign up for the next course",
      details: "The Marriage Course is a series of seven sessions designed to help any couple strengthen their relationship. It's for couples who are seeking to strengthen their relationship, not just for those with current issues."
    },
    {
      title: "Life Groups",
      description: "Connect with others in small groups for fellowship and growth",
      icon: Users,
      color: "bg-primary/10 text-primary",
      url: "https://www.htb.org/lifegroups",
      impact: "Over 300 Life Groups meeting weekly across London",
      callToAction: "Find a Life Group",
      details: "Life Groups meet weekly to build community, grow spiritually, and support one another. They're a place to belong, be known, and become more like Jesus together."
    },
    {
      title: "Global Mission",
      description: "Supporting partners worldwide to make a difference",
      icon: Globe,
      color: "bg-htb-charcoal/10 text-htb-charcoal",
      url: "https://www.htb.org/mission",
      impact: "Supporting mission work in 15+ countries globally",
      callToAction: "Explore mission opportunities",
      details: "HTB partners with local churches and organizations around the world to support community development, education, healthcare, and church planting initiatives."
    },
    {
      title: "Church Planting",
      description: "Starting new churches to reach more communities",
      icon: Church,
      color: "bg-htb-dark/10 text-htb-dark",
      url: "https://www.htb.org/church-planting",
      impact: "Over 80 churches planted in the UK and internationally",
      callToAction: "Learn about church planting",
      details: "HTB is committed to planting vibrant, growing churches that can reach new communities with the message of Jesus Christ."
    },
    {
      title: "Social Action",
      description: "Serving the vulnerable in our communities",
      icon: Handshake,
      color: "bg-emerald-600/10 text-emerald-600",
      url: "https://www.htb.org/social-action",
      impact: "Supporting thousands of people annually through various programs",
      callToAction: "Volunteer for social action",
      details: "Our social action initiatives include food banks, homeless outreach, prison ministry, refugee support, and various community development projects."
    }
  ];
  
  return (
    <motion.div 
      className="py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-3">Community Connections</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Connect with HTB's community-building initiatives and discover opportunities to grow, serve, and make a difference together.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initiatives.map((initiative, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="flex"
          >
            <Card 
              className={`bg-white/90 backdrop-blur-sm h-full w-full overflow-hidden transform transition-all duration-300 ${expandedInitiative === index ? 'scale-[1.02] shadow-lg' : 'hover:shadow-md'}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${initiative.color}`}>
                    <initiative.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>{initiative.title}</CardTitle>
                    <CardDescription>{initiative.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-500 mb-1">Impact</div>
                  <p className="text-gray-800">{initiative.impact}</p>
                </div>
                
                {expandedInitiative === index && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <p className="text-gray-600 mb-3">{initiative.details}</p>
                  </motion.div>
                )}
                
                <div className="flex flex-col sm:flex-row gap-2 mt-2">
                  <Button 
                    variant="outline" 
                    className="text-sm px-3 flex-1"
                    onClick={() => setExpandedInitiative(expandedInitiative === index ? null : index)}
                  >
                    {expandedInitiative === index ? "Show Less" : "Learn More"}
                  </Button>
                  <Button 
                    className="text-sm px-3 flex-1"
                    onClick={() => window.open(initiative.url, '_blank')}
                  >
                    {initiative.callToAction}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityConnections;
