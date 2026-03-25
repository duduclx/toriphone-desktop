import { useState } from "react";
import { useTranslation } from "react-i18next";

const useUserState = ({ user, setUser, Wazo }) => {
  // requirements
  const { t } = useTranslation();

  // value
  const [userState, setUserState] = useState(user.profile?.state || null);

  /**
   * User state get
   */
  const userStateGet = async () => {
    const userpresence = await Wazo.chatd.getContactStatusInfo(user.uuid);

    setUser((prevUser) => ({
      ...prevUser,
      profile: {
        ...prevUser.profile,
        connected: userpresence.connected,
        doNotDisturb: userpresence.do_not_disturb,
        lastActivity: new Date(userpresence.last_activity),
        lineState: userpresence.line_state,
        mobile: userpresence.mobile,
        state: userpresence.state,
        status: userpresence.status,
      },
    }));
    setUserState(userpresence.state);
  };

  /**
   * User state update
   * @param {*} user 
   * @param {*} state 
   */
  const userStateUpdate = async (user, state) => {
    await Wazo.chatd.updateState(user, state);
    setUserState(state);
  };

  /**
   * Presence Status user update
   * phrase de statut (ex: en vacances)
   * il n'est pas visible / utilisé
   * @param {*} status 
   * @returns 
   */
  const userStatusUpdate = async (status) => {
    try {
      
      await Wazo.chatd.updateStatus(user.uuid, user.profile.state, status);
      
      setUser((prevUser) => ({
        ...prevUser,
        profile: {
          ...prevUser.profile,
          status: status,
        },
      }));
      
      return {
        status: "success",
        title: t("status.update_status_event"),
        description: t("status.update_status_event_true"),
        duration: 5000,
      };
    } catch (e) {
      return {
        status: "error",
        title: t("status.update_status_event"),
        description: t("status.update_status_event_false"),
        duration: 5000,
      };
    }
  };

  return {
    userState,
    setUserState,
    userStateGet,
    userStateUpdate,
    userStatusUpdate
  }
}

export default useUserState
