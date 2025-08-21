// context/CurrencyContext.js
import { createContext, useState, useContext, useEffect } from "react";

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("USD");

  // Example static conversion rates (replace with live API later)
  const rates = { USD: 1, NGN: 1600, EUR: 0.92 };
  const symbols = { USD: "$", NGN: "₦", EUR: "€" };

  // Load saved currency preference
  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved) setCurrency(saved);
  }, []);

  // Save currency preference on change
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  // Convert & format prices
  const convertPrice = (priceInUSD) => {
    const converted = priceInUSD * rates[currency];
    return `${symbols[currency]}${converted.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

