const useForwardEvents = () => {

    // users_forwards_busy_updated - confd
    const onUsersForwardsBusyUpdated = (data) => {
        console.log('users_forwards_busy_updated', data)
    }

    // users_forwards_noanswer_updated - confd
    const onUsersForwardsNoanswerUpdated = (data) => {
        console.log('users_forwards_noanswer_updated', data)
    }

    // users_forwards_unconditional_updated - confd
    const onUsersForwardsUnconditionalUpdated = (data) => {
        console.log('users_forwards_unconditional_updated', data)
    }

  return {
    onUsersForwardsBusyUpdated,
    onUsersForwardsNoanswerUpdated,
    onUsersForwardsUnconditionalUpdated
  }
}

export default useForwardEvents
