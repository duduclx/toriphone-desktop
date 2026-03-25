const useFaxEvents = () => {

    // fax_outbound_created - application
    const onFaxOutboundCreated = (data) => {
        console.log('fax_outbound_created', data)
    }

    // fax_outbound_failed - application
    const onFaxOutboundFailed = (data) => {
        console.log('fax_outbound_failed', data)
    }

    // fax_outbound_succeeded - application
    const onFaxOutboundSucceeded = (data) => {
        console.log('fax_outbound_succeeded', data)
    }

    // fax_outbound_user_created - application
    const onFaxOutboundUserCreated = (data) => {
        console.log('fax_outbound_user_created', data)
    }

    // fax_outbound_user_failed - application
    const onFaxOutboundUserFailed = (data) => {
        console.log('fax_outbound_user_failed', data)
    }

    // fax_outbound_user_succeeded - application
    const onFaxOutboundUserSucceeded = (data) => {
        console.log('fax_outbound_user_succeeded', data)
    }

  return {
    onFaxOutboundCreated,
    onFaxOutboundFailed,
    onFaxOutboundSucceeded,
    onFaxOutboundUserCreated,
    onFaxOutboundUserFailed,
    onFaxOutboundUserSucceeded
  }
}

export default useFaxEvents
