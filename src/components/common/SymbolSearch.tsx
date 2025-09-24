import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const symbols = [
  'BTCUSDT', 'ETHUSDT', 'ADAUSDT', 'SOLUSDT', 'DOTUSDT', 
  'AVAXUSDT', 'MATICUSDT', 'LINKUSDT'
];

interface SymbolSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const SymbolSearch = ({ value, onChange }: SymbolSearchProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-40">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {symbols.map(symbol => (
          <SelectItem key={symbol} value={symbol}>
            {symbol}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SymbolSearch;