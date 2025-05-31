
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      
      {/* Calculator Section */}
      <section id="calculator" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Calculating
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose from our powerful calculator tools below. Each one is designed for specific needs and calculations.
            </p>
          </div>
          <div className="flex justify-center">
            <Calculator />
          </div>
        </div>
      </section>

      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
