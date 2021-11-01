import PropTypes from 'prop-types';
import React, { useState } from 'react';
import PokeContext from './PokeContext';

function PokeProvider(props) {
  const INITIAL_STATE = {
    name: '',
    ability: '',
    type: '',
    height: 0,
    weight: 0,
  };
  const [filter, setFilter] = useState(INITIAL_STATE);
  // use as informações do estado
  // implemente a função de gerar as listas de abilities e types
  // acrescente as constantes relacionadas aos values dos elementos do form

  const handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    setFilter({
      ...filter,
      [name]: value });
  };

  const context = {
    filter,
    handleChange,
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
