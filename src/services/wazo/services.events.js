const useServicesEvents = ({ setUser }) => {

  // users_services_dnd_updated - confd
  const onUserServicesDndUpdated = (data) => {
    setUser((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        doNotDisturb: data.data.enabled,
      },
    }));
  };

  // users_services_incallfilter_updated - confd
  const onUserServicesIncallfilterUpdated = (data) => {
    console.log("users_services_incallfilter_updated", data);
  };

  return { onUserServicesDndUpdated, onUserServicesIncallfilterUpdated };
};

export default useServicesEvents;
