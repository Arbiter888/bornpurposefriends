import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-600">
          <Link 
            to="/"
            className="hover:text-primary transition-colors"
          >
            Home
          </Link>
          <span className="hidden md:inline">•</span>
          <a 
            href="mailto:george@bornpurpose.com"
            className="hover:text-primary transition-colors"
          >
            Contact Us
          </a>
          <span className="hidden md:inline">•</span>
          <Link 
            to="/privacy-policy"
            className="hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden md:inline">•</span>
          <Link 
            to="/terms"
            className="hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;