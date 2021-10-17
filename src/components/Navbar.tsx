import { FC } from 'react';
import { Layout, Row, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import { RouteNames } from '../routes';

import { useTypedSelector } from '../hooks/useTypedSelector';

export const Navbar: FC = () => {
  const router = useHistory();
  const { isAuth } = useTypedSelector((state) => state.authReducer);

  return (
    <Layout.Header>
      <Row justify="end">
        {isAuth ? (
          <>
            <div style={{ color: 'white' }}>Alex</div>
            <Menu theme="dark" mode="horizontal" selectable={false}>
              <Menu.Item key={1} onClick={() => console.log('exit')}>
                Exit
              </Menu.Item>
            </Menu>
          </>
        ) : (
          <Menu theme="dark" mode="horizontal" selectable={false}>
            <Menu.Item key={1} onClick={() => router.push(RouteNames.LOGIN)}>
              Login
            </Menu.Item>
          </Menu>
        )}
      </Row>
    </Layout.Header>
  );
};
