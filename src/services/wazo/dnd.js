const useDnd = ({ Wazo }) => {

  /**
   * DND Toggle
   * @param {*} user 
   * @param {*} checked 
   */
  const doNotDisturbToggle = (user, checked) => {
    Wazo.confd.updateDoNotDisturb(user.uuid, checked);
  };

  return { doNotDisturbToggle };
};

export default useDnd;
