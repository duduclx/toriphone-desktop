const useCallEvents = ({
  Wazo,
  user,
  localStream,
  setLocalStream,
  setRemoteStream,
  setIncomingCall,
  setIsFullScreen,
  setShowSidebar,
  setToggleChat,
  setToggleConference,
  setToggleMerge,
  callLogGet,
  setCallChatMessages,
  setChatSignal,
  turnCameraOff,
  callSession,
  setCallSession,
  callSessions,
  setCallSessions,
  conferenceAdhoc,
  setConferenceAdhoc,
  callingRef,
  acceptIncomingCall,
  switchboards
}) => {
  
  // call_accepted - application
  const onCallAccepted = async (callSession, withVideo) => {
    // get streams if videoCall
    const localStream = await Wazo.Phone.getLocalVideoStream(callSession);
    setLocalStream(localStream);
    const remoteStream = await Wazo.Phone.getRemoteVideoStream(callSession);
    setRemoteStream(remoteStream);
  };

  // call_answered - application
  const onCallAnswered = (data) => {
    // console.log("call_answered", data);
    // ignorer les appels issus d’un meeting
    if (typeof data.data.peer_caller_id_number === "string" && data.data.peer_caller_id_number.startsWith("wazo-meeting")) {
      return;
    }

    callingRef.current.pause();
    if (user.uuid == data.data.user_uuid) {
      setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            callId: data.data.call_id,
            sipStatus: "Established", // force for switchboard
            answered: true, // force for switchboard
            ringing: false, // force for switchboard
            status: data.data.status,
            call: {
              type: prevCallSession.type,
              id: data.data.call_id,
              sipCallId: data.data.sip_call_id,
              direction: data.data.direction,
              callerName: data.data.caller_id_name,
              callerNumber: data.data.caller_id_number,
              calleeName: data.data.peer_caller_id_name,
              calleeNumber: data.data.peer_caller_id_number,
              dialedExtension: data.data.dialed_extension,
              lineId: data.data.line_id,
              isCaller: data.data.is_caller,
              isVideo: data.data.is_video,
              onHold: data.data.on_hold,
              muted: data.data.muted,
              status: data.data.status,
              startingTime: new Date(prevCallSession.startTime),
              talkingToIds: Object.keys(data.data.talking_to),
              //talkingToIds: data.data.talking_to,
              recording: prevCallSession.recording,
              parked: data.data.parked
            },
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    }
  };

  // call_canceled - application
  const onCallCanceled = async (data) => {
    // console.log("call_canceled");
    await callLogGet();
  };

  // call_created - application
  const onCallCreated = (data) => {
    // console.log("call_created", data);
    // désactiver pour le bon fonctionnement du switchboard
    // mettre correctement à jour, en reprenant toutes les données de l'event
    /*
    setCallSession((prevCallSession) => {
      const updatedCallsession = Object.assign(Object.create(Object.getPrototypeOf(prevCallSession)), prevCallSession, {
        ...prevCallSession,
        callId: data.data.call_id,
        callerNumber: data.data.caller_id_number,
        dialedExtension: data.data.peer_caller_id_number,
        status: data.data.status
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
    */
  };

  // call_updated - application
  const onCallUpdated = (data) => {
    // console.log("call_updated", data);
    // ignorer les appels issus d’un meeting
    if (typeof data.data.peer_caller_id_number === "string" && data.data.peer_caller_id_number.startsWith("wazo-meeting")) {
      return;
    }
    if(data.data.bridges.length > 0) {
      // on pourrait vérifier que bridges commence par switchboard et termine par hold
      // on ne met pas à jour callSession
      return
    }
    // update only if current user
    if (user.uuid == data.data.user_uuid) {
      setCallSession((prevCallSession) => {
        const updatedCallsession = Object.assign(
          Object.create(Object.getPrototypeOf(prevCallSession)),
          prevCallSession,
          {
            ...prevCallSession,
            callId: data.data.call_id,
            callerNumber: data.data.caller_id_number,
            displayName: prevCallSession.conference ? "conference" : data.data.peer_caller_id_name,
            dialedExtension: data.data.dialed_extension,
            ringing : data.data.ringing,
            status: data.data.status,
            call: {
              type: prevCallSession.type,
              id: data.data.call_id,
              sipCallId: data.data.sip_call_id,
              direction: data.data.direction,
              callerName: data.data.caller_id_name,
              callerNumber: data.data.caller_id_number,
              calleeName: data.data.peer_caller_id_name,
              calleeNumber: data.data.peer_caller_id_number,
              dialedExtension: data.data.dialed_extension,
              lineId: data.data.line_id,
              isCaller: data.data.is_caller,
              isVideo: data.data.is_video,
              onHold: data.data.on_hold,
              muted: data.data.muted,
              status: data.data.status,
              startingTime: new Date(prevCallSession.startTime),
              talkingToIds: Object.keys(data.data.talking_to),
              //talkingToIds: data.data.talking_to,
              recording: prevCallSession.recording,
              parked: data.data.parked
            },
          }
        );

        // mettre à jour dans l'objet callSessions qui contient tous les appels en cours
        setCallSessions((prevCallSessions) => {
          const updatedCallSessions = { ...prevCallSessions };
          if (typeof updatedCallsession.getId === "function") {
            updatedCallSessions[updatedCallsession.getId()] = updatedCallsession;
          } else {
            //callsession à été détruit lors du merge2calls
          }
          return updatedCallSessions;
        });

        return updatedCallsession;
      });
    }
  };

  // call_ended - application
  const onCallEnded = (data) => {
    // console.log("call_ended", data);
    const dataId = data.getId();
    setCallSession((prevCallSession) => {
      // remove from callSessions
      setCallSessions((prevCallSessions) => {
        const newCallSessions = { ...prevCallSessions };
        delete newCallSessions[dataId];
        return newCallSessions;
      });
      if(prevCallSession.sipCallId === dataId) {
        setIncomingCall(false);
        setIsFullScreen(false);
        setShowSidebar(true);
        setToggleChat(false);
        setToggleConference(false);
        setToggleMerge(false);
        return {}
      } else {
        return prevCallSession
      }
    });
  };

  // call_rejected
  const onCallRejected = (data) => {
    // console.log("call_rejected", data);
    const dataId = data.getId();
    setCallSession((prevCallSession) => {
      // remove from callSessions
      setCallSessions((prevCallSessions) => {
        const newCallSessions = { ...prevCallSessions };
        delete newCallSessions[dataId];
        return newCallSessions;
      });
      if(prevCallSession.sipCallId === dataId) {
        setIncomingCall(false);
        setIsFullScreen(false);
        setShowSidebar(true);
        setToggleChat(false);
        setToggleConference(false);
        setToggleMerge(false);
        return {}
      } else {
        return prevCallSession
      }
    });
  };

  // call_dtmf_created - application
  const onCallDtmfCreated = (data) => {
    // console.log("call_dtmf_created", data);
  };

  // call_incoming - application
  const onCallIncoming = (callSession) => {
    // console.log("call_incoming", callSession);
    if(callSession.autoAnswer) {
      // décrocher automatiquement
      setCallSession(callSession);
      setCallSessions((prevSessions) => ({ ...prevSessions, [callSession.getId()]: callSession }));
      acceptIncomingCall(callSession, false);
    } else {
      setIncomingCall(true);
      setCallSession(callSession);
      setCallSessions((prevSessions) => ({ ...prevSessions, [callSession.getId()]: callSession }));
    }
  };

  // call_outgoing
  const onCallOutgoing = (callSession) => {
    // console.log("call_outgoing", callSession);
  };

  // call_held - application
  const onCallHeld = (data) => {
    // console.log("call_held", data);
  };

  // call_resumed - application
  const onCallResumed = async (data) => {
    // console.log("call_resumed", data);
    const localStream = await Wazo.Phone.getLocalVideoStream(data);
    setLocalStream(localStream);
  };

  // call_muted
  const onCallMuted = async (data) => {
    // console.log("call_muted", data);
  };

  // call_unmuted
  const onCallUnmuted = async (data) => {
    // console.log("call_unmuted", data);
  };

  function createBlackVideoTrack() {
    const canvas = Object.assign(document.createElement("canvas"), { width: 640, height: 480 });
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const stream = canvas.captureStream(5); // 5 fps pour économiser les ressources
    return stream.getVideoTracks()[0];
  }

  // camera_disabled
  const onCallCameraDisabled = async (data) => {
    const session = Wazo.Phone.phone.currentSipSession;
    const pc = session?.sessionDescriptionHandler?.peerConnection;
    if (!pc) return;

    const sender = pc.getSenders().find((s) => s.track?.kind === "video");
    if (!sender) return;

    const blackTrack = createBlackVideoTrack();
    sender.replaceTrack(blackTrack);
  };

  // camera_resumed
  const onCallCameraResumed = async (data) => {
    const session = Wazo.Phone.phone.currentSipSession;
    const pc = session?.sessionDescriptionHandler?.peerConnection;
    if (!pc) return;

    // Récupère l'ancien sender vidéo
    const sender = pc.getSenders().find((s) => s.track?.kind === "video");

    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    setLocalStream(stream);

    const videoTrack = stream.getVideoTracks()[0];
    await sender.replaceTrack(videoTrack);
  };

  // phone/chat
  const onCallChat = (message) => {
    setCallChatMessages((prevMessages) => [...prevMessages, message]);
  };

  // phone/signal
  const onCallSignal = (message) => {
    if (message) {
      setChatSignal(message);
    }
  };

  //  ON_SHARE_SCREEN_STARTED
  const onCallShareScreenStarted = (data) => {
    //console.log('onShareScreenStarted :', data)
  };

  // ON_SHARE_SCREEN_ENDED
  const onCallShareScreenEnded = (data) => {
    //console.log('ended', data)
  };

  // user_missed_call - application
  const onCallUserMissedCall = (data) => {
    // console.log("user_missed_call", data);
  };

  // recording_paused - application
  const onCallRecordingPaused = (data) => {
    // console.log("recording_paused", data);
  };

  // recording_resumed - application
  const onCallRecordingResumed = (data) => {
    // console.log("recording_resumed", data);
  };

  // recording_started - application
  const onCallRecordingStarted = (data) => {
    // console.log("recording_started", data);
  };

  // recording_stopped - application
  const onCallRecordingStopped = (data) => {
    // console.log("recording_stopped", data);
  };

  // transfer_abandoned - application
  const onCallTransferAbandoned = (data) => {
    // console.log("transfer_abandoned", data);
  };

  // transfer_answered - application
  const onCallTransferAnswered = (data) => {
    // console.log("transfer_answered", data);
  };

  // transfer_cancelled - application
  const onCallTransferCanceled = (data) => {
    // console.log("transfer_cancelled", data);
  };

  // transfer_completed - application
  const onCallTransferCompleted = (data) => {
    // console.log("transfer_completed", data);
  };

  // transfer_created - application
  const onCallTransferCreated = (data) => {
    // console.log("transfer_created", data);
  };

  // transfer_ended - application
  const onCallTransferEnded = (data) => {
    // console.log("transfer_ended", data);
  };

  // transfer_updated - application
  const onCallTransferUpdated = (data) => {
    // console.log("transfer_updated", data);
  };

  // call_parked - application
  const onCallParked = (data) => {
    // console.log("call_parked", data);
  };

  // call_unparked - application
  const onCallUnparked = (data) => {
    // console.log("call_unparked", data);
  };

  // parked_call_hungup - application
  const onCallParkedCallHungup = (data) => {
    // console.log("parked_call_hungup", data);
  };

  // parked_call_timed_out - application
  const onCallParkedCallTimeout = (data) => {
    // console.log("parked_call_timed_out", data);
  };

  // call_push_notification - application
  const onCallPushNotification = (data) => {
    // console.log("call_push_notification", data);
  };

  // call_cancel_push_notification - application
  const onCallCancelPushNotification = (data) => {
    // console.log("call_cancel_push_notification", data);
  };

  // relocate_answered - application
  const onCallRelocateAnswered = (data) => {
    // console.log("relocate_answered", data);
  };

  // relocate_completed - application
  const onCallRelocateCompleted = (data) => {
    // console.log("relocate_completed", data);
  };

  // relocate_ended - application
  const onCallRelocateEnded = (data) => {
    // console.log("relocate_ended", data);
  };

  // relocate_initiated - application
  const onCallRelocateInitiated = (data) => {
    // console.log("relocate_initiated", data);
  };

  // conference_adhoc_created
  const onConferenceAdhocCreated = (data) => {
    // console.log("conference_adhoc_created", data);
  };

  // conference_adhoc_deleted
  const onConferenceAdhocDeleted = (data) => {
    // console.log("conference_adhoc_deleted", data);
    // utiliser data.data.conference_id pour supprimer la bonne conférence si il y en a plusieurs
    setConferenceAdhoc(null);
  };

  // conference_adhoc_participant_joined
  const onConferenceAdhocParticipantJoined = (data) => {
    // console.log("conference_adhoc_participant_joined", data);
  };

  // conference_adhoc_participant_left
  const onConferenceAdhocParticipantLeft = (data) => {
    // console.log("conference_adhoc_participant_left", data);
    // pour l'instant, une seule conférence possible
    setConferenceAdhoc((prev) => {
      if (!prev || !prev.participants) return prev;

      const { [data.data.call_id]: _, ...remainingParticipants } = prev.participants;

      const updated = Object.assign(
        Object.create(Object.getPrototypeOf(prev)),
        prev,
        {
          participants: remainingParticipants,
        }
      );

      return updated;
    });
  };

  // reinvite
  const onReinvite = async (data) => {
    // console.log("reinvite data", data);
  };

  // video_stream
  const onVideoStream = (data) => {
    // console.log("video_stream", data);
  };

  // video_input_change
  const onVideoInputChange = (data) => {
    // console.log("onVideoInputChange", data);
  };

  return {
    onCallAccepted,
    onCallAnswered,
    onCallCanceled,
    onCallCreated,
    onCallUpdated,
    onCallEnded,
    onCallRejected,
    onCallDtmfCreated,
    onCallIncoming,
    onCallOutgoing,
    onCallHeld,
    onCallResumed,
    onCallMuted,
    onCallUnmuted,
    onCallCameraDisabled,
    onCallCameraResumed,
    onCallChat,
    onCallSignal,
    onCallShareScreenStarted,
    onCallShareScreenEnded,
    onCallUserMissedCall,
    onCallRecordingPaused,
    onCallRecordingResumed,
    onCallRecordingStarted,
    onCallRecordingStopped,
    onCallTransferAbandoned,
    onCallTransferAnswered,
    onCallTransferCanceled,
    onCallTransferCompleted,
    onCallTransferCreated,
    onCallTransferEnded,
    onCallTransferUpdated,
    onCallParked,
    onCallUnparked,
    onCallParkedCallHungup,
    onCallParkedCallTimeout,
    onCallPushNotification,
    onCallCancelPushNotification,
    onCallRelocateAnswered,
    onCallRelocateCompleted,
    onCallRelocateEnded,
    onCallRelocateInitiated,
    onConferenceAdhocCreated,
    onConferenceAdhocDeleted,
    onConferenceAdhocParticipantJoined,
    onConferenceAdhocParticipantLeft,
    onReinvite,
    onVideoStream,
    onVideoInputChange,
  };
};

export default useCallEvents;
