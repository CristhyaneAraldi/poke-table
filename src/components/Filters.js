import React, { useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PokeContext from '../context/PokeContext';
import { selectors } from '../services';

import SelectForm from './SelectForm';
import InputForm from './InputForm';

// import { abilitiesMock as abilities, typesMock as types } from '../data';

function Filters() {
  // implemente o formulário controlado
  // const INITIAL_STATE = {
  //   name: '',
  //   ability: '',
  //   type: '',
  //   height: 0,
  //   weight: 0,
  // };
  // const [filter, setFilter] = useState(INITIAL_STATE);
  // // use as informações do estado
  // // implemente a função de gerar as listas de abilities e types
  // // acrescente as constantes relacionadas aos values dos elementos do form

  // const handleChange = (event) => {
  //   const { target } = event;
  //   const { name, value } = target;
  //   setFilter({
  //     ...filter,
  //     [name]: value });
  // };

  const [abilities, setAbilities] = useState([]);
  const [types, setTypes] = useState([]);

  const { pokemons, filter, handleChange } = useContext(PokeContext);

  useEffect(() => {
    const abilitiesArray = selectors(pokemons, 'abilities', 'ability');
    const typesArray = selectors(pokemons, 'types', 'type');
    setAbilities(abilitiesArray);
    setTypes(typesArray);
  }, [pokemons]);

  const { name, ability, type, height, weight } = filter;

  return (
    <section id="filter-section">
      <Form id="search-form">
        <InputForm
          setup={ ['text', 'Nome', 'name', name, handleChange] }
        />
        <SelectForm
          setup={ [abilities, 'Habilidade', 'ability', ability, handleChange] }
        />
        <SelectForm
          setup={ [types, 'Tipo', 'type', type, handleChange] }
        />
        <InputForm
          setup={ ['number', 'Altura mínima', 'height', height, handleChange] }
        />
        <InputForm
          setup={ ['number', 'Peso mínimo', 'weight', weight, handleChange] }
        />
      </Form>
    </section>
  );
}

export default Filters;
