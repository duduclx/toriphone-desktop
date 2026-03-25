import { useState } from "react";

const useConfig = ({ apiClient }) => {
  // config web
  // Used to configure the stun server on webRtc
  const [configWeb, setConfigWeb] = useState({ name: "web", configuration: {} });

  /**
   * Config Web Get
   * @returns
   */
  const configWebGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps/web`);
      setConfigWeb(res);
      return res;
    } catch (e) {
      return configWeb;
    }
  };

  // config subscription
  // Used to configure if subscription limitation are applied
  const [configSubscription, setConfigSubscription] = useState({
    name: "subscription",
    configuration: { subscription: false },
  });

  const configSubscriptionGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps/subscription`);
      setConfigSubscription(res);
      return res;
    } catch (e) {
      return configSubscription;
    }
  };

  // config meetingCalendar
  // used to configure meetings share
  const [configMeetingCalendar, setConfigMeetingCalendar] = useState({
    name: "meetingCalendar",
    configuration: { meetingCalendar: false }
  })

  const configMeetingCalendarGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps/meetingCalendar`);
      setConfigMeetingCalendar(res);
      return res;
    } catch (e) {
      return configMeetingCalendar;
    }
  };

  const configMeetingCalendarUpdate = async (meetingCalendar) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/external/apps/meetingCalendar`, meetingCalendar);
      setConfigMeetingCalendar(meetingCalendar);
      return res;
    } catch (e) {
      return configMeetingCalendar;
    }
  }

  return {
    configWeb,
    setConfigWeb,
    configWebGet,
    configSubscription,
    setConfigSubscription,
    configSubscriptionGet,
    configMeetingCalendar,
    setConfigMeetingCalendar,
    configMeetingCalendarGet,
    configMeetingCalendarUpdate
  };
};

export default useConfig;
