const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

class Adapter {
  static getTrainerInfo() {
    return fetch(TRAINERS_URL)
      .then(r => r.json());
  }

  static addPokemon(trainerId) {
    let data = {
      trainer_id: trainerId
    }

    return fetch(POKEMONS_URL, {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: "POST"
    })
    .then(r => r.json())
    .catch(error => console.log(error))
  }

  static releasePokemon(pokemonId) {
    let releasePokemonUrl = POKEMONS_URL + "/" + pokemonId
    return fetch(releasePokemonUrl, {
      method: "DELETE"
    })
      .then(r => r.json())
      .then(console.log)
      .catch(error => console.log(error))
  }
}
