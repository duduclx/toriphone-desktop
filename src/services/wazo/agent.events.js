const useAgentEvents = ({ setSwitchboards, callSession, setCallSession, setCallSessions, Wazo }) => {

  // agent_status_update - application
  const onAgentStatusUpdate = (data) => {
    console.log('agent_status_update', data)
  }

  // agent_paused - agentd
  const onAgentPaused = (data) => {
    console.log('agent_paused', data)
  }

  // agent_unpaused - agentd
  const onAgentUnpaused = (data) => {
    console.log('agent_unpaused', data)
  }

  // agent_associated - confd
  const onAgentAssociated = (data) => {
    console.log('agent_associated', data)
  }

  // agent_dissociated - confd
  const onAgentDissociated = (data) => {
    console.log('agent_dissociated', data)
  }

  // switchboard_held_call_answered  - application
  const onSwitchBoardHeldCallAnswered = (data) => {
    // console.log("switchboard_held_call_answered", data);
    setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(Object.create(Object.getPrototypeOf(prevCallSession)), prevCallSession, {
          ...prevCallSession,
          switchboard: {
            isSwitchboardCall: prevCallSession.callId == data.data.operator_call_id ? true : false,
            operatorCallId: data.data.operator_call_id,
            queuedCallId: data.data.held_call_id,
            uuid: data.data.switchboard_uuid,
          }
        });
        setCallSessions((prevCallSessions) => {
          // update callSessions
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            // unknow updatedCallSession
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
  };

  // switchboard_held_calls_updated  - application
  const onSwitchboardHeldCallsUpdated = (data) => {
    // console.log("switchboard_held_calls_updated", data);
    setSwitchboards((prev) =>
      prev.map((sb) =>
        sb.uuid === data.data.switchboard_uuid
          ? { ...sb, hold: data.data.items }
          : sb
      ) 
    );
  };

  // switchboard_queued_call_answered  - application
  const onSwitchBoardQueuedCallAnswered = async (data) => {
    // console.log("switchboard_queued_call_answered", data);
      setCallSession((prevCallSession) => {
      const updatedCallsession = Object.assign(Object.create(Object.getPrototypeOf(prevCallSession)), prevCallSession, {
        ...prevCallSession,
        switchboard: {
          isSwitchboardCall: prevCallSession.callId == data.data.operator_call_id ? true : false,
          operatorCallId: data.data.operator_call_id,
          queuedCallId: data.data.queued_call_id,
          uuid: data.data.switchboard_uuid,
        }
      });
      setCallSessions((prevCallSessions) => {
        // update callSessions
        const updatedCallSessions = { ...prevCallSessions };
        if (typeof updatedCallsession.getId === "function") {
          updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
        } else {
          // unknow updatedCallSession
        }
        return updatedCallSessions;
      });

      return updatedCallsession;
    });
  };

  // switchboard_queued_calls_updated  - application
  const onSwitchboardQueuedCallsUpdated = async (data) => {
    // console.log("switchboard_queued_calls_updated", data);
    setSwitchboards((prev) =>
      prev.map((sb) =>
        sb.uuid === data.data.switchboard_uuid
          ? { ...sb, queued: data.data.items }
          : sb
      ) 
    );
  };

  // user_agent_associated - confd
  const onUserAgentAssociated = (data) => {
    console.log('user_agent_associated', data)
  }

  // user_agent_dissociated - confd
  const onUserAgentDissociated = (data) => {
    console.log('user_agent_dissociated', data)
  }

  // switchboard_created - confd
  const onSwitchboardCreated = (data) => {
    console.log('switchboard_created', data)
  }

  // switchboard_deleted - confd
  const onSwitchboardDeleted = (data) => {
    console.log('switchboard_deleted', data)
  }

  // switchboard_edited - confd
  const onSwitchboardEdited = (data) => {
    console.log('switchboard_edited', data)
  }

  // switchboard_fallback_edited - confd
  const onSwitchboardFallbackEdited = (data) => {
    console.log('switchboard_fallback_edited', data)
  }

  // switchboard_member_user_associated - confd
  const onSwitchboardMemberUserAssociated = (data) => {
    console.log('switchboard_member_user_associated', data)
  }

  return {
    onAgentStatusUpdate,
    onAgentPaused,
    onAgentUnpaused,
    onAgentAssociated,
    onAgentDissociated,
    onSwitchBoardHeldCallAnswered,
    onSwitchboardHeldCallsUpdated,
    onSwitchBoardQueuedCallAnswered,
    onSwitchboardQueuedCallsUpdated,
    onUserAgentAssociated,
    onUserAgentDissociated,
    onSwitchboardCreated,
    onSwitchboardDeleted,
    onSwitchboardEdited,
    onSwitchboardFallbackEdited,
    onSwitchboardMemberUserAssociated
  };
};

export default useAgentEvents;
