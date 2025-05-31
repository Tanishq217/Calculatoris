
import { Calculator, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">Calculatoris</span>
            </div>
            <p className="text-gray-400 mb-4">
              The ultimate calculator for all your mathematical needs. Fast, reliable, and always accurate.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#calculator" className="text-gray-400 hover:text-white transition-colors">Calculator</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a></li>
            </ul>
          </div>

          {/* Calculator Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculator Types</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-400">Basic Calculator</span></li>
              <li><span className="text-gray-400">Scientific Calculator</span></li>
              <li><span className="text-gray-400">Currency Converter</span></li>
              <li><span className="text-gray-400">Unit Converter</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">hello@calculatoris.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Calculatoris. All rights reserved. | Made with ❤️ for calculation enthusiasts.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
