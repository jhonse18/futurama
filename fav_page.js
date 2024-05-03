const favoritos = localStorage.getItem('fav');

let array_namesFav = favoritos.substring(0, favoritos.length - 1);
array_namesFav = array_namesFav.split(','); 


getCharacters()
async function getCharacters(){
    let url = 'https://api.sampleapis.com/futurama/characters';

    const response = await fetch (url);
    const data = await response.json();

    setTimeout(() => {
        
        for (let i = 0; data.length > i; i++) {
            let nameAPI = data[i]['name']['first'];

            for (uni of array_namesFav) {
                if (uni == nameAPI) {
                    const contenedor = document.getElementById('contenedor');
                    const card = document.createElement('div');
                    card.classList.add('character-card');

                    card.innerHTML = `
                    <img class="img_futurama" src=${data[i]['images']['main']}>
                    <h2> ${uni} <h2>
                    <p>Sexo: ${data[i]['gender']}<p>
                    <p>Especie: ${data[i]['species']}<p>
                    <div id=fav_div>
                        <p id="${uni}" class="fav">Favorito<p>
                    </div>
                    `;

                    contenedor.appendChild(card);
                }
            }
        }

    }, 500);

}