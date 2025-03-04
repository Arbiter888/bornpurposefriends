
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Heart, Users, Handshake, Calendar, Globe, Award } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import SubscriptionButton from "../SubscriptionButton";

type Volunteer = {
  role: string;
  frequency: string;
  requirements: string;
};

type Story = {
  title: string;
  content: string;
  person: string;
};

type Initiative = {
  title: string;
  description: string;
  icon: any;
  details: string;
  charityName: string;
  impactMetrics: {
    primary: string;
    secondary: string[];
  };
  successStories: Story[];
  volunteerOpportunities: Volunteer[];
  upcomingEvents?: {
    title: string;
    date: string;
    location: string;
  }[];
};

const FeatureInitiatives = () => {
  const [activeTab, setActiveTab] = useState<string>("impact");
  const [expandedInitiative, setExpandedInitiative] = useState<number | null>(null);

  const initiatives: Initiative[] = [
    {
      title: "Community Support",
      description: "Supporting local families through our food bank and community initiatives",
      icon: Users,
      details: "Our food bank serves over 200 families weekly, providing essential groceries and household items. We also offer emergency assistance and support services.",
      charityName: "HTB Food Bank Initiative",
      impactMetrics: {
        primary: "Helping 200+ families weekly with essential supplies",
        secondary: [
          "Distributed over 50,000 meals in the past year",
          "Provided 1,200+ emergency assistance packages",
          "Supported 85 families with housing resources",
          "Connected 120 individuals with employment services"
        ]
      },
      successStories: [
        {
          title: "Finding Hope Again",
          content: "After losing my job during the pandemic, the HTB Food Bank became a lifeline for my family. Not only did they provide groceries, but they also connected me with employment resources that helped me find a new job.",
          person: "Sarah T."
        },
        {
          title: "More Than Just Food",
          content: "The volunteers at the HTB Food Bank treat everyone with such dignity and respect. They've created a community where people support each other through difficult times.",
          person: "James M."
        }
      ],
      volunteerOpportunities: [
        {
          role: "Food Bank Assistant",
          frequency: "Weekly, 3-hour shifts",
          requirements: "Ability to lift 10kg, friendly demeanor"
        },
        {
          role: "Delivery Driver",
          frequency: "Weekly or bi-weekly",
          requirements: "Valid driver's license, own vehicle"
        }
      ],
      upcomingEvents: [
        {
          title: "Winter Donation Drive",
          date: "December 15-20, 2024",
          location: "All HTB locations"
        }
      ]
    },
    {
      title: "Global Missions",
      description: "Partnering with organizations worldwide to make a difference",
      icon: Globe,
      details: "Supporting mission work in 15 countries, focusing on education, healthcare, and community development projects.",
      charityName: "HTB Global Outreach",
      impactMetrics: {
        primary: "Working in 15 countries across 4 continents",
        secondary: [
          "Built 8 schools serving 3,200 children annually",
          "Established 5 medical clinics providing care to 12,000+ people",
          "Trained 350 local leaders in community development",
          "Provided clean water access to 25,000 people"
        ]
      },
      successStories: [
        {
          title: "Education Changes Everything",
          content: "The school HTB helped build in our village has transformed our community. Children who previously had no access to education are now thriving, and parents have hope for their futures.",
          person: "Emmanuel K., Community Leader"
        },
        {
          title: "Health and Hope",
          content: "The medical clinic has saved countless lives in our region. Before, the nearest medical care was a day's journey away. Now, mothers can give birth safely and children receive vaccinations and treatment for common illnesses.",
          person: "Dr. Maria L., Clinic Director"
        }
      ],
      volunteerOpportunities: [
        {
          role: "Mission Trip Participant",
          frequency: "2-week trips, scheduled throughout the year",
          requirements: "Application process, fundraising commitment"
        },
        {
          role: "Remote Skills Volunteer",
          frequency: "Flexible, project-based",
          requirements: "Professional skills in healthcare, education, or development"
        }
      ]
    },
    {
      title: "Local Partnerships",
      description: "Working with local charities to serve our community",
      icon: Handshake,
      details: "Collaborating with local organizations to provide shelter, counseling, and support services to those in need.",
      charityName: "HTB Community Alliance",
      impactMetrics: {
        primary: "Partnering with 20+ local organizations",
        secondary: [
          "Provided 8,500 nights of shelter for homeless individuals",
          "Offered 2,400 hours of counseling services",
          "Mentored 150 at-risk youth through partner programs",
          "Supported 75 formerly incarcerated individuals with reintegration"
        ]
      },
      successStories: [
        {
          title: "A Fresh Start",
          content: "After being released from prison, I didn't know where to turn. Through HTB's partnership with local reintegration services, I received mentoring, housing assistance, and job training. Today I'm employed and rebuilding my life.",
          person: "Michael R."
        },
        {
          title: "Finding Community",
          content: "As a single mother struggling with mental health issues, the counseling services provided through HTB's partner organizations have been life-changing. I've found healing and a supportive community.",
          person: "Lisa P."
        }
      ],
      volunteerOpportunities: [
        {
          role: "Partner Organization Liaison",
          frequency: "5-10 hours monthly",
          requirements: "Strong communication skills, passion for community service"
        },
        {
          role: "Mentor",
          frequency: "Weekly, minimum 6-month commitment",
          requirements: "Background check, training program completion"
        }
      ],
      upcomingEvents: [
        {
          title: "Community Partners Forum",
          date: "January 18, 2025",
          location: "HTB Brompton Road"
        }
      ]
    },
  ];

  return (
    <motion.div 
      className="my-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-center">Featured Initiatives</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {initiatives.map((initiative, index) => (
          <DropdownMenu key={index}>
            <DropdownMenuTrigger asChild>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              >
                <Card className="bg-white/90 backdrop-blur-sm p-6 hover:shadow-lg transition-all duration-300 cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <initiative.icon className="h-6 w-6 text-primary mr-3" />
                      <h3 className="text-xl font-semibold">{initiative.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-3">{initiative.description}</p>
                    <div className="mt-3 bg-primary/5 p-2 rounded-lg">
                      <p className="text-sm font-medium text-primary">{initiative.impactMetrics.primary}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-0 bg-white/95 backdrop-blur-sm">
              <Card className="border-0 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">{initiative.charityName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex border-b mb-4">
                    <Button
                      variant="ghost"
                      className={`flex-1 rounded-none ${activeTab === 'impact' ? 'border-b-2 border-primary' : ''}`}
                      onClick={() => setActiveTab('impact')}
                    >
                      Impact
                    </Button>
                    <Button
                      variant="ghost"
                      className={`flex-1 rounded-none ${activeTab === 'stories' ? 'border-b-2 border-primary' : ''}`}
                      onClick={() => setActiveTab('stories')}
                    >
                      Stories
                    </Button>
                    <Button
                      variant="ghost"
                      className={`flex-1 rounded-none ${activeTab === 'volunteer' ? 'border-b-2 border-primary' : ''}`}
                      onClick={() => setActiveTab('volunteer')}
                    >
                      Volunteer
                    </Button>
                  </div>
                  
                  {activeTab === 'impact' && (
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">{initiative.details}</p>
                      <div className="space-y-2">
                        {initiative.impactMetrics.secondary.map((metric, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span className="text-sm">{metric}</span>
                          </div>
                        ))}
                      </div>
                      {initiative.upcomingEvents && (
                        <div className="mt-4 pt-3 border-t">
                          <h4 className="font-medium mb-2 text-sm">Upcoming Events</h4>
                          {initiative.upcomingEvents.map((event, idx) => (
                            <div key={idx} className="mb-2">
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-gray-600">{event.date} • {event.location}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  {activeTab === 'stories' && (
                    <div className="space-y-4">
                      {initiative.successStories.map((story, idx) => (
                        <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                          <p className="font-medium mb-1">{story.title}</p>
                          <p className="text-sm text-gray-600 mb-2">"{story.content}"</p>
                          <p className="text-xs text-gray-500 italic">— {story.person}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {activeTab === 'volunteer' && (
                    <div className="space-y-4">
                      <p className="text-sm mb-3">Join us in making a difference by volunteering with {initiative.charityName}.</p>
                      {initiative.volunteerOpportunities.map((opportunity, idx) => (
                        <div key={idx} className="border-b pb-3 mb-3 last:border-b-0">
                          <p className="font-medium">{opportunity.role}</p>
                          <p className="text-sm text-gray-600">Commitment: {opportunity.frequency}</p>
                          <p className="text-sm text-gray-600">Requirements: {opportunity.requirements}</p>
                        </div>
                      ))}
                      <SubscriptionButton />
                    </div>
                  )}
                </CardContent>
              </Card>
            </DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureInitiatives;
