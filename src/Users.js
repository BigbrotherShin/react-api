import React, { useState } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';
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

// 렌더링하는 시점이 아닌 사용자의 특정 인터랙션(클릭으로 로딩 등)에 따라 API 를 호출하고 싶을 땐
// promiseFn 대신 deferFn 을 사용하고, reload 대신 run 함수를 사용
function Users() {
  const [userId, setUserId] = useState(null);
  const { data: users, error, isLoading, reload, /*reload*/run } = useAsync({
    /*promiseFn*/deferFn: getUsers
  });

  if (isLoading) return <div>LOADING..</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return <button onClick={/*reload*/run}>불러오기</button>;

  return (
    <>
      <ul>
        {users.map(user => (
          <UserList key={user.id} onClick={() => setUserId(user.id)}>
            {user.username} ({user.name})
          </UserList>
        ))}
      </ul>
      <button onClick={reload}>Reloading</button>
      { userId && <User id={userId} />}
    </>
  );
}

export default Users;
