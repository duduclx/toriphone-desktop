import { useState } from "react";

const useBlocklist = ({ Wazo, apiClient }) => {
  // values
  const [blocklists, setBlocklists] = useState({});
  const [blocklist, setBlocklist] = useState({});

  const blocklistsGet = async () => {
    const res = await Wazo.confd.getBlockNumbers();
    setBlocklists(res);
    return res;
  };

  const blocklistsPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const res = await apiClient.client.get(
        `confd/1.1/users/me/blocklist/numbers?limit=${limit}&offset=${offset}&search=${search}`
      );
      setBlocklists(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/users/me/blocklist/numbers?limit=${limit}&offset=${offset}`);
      setBlocklists(res);
      return res;
    }
  };

  const blocklistGet = async (item) => {
    const res = await Wazo.confd.getBlockNumber(item);
    setBlocklist(res);
    return res;
  };

  const blocklistAdd = async (item) => {
    try {
        const res = await Wazo.confd.createBlockNumber(item);
        return res;
    } catch (e) {
        return {error: e}
    }
  };

  const blocklistUpdate = async (item) => {
    try {
      const res = await Wazo.confd.updateBlockNumber(item.uuid, item);
      return res;
    } catch (e) {
      return e
    }
  };

  const blocklistDelete = async (item) => {
    try {
      const res = await Wazo.confd.deleteBlockNumber(item.uuid);
      return res;
    } catch (e) {
      return e
    }
  };

  return {
    blocklists,
    setBlocklists,
    blocklist,
    setBlocklist,
    blocklistsGet,
    blocklistsPageGet,
    blocklistGet,
    blocklistAdd,
    blocklistUpdate,
    blocklistDelete,
  };
};

export default useBlocklist;
