import { Church, Heart, Handshake, Users, Calendar, MapPin } from "lucide-react";
import HTBProfile from "./church/HTBProfile";

const PartnerChurchSection = () => {
  return (
    <>
      <div className="py-16 bg-gradient-to-b from-gray-50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Partner Church - HTB</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us in supporting Holy Trinity Brompton (HTB) and their impactful local and global initiatives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Church className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Sunday Services</h3>
              </div>
              <p className="text-gray-600">
                Multiple services across 6 locations bringing the community together in faith and fellowship
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Alpha Course</h3>
              </div>
              <p className="text-gray-600">
                Explore life, faith and meaning in a welcoming environment
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Users className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Youth & Children</h3>
              </div>
              <p className="text-gray-600">
                Dynamic programs for all ages, nurturing the next generation in faith
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Calendar className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Life Groups</h3>
              </div>
              <p className="text-gray-600">
                Weekly small group meetings for deeper spiritual growth and community
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <Handshake className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Pastoral Care</h3>
              </div>
              <p className="text-gray-600">
                Comprehensive support and counseling for spiritual and personal growth
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Global Impact</h3>
              </div>
              <p className="text-gray-600">
                Supporting missions and initiatives that transform lives worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
      <HTBProfile />
    </>
  );
};

export default PartnerChurchSection;