// pages/_app.jsx
// Root app component — imports global CSS so it applies on every page

import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
