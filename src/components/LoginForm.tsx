import React, { FC, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { rules } from '../utils/rules';
import { AuthActionCreators } from '../store/reducers/auth/actionCreators';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';

export const LoginForm: FC = () => {
  const dispatch = useDispatch();
  const { error, isLoading } = useTypedSelector((state) => state.authReducer);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    dispatch(AuthActionCreators.login(username, password));
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={submit}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Form.Item
        label="Username"
        name="username"
        rules={[rules.required('Please input your username!')]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[rules.required('Please input your password!')]}
      >
        <Input.Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
