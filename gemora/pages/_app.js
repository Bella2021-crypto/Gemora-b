
// pages/_app.js
import "../styles/globals.scss";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencyProvider } from "../context/CurrencyContext";

export default function MyApp({ Component, pageProps, router }) {
  return (
    <CurrencyProvider>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={router.route}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.45 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </CurrencyProvider>
  );
}

}
