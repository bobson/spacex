import Head from "next/head";
import CssBaseline from "@mui/material/CssBaseline";
import { AppProps } from "next/app";
import ResponsiveDrawer from "../components/Navbar";

import { ThemeProvider, createTheme } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ["Rubik", " sans-serif"].join(","),
    h2: {
      background:
        "linear-gradient(90deg, rgba(33, 150, 243, 1) 0%, rgba(103, 58, 183, 1) 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      fontWeight: "500",
      "@media (max-width:600px)": {
        fontSize: "3rem",
      },
    },
    subtitle1: {
      "@media (max-width:600px)": {
        fontSize: "0.8rem",
      },
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>SpaceX Missions</title>
        <meta name="description" content="SpaceX Lanches Pabau" />
      </Head>
      <ResponsiveDrawer>
        <Component {...pageProps} />
      </ResponsiveDrawer>
    </ThemeProvider>
  );
}

export default MyApp;
