import Head from "next/head"; //to set meta content

//main page .../
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
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
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 3600, //time needed to regenerate the page in [s]
  };
}

export default HomePage;
