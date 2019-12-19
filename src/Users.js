import React, { useState } from 'react';
import User from './User';
import styled, { css } from 'styled-components';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';

const UserList = styled.li`
  &:hover {
    cursor: pointer;
  }
  ${props =>
    props.check &&
    css`
      font-weight: bold;
    `}
`;

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { loading, data: users, error } = state.users;

  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>LOADING..</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <UserList
            check={userId === user.id}
            key={user.id}
            onClick={() => setUserId(userId === user.id ? null : user.id)}
          >
            {user.username} ({user.name})
          </UserList>
        ))}
      </ul>
      <button onClick={fetchData}>Reloading</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
