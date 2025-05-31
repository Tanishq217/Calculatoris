
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UnitConverter = () => {
  const [amount, setAmount] = useState("1");
  const [result, setResult] = useState("0");
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");

  const conversions = {
    length: {
      name: "Length",
      units: {
        m: { name: "Meters", factor: 1 },
        km: { name: "Kilometers", factor: 1000 },
        cm: { name: "Centimeters", factor: 0.01 },
        mm: { name: "Millimeters", factor: 0.001 },
        in: { name: "Inches", factor: 0.0254 },
        ft: { name: "Feet", factor: 0.3048 },
        yd: { name: "Yards", factor: 0.9144 },
        mi: { name: "Miles", factor: 1609.34 },
      }
    },
    weight: {
      name: "Weight",
      units: {
        kg: { name: "Kilograms", factor: 1 },
        g: { name: "Grams", factor: 0.001 },
        lb: { name: "Pounds", factor: 0.453592 },
        oz: { name: "Ounces", factor: 0.0283495 },
        t: { name: "Tonnes", factor: 1000 },
      }
    },
    temperature: {
      name: "Temperature",
      units: {
        c: { name: "Celsius", factor: 1 },
        f: { name: "Fahrenheit", factor: 1 },
        k: { name: "Kelvin", factor: 1 },
      }
    }
  };

  const convertUnits = (category: string) => {
    if (!amount || !fromUnit || !toUnit) return;

    const amountNum = parseFloat(amount);
    let converted = 0;

    if (category === "temperature") {
      // Special handling for temperature
      if (fromUnit === "c" && toUnit === "f") {
        converted = (amountNum * 9/5) + 32;
      } else if (fromUnit === "f" && toUnit === "c") {
        converted = (amountNum - 32) * 5/9;
      } else if (fromUnit === "c" && toUnit === "k") {
        converted = amountNum + 273.15;
      } else if (fromUnit === "k" && toUnit === "c") {
        converted = amountNum - 273.15;
      } else if (fromUnit === "f" && toUnit === "k") {
        converted = (amountNum - 32) * 5/9 + 273.15;
      } else if (fromUnit === "k" && toUnit === "f") {
        converted = (amountNum - 273.15) * 9/5 + 32;
      } else {
        converted = amountNum;
      }
    } else {
      // Standard conversion using factors
      const fromFactor = conversions[category as keyof typeof conversions].units[fromUnit].factor;
      const toFactor = conversions[category as keyof typeof conversions].units[toUnit].factor;
      converted = (amountNum * fromFactor) / toFactor;
    }

    setResult(converted.toFixed(6).replace(/\.?0+$/, ""));
  };

  const renderConverter = (category: string) => {
    const categoryData = conversions[category as keyof typeof conversions];
    
    // Check if current units are valid for this category
    const isFromUnitValid = fromUnit && categoryData.units[fromUnit];
    const isToUnitValid = toUnit && categoryData.units[toUnit];
    
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Enter amount"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
            <Select value={isFromUnitValid ? fromUnit : ""} onValueChange={setFromUnit}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {Object.entries(categoryData.units).map(([key, unit]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-gray-700">
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
            <Select value={isToUnitValid ? toUnit : ""} onValueChange={setToUnit}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {Object.entries(categoryData.units).map(([key, unit]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-gray-700">
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={() => convertUnits(category)} 
          className="w-full bg-purple-600 hover:bg-purple-500 text-white"
        >
          Convert
        </Button>

        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{result}</div>
            <div className="text-sm text-gray-400 mt-1">
              {isFromUnitValid && isToUnitValid && `${categoryData.units[fromUnit].name} to ${categoryData.units[toUnit].name}`}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-white mb-2">Unit Converter</h2>
        <p className="text-gray-400 text-sm">Convert between different units of measurement</p>
      </div>

      <Tabs defaultValue="length" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-800">
          <TabsTrigger value="length" className="data-[state=active]:bg-purple-600 text-gray-300">
            Length
          </TabsTrigger>
          <TabsTrigger value="weight" className="data-[state=active]:bg-purple-600 text-gray-300">
            Weight
          </TabsTrigger>
          <TabsTrigger value="temperature" className="data-[state=active]:bg-purple-600 text-gray-300">
            Temperature
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="length" className="mt-4">
          {renderConverter("length")}
        </TabsContent>
        
        <TabsContent value="weight" className="mt-4">
          {renderConverter("weight")}
        </TabsContent>
        
        <TabsContent value="temperature" className="mt-4">
          {renderConverter("temperature")}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnitConverter;
