document.addEventListener('DOMContentLoaded', init)

function init() {
  document.addEventListener('click', handleClickEvent)

  const trainerData = Adapter.getTrainerInfo()
    .then(renderTrainers)
}

function renderTrainers(trainerObjsArray) {
  const mainEl = document.querySelector("main")
  const trainerTemplates = trainerObjsArray
    .map((trainer) => new Trainer(trainer))
    .map((trainer) => trainer.htmlTemplate())
    .join('')

    mainEl.innerHTML = trainerTemplates
}

function handleClickEvent(e) {
  if (e.target.dataset.trainerId) {
    let pokemonTrainer = Trainer.find(e.target.dataset.trainerId)
    console.log(`Can I add pokemon to trainer: ${pokemonTrainer}? They have ${pokemonTrainer.pokemons.length} pokemons`)
    if (pokemonTrainer.pokemons.length < 6){
      console.log(`I'm adding a pokemon to trainer id: ${e.target.dataset.trainerId}!`)
      Adapter.addPokemon(pokemonTrainer.id)
        .then(r => pokemonTrainer.addPokemonToArray(r))
        .then(Adapter.getTrainerInfo)
        .then(renderTrainers)
    } else {
      alert("This trainer has too many pokemon!")
    }
  } else if (e.target.dataset.pokemonId) {
    let pokemonId = e.target.dataset.pokemonId
    let trainerId = e.target.parentElement.parentElement.parentElement.dataset.id
    let pokemonTrainer = Trainer.find(trainerId)
    console.log(pokemonTrainer.pokemons.length)
    let pokemonTrainerArray = pokemonTrainer.pokemons
    console.log(`I'm releasing pokemon id: ${e.target.dataset.pokemonId} from trainer ${pokemonTrainer.name}`)
    let releasedPokemon = pokemonTrainerArray.find(pokemon => { return pokemon.id === parseInt(pokemonId)})
    let pokemonIndex = pokemonTrainerArray.indexOf(releasedPokemon)

    pokemonTrainerArray.splice(pokemonIndex, 1)
    console.log(pokemonTrainer.pokemons.length)
    Adapter.releasePokemon(pokemonId)
    .then(Adapter.getTrainerInfo)
    .then(renderTrainers)
  }
}
