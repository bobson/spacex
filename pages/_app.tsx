
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import ResponsiveDrawer from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CssBaseline />
      <ResponsiveDrawer>
        <Component {...pageProps} />
      </ResponsiveDrawer>
    </>
  );
}

export default MyApp;
