const useLineEvents = () => {

    // line_status_updated
    const onLineStatusUpdated = (data) => {
        console.log('line_status_updated', data)
    }

  return { onLineStatusUpdated }
}

export default useLineEvents
