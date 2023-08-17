import {Result, Spin} from 'antd';
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import rootAuth from './rootAuth';
import {IndexWrapper} from './IndexWrapper';
import {HashRouter} from 'react-router-dom';

const Index = ({ authParams = null }) => {
  const [randDom, setRandDom] = useState();
  useEffect(() => {
    const init = () => {
      return rootAuth(authParams).then(status => {
        console.log('stepThree', status);
        return status;
      });
    };
    init()
      .then(status => {
        console.log('stepFour', status);
        let _randDom = <Result status="warning" title="There is something wrong with token" />;
        if (status) {
          _randDom = <App />;
        }
        setRandDom(_randDom);
      })
      .catch(err => {
        if (process.env.NODE_ENV === 'development') {
          console.error(err);
        }
      });
  }, []);
  return (
    <IndexWrapper>
      <HashRouter>
        {
          <Spin spinning={!randDom} className="indexSpin" size="large">
            <div className="indexContainer">{randDom}</div>
          </Spin>
        }
      </HashRouter>
    </IndexWrapper>
  );
};

export default Index
