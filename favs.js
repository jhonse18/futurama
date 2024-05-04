const buttonFind = document.getElementById('boton');
buttonFind.addEventListener('click', (e) => {

    setTimeout(() => {
        const recuperar_namesAll = localStorage.getItem('nombres');
        let array_namesAll = recuperar_namesAll.substring(0, recuperar_namesAll.length - 1);
        array_namesAll = array_namesAll.split(','); 
        
        let cantidad_namesAll = array_namesAll.length;
        
        for (let i = 0; cantidad_namesAll > i; i++) {
            let favButton = document.getElementById(array_namesAll[i]);
            if (favButton !== null) {
                favButton.addEventListener('click', (e) => {
                    let favLocal = localStorage.getItem('fav');
                    let favLocal_includes = favLocal.includes(favButton.id)
                    if (favLocal_includes) {
                        favLocal = favLocal.replace(`${favButton.id},`,'')
                        localStorage.setItem('fav', favLocal);
                        alert('Se ha eliminado de favoritos');
                    } else {
                        favLocal += favButton.id+',';
                        localStorage.setItem('fav', favLocal);
                        alert('Se ha añadido a favoritos');
                    }
                })
            }
        }   
    }, 1000);

})






