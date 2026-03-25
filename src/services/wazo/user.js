import { useState } from "react";

const useUser = ({ user, apiClient }) => {

  // values
  const [userCallerIds, setUserCallerIds] = useState({});
  const [userCallerId, setUserCallerId] = useState({ outgoing_caller_id: "default" });
  const [userOutgoingCallerId, setUserOutgoingCallerId] = useState("");

  /**
   * Get list of callerIds
   * @returns
   */
  const userOutgoingCallerIdsGet = async () => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/callerids/outgoing`);
      setUserCallerIds(res)
      return res;
    } catch (e) {
      return e;
    }
  };

  const userOutgoingCallerIdGet = async () => {
    const userUuid = user.uuid;
    const res = await apiClient.client.get(`confd/1.1/users/${userUuid}`);
    setUserCallerId(res);
    setUserOutgoingCallerId(res.outgoing_caller_id);
    return res
  }

  /**
   * update the caller id
   */
  const userOutgoingCallerIdUpdate = async (user) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userUuid}`, user);
      setUserCallerId(user);
      setUserOutgoingCallerId(user.outgoing_caller_id);
      return res
    } catch (e) {
      return e
    }
  };

  return { 
    userCallerIds,
    setUserCallerIds,
    userCallerId,
    setUserCallerId,
    userOutgoingCallerId,
    setUserOutgoingCallerId,
    userOutgoingCallerIdsGet,
    userOutgoingCallerIdGet,
    userOutgoingCallerIdUpdate
  };
};

export default useUser;
