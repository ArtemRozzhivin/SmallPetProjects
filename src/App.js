import React, { useState, useEffect } from 'react';
import './index.scss';

import Collection from './Components/Collection';
import Loader from './Components/Loader/Loader.jsx';

const collect = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [collections, setCollections] = useState([]);
  const [searchCollection, setSearchCollection] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const category = activeCategory ? `category=${activeCategory}` : '';
    const pagination = `page=${page}&limit=3`;
    setIsLoading(true);
    fetch(`https://63209946e3bdd81d8efe0ca3.mockapi.io/Photos?${pagination}&${category}`)
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.log('Возникла ошибка в получении даных', err);
      })
      .finally(() => setIsLoading(false));
  }, [activeCategory, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {collect.map((obj, index) => (
            <li
              onClick={() => setActiveCategory(index)}
              className={activeCategory === index ? 'active' : ''}
              key={obj.name}
            >
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchCollection}
          onChange={(e) => setSearchCollection(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="content">
          {collections
            .filter((obj) => obj.name.toLowerCase().includes(searchCollection.toLowerCase()))
            .map((obj, index) => (
              <Collection key={index} name={obj.name} images={obj.photos} />
            ))}
        </div>
      )}

      <ul className="pagination">
        {[...Array(5)].map((item, index) => (
          <li
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={page === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// сделать пагинацию
