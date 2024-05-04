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
            if (nameAPI == '') {
                nameAPI = 'Lrrr';
            }

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


const recuperar_namesAll = localStorage.getItem('nombres');
let array_namesAll = recuperar_namesAll.substring(0, recuperar_namesAll.length - 1);
array_namesAll = array_namesAll.split(','); 

let cantidad_namesAll = array_namesAll.length;

setTimeout(() => {
    for (let i = 0; cantidad_namesAll > i; i++) {
        console.log(array_namesAll[i]);
        let favButton = document.getElementById(array_namesAll[i]);
        if (favButton !== null) {
            favButton.addEventListener('click', (e) => {
                let favLocal = localStorage.getItem('fav');
                let favLocal_includes = favLocal.includes(favButton.id)
                if (favLocal_includes) {
                    favLocal = favLocal.replace(`${favButton.id},`,'')
                    localStorage.setItem('fav', favLocal);
                    alert('Se ha eliminado de favoritos');
                    window.location.reload();
                } else {
                    favLocal += favButton.id+',';
                    localStorage.setItem('fav', favLocal);
                    alert('Se ha añadido a favoritos');
                    window.location.reload();
                }
            })
        }
    }   
}, 1000);