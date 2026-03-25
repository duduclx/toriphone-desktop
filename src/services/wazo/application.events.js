const useApplicationEvents = () => {

    // application_call_answered - application
    const onApplicationCallAnswered = (data) => {
        console.log('application_call_answered', data)
    }

    // application_call_deleted - application
    const onApplicationCallDeleted = (data) => {
        console.log('application_call_deleted', data)
    }

    // application_call_dtmf_received - application
    const onApplicationCallDtmfReceived = (data) => {
        console.log('application_call_dtmf_received', data)
    }

    // application_call_entered - application
    const onApplicationCallEntered = (data) => {
        console.log('application_call_entered', data)
    }

    // application_call_initiated - application
    const onApplicationCallInitiated = (data) => {
        console.log('application_call_initiated', data)
    }

    // application_call_updated - application
    const onApplicationCallUpdated = (data) => {
        console.log('application_call_updated', data)
    }

    // application_destination_node_created - application
    const onApplicationDestinationNodeCreated = (data) => {
        console.log('application_destination_node_created', data)
    }

    // application_node_created - application
    const onApplicationNodeCreated = (data) => {
        console.log('application_node_created', data)
    }

    // application_node_deleted - application
    const onApplicationNodeDeleted = (data) => {
        console.log('application_node_deleted', data)
    }

    // application_node_updated - application
    const onApplicationNodeUpdated = (data) => {
        console.log('application_node_updated', data)
    }

    // application_playback_created - application
    const onApplicationPlaybackCreated = (data) => {
        console.log('application_playback_created', data)
    }

    // application_playback_deleted - application
    const onApplicationPlaybackDeleted = (data) => {
        console.log('application_playback_deleted', data)
    }

    // application_progress_started - application
    const onApplicationProgressStarted = (data) => {
        console.log('application_progress_started', data)
    }

    // application_progress_stopped - application
    const onApplicationProgressStopped = (data) => {
        console.log('application_progress_stopped', data)
    }

    // application_snoop_created - application
    const onApplicationSnoopCreated = (data) => {
        console.log('application_snoop_created', data)
    }

    // application_snoop_deleted - application
    const onApplicationSnoopDeleted = (data) => {
        console.log('application_snoop_deleted', data)
    }

    // application_snoop_updated - application
    const onApplicationSnoopUpdated = (data) => {
        console.log('application_snoop_updated', data)
    }

    // application_user_outgoing_call_created - application
    const onApplicationUserOutgoingCallCreated = (data) => {
        console.log('application_user_outgoing_call_created', data)
    }


  return {
    onApplicationCallAnswered,
    onApplicationCallDeleted,
    onApplicationCallDtmfReceived,
    onApplicationCallEntered,
    onApplicationCallInitiated,
    onApplicationCallUpdated,
    onApplicationDestinationNodeCreated,
    onApplicationNodeCreated,
    onApplicationNodeDeleted,
    onApplicationNodeUpdated,
    onApplicationPlaybackCreated,
    onApplicationPlaybackDeleted,
    onApplicationProgressStarted,
    onApplicationProgressStopped,
    onApplicationSnoopCreated,
    onApplicationSnoopDeleted,
    onApplicationSnoopUpdated,
    onApplicationUserOutgoingCallCreated
  }
}

export default useApplicationEvents
