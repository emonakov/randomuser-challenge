import { FC } from 'react';
import { Grommet } from 'grommet';
import { grommet } from 'grommet/themes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';

import UserList from './components/UserList';
import UserModal from './components/UserModal';
import Navigation from './components/Navigation';
import Settings from './components/Settings';
import UserModalProvider from './hooks/useUserModal';

const App: FC = () => {
  return (
    <Grommet full theme={grommet}>
      <UserModalProvider>
        <Router>
          <Navigation />
          <Switch>
            <Route path="/" exact>
              <UserList />
            </Route>
            <Route path="/settings" exact>
              <Settings />
            </Route>
          </Switch>
        </Router>
        <UserModal />
      </UserModalProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen />
      )}
    </Grommet>
  );
};

export default App;
