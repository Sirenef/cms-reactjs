import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, Form } from 'antd';

import apiConfig from '@constants/apiConfig';
import { setCacheAccessToken } from '@services/userService';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import InputTextField from '@components/common/form/InputTextField';

const message = defineMessages({
    username: 'Username',
    password: 'Password',
    login: 'Login',
});

import styles from './index.module.scss';
import { accountActions } from '@store/actions';
import useAuth from '@hooks/useAuth';
import useFetch from '@hooks/useFetch';
import useFetchAction from '@hooks/useFetchAction';
import Title from 'antd/es/typography/Title';
import { showErrorMessage } from '@services/notifyService';
import { brandName } from '@constants';

const LoginPage = () => {
    const intl = useIntl();
    const { execute, loading } = useFetch(apiConfig.account.login, {});
    const { execute: executeGetProfile } = useFetchAction(accountActions.getProfile, {
        loading: useFetchAction.LOADING_TYPE.APP,
    });
    const { profile } = useAuth();

    const onFinish = (values) => {
        execute({
            data: values,
            onCompleted: (res) => {
                setCacheAccessToken(res.data?.token);
                executeGetProfile();
                console.log(res);
            },
            onError: ({ message }) => showErrorMessage(message),
        });
    };

    return (
        <div className={styles.loginPage}>
            <div className={styles.loginForm}>
                <Title level={3}>{intl.formatMessage(message.login).toUpperCase()}</Title>
                <Form
                    name="login-form"
                    onFinish={onFinish}
                    initialValues={{
                        username: 'admin',
                        password: 'admin123654',
                    }}
                    layout="vertical"
                >
                    <InputTextField
                        name="username"
                        inputProps={{ prefix: <UserOutlined /> }}
                        // label={intl.formatMessage(message.username)}
                        placeholder={intl.formatMessage(message.username)}
                        size="large"
                        required
                    />
                    <InputTextField
                        name="password"
                        inputProps={{ prefix: <LockOutlined /> }}
                        // label={intl.formatMessage(message.password)}
                        placeholder={intl.formatMessage(message.password)}
                        size="large"
                        required
                        type="password"
                    />

                    <Button type="primary" size="large" loading={loading} htmlType="submit" style={{ width: '100%' }}>
                        {intl.formatMessage(message.login)}
                    </Button>
                    <center className="s-mt4px">
                        <small>
                            {brandName} - © Copyright {new Date().getFullYear()}. All Rights Reserved
                        </small>
                    </center>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
