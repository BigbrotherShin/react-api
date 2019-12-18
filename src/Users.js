import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

// 상태를 관리하게 될 때 useState 를 사용하는것 말고도 다른 방법이 있습니다.
// 바로, useReducer 를 사용하는건데요, 이 Hook 함수를 사용하면 컴포넌트의 상태 업데이트 로직을 컴포넌트에서 분리시킬 수 있습니다.
// 상태 업데이트 로직을 컴포넌트 바깥에 작성 할 수도 있고, 심지어 다른 파일에 작성 후 불러와서 사용 할 수도 있지요.

// reducer 는 현재 상태와 액션 객체를 파라미터로 받아와서 새로운 상태를 반환해주는 함수
// reducer 에서 반환하는 상태는 곧 컴포넌트가 지닐 새로운 상태가 됩니다.
// 여기서 action 은 업데이트를 위한 정보를 가지고 있습니다.

// LOADING, SUCCESS, ERROR
function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// useReducer 의 사용법
// const [state, dispatch] = useReducer(reducer, initialState);

// 여기서 state 는 우리가 앞으로 컴포넌트에서 사용 할 수 있는 상태를 가리키게 되고,
// dispatch 는 액션을 발생시키는 함수라고 이해하시면 됩니다.
// 이 함수는 다음과 같이 사용합니다: dispatch({ type: 'INCREMENT' }).

// 그리고 useReducer 에 넣는 첫번째 파라미터는 reducer 함수이고, 두번째 파라미터는 초기 상태입니다.

function Users() {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users',
      );
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { loading, data: users, error } = state;

  if (loading) return <div>LOADING..</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return null;

  return (
    <>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>Reloading</button>
    </>
  );
}

export default Users;
