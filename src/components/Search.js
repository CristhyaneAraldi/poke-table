import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';

function Search() {
  // crie o estado controlado
  const INITIAL_NUM = 10;
  const [number, setNumber] = useState(INITIAL_NUM);

  // use a função callback do estado que dispara a ação do botão
  return (
    <section id="draw-section">
      <Form id="draw-form">
        <FloatingLabel
          htmlFor="pokeqtd"
          label="Quantidade"
        >
          <Form.Control
            id="pokeqtd"
            type="number"
            max="150"
            min="1"
            value={ number }
            placeholder="1 a 150"
            // implemente o input controlado
            onChange={ (event) => setNumber(event.target.value) }
          />
        </FloatingLabel>
        <Button
          type="button"
          variant="primary"
          // implemente a ação
        >
          Sortear
        </Button>
      </Form>
    </section>
  );
}

export default Search;
