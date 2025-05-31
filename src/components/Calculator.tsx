
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import BasicCalculator from "./BasicCalculator";
import CurrencyConverter from "./CurrencyConverter";
import UnitConverter from "./UnitConverter";
import ScientificCalculator from "./ScientificCalculator";
import { Calculator as CalculatorIcon, DollarSign, Ruler, FlaskConical } from "lucide-react";

const Calculator = () => {
  return (
    <Card className="w-full max-w-md mx-auto bg-black/80 backdrop-blur-xl border-gray-800 shadow-2xl">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border-b border-gray-800">
          <TabsTrigger 
            value="basic" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
          >
            <CalculatorIcon className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger 
            value="currency" 
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
          >
            <DollarSign className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger 
            value="units" 
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
          >
            <Ruler className="w-4 h-4" />
          </TabsTrigger>
          <TabsTrigger 
            value="scientific" 
            className="data-[state=active]:bg-orange-600 data-[state=active]:text-white text-gray-400 hover:text-white transition-colors"
          >
            <FlaskConical className="w-4 h-4" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="basic" className="mt-0">
          <BasicCalculator />
        </TabsContent>
        
        <TabsContent value="currency" className="mt-0">
          <CurrencyConverter />
        </TabsContent>
        
        <TabsContent value="units" className="mt-0">
          <UnitConverter />
        </TabsContent>
        
        <TabsContent value="scientific" className="mt-0">
          <ScientificCalculator />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default Calculator;
