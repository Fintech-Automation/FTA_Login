import { openNotificationWithIcon } from '@components/help';
import { fetchUserPermissions, RequestAuthMeta } from '@redux/API';
import { jsforceResponse } from '@/config/httpService';
import { Connection } from 'jsforce';
import _ from 'lodash';
import { store } from '@redux/store';
import AuthActions from '@redux/Auth/actions';

const handlePermissions = async (token, domain) => {
  let permissions = await fetchUserPermissions(token, domain);
  if (!permissions) {
    openNotificationWithIcon('error', 'do not have permissions');
  } else {
    const MM_permissions = permissions.filter(e => {
      return e?.moduleName === 'Banking' && (e?.pageName === 'Transfer' || e?.pageName === 'Transfer_Bank_to_Wallet' || e?.pageName === 'Transfer_Wallet_to_Bank');
    });
    store.dispatch(AuthActions.PermissionSets(MM_permissions));
    store.dispatch(AuthActions.Permissions(permissions));
  }
};

const readMessage = async (e, paas = false) => {
  const canIRender = paas || (e.data.session && e.isTrusted && (e.data.type === 'PaymentTransfer' ||
  e.data.type === 'PaymentTransferIn' || e.data.type === 'PaymentTransferOut'))
  if (canIRender) {
    if (e.data.type === 'PaymentTransferIn') {
      store.dispatch(AuthActions.SelectedPage('PaymentTransferIn'))
    }
    if (e.data.type === 'PaymentTransferOut') {
      store.dispatch(AuthActions.SelectedPage('PaymentTransferOut'))
    }
    if (e.data && e.data.themeColor && e.data.themeColor.isBySet) {
      let themeColor = e.data?.themeColor;
      store.dispatch(AuthActions.SetThemeColor(themeColor))
    }
    if (e.data && e.data.buttonColor) {
      let color = e.data?.buttonColor
      store.dispatch(AuthActions.SelectedColor(color))
    }
    if (e.data.platform === 'bubble') {
      return readMessageForBubble(e);
    } else {
      return readMessageForNormal(e);
    }
  }
};

const readMessageForNormal = async e => {
  let token = e.data?.session;
  let server_url = e.data?.server_url;
  let instance_url = e.data?.instance_url;
  let entity = e.data?.entityId;
  let internalContactId = e.data?.internalcontactid;
  let contactId = e.data?.usercontactid;
  let user_result = [];

  if (internalContactId) {
    user_result = internalContactId;
  } else if (contactId) {
    user_result = contactId;
  } else {
    return openNotificationWithIcon('error', 'Missing UserId or ContactId');
  }
  let connection;
  connection = new Connection({
    accessToken: token,
    instanceUrl: instance_url,
    proxyUrl: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_PROXY_INSTANCE : '',
  });
  let result = await RequestAuthMeta(connection, entity, user_result, user_result);

  result = jsforceResponse(result, '', false, true);
  const token2 = _.get(result, 'result');
  const network = _.get(result, 'network');
  const domain = _.get(result, 'domain');
  const entity1 = _.get(result, 'entity');
  await handlePermissions(token2, domain);
  store.dispatch(AuthActions.SelectedCurrentUser(e.data.userId));
  let tokenData = {
    connection: connection,
    meta: token2,
    domain: domain,
    instance_url: instance_url,
    contactid: user_result,
    network: network,
    entity: entity1,
    platform: e.data?.platform,
    internal: true,
    isInClientView: true
  };
  store.dispatch(AuthActions.AuthMetaSuccess(tokenData));
  // store.dispatch(AuthActions.AuthTokenRequest(token2));
  return result;
};

const readMessageForBubble = async e => {
  let token = e.data?.session;
  let server_url = e.data?.server_url;
  let instance_url = e.data?.instance_url;
  let entity = e.data?.entityId;
  let internalContactId = e.data?.internalcontactid;
  let contactId = e.data?.usercontactid;
  let user_result = [];

  if (internalContactId) {
    user_result = internalContactId;
  } else if (contactId) {
    user_result = contactId;
  } else {
    return openNotificationWithIcon('error', 'Missing UserId or ContactId');
  }
  let tokenData = {
    meta: token,
    domain: server_url,
    instance_url: instance_url,
    contactid: user_result,
    platform: e.data?.platform,
    internal: true,
    isInClientView: true
  };
  await handlePermissions(token, server_url);
  // store.dispatch(AuthActions.AuthTokenRequest(token));
  store.dispatch(AuthActions.AuthMetaSuccess(tokenData));
  return true;
};

const rootAuth = async (authParams) => {
  if (process.env.NODE_ENV === 'development') {
    const message = {
      isTrusted: true,
      data: {
        session: process.env.REACT_APP_TOKEN,
        instance_url: process.env.REACT_APP_INSTANCE,
        internalcontactid: '0038c00002lQanwAAC',
        server_url: process.env.REACT_APP_BACKEND_URL,
        type: 'PaymentTransfer',
        userId: '0038c00002lQanwAAC',
        platform: 'bubbledev',
        buttonColor: '#26A6DD',
        internal: true,
        // entityId: 'devtest',
        isInClientView: true
      },
    };
    return new Promise(async (resolve, reject) => {
      const result = await readMessage(message);
      if ((result ?? '') !== '') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  return new Promise((resolve, reject) => {
    const settimeout = setTimeout(() => {
      clearInterval(setinterval);
      reject(false);
    }, 150000);
    const setinterval = setInterval(() => {
      window.postMessage({ isCheckLoaded: true }, '*');
    }, 1000);

    const judgeStatus = async e => {
      if (e.data.type === 'PaymentTransfer') {
        clearInterval(setinterval);
      }
      const result = await readMessage(authParams || e, !!authParams);
      if ((result ?? '') !== '') {
        clearTimeout(settimeout);
        window.removeEventListener('message', judgeStatus);
        resolve(true);
      }
    };
    window.addEventListener('message', judgeStatus);
  });
};

export default rootAuth;
