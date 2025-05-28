import { GoogleOAuthProvider } from "@react-oauth/google";
import type { AppProps } from "next/app";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="257281963255-ed1vv2rpeoojo3fi8g7eklo78k6adkpg.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
