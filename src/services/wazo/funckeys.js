import { useState } from "react";

const useFunckeys = ({ user, apiClient }) => {
  // values
  const [funckeys, setFunckeys] = useState({keys: {}});
  const [funckey, setFunckey] = useState({});

  const funckeysGet = async () => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/funckeys`);
      setFunckeys(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeysUpdate = async (funckeys) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userUuid}/funckeys`, funckeys);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeyGet = async (position) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}/funckeys/${position}`);
      setFunckey(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeyUpdate = async (position, funckey) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${userUuid}/funckeys/${position}`, funckey);
      return res;
    } catch (e) {
      return e;
    }
  };

  const funckeyDelete = async (position) => {
    const userUuid = user.uuid;
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${userUuid}/funckeys/${position}`);
      return res;
    } catch (e) {
      return e;
    }
  };

  return {
    funckeys,
    setFunckeys,
    funckey,
    setFunckey,
    funckeysGet, 
    funckeysUpdate, 
    funckeyGet, 
    funckeyUpdate, 
    funckeyDelete
  };
  
};

export default useFunckeys;
