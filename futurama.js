const charactersEl = document.getElementById("characters");
const nameFilterEl = document.getElementById("name-filter");
const boton = document.getElementById('boton');


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
        if (character['name']['first'] !== 'Zapp') {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
            <img class="img_futurama" src=${character['images']['main']}>
            <h2> ${character['name']['first']} <h2>
            <p>Sexo: ${character.gender}<p>
            <p>Especie: ${character.species}<p>
            <div id=fav_div><p class="fav">Favorito<p></div>
            `;

            charactersEl.appendChild(card);
        }
    }
}





async function inputCharacters(nombreBusqueda){
    const characters = await getCharacters();
    charactersEl.innerHTML = '';
      
    for(let character of characters){
        if (character['name']['first'] == nombreBusqueda) {
            const card = document.createElement('div');
            card.classList.add('character-card');

            card.innerHTML = `
            <img class="img_futurama" src=${character['images']['main']}>
            <h2> ${character['name']['first']} <h2>
            <p>Sexo: ${character.gender}<p>
            <p>Especie: ${character.species}<p>
            <div id=fav_div><p class="fav">Favorito<p></div>
            `;

            charactersEl.appendChild(card);
            nameFilterEl.value = '';
        }
    }
}
    


boton.addEventListener('click', (e) => {
    let nombreBusqueda = nameFilterEl.value;
    nombreBusqueda = capitalizeFirstLetter(nombreBusqueda)
    inputCharacters(nombreBusqueda);
})