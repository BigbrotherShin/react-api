import React, { useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';
import styled, { css } from 'styled-components';

const UserList = styled.li`
  &:hover {
    cursor: pointer;
  }
  &:active {
    font-weight: bold;
  }
`;

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

function Users() {
  const [state, refetch] = useAsync(getUsers, [], true);
  const [userId, setUserId] = useState(null);

  const { loading, data: users, error } = state;

  if (loading) return <div>LOADING..</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return <button onClick={refetch}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <UserList key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </UserList>
        ))}
      </ul>
      <button onClick={refetch}>Reloading</button>
      { userId && <User id={userId} />}
    </>
  );
}

export default Users;
