const actions = {
  Auth_REQUEST: 'Auth_REQUEST',
  Auth_ERROR: 'Auth_ERROR',
  Selected_Tab: 'Selected_Tab',
  Auth_Meta_Success: 'Auth_Meta_Success',
  RecordType_SUCCESS: 'RecordType_SUCCESS',
  SELECTED_CURRENT_USER: 'SELECTED_CURRENT_USER',
  PERMISSIONS: 'PERMISSIONS',
  PEMISSIONSETS: 'PERMISSIONSETS',
  userContactId: null,
  Selected_Color: 'Selected_Color',
  SET_THEME_COLOR: 'SET_THEME_COLOR',
  Selected_Page: 'Selected_Page',
  AuthRequest: (connection, entity, instance_url, contactid, userid, result) => ({
    type: actions.Auth_REQUEST,
    payload: { connection, entity, instance_url, contactid, userid, result },
  }),
  AuthError: error => ({
    type: actions.Auth_ERROR,
    payload: { error },
  }),
  SelectedTab: tab => ({
    type: actions.Selected_Tab,
    payload: { tab },
  }),
  AuthMetaSuccess: data => ({
    type: actions.Auth_Meta_Success,
    payload: { data },
  }),
  RecordTypeSuccess: data => ({
    type: actions.RecordType_SUCCESS,
    payload: { data },
  }),
  SelectedCurrentUser: record => ({
    type: actions.SELECTED_CURRENT_USER,
    payload: { record },
  }),
  Permissions: record => ({
    type: actions.PERMISSIONS,
    payload: { record },
  }),
  PermissionSets: record => ({
    type: actions.PEMISSIONSETS,
    payload: { record },
  }),

  USER_CONTACT_ID: 'USER_CONTACT_ID',
  UserContactId: record => ({
    type: actions.USER_CONTACT_ID,
    payload: { record },
  }),
  SetThemeColor: record => ({
    type: actions.Selected_Color,
    payload: { record },
  }),
  SelectedColor: (record) => ({
    type: actions.Selected_Color,
    payload: { record },
  }),
  SelectedPage: (record) => ({
    type: actions.Selected_Page,
    payload: { record },
  }),
};

export default actions;
