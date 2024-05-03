const charactersEl = document.getElementById("characters");
const nameFilterEl = document.getElementById("name-filter");

async function getCharacters (name){
    let url = 'https://api.sampleapis.com/futurama/characters';



    const response = await fetch (url);
    const data = await response.json();


    //console.log(data[0]['name']['first']);
    return data;


}

async function displayCharacters (name){
    const characters = await getCharacters(name);
    let cantidad = name.length;
  if (cantidad < 1) {

  
    charactersEl.innerHTML = '';

    for(let character of characters){
        const card = document.createElement('div');
        card.classList.add('character-card');
        card.innerHTML = `
        <img src=${character['images']['main']}/>
        <h2> ${character['name']['first']} <h2>
        <p>Sexo: ${character.gender}<p>
        <p>Especie: ${character.species}<p>
        `;

        charactersEl.appendChild(card);
    }
    } else{
        let api = getCharacters(name);
        setTimeout(() => {
            console.log(api['value']);
                    
        if (name == api['name']['first']) {

            charactersEl.innerHTML = '';
    
        for(let character of characters){
                const card = document.createElement('div');
                card.classList.add('character-card');
                card.innerHTML = `
                <img src=${character['images']['main']}/>
                <h2> ${character['name']['first']} <h2>
                <p>Sexo: ${character.gender}<p>
                <p>Especie: ${character.species}<p>
                `;
            }
    
            charactersEl.appendChild(card);
        }
        }, 1000);

}

    }

displayCharacters(name);

const boton = document.getElementById('boton');
boton.addEventListener('click', (e) => {
    let nombreBusqueda = nameFilterEl.value;
    displayCharacters(nombreBusqueda);
})
