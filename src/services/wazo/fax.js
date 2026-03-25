const useFax = ({ Wazo }) => {

  const faxSend = async (extension, formData, callerId) => {
    try {
      const res = await Wazo.calld.sendFax(extension, formData, callerId);
      return res
    } catch (e) {
      return e;
    }
  };
  
  return {
    faxSend,
  };
};

export default useFax;
