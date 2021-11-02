import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import PokeContext from './PokeContext';
import { fetchPokemons } from '../services/index';

function PokeProvider(props) {
  const INITIAL_STATE = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };

  const INITIAL_ERROR = {
    hasError: false,
    message: '',
  };
  const [filter, setFilter] = useState(INITIAL_STATE);
  const [pokemons, setPokemons] = useState([]);
  const [error, setError] = useState(INITIAL_ERROR);
  const [isFetching, setIsFetching] = useState(false);
  const [pokeRender, setPokeRender] = useState([]);

  const { name, ability, type, height, weight } = filter;

  useEffect(() => {
    let arrayPokemons = [...pokemons];
    if (name !== '') {
      arrayPokemons = arrayPokemons.filter(({ name: nam }) => nam.includes(name));
    }
    setPokeRender(arrayPokemons);
  }, [filter]);

  const handleChange = (event) => {
    const { target } = event;
    const { name: nameInput, value } = target;
    setFilter({
      ...filter,
      [nameInput]: value });
  };

  const getPokemons = async (quantity) => {
    try {
      setIsFetching(true);
      const result = await fetchPokemons(quantity);
      setPokemons(result);
      setIsFetching(false);
    } catch (err) {
      setIsFetching(true);
      setError({ hasError: true, message: err.message });
      setIsFetching(false);
    }
  };

  const context = {
    filter,
    error,
    pokemons,
    isFetching,
    pokeRender,
    handleChange,
    getPokemons,
  };

  const { children } = props;
  return (
    <PokeContext.Provider value={ context }>
      { children }
    </PokeContext.Provider>
  );
}

PokeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PokeProvider;

// const { provider, consumer } = PokeProvider;
