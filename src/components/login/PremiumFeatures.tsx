
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Phone } from "lucide-react";

const PremiumFeatures = () => {
  return (
    <Card className="bg-white shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Join Our Mission</CardTitle>
        <CardDescription className="mt-4 text-base text-gray-700 leading-relaxed">
          We believe in the power of prosperity gospel—that faith, action, and God's promises lead to abundance in every area of life. Our mission is to build a strong, faith-filled community where believers support one another, grow spiritually, and unlock God's divine blessings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <p className="font-medium mb-4">Together, we are creating a movement where:</p>
            <ul className="space-y-3">
              {[
                "Faith unlocks prosperity in health, wealth, relationships, and purpose",
                "Christians uplift one another through prayer, mentorship, and shared wisdom",
                "The power of God's Word transforms lives and creates lasting breakthroughs",
                "Every believer walks boldly in divine favor, knowing they are chosen for abundance"
              ].map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <span className="text-xl">⭐</span> {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <Phone className="w-5 h-5" />
            <span>Connect with Pastor Andrew: +44 7366 284993</span>
          </div>

          <p className="text-center italic text-gray-600 border-t border-gray-100 pt-6 mt-6">
            "Step into the life God has planned for you—one of faith, favor, and fulfillment."
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumFeatures;
