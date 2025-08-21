// components/CurrencySwitcher.js
import { useCurrency } from "../context/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const currencies = {
    USD: { symbol: "$", label: "USD" },
    NGN: { symbol: "₦", label: "NGN" },
    EUR: { symbol: "€", label: "EUR" },
  };

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="currency-switcher"
    >
      {Object.entries(currencies).map(([code, { symbol, label }]) => (
        <option key={code} value={code}>
          {symbol} {label}
        </option>
      ))}
    </select>
  );
}


