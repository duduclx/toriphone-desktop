const useUsers = ({ apiClient }) => {

  /**
   * User Get By Uuid
   * @param {*} userUuid
   * @returns
   */
  const userGetByUuid = async (userUuid) => {
    try {
      const res = await apiClient.client.get(`confd/1.1/users/${userUuid}`);
      const userWithName = {...res, name: res.firstname + " " + res.lastname}
      return userWithName;
    } catch (e) {
      return e;
    }
  };

  /**
   * User Search
   * @param {*} term 
   * @returns 
   */
  const userSearch = async (term) => {
    if (term.trim() === "") {
      return [];
    }
    try {
      const get = await Wazo.dird.search("default", term);
      if (get.length === 0) {
        return [];
      } else {
        const filteredResult = get.filter((item) => item.backend == "wazo");
        return filteredResult;
      }
    } catch (error) {
      return [];
    }
  };

  return {
    userGetByUuid,
    userSearch
  };
};

export default useUsers;
