// 데이터를 요청해야 할 때마다 리듀서를 작성하는 것은 번거로운 일.
// 매번 반복되는 코드를 작성하는 대신에, 커스텀 Hook 을 만들어서 요청 상태 관리 로직을 쉽게 재사용하는 방법

import { useReducer, useEffect, useCallback } from 'react';

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

// useAsync 함수는 두가지 파라미터를 받아옵니다. 첫번째 파라미터는 API 요청을 시작하는 함수이고,
// 두번째 파라미터는 deps 인데 이 deps 값은 해당 함수 안에서 사용하는 useEffect 의 deps 로 설정됩니다.

// 이 값은 나중에 우리가 사용 할 비동기 함수에서 파라미터가 필요하고, 그 파라미터가 바뀔 때 새로운 데이터를 불러오고 싶은 경우에 활용 할 수 있습니다
// (현재 Users 컴포넌트에서는 불필요한 부분입니다). 이 값의 기본값은 [] 입니다. 즉, 컴포넌트가 가장 처음 렌더링 할 때만 API 를 호출하고 싶다는 의미.

// 이 Hook 에서 반환하는 값은 요청 관련 상태와, fetchData 함수입니다.
// 이렇게 fetchData 함수를 반환하여서 나중에 데이터를 쉽게 리로딩을 해줄 수 있습니다.

function useAsync(callback, deps = [], skip = false) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = useCallback(async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data })
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }, [callback]);

  useEffect(() => {
    if (skip) {
      return;
    }
    fetchData();
    // eslint-disable-next-line
  }, deps)

  return [state, fetchData];
}

export default useAsync;