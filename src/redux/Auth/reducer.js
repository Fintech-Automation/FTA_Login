import actions from './actions';
import _ from 'lodash';
const initState = {
  connection: [],
  tab: '0',
  meta: null,
  SelectedCurrentUser: null,
  permissions: [],
  permissionSets: {},
  domain: null,
  entity: null,
  instance_url: null,
  networkname: null,
  userContactId: null,
  SelectedPage: null
};

export default function AuthReducer(state = initState, action) {
  switch (action.type) {
    case actions.Auth_REQUEST:
      return {
        ...state,
        connection: action.payload.connection,
      };
    case actions.Auth_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case actions.Auth_Meta_Success:
      console.log('Auth_Meta_Success', action);
      return {
        ...state,
        meta: _.get(action.payload.data, 'meta'),
        domain: _.get(action.payload.data, 'domain'),
        entity: _.get(action.payload.data, 'entity'),
        internal: _.get(action.payload.data, 'internal'),
        instance_url: _.get(action.payload, 'instance_url'),
        networkname: _.get(action.payload.data, 'network'),
        connection: _.get(action.payload.data, 'connection'),
        contactid: _.get(action.payload.data, "contactid"),
        platform: _.get(action.payload.data, "platform"),
        isInClientView: _.get(action.payload.data, "isInClientView"),
      };
    case actions.Selected_Tab:
      return {
        ...state,
        tab: action.payload.tab,
      };
    case actions.SELECTED_CURRENT_USER:
      return {
        ...state,
        SelectedCurrentUser: action.payload.record,
      };
    case actions.PERMISSIONS:
      return {
        ...state,
        permissions: action.payload.record,
      };
    case actions.PEMISSIONSETS:
      return {
        ...state,
        permissionSets: action.payload.record,
      };
    case actions.USER_CONTACT_ID:
      return {
        ...state,
        userContactId: action.payload.record,
      };
    case actions.SET_THEME_COLOR:
      return {
        ...state,
        ThemeColor: { ...state.ThemeColor, ...action.payload.data },
      };
    case actions.Selected_Color:
      return {
        ...state,
        SelectedColor: action.payload.record,
      };
    case actions.Selected_Page:
      return {
        ...state,
        SelectedPage: action.payload.record,
      };
    default:
      return state;
  }
}
