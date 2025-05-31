
import { Button } from "@/components/ui/button";
import { Calculator, Zap, Globe, Shield } from "lucide-react";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            The Ultimate
            <span className="text-blue-600"> Calculator</span>
            <br />
            for Everyone
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            From basic arithmetic to advanced scientific calculations, currency conversion, and unit conversion - 
            all in one powerful, beautiful calculator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              onClick={() => scrollToSection('calculator')}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Start Calculating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-gray-600">Instant calculations with smooth animations and responsive design.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Purpose</h3>
            <p className="text-gray-600">Basic, scientific, currency, and unit conversions all in one place.</p>
          </div>
          <div className="text-center p-6">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliable</h3>
            <p className="text-gray-600">Precise calculations you can trust for work, study, and daily use.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
