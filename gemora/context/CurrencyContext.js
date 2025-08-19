// context/CurrencyContext.js
import { createContext, useState, useContext } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");
  const rates = { USD: 1, NGN: 1600, EUR: 0.92 }; // Example conversion

  const convertPrice = (priceInUSD) => (priceInUSD * rates[currency]).toFixed(2);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
