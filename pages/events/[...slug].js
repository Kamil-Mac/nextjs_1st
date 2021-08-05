import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
//import { getFilteredEvents } from "../../helpers/api-util";

const FilteredEventsPage = (props) => {
  //const { filteredItems, hasError } = props;
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  const { data, error } = useSWR(
    'https://nextjs-87feb-default-rtdb.firebaseio.com/events.json'
  );
 
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];
  console.log(loadedEvents);

  if (!loadedEvents) {
    return <p className="center">Loading data...</p>;
  }

  const filteredItems = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });



  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2040 ||
    numYear < 2020 ||
    numMonth > 13 ||
    numMonth < 1 ||
    error
  ) {
    return <p className="center">Adjust values...</p>;
  }

  // if (hasError) {
  //   return <p className="center">Adjust values...</p>;
  // }

  return !filteredItems || filteredItems.length === 0 ? (
    <p className="center">No events found...</p>
  ) : (
    <>
      <EventList items={filteredItems} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filteredData = params.slug;
//   const numYear = +filteredData[0];
//   const numMonth = +filteredData[1];

//   //console.log(numMonth);
//   const filteredItems = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   if (
//     isNaN(numMonth) ||
//     isNaN(numYear) ||
//     numYear > 2040 ||
//     numYear < 2020 ||
//     numMonth > 13 ||
//     numMonth < 1
//   ) {
//     return {
//       props: { hasError: true },
//       //notFound: true, //showing 404 page
//       //optional if we have some error page
//       // redirect: {
//       //   destination: '/someerrorpage'
//       // }
//     };
//   }

//   return {
//     props: {
//       filteredItems,
//     },
//   };
// }

export default FilteredEventsPage;
