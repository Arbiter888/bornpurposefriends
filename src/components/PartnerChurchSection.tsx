import { Church, Heart, Handshake, Users, Calendar, MapPin } from "lucide-react";

const PartnerChurchSection = () => {
  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Partner Church</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join us in supporting Grace Community Church and their impactful local initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Church className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Sunday Services</h3>
            </div>
            <p className="text-gray-600">
              Weekly worship services bringing the community together in faith and fellowship
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Community Outreach</h3>
            </div>
            <p className="text-gray-600">
              Regular food drives and support programs for families in need
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Youth Ministry</h3>
            </div>
            <p className="text-gray-600">
              Engaging programs and mentorship for the next generation of leaders
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Bible Study Groups</h3>
            </div>
            <p className="text-gray-600">
              Weekly small group meetings for deeper spiritual growth and fellowship
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <Handshake className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Counseling Services</h3>
            </div>
            <p className="text-gray-600">
              Professional spiritual and family counseling support for our community
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <MapPin className="h-6 w-6 text-primary mr-3" />
              <h3 className="text-xl font-semibold">Local Missions</h3>
            </div>
            <p className="text-gray-600">
              Supporting and organizing local mission work to serve our immediate community
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerChurchSection;