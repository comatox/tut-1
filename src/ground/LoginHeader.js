import React, { useState } from 'react';
import { connect } from 'react-redux';
import LoginAction from '../action/auth';

function LoginHeader({ authInfo, doLogin, doLogout }) {
    const [userInfo, setUserInfo] = useState({
        loginId: '',
        loginPassword: '',
    });
    const handleChangeUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo({
            ...userInfo,
            [name]: value,
        });
    };
    return (
        <div>
            {authInfo.isLoggedIn ? (
                <>
                    <div>{authInfo.loginId}번 사용자님 반갑습니다.</div>
                    <button
                        onClick={(e) => {
                            doLogout();
                            setUserInfo({ loginId: '', loginPassword: '' });
                        }}
                    >
                        로그아웃
                    </button>
                </>
            ) : (
                <>
                    <input
                        name='loginId'
                        value={userInfo.userId}
                        onChange={handleChangeUserInfo}
                    />
                    <input
                        name='loginPassword'
                        type='password'
                        value={userInfo.loginPassword}
                        onChange={handleChangeUserInfo}
                    />
                    <button
                        onClick={() =>
                            doLogin(userInfo.loginId, userInfo.loginPassword)
                        }
                    >
                        로그인
                    </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(LoginHeader);
