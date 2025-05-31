
import { Calculator, DollarSign, Ruler, FlaskConical, History, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Calculator,
      title: "Basic Calculator",
      description: "Standard arithmetic operations with a clean, intuitive interface.",
      color: "bg-blue-500"
    },
    {
      icon: FlaskConical,
      title: "Scientific Calculator",
      description: "Advanced functions including trigonometry, logarithms, and more.",
      color: "bg-orange-500"
    },
    {
      icon: DollarSign,
      title: "Currency Converter",
      description: "Real-time currency conversion with up-to-date exchange rates.",
      color: "bg-green-500"
    },
    {
      icon: Ruler,
      title: "Unit Converter",
      description: "Convert between different units of length, weight, and temperature.",
      color: "bg-purple-500"
    },
    {
      icon: History,
      title: "Calculation History",
      description: "Keep track of your previous calculations and results.",
      color: "bg-red-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Works perfectly on desktop, tablet, and mobile devices.",
      color: "bg-indigo-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need in a calculator, designed for professionals, students, and everyday users.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
