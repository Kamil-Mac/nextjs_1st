import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        {/* display correctly, nextjs merge heads, if we have a conflict next takes the last one */}
        <meta name='viewport' content='initial-scale=1.0, width=device-width' /> 
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
