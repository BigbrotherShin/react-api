import React from 'react';
import Users from './Users';
import { UsersProvider } from './UsersContext';

function App() {
  return (
    <UsersProvider> {/* 이렇게 Users를 Provider로 감싸주어야만 useUsersDispatch와 useUsersState 사용 가능 */}
      <Users />
    </UsersProvider>
  );
}

export default App;
