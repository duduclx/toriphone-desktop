import { ButtonMenuUi } from "../../../ui";
import { FaBell } from "react-icons/fa";

import { useTranslation } from "react-i18next";

const UserNotification = () => {
  const { t } = useTranslation();

  const showNotification = async () => {
    if (!("Notification" in window)) {
      console.log("Le navigateur ne prend pas en charge les notifications de bureau.");
    } else {
      await Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(t("user.notification_activated"));
        }
      });
    }
  };

  return (
    <ButtonMenuUi onClick={() => showNotification()}>
      <FaBell /> {t("user.notification_button")}
    </ButtonMenuUi>
  );
};

export default UserNotification;
