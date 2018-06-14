const Trainer = (function createTrainerClass() {
let all = [];
  return class Trainer {
    constructor({id, name, pokemons}) {
      this.id = id
      this.name = name
      this.pokemons = pokemons
      all.push(this)

      // let newPokemons = pokemons.map(function(pokemon) {
      //   return new Pokemon(pokemon)
      // })
      //
      // this.pokemons = newPokemons
    }

    htmlTemplate(){
      const pokemonTemplates = this.pokemons
        .map(pokemon => `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`).join('')

      return `
      <div class="card" data-id="${this.id}"><p>${this.name}</p>
        <button data-trainer-id="${this.id}">Add Pokemon</button>
        <ul>
          ${pokemonTemplates}
        </ul>
      </div>
    `
    }

    static find(id){
      return all.find(trainer => trainer.id === parseInt(id,10))
    }

    addPokemonToArray(obj){
      if (this.pokemons.length < 6){
        this.pokemons.push(obj)
      }
    }

  }
})()
