import FeaturedCompanions from "@/components/login/FeaturedCompanions";
import LoginForm from "@/components/login/LoginForm";
import PremiumFeatures from "@/components/login/PremiumFeatures";
import Footer from "@/components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Featured Companions */}
          <FeaturedCompanions />

          {/* Right Section - Login & Premium */}
          <div className="space-y-6">
            <LoginForm />
            <PremiumFeatures />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;