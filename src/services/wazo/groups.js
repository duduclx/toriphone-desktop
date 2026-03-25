import { useState } from "react";

const useGroups = ({ apiClient }) => {
  // values
  const [groups, setGroups] = useState({});

  const groupsGet = async () => {
    try {
      const res = await apiClient.client.get("confd/1.1/groups?recurse=false");
      setGroups(res);
      return res;
    } catch (e) {
      setGroups({});
      return e;
    }
  };
  
  return {
    groups,
    setGroups,
    groupsGet,
  };
};

export default useGroups;
