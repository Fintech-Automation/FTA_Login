import _ from 'lodash';
import { store } from '@redux/store';
import axios from 'axios';
import { openNotificationWithIcon } from '@components/help';
import notification from 'antd/es/notification';
import { queryURLString } from '@/components/help';

export const fetchSameDay = data =>
  axios.get('/api/v1/services/money-movement/request/pre_check/same_day', {
    params: { ...data },
  });
export const fetchUserPermissions = async (token, domain) => {
  try {
    const result = await axios.get(
      domain + `/api/v1/services/company/users/me/aggregate-permissions`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        params: {},
      }
    );

    let code = _.get(result, 'data.code');

    if (code >= 300) {
      return openNotificationWithIcon('error', _.get(result, 'data.errorMessage'));
    } else {
      let data = _.get(result, 'data.data');
      return data;
    }
  } catch (e) {
    return e;
  }
};
export const PassExtAuth = async (meta, network, contactid, currentuserid) => {
  if (meta.length === 0) {
    return openNotificationWithIcon(
      'error',
      'No Authorization',
      'Please contact administrator to set up authorization'
    );
  }
  var result = [];
  try {
    let client_id = _.get(meta[0], 'accloud__Client_Id__c');
    let client_secret = _.get(meta[0], 'accloud__Client_Secret__c');
    let domain = _.get(meta[0], 'accloud__Remote_Api_Domain__c');
    let entity = _.get(meta[0], 'accloud_Payment__Money_Movement_Entity_Name__c');
    let auth = window.btoa(client_id + ':' + client_secret);
    // console.log('auth', meta[0])
    var form = new FormData();
    form.append('grant_type', 'client_credentials');
    form.append('scope', 'crm');

    let selectId = contactid ? contactid : currentuserid;
    result = await axios
      .post(domain + '/api/v1/auth/tenant/oauth2/token?username=' + selectId, form, {
        headers: {
          Authorization: 'Basic ' + auth,
        },
      })
      .then(function (response) {
        // console.log('response'+response)
        let res = [];
        if (_.get(response, 'status') === 200) {
          res = _.get(response, 'data.data.accessToken');
        } else {
          res = [];
        }
        return res;
      });
    // console.log('auth2', result);
    return { result: result, domain: domain, entity: entity, network: network };
  } catch (e) {
    result = e;
  }
  return result;
};
export const RequestAuthMeta = (con, entity, contactid, currentuserid) => {
  var result = [];
  try {
    let connection = con ? con : store.getState().Auth.connection;
    if (entity) {
      result = connection
        .sobject('accloud__Community__c')
        .select(
          'Id, Name, accloud__Client_Id__c,accloud__Client_Secret__c, accloud__Remote_Api_Domain__c, accloud_Payment__Money_Movement_Entity_Name__c, accloud__Network_ID__c'
        )
        .where({
          name: entity,
        })
        .execute(function (err, data) {
          if (err) {
            return err;
          } else {
            return PassExtAuth(data, entity, contactid, currentuserid);
          }
        });
    } else {
      result = connection
        .sobject('accloud__Community__c')
        .select(
          'Id, Name, accloud__Client_Id__c,accloud__Client_Secret__c, accloud__Remote_Api_Domain__c, accloud_Payment__Money_Movement_Entity_Name__c, accloud__Network_ID__c'
        )
        .where({
          accloud__Internal_Site__c: true,
        })
        .execute(function (err, data) {
          if (err) {
            return err;
          } else {
            return PassExtAuth(data, entity, contactid, currentuserid);
          }
        });
    }

    return result;
  } catch (e) {
    result = e;
  }
  return result;
};
export async function signInApi(params) {
  return await fetch(
    `https://api-dev.fintechautomation.com/api/v1/auth/user/sign-in`,
    {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function sendMfaRequiredCodeApi(
  factorId,
  params,
) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/${factorId}/send${paramsString}`,
    {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function VerifyMfaRequiredCodeApi(
  factorId,
  params,
) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/${factorId}/verify${paramsString}`,
    {
      method: 'post',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function exchangeSessionUrlApi(params) {
  const paramsString = queryURLString(params);

  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/session/cookies${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function getUserPermissionsApi() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/sign-in`,
  );
};
export async function sendMfaCodeApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/sms6srmvsrgdj97z31d7/enroll${paramsString}`,
  );
};
export async function verifyMfaCodeApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/sms6srmvsrgdj97z31d7/verify${paramsString}`,
  );
};
export async function enrollSendSMSApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/factors/enroll/sms${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function enrollReSendSMSApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/factors/enroll/sms${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function enrollSendEmailApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/factors/enroll/email${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function enrollReSendEmailApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/factors/enroll/email${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function verifyFactorApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}}/api/v1/auth/user/factors/enroll/verify${paramsString}`,
    { method: 'post' },
  );
};
export async function forgetPasswordApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/forget-password${paramsString}`,
    { method: 'post' },
  );
};
export async function signUpSearchUserApi(params) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/signup/search-user`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
};
export async function signUpActivateUserApi(params) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/signup/activate`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    },
  );
};
export async function signUpResendSMSApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/signup/activate/sms/resend${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function signUpVerifySMSApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/signup/activate/verify${paramsString}`,
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
};
export async function resetPasswordExchangeTokenApi(params) {
  const paramsString = queryURLString(params);
  return await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL}/api/v1/auth/user/forget-password/exchange-token${paramsString}`,
  );
};