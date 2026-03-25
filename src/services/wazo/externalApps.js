import { useState } from "react";

const useExternalApps = ({ user, apiClient, Wazo }) => {

  // values
  const [externalApps, setExternalApps] = useState({});
  const [externalApp, setExternalApp] = useState({});
  const [externalAppsUser, setExternalAppsUser] = useState({});
  const [externalAppUser, setExternalAppUser] = useState({});

  /**
   * External Apps Get
   * @returns 
   */
  const externalAppsGet = async () => {
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps?recurse=false`);
      setExternalApps(res);
      return res;
    } catch (e) {
      return e;
    }
  };

  /**
   * External App Get
   * @param {*} name 
   * @returns 
   */
  const externalAppGet = async (name) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/external/apps/${name}`);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * External App Update
   * @param {*} app 
   * @returns 
   */
  const externalAppUpdate = async (app) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/external/apps/${app.name}`, app);
      return res;
    } catch (e) {
      return e;
    }
  }

  /**
   * External Apps User Get
   * @returns 
   */
  const externalAppsUserGet = async () => {
    // const res = await Wazo.confd.getExternalApps(user.uuid);
    const res = await apiClient.client.get(`confd/1.1/users/${user.uuid}/external/apps`)
    setExternalAppsUser(res);
    return res
  }

  /**
   * External Apps User Page Get
   * @param {*} search 
   * @param {*} offset 
   * @param {*} limit 
   * @returns 
   */
  const externalAppsUserPageGet = async (search = null, offset = 0, limit = 10) => {
    if (search) {
      const res = await apiClient.client.get(
        `confd/1.1/users/${user.uuid}/external/apps?limit=${limit}&offset=${offset}&search=${search}`
      );
      setExternalAppsUser(res);
      return res;
    } else {
      const res = await apiClient.client.get(`confd/1.1/users/${user.uuid}/external/apps?limit=${limit}&offset=${offset}`);
      setExternalAppsUser(res);
      return res;
    }
  }

  /**
   * External App User Get
   * @param {*} name 
   * @returns 
   */
  const externalAppUserGet = async (name) => {
    const res = await Wazo.confd.getExternalApp(user.uuid, name);
    setExternalAppUser(res);
    return res
  }

  /**
   * External App User Create
   * @param {*} app 
   * @returns 
   */
  const externalAppUserCreate = async (app) => {
    try {
      const res = await apiClient.client.post(`confd/1.1/users/${user.uuid}/external/apps/${app.label}`, app);
      return res
    } catch (e) {
      return e
    }
  }

  /**
   * External App User Update
   * @param {*} app 
   * @returns 
   */
  const externalAppUserUpdate = async (app) => {
    try {
      const res = await apiClient.client.put(`confd/1.1/users/${user.uuid}/external/apps/${app.label}`, app);
      return res
    } catch (e) {
      return e
    }
  }

  /**
   * External App User Delete
   * @param {*} app 
   * @returns 
   */
  const externalAppUserDelete = async (app) => {
    try {
      const res = await apiClient.client.delete(`confd/1.1/users/${user.uuid}/external/apps/${app.label}`);
      return res
    } catch (e) {
      return e
    }
  }

  return {
    externalApps,
    setExternalApps,
    externalApp,
    setExternalApp,
    externalAppsUser,
    setExternalAppsUser,
    externalAppUser,
    setExternalAppUser,
    externalAppsGet,
    externalAppGet,
    externalAppUpdate,
    externalAppsUserGet,
    externalAppsUserPageGet,
    externalAppUserGet,
    externalAppUserCreate,
    externalAppUserUpdate,
    externalAppUserDelete
  };
};

export default useExternalApps;
