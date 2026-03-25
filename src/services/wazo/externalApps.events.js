const useExternalAppsEvents = ({ setConfigSubscription, configSubscriptionGet, setConfigMeetingCalendar, configMeetingCalendarGet }) => {
  
  // external_app_created
  const OnExternalAppCreated = (data) => {
    // console.log("external_app_created", data);
    if (data.data.name === "subscription") {
      // refetch subscription
      configSubscriptionGet();
    }
    if (data.data.name === "meetingCalendar") {
      // refresh meetingCalendar
      configMeetingCalendarGet();
    }
  };

  // external_app_deleted
  const OnExternalAppDeleted = (data) => {
    // console.log("external_app_deleted", data);
    if (data.data.name === "subscription") {
      // reset to default values
      setConfigSubscription({
        name: "subscription",
        configuration: { subscription: false },
      });
    }
    if (data.data.name === "meetingCalendar") {
      // reset to default values
      setConfigMeetingCalendar({
        name: "meetingCalendar",
        configuration: { meetingCalendar: false },
      });
    }
  };

  // external_app_edited
  const OnExternalAppEdited = (data) => {
    console.log("external_app_edited", data);
    // mise à jour de configSubscription
    if (data.data.name === "subscription") {
      // refetch subscription
      configSubscriptionGet();
    }
    if (data.data.name === "meetingCalendar") {
      // refresh meetingCalendar
      configMeetingCalendarGet();
    }
  };

  // user_external_app_created
  const OnUserExternalAppCreated = (data) => {
    console.log("user_external_app_created", data);
  };

  // user_external_app_deleted
  const OnUserExternalAppDeleted = (data) => {
    console.log("user_external_app_deleted", data);
  };

  // user_external_app_edited
  const OnUserExternalAppEdited = (data) => {
    console.log("user_external_app_edited", data);
  };

  return {
    OnExternalAppCreated,
    OnExternalAppDeleted,
    OnExternalAppEdited,
    OnUserExternalAppCreated,
    OnUserExternalAppDeleted,
    OnUserExternalAppEdited,
  };
};

export default useExternalAppsEvents;
