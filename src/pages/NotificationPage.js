import Header from "../components/Header";
import Footer from "../components/Footer";
import "../pagecss/notificationpage.css";

import Card from "../components/Card";
import Notification from "../components/Notification";

function NotificationPage() {
  return (
    <>
      <Header />
      <div class="main_notif">
        <h1>Notifications</h1>
        <div class="notification_container">
          <Notification
            title="Reminder"
            text="Reminder to feed your El Gato so he remains happy and strong! You
              wouldn't want a hungry El Gato, would you? More text here! Please
              take a second to tell me more about your El Gato! He looked very
              lively last month!"
          />
          <Notification
            title="Reminder"
            text="i love farloom"
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotificationPage;
