const useTrunkEvents = () => {

    // trunk_status_updated
    const onTrunkStatusUpdated = (data) => {
        console.log('trunk_status_updated', data)
    }
  return { onTrunkStatusUpdated }
}

export default useTrunkEvents
