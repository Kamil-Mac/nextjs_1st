import { useContext, useState } from "react";
import NotificationContext from "../../store/notification-context";
import styles from "./newsletter-registration.module.css";

const NewsletterRegistration = () => {
  const [emailAddress, setEmailAddress] = useState(); //I can use also useRef - uncontrolled

  const { showNotification, hideNotification } = useContext(NotificationContext);

  const emailHandler = (e) => {
    setEmailAddress(e.target.value);
    // console.log(emailAddress);
  };

  const registrationHandler = (event) => {
    event.preventDefault();

    showNotification({
      title: "Signing up",
      message: "Registering lorem ipsum",
      status: "pending",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: emailAddress }),
      headers: {
        "Content-type": "application/json", //make API routes aware of the different type of data
      },
    })
      .then((response) => {
        return response.ok
          ? response.json()
          : response.json().then((data) => {
              throw new Error(data.message || "Something went wrong");
            });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Successfully lorem ipsum",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          message: error.message || "Error lorem ipsum",
          status: "error",
        });
      }); //API routes
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            onChange={emailHandler}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
