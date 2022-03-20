class ProgressBar {
    constructor (element, initialValue = 0) {
        this.valueElement = element.querySelector('.progress-bar-value');
        this.fillElement = element.querySelector('.progress-bar-fill');

        this.setValue(initialValue);
    }

    setValue (newValue) {
        this.value = newValue;
        this.update();
    }

    update () {
        const percentage = this.value;

        this.fillElement.style.width = percentage*2 + 'px';
        this.valueElement.textContent = percentage;
    }
}

let hpBar = new ProgressBar(document.querySelector('#hp'), 45);
let attackBar = new ProgressBar(document.querySelector('#attack'), 49);
let defenseBar = new ProgressBar(document.querySelector('#defense'), 49);
let SpecialAttackBar = new ProgressBar(document.querySelector('#specialAttack'), 65);
let specialDefenseBar = new ProgressBar(document.querySelector('#specialDefense'), 65);
let speedBar = new ProgressBar(document.querySelector('#speed'), 45);


const fetchPokemon = () => {
    let pokemonNameInput = document.getElementById('searchPokemon');
    let pokemonName = pokemonNameInput.value;
    pokemonName = pokemonName.toLowerCase();

    const apiData = {
        url: 'https://pokeapi.co/api/v2/',
        type: 'pokemon',
        name: pokemonName,
    }

    const {url, type, name} = apiData;
    const apiUrl = `${url}${type}/${name}`;

    fetch(apiUrl)
    .then( (data) => {
        if (data.status != 200) {
            pokemonImage('https://data.whicdn.com/images/68563219/original.png');
        } else {
            return data.json();
        }
    })
    .then( (pokemon) => {
        let pokemonName = pokemon.name;
        pokeName(pokemonName);

        let pokemonId = pokemon.id;
        pokeId(pokemonId);

        let pokemonImage = pokemon.sprites.front_default;
        pokeImage(pokemonImage);

        let pokemonType = pokemon.types[0].type.name;
        pokeType(pokemonType);

        let pokemonHeight = pokemon.height;
        pokeHeight(pokemonHeight);

        let pokemonWeight = pokemon.weight;
        pokeWeight(pokemonWeight);

        let pokemonAbilities = pokemon.abilities;
        let lengthAbilities = pokemonAbilities.length;
        let pokemonAbility = pokemonAbilities[lengthAbilities - 1].ability.name;
        pokeAbility(pokemonAbility);

        let pokemonstats = {
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            specialAttack: pokemon.stats[3].base_stat,
            specialDefense: pokemon.stats[4].base_stat,
            speed: pokemon.stats[5].base_stat,
        }; 
        updateStats(pokemonstats);

    });
}

const pokeName = (name) => {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    let pokemonName = document.getElementById('pokemonName');
    pokemonName.textContent = name;
}

const pokeId = (id) => {
    let pokemonId = document.getElementById('pokemonId');
    pokemonId.textContent = id;
}

const pokeImage = (url) => {
    const pokemonImg = document.getElementById('pokemonImage');
    pokemonImg.src = url; 
}

const pokeType = (type) => {
    let pokemonType = document.getElementById('pokemonType');
    pokemonType.textContent = type;
}

const pokeHeight = (height) => {
    let pokemonHeight = document.getElementById('pokemonHeight');
    pokemonHeight.textContent = height;
}

const pokeWeight = (weight) => {
    let pokemonWeight = document.getElementById('pokemonWeight');
    pokemonWeight.textContent = weight;
}

const pokeAbility = (ability) => {
    let pokemonAbility = document.getElementById('pokemonAbility');
    pokemonAbility.textContent = ability;
}

const updateStats = (stats) => {
    hpBar.setValue(stats.hp);
    attackBar.setValue(stats.attack);
    defenseBar.setValue(stats.defense);
    SpecialAttackBar.setValue(stats.specialAttack);
    specialDefenseBar.setValue(stats.specialDefense);
    speedBar.setValue(stats.speed);
}