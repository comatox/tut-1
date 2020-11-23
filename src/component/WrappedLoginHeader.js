import { Button, Form, Icon, Input } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoginAction from '../action/auth';

function LoginHeader({ authInfo, doLogin, doLogout, form }) {
  // const [userInfo, setUserInfo] = useState({
  //   loginId: '',
  //   loginPassword: '',
  // });
  // const handleChangeUserInfo = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo({
  //     ...userInfo,
  //     [name]: value,
  //   });
  // };

  const { getFieldDecorator, getFieldsValue, resetFields } = form;
  const { loginId, loginPassword } = getFieldsValue();

  console.log(getFieldsValue());

  return (
    <div className="login-area">
      {authInfo.isLoggedIn ? (
        <>
          <div>{authInfo.loginId}번 사용자님 반갑습니다.</div>
          <button
            onClick={(e) => {
              doLogout();
              resetFields();
            }}
          >
            로그아웃
          </button>
        </>
      ) : (
        <>
          <Form
            layout="inline"
            onSubmit={(e) => {
              e.preventDefault();
              doLogin(loginId, loginPassword);
            }}
          >
            <Form.Item>
              {getFieldDecorator('loginId')(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="login id"
                  className="ant-input"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('loginPassword')(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="login password"
                  className="ant-input"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                로그인
              </Button>
            </Form.Item>
          </Form>
          {authInfo.error !== null && (
            <div className="login-error-message">{authInfo.error}</div>
          )}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({ authInfo: state.auth });
const mapDispatchToProps = (dispatch) => ({
  doLogin: (loginId, loginPassword) => {
    dispatch(LoginAction.actions.authLogin(loginId, loginPassword));
  },
  doLogout: () => {
    dispatch(LoginAction.actions.authLogout());
  },
});

const WrappedLoginHeader = Form.create({ name: 'login-header' })(LoginHeader);
export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginHeader);
