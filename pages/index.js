import Head from "next/head"; //to set meta content

//main page .../
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterRegistration from "../components/input/newsletter-registration";
// I can use props from getStaticProps
const HomePage = (props) => {
  return (
    <div>
      {/* add info between head which should be in the meta section */}
      <Head>
        <title>Name of project</title>
        <meta
          name="description"
          content="Some content attached to head section in page"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export const getStaticProps = async (context) => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 3600, //time needed to regenerate the page in [s]
  };
}

export default HomePage;
