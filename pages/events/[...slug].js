import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filteredData = router.query.slug;
  console.log(filteredData);

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];
  console.log(numMonth);
  const filteredItems = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredData) {
    return <p className="center">Loading data...</p>;
  }

  if (
    isNaN(numMonth) ||
    isNaN(numYear) ||
    numYear > 2040 ||
    numYear < 2020 ||
    numMonth > 13 ||
    numMonth < 1
  ) {
    return <p className="center">Adjust values...</p>;
  }

  return !filteredItems || filteredItems.length === 0 ? (
    <p className="center">No events found...</p>
  ) : (
    <>
      <EventList items={filteredItems} />
    </>
  );
};

export default FilteredEventsPage;
