import { useState } from "react";

const useQueues = ({ apiClient }) => {
    // values
    const [queues, setQueues] = useState({});

    const queuesGet = async () => {
        try {
            const res = await apiClient.client.get("confd/1.1/queues?recurse=false");
            setQueues(res);
            return res;
        } catch (e) {
            return e
        }
    }

  return {
    queues,
    setQueues,
    queuesGet
  }
}

export default useQueues
