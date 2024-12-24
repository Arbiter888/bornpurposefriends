import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Heart, Users } from "lucide-react";

const ChurchUpdates = () => {
  const updates = [
    {
      title: "New Youth Ministry Program",
      date: "March 15, 2024",
      description: "Thanks to your contributions, we've launched a new youth ministry program reaching 50+ teenagers weekly.",
      icon: Users,
      impact: "50+ youth engaged"
    },
    {
      title: "Alpha Course Success",
      date: "March 10, 2024",
      description: "This month's Alpha course welcomed 30 new participants, supported by your generous donations.",
      icon: Heart,
      impact: "30 new participants"
    },
    {
      title: "Community Outreach Expansion",
      date: "March 5, 2024",
      description: "Your support has helped us expand our community outreach programs to two new neighborhoods.",
      icon: Bell,
      impact: "2 new neighborhoods reached"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Recent Church Updates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {updates.map((update, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <update.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold">{update.title}</h3>
                        <span className="text-sm text-gray-500">{update.date}</span>
                      </div>
                      <p className="text-gray-600 mt-1">{update.description}</p>
                      <div className="mt-2 inline-block px-2 py-1 bg-primary/5 rounded-full text-sm text-primary">
                        Impact: {update.impact}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChurchUpdates;