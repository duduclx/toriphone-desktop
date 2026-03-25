const useUserEvents = ({ contactsInternalGet, contactsFavoritesGet }) => {

    // user_call_permission_associated - confd
    const onUserCallpermissionAssociated = (data) => {
        console.log('user_call_permission_associated', data)
    }

    // user_call_permission_dissociated - confd
    const onUserCallpermissionDissociated = (data) => {
        console.log('user_call_permission_dissociated', data)
    }

    // user_created - confd
    const onUserCreated = (data) => {
        contactsInternalGet();
    }

    // user_deleted - confd
    const onUserDeleted = (data) => {
        contactsInternalGet();
        contactsFavoritesGet();
    }

    // user_edited - confd
    const onUserEdited = (data) => {
        contactsInternalGet();
        contactsFavoritesGet();
    }

    // user_external_app_created - confd
    const onUserExternalappCreated = (data) => {
        console.log('user_external_app_created', data)
    }

    // user_external_app_deleted - confd
    const onUserExternalappDeleted = (data) => {
        console.log('user_external_app_deleted', data)
    }

    // user_external_app_edited - confd
    const onUserExternalappEdited = (data) => {
        console.log('user_external_app_edited', data)
    }

    // user_fallback_edited - confd
    const onUserFallbackEdited = (data) => {
        console.log('user_fallback_edited', data)
    }

    // user_groups_associated - confd
    const onUserGroupsAssociated = (data) => {
        console.log('user_groups_associated', data)
    }

    // user_line_associated - confd
    const onUserLineAssociated = (data) => {
        console.log('user_line_associated', data)
    }

    // user_line_dissociated - confd
    const onUserLineDissociated = (data) => {
        console.log('user_line_dissociated', data)
    }

    // user_line_extension_created - confd
    const onUserLineExtensionCreated = (data) => {
        console.log('user_line_extension_created', data)
    }

    // user_line_extension_deleted - confd
    const onUserLineExtensionDeleted = (data) => {
        console.log('user_line_extension_deleted', data)
    }

    // user_line_extension_edited - confd
    const onUserLineExtensionEdited = (data) => {
        console.log('user_line_extension_edited', data)
    }

    // user_schedule_associated - confd
    const onUserScheduleAssociated = (data) => {
        console.log('user_schedule_associated', data)
    }

    // user_schedule_dissociated - confd
    const onUserScheduleDissociated = (data) => {
        console.log('user_schedule_dissociated', data)
    }

    // auth_session_deleted
    const onUserAuthSessionDeleted = (data) => {
        console.log('auth_session_deleted', data);
    }


  return {
    onUserCallpermissionAssociated,
    onUserCallpermissionDissociated,
    onUserCreated,
    onUserDeleted,
    onUserEdited,
    onUserExternalappCreated,
    onUserExternalappDeleted,
    onUserExternalappEdited,
    onUserFallbackEdited,
    onUserGroupsAssociated,
    onUserLineAssociated,
    onUserLineDissociated,
    onUserLineExtensionCreated,
    onUserLineExtensionDeleted,
    onUserLineExtensionEdited,
    onUserScheduleAssociated,
    onUserScheduleDissociated,
    onUserAuthSessionDeleted
  }
}

export default useUserEvents
