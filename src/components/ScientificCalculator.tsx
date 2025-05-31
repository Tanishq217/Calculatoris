
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState(0);
  const { toast } = useToast();

  const calculate = (expression: string) => {
    try {
      // Replace display-friendly symbols with JavaScript operators
      const jsExpression = expression
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/π/g, Math.PI.toString())
        .replace(/e/g, Math.E.toString());
      
      const result = eval(jsExpression);
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid expression",
        variant: "destructive",
      });
      return 0;
    }
  };

  const handleFunction = (func: string) => {
    const current = parseFloat(display);
    let result = 0;

    switch (func) {
      case "sin":
        result = Math.sin(current * Math.PI / 180);
        break;
      case "cos":
        result = Math.cos(current * Math.PI / 180);
        break;
      case "tan":
        result = Math.tan(current * Math.PI / 180);
        break;
      case "log":
        result = Math.log10(current);
        break;
      case "ln":
        result = Math.log(current);
        break;
      case "sqrt":
        result = Math.sqrt(current);
        break;
      case "x2":
        result = current * current;
        break;
      case "x3":
        result = current * current * current;
        break;
      case "1/x":
        result = 1 / current;
        break;
      case "!":
        result = factorial(current);
        break;
      default:
        result = current;
    }

    setDisplay(result.toString());
  };

  const factorial = (n: number): number => {
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const addToDisplay = (value: string) => {
    setDisplay(display === "0" ? value : display + value);
  };

  const clear = () => {
    setDisplay("0");
  };

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display));
    toast({
      title: "Memory",
      description: `Added ${display} to memory`,
    });
  };

  const memoryRecall = () => {
    setDisplay(memory.toString());
  };

  const memoryClear = () => {
    setMemory(0);
    toast({
      title: "Memory",
      description: "Memory cleared",
    });
  };

  const buttonClass = "h-12 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95";
  const numberButtonClass = `${buttonClass} bg-gray-700 hover:bg-gray-600 text-white`;
  const functionButtonClass = `${buttonClass} bg-orange-600 hover:bg-orange-500 text-white`;
  const operatorButtonClass = `${buttonClass} bg-blue-600 hover:bg-blue-500 text-white`;

  return (
    <div className="p-6 space-y-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Scientific Calculator</h2>
        <p className="text-gray-400 text-sm">Advanced mathematical functions</p>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg">
        <div className="text-right text-2xl font-mono text-white overflow-hidden">
          {display}
        </div>
        <div className="text-right text-sm text-gray-400">
          Memory: {memory}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Memory functions */}
        <Button onClick={memoryClear} className={functionButtonClass}>
          MC
        </Button>
        <Button onClick={memoryRecall} className={functionButtonClass}>
          MR
        </Button>
        <Button onClick={memoryAdd} className={functionButtonClass}>
          M+
        </Button>
        <Button onClick={clear} className={functionButtonClass}>
          AC
        </Button>
        <Button onClick={() => addToDisplay("÷")} className={operatorButtonClass}>
          ÷
        </Button>

        {/* Trigonometric functions */}
        <Button onClick={() => handleFunction("sin")} className={functionButtonClass}>
          sin
        </Button>
        <Button onClick={() => handleFunction("cos")} className={functionButtonClass}>
          cos
        </Button>
        <Button onClick={() => handleFunction("tan")} className={functionButtonClass}>
          tan
        </Button>
        <Button onClick={() => addToDisplay("(")} className={numberButtonClass}>
          (
        </Button>
        <Button onClick={() => addToDisplay(")")} className={numberButtonClass}>
          )
        </Button>

        {/* Mathematical functions */}
        <Button onClick={() => handleFunction("log")} className={functionButtonClass}>
          log
        </Button>
        <Button onClick={() => handleFunction("ln")} className={functionButtonClass}>
          ln
        </Button>
        <Button onClick={() => handleFunction("sqrt")} className={functionButtonClass}>
          √
        </Button>
        <Button onClick={() => handleFunction("x2")} className={functionButtonClass}>
          x²
        </Button>
        <Button onClick={() => addToDisplay("×")} className={operatorButtonClass}>
          ×
        </Button>

        {/* Constants and more functions */}
        <Button onClick={() => addToDisplay("π")} className={functionButtonClass}>
          π
        </Button>
        <Button onClick={() => addToDisplay("e")} className={functionButtonClass}>
          e
        </Button>
        <Button onClick={() => handleFunction("x3")} className={functionButtonClass}>
          x³
        </Button>
        <Button onClick={() => handleFunction("1/x")} className={functionButtonClass}>
          1/x
        </Button>
        <Button onClick={() => addToDisplay("-")} className={operatorButtonClass}>
          -
        </Button>

        {/* Numbers */}
        <Button onClick={() => addToDisplay("7")} className={numberButtonClass}>
          7
        </Button>
        <Button onClick={() => addToDisplay("8")} className={numberButtonClass}>
          8
        </Button>
        <Button onClick={() => addToDisplay("9")} className={numberButtonClass}>
          9
        </Button>
        <Button onClick={() => handleFunction("!")} className={functionButtonClass}>
          n!
        </Button>
        <Button onClick={() => addToDisplay("+")} className={operatorButtonClass}>
          +
        </Button>

        <Button onClick={() => addToDisplay("4")} className={numberButtonClass}>
          4
        </Button>
        <Button onClick={() => addToDisplay("5")} className={numberButtonClass}>
          5
        </Button>
        <Button onClick={() => addToDisplay("6")} className={numberButtonClass}>
          6
        </Button>
        <Button onClick={() => addToDisplay("^")} className={operatorButtonClass}>
          ^
        </Button>
        <Button 
          onClick={() => setDisplay(calculate(display).toString())} 
          className={`${buttonClass} bg-green-600 hover:bg-green-500 text-white row-span-2`}
        >
          =
        </Button>

        <Button onClick={() => addToDisplay("1")} className={numberButtonClass}>
          1
        </Button>
        <Button onClick={() => addToDisplay("2")} className={numberButtonClass}>
          2
        </Button>
        <Button onClick={() => addToDisplay("3")} className={numberButtonClass}>
          3
        </Button>
        <Button onClick={() => addToDisplay(".")} className={numberButtonClass}>
          .
        </Button>

        <Button onClick={() => addToDisplay("0")} className={`${numberButtonClass} col-span-4`}>
          0
        </Button>
      </div>
    </div>
  );
};

export default ScientificCalculator;
