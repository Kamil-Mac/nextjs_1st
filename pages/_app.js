import "../styles/globals.css";
import Layout from "../components/layout/layout";
import Head from "next/head";
import { NotificationContextProvider } from "../store/notification-context";

function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          {/* display correctly, nextjs merge heads, if we have a conflict next takes the last one */}
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
