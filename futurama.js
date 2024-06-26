const charactersEl = document.getElementById("characters");
const nameFilterEl = document.getElementById("name-filter");
const boton = document.getElementById('boton');
const rotulo = document.getElementById('rotulo');
let revisarLocal = localStorage.getItem('fav');
let nameAll = '';

if (revisarLocal == null || revisarLocal == undefined) {
    localStorage.setItem('fav', '');
}

rotulo.addEventListener('click', (e) => {
    displayCharacters();
})

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function getCharacters(){
    let url = 'https://api.sampleapis.com/futurama/characters';

    const response = await fetch (url);
    const data = await response.json();
    return data;
}



displayCharacters();
async function displayCharacters (){
    const characters = await getCharacters();
  
    for(let character of characters){
        let nameAPI = character['name']['first'];
        let imgAPI = character['images']['main'];

        if (nameAPI !== 'Zapp') {
            if (nameAPI == '') {
                nameAPI = 'Lrrr';
            }

            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
            <img class="img_futurama" src=${imgAPI}>
            <h2> ${nameAPI} <h2>
            <p>Sexo: ${character.gender}<p>
            <p>Especie: ${character.species}<p>
            <div id=fav_div>
                <p id="${nameAPI}" class="fav">Favorito<p>
            </div>
            `;

            nameAll += `${nameAPI},`;

            charactersEl.appendChild(card);
        }
    }
}

setTimeout(() => {
    localStorage.setItem('nombres', nameAll);   
}, 500);





async function inputCharacters(nombreBusqueda){
    const characters = await getCharacters();
    charactersEl.innerHTML = '';
      
    for(let character of characters){
        if (nombreBusqueda === 'Lrrr') {
            nombreBusqueda = '';
        }
        if (character['name']['first'] == nombreBusqueda) {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
            <img class="img_futurama" src=${character['images']['main']}>
            <h2> ${nombreBusqueda} <h2>
            <p>Sexo: ${character.gender}<p>
            <p>Especie: ${character.species}<p>
            <div id=fav_div>
                <p id="${nombreBusqueda}" class="fav">Favorito<p>
            </div>
            `;

            charactersEl.appendChild(card);
            nameFilterEl.value = '';
        }
    }
}
    


boton.addEventListener('click', (e) => {
    let nombreBusqueda = nameFilterEl.value;
    if (nombreBusqueda.length > 1) {
        nombreBusqueda = capitalizeFirstLetter(nombreBusqueda)
        inputCharacters(nombreBusqueda);
    }
    
})