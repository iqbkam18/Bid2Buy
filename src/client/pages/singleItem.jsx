import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export const SingleItem = () => {
  const [item, setItem] = useState({});
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSingleITem();
  }, []);

  const fetchSingleITem = async () => {
    const url = `/api/item/${params.id}`;
    let response;
    try {
      response = await fetch(url, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setItem(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      return;
    }
  };

  if (isLoading) {
    return 'Loading';
  }
  return (
    <div>
      <div className='flex-end'>
        <Link className='btn' to='/'>
          Go Back
        </Link>
      </div>
      <h2>{item.title}</h2>
      <h3>{item.price}</h3>
      <img src={item.image} alt={item.title} className='item' />
      <p>{item.description}</p>

      <br />
    </div>
  );
};
