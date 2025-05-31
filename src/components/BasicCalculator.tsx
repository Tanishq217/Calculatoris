
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BasicCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [expression, setExpression] = useState("");
  const { toast } = useToast();

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
      setExpression(`${inputValue} ${nextOperation}`);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
      setExpression(`${newValue} ${nextOperation}`);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setExpression(`${previousValue} ${operation} ${inputValue} =`);
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
      
      toast({
        title: "Calculation Complete",
        description: `Result: ${newValue}`,
      });
    }
  };

  const clear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setExpression("");
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const inputPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  const buttonClass = "h-16 text-xl font-semibold transition-all duration-200 hover:scale-105 active:scale-95";
  const numberButtonClass = `${buttonClass} bg-gray-700 hover:bg-gray-600 text-white border-gray-600`;
  const operationButtonClass = `${buttonClass} bg-blue-600 hover:bg-blue-500 text-white`;
  const functionButtonClass = `${buttonClass} bg-gray-600 hover:bg-gray-500 text-white`;

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gray-900 p-4 rounded-lg">
        {/* Expression display */}
        {expression && (
          <div className="text-right text-sm font-mono text-gray-400 mb-1">
            {expression}
          </div>
        )}
        {/* Main display */}
        <div className="text-right text-3xl font-mono text-white overflow-hidden">
          {display}
        </div>
        {/* Current operation indicator */}
        {operation && !waitingForNewValue && (
          <div className="text-right text-lg font-mono text-blue-400 mt-1">
            {operation}
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        <Button onClick={clear} className={functionButtonClass}>
          AC
        </Button>
        <Button onClick={toggleSign} className={functionButtonClass}>
          +/-
        </Button>
        <Button onClick={inputPercent} className={functionButtonClass}>
          %
        </Button>
        <Button onClick={() => inputOperation("÷")} className={operationButtonClass}>
          ÷
        </Button>

        <Button onClick={() => inputNumber("7")} className={numberButtonClass}>
          7
        </Button>
        <Button onClick={() => inputNumber("8")} className={numberButtonClass}>
          8
        </Button>
        <Button onClick={() => inputNumber("9")} className={numberButtonClass}>
          9
        </Button>
        <Button onClick={() => inputOperation("×")} className={operationButtonClass}>
          ×
        </Button>

        <Button onClick={() => inputNumber("4")} className={numberButtonClass}>
          4
        </Button>
        <Button onClick={() => inputNumber("5")} className={numberButtonClass}>
          5
        </Button>
        <Button onClick={() => inputNumber("6")} className={numberButtonClass}>
          6
        </Button>
        <Button onClick={() => inputOperation("-")} className={operationButtonClass}>
          -
        </Button>

        <Button onClick={() => inputNumber("1")} className={numberButtonClass}>
          1
        </Button>
        <Button onClick={() => inputNumber("2")} className={numberButtonClass}>
          2
        </Button>
        <Button onClick={() => inputNumber("3")} className={numberButtonClass}>
          3
        </Button>
        <Button onClick={() => inputOperation("+")} className={operationButtonClass}>
          +
        </Button>

        <Button onClick={() => inputNumber("0")} className={`${numberButtonClass} col-span-2`}>
          0
        </Button>
        <Button onClick={() => inputNumber(".")} className={numberButtonClass}>
          .
        </Button>
        <Button onClick={performCalculation} className={`${buttonClass} bg-green-600 hover:bg-green-500 text-white`}>
          =
        </Button>
      </div>
    </div>
  );
};

export default BasicCalculator;
