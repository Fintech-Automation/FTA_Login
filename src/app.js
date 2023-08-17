import React from 'react';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import 'antd/dist/antd.css';
import { Switch, Route  } from 'react-router-dom';
import Login from '@containers/Login/Login'
import NotFound from '@containers/Not-found/Not-found'
import Signup from '@containers/Signup/Signup'
import Enroll from '@containers/Enroll/Enroll'
import Verify from '@containers/Verify/Verify'
import PasswordExpired from '@containers/Password_expired/Password_expired'
import ForgetPassword from '@containers/ForgetPassword/ForgetPassword'

// logging as service
// Sentry.init({
//     dsn: "https://5bdf8c587ae241a9a9efab0972eddd5b@o511332.ingest.sentry.io/5608328",
//     integrations: [
//         new Integrations.BrowserTracing(),
//     ],
//
//     // We recommend adjusting this value in production, or using tracesSampler
//     // for finer control
//     tracesSampleRate: 1.0,
// });

// app body
const App = () => (
  // <Sentry.ErrorBoundary fallback={"An error has occurred"}>
  <Provider store={store}>
    <Switch>
      <Route exact path="/"> <Login /> </Route>
      <Route exact path="/login"> <Login /> </Route>

      <Route path="/not-found"> <NotFound /> </Route>
      <Route path="/enroll"> <Enroll /> </Route>
      <Route path="/password_expired"> <PasswordExpired /> </Route>
      <Route path="/signup"> <Signup /> </Route>
      <Route path="/verify"> <Verify /> </Route>
      <Route path="/forget-password"> <ForgetPassword /> </Route>
    </Switch>
  </Provider>
  // </Sentry.ErrorBoundary>
);

export default App;
