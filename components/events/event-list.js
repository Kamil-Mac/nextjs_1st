import EventItem from "./event-item";
import styles from './event-list.module.css';

const EventList = (props) => {
  const { items } = props;

  return (
    <ul className={styles.list}>
      {items.map(({ id, title, location, image, date }) => (
        <EventItem
          id={id}
          title={title}
          location={location}
          image={image}
          date={date}
          key={id}
        />
      ))}
    </ul>
  );
};

export default EventList;
