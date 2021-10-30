// A service 'fetchPokemons' busca pela quantidade 'qtd' de Pokémons aleatoriamente
// da API https://pokeapi.co/ - PokéApi The RESTFul Pokémon API.
// Se não passar o parâmetro 'qtd' a service retornará 'QTD_DEFAULT' Pokémons (15)

const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

const ERROR_FETCH = 'Falha na resposta da requisição... tente mais tarde!';
const ERROR_FUNCTION = 'Falha na função da requisição...';

const QTD_DEFAULT = 15;

export default async function fetchPokemons(qtd = QTD_DEFAULT) {
  try {
    const firstFetch = await fetch(`${POKEAPI_URL}/?limit=1`);
    if (firstFetch.ok) {
      const { count } = await firstFetch.json();
      const array = new Array(Number(qtd)).fill('');
      const offsets = array.reduce((acc) => {
        let offset = Math.ceil(Math.random() * count);
        while (acc.includes(offset)) {
          offset = Math.ceil(Math.random() * count);
        }
        acc.push(offset);
        return acc;
      }, []);
      // console.log(offsets);

      const list = await Promise.all(offsets.map(async (offset) => {
        const secondFetch = await fetch(`${POKEAPI_URL}/?offset=${offset}&limit=1`);
        const { results: [object] } = await secondFetch.json();
        return object;
      }));
      // console.log(list);

      const pokemons = await Promise.all(list.map(async ({ url }) => {
        const thirdFetch = await fetch(url);
        const pokemonDetails = await thirdFetch.json();
        return pokemonDetails;
      }));
      // console.log(pokemons);
      return pokemons;
    }
    throw new Error(ERROR_FETCH);
  } catch (err) {
    if (err.message !== ERROR_FETCH) {
      throw new Error(ERROR_FUNCTION);
    }
    throw err;
  }
}

// https://oieduardorabelo.medium.com/javascript-armadilhas-do-asyn-await-em-loops-1cdad44db7f0
