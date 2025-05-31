
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowUpDown, RefreshCw } from "lucide-react";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("0");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const { toast } = useToast();

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CNY", name: "Chinese Yuan" },
    { code: "INR", name: "Indian Rupee" },
    { code: "CAD", name: "Canadian Dollar" },
    { code: "AUD", name: "Australian Dollar" },
    { code: "CHF", name: "Swiss Franc" },
    { code: "SEK", name: "Swedish Krona" },
    { code: "KRW", name: "South Korean Won" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Thai Baht" },
    { code: "MXN", name: "Mexican Peso" },
    { code: "BRL", name: "Brazilian Real" },
  ];

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching live exchange rates...");
      // Using exchangerate-api.com which provides free real-time rates
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      
      console.log("Exchange rates fetched:", data);
      setRates(data.rates);
      setLastUpdated(new Date().toLocaleTimeString());
      
      toast({
        title: "Rates Updated",
        description: "Live exchange rates have been fetched successfully!",
      });
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
      
      // Fallback to more recent mock rates if API fails
      const fallbackRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 149.50,
        CNY: 7.24,
        INR: 83.25,
        CAD: 1.36,
        AUD: 1.52,
        CHF: 0.88,
        SEK: 10.85,
        KRW: 1332.45,
        SGD: 1.34,
        THB: 35.80,
        MXN: 17.15,
        BRL: 4.95,
      };
      
      setRates(fallbackRates);
      setLastUpdated(new Date().toLocaleTimeString() + " (Offline)");
      
      toast({
        title: "Using Offline Rates",
        description: "Could not fetch live rates. Using fallback rates.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch rates on component mount
  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const convertCurrency = () => {
    if (!amount || !rates[fromCurrency] || !rates[toCurrency]) return;

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum)) return;

    // Convert from source currency to USD, then to target currency
    const usdAmount = amountNum / rates[fromCurrency];
    const converted = usdAmount * rates[toCurrency];
    
    setResult(converted.toFixed(4));

    console.log(`Converting ${amountNum} ${fromCurrency} to ${toCurrency}: ${converted.toFixed(4)}`);

    toast({
      title: "Currency Converted",
      description: `${amount} ${fromCurrency} = ${converted.toFixed(4)} ${toCurrency}`,
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult("0");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white mb-2">Currency Converter</h2>
        <p className="text-gray-400 text-sm">Convert between major world currencies with live rates</p>
        {lastUpdated && (
          <p className="text-xs text-gray-500 mt-1">Last updated: {lastUpdated}</p>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-gray-800 border-gray-600 text-white"
            placeholder="Enter amount"
            step="0.01"
          />
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">From</label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="text-white hover:bg-gray-700">
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={swapCurrencies}
            variant="outline"
            size="icon"
            className="mt-7 bg-gray-700 border-gray-600 hover:bg-gray-600"
          >
            <ArrowUpDown className="h-4 w-4 text-white" />
          </Button>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">To</label>
            <Select value={toCurrency} onValueChange={setToCurrency}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code} className="text-white hover:bg-gray-700">
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={convertCurrency} className="flex-1 bg-green-600 hover:bg-green-500 text-white">
            Convert
          </Button>
          <Button 
            onClick={fetchExchangeRates} 
            variant="outline" 
            className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{result} {toCurrency}</div>
            <div className="text-sm text-gray-400 mt-1">
              {amount} {fromCurrency} equals
            </div>
            {rates[fromCurrency] && rates[toCurrency] && (
              <div className="text-xs text-gray-500 mt-2">
                Rate: 1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(6)} {toCurrency}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
