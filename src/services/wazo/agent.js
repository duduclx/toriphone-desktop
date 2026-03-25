import { useState } from "react";

const useAgent = ({ Wazo, setCallSession, setCallSessions }) => {
  // values
  const [switchboards, setSwitchboards] = useState([]);

  /**
   * Agent Status Get
   */
  const agentGetStatus = async () => {
    const status = await Wazo.agentd.getStatus();
    return status;
  };

  /**
   * Agent Login
   * @param {*} user 
   */
  const agentLogin = async (user) => {
    await Wazo.agentd.loginWithLineId(user.profile.lines[0].id);
  };

  /**
   * Agent Logout
   */
  const agentLogout = async () => {
    await Wazo.agentd.staticLogout();
  };

  /**
   * Agent Pause
   */
  const agentPause = async () => {
    await Wazo.agentd.staticPause();
  };

  /**
   * Agent Resume
   */
  const agentResume = async () => {
    await Wazo.agentd.staticResume();
  };

  /**
   * Switchboards Calls Get
   */
  const switchboardsCallsGet = async (switchboards) => {
    const updatedSwitchboards = await Promise.all(
      switchboards.map(async (item) => {
        const callsQueued = await Wazo.calld.fetchSwitchboardQueuedCalls(item.uuid);
        const callsHold = await Wazo.calld.fetchSwitchboardHeldCalls(item.uuid);

        return {
          ...item,
          queued: callsQueued.items,
          hold: callsHold.items,
        };
      })
    );

    setSwitchboards(updatedSwitchboards);
  };

  /**
   * Switchboard Calls Queued Get
   */
  const switchboardCallsQueuedGet = async (switchboardUuid) => {
    const res = await Wazo.calld.fetchSwitchboardQueuedCalls(switchboardUuid);
    return res
  };

  /**
   * Switchboard Calls Paused Get
   */
  const switchboardCallsHeldGet = async (switchboardUuid) => {
    const res = await Wazo.calld.fetchSwitchboardHeldCalls(switchboardUuid);
    return res
  };

  /**
   * Switchboard Call Answer
   */
  const switchboardCallAnswer = async (switchboardUuid, callId) => {
    const res = await Wazo.calld.answerSwitchboardQueuedCall(switchboardUuid, callId);
    return res
  };

  /**
   * Switchboard Call Pause
   */
  const switchboardCallPause = async (callSession) => {
    const res = await Wazo.calld.holdSwitchboardCall(callSession.switchboard.uuid, callSession.callId);
    const dataId = callSession.getId();
    setCallSession((prevCallSession) => {
      // remove from callSessions
      setCallSessions((prevCallSessions) => {
        const newCallSessions = { ...prevCallSessions };
        delete newCallSessions[dataId];
        return newCallSessions;
      });
      if(prevCallSession.sipCallId === dataId) {
        return {}
      } else {
        return prevCallSession
      }
    });
    return res
  };

  /**
   * Switchboard Call Resume
   */
  const switchboardCallResume = async (switchboardUuid, callId) => {
    const res = await Wazo.calld.answerSwitchboardHeldCall(switchboardUuid, callId);
    return res
  };

  return {
    switchboards,
    setSwitchboards,
    agentGetStatus,
    agentLogin,
    agentLogout,
    agentPause,
    agentResume,
    switchboardsCallsGet,
    switchboardCallsQueuedGet,
    switchboardCallsHeldGet,
    switchboardCallAnswer,
    switchboardCallPause,
    switchboardCallResume,
  };
};

export default useAgent;
