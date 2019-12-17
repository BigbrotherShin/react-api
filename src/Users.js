import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(null);
        setError(null);
        setLoading(true);
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/users/asdfasd',
        );
        setUsers(response.data); // response.data로 결과 조회
      } catch (e) {
        console.error(e.response.status);
        setError(e);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>LOADING..</div>;
  if (error) return <div>ERROR!!!</div>;
  if (!users) return null;

  return (
    <ul>
      {users.map(user => (
        <li key={user.id}>
          {user.username} ({user.name})
        </li>
      ))}
    </ul>
  );
}

export default Users;
