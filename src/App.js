import React, { useState, useEffect } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isInvated, setInvated] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((err) => {
        console.log(err);
        alert('Ошибка в получение пользователей!');
      })
      .finally(() => setLoading(false));
  }, []);

  const changeSetSearch = (event) => {
    setSearch(event.target.value);
  };

  const changeSetInvated = (id) => {
    if (isInvated.includes(id)) {
      setInvated((prev) => prev.filter((invateId) => invateId !== id));
    } else {
      setInvated((prev) => [...prev, id]);
    }
  };

  return (
    <div className="App">
      {success ? (
        <Success count={isInvated.length} />
      ) : (
        <Users
          setSuccess={setSuccess}
          isInvated={isInvated}
          changeSetInvated={changeSetInvated}
          search={search}
          changeSetSearch={changeSetSearch}
          items={users}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default App;

// сделать поиск по имени и емейле пользователя
// сделать подгрузку скелетона
//
