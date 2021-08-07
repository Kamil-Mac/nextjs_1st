// import { useRouter } from "next/router";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import Head from "next/head";
const EventDetailPage = (props) => {
  //it was for static data from dummy file, now get from firebase
  // const router = useRouter();
  // const eventId = router.query.id; //query shows dynamic id
  const { event } = props;

  return !event ? (
    <p>No event found</p>
  ) : (
    <>
      <Head>
        <title>{event.title}</title>
        <meta
          name="description"
          content={event.description}
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};
//dynamic ssg pages need getStatic Paths
export const getStaticProps = async (context) => {
  const eventId = context.params.id; //id from [id] page
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 1800,
  };
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { id: event.id } })); //create array of objects

  return {
    paths: paths,
    fallback: false, //'blocking'
  };
}

export default EventDetailPage;
