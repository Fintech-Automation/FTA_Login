import React, {useState} from 'react'
import {useHistory,useLocation} from "react-router-dom";
import {Form,Input,Button} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signInApi } from '@redux/API';
import { openNotificationWithIcon } from '../../components/help';
import './style.css';
import {CardWrapper} from '../../components/Card'

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const loacation = useLocation();
  const [ loading, setLoading ] = useState(false);

  // const statusHandlersMap = {
  //   [SignInStatus.success]: handleSuccessStatus,
  //   [SignInStatus.enroll]: handleEnrollStatus,
  //   [SignInStatus.required]: handleRequiredStatus,
  // };
  const handleSubmit = async (value) => {
    try {
      const { username, password } = value;
      setLoading(true);
      let params = {
        encodedUsername: btoa(username),
        encodedPassword: btoa(password),
        clientId: '0oa3hhli33H0ZGRIB1d7',
      };
      const fetchRes = await signInApi(params);
      const res = await fetchRes.json();

      if (!fetchRes.ok) {
        // dispatch(setLoggeOut());
        openNotificationWithIcon('error', {
          message: 'Failed',
          description: 'login failed',
        });
        return;
      }

      if (res.code !== 200) {
        // dispatch(setLoggeOut());
        openNotificationWithIcon('error', {
          message: 'Failed',
          description: res.errorMessage,
        });
        return;
      }

      if (res.code === 200 && res.data) {
        // const status = res.data.status;
        // const statusHandleFc = statusHandlersMap[status];
        // dispatch(setLoginStatus(status));
        // if (statusHandleFc) {
        //   statusHandleFc(res);
        // } else {
        //   openNotificationWithIcon('error', {
        //     message: 'Failed',
        //     description: res.errorMessage,
        //   });
        // }
      }
    } catch (error) {
      // dispatch(setLoggeOut());
    } finally {
      setLoading(false);
    }
  };
  const onFinish = (e) => {
    handleSubmit(e);
  }
  const handleSignUpClick = () => {
    history.push('signup');
  };
  const emailRe = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);

  return (
    <div className='login-wrapper'>
      <CardWrapper>
        <div className="w-full">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
          <div className="mt-4 w-full border-b border-solid border-gray-200"></div>
        </div>
        <div className="mt-10 w-full">
          <Form name="normal_login" className="login-form" onFinish={onFinish}>
            <Form.Item
              name="username"
              style={{width: 400}}
              rules={[
                {
                  required: true,
                  message: 'Invalid email address!',
                  pattern: emailRe,
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className="site-form-item-icon"
                    style={{ color: '#DEDEDE' }}
                  />
                }
                placeholder="Username"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              style={{width: 400}}
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input.Password
                prefix={
                  <LockOutlined
                    className="site-form-item-icon"
                    style={{ color: '#DEDEDE' }}
                  />
                }
                placeholder="Password"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <div className="operation-button mt-6">
                <Button
                  tabIndex={0}
                  type="default"
                  loading={loading}
                  htmlType="submit"
                  // className={lgBtnGrayClass}
                >
                  Sign In
                </Button>
                <p className="mt-4 h-6 w-full text-center leading-6">OR</p>
                <Button
                  type="default"
                  onClick={handleSignUpClick}
                  // className={lgBtnSkyClass}
                >
                  Sign Up
                </Button>
              </div>
            </Form.Item>
          </Form>
          <p className="mt-10 text-center text-sm text-gray-500">
            <a
              href="forget-password"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Forget password?
            </a>
          </p>
        </div>
      </CardWrapper>
    </div>
  )
}
