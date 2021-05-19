import "../styles/globals.css";
import "../styles/bootstrap.css";
import "../styles/responsive.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { NotificationProvider } from "../context/NotificationContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <CartProvider>
          <Component {...pageProps} />
        </CartProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default MyApp;
