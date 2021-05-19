import "../styles/globals.css";
import "../styles/bootstrap.css";
import "../styles/responsive.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
