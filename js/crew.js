const URL = '../starter-code/data.json';
const mainSection = document.getElementById('main-section');

const dibujarElemento = (crewObejct) =>{
    const {name,bio,role,images} = crewObejct.dato;
    const {webp} = images; 
    mainSection.innerHTML = `
        <section>
            <div>
                <article>
                    <h3>${role}</h3>
                    <h1>${name}</h1>
                    <p>
                        ${bio}
                    </p>
                </article>
                <div class="btn-carrusel">
                    <a href="#" data-id="0"></a>
                    <a href="#" data-id="1"></a>
                    <a href="#" data-id="2"></a>
                    <a href="#" data-id="3" class="active"></a>
                </div>
            </div>
        </section>
        <section>
            <figure>
                <img src="${webp}" alt="image-${name}">
            </figure>
        </section>
        `
        filtrarElemento();
        active(crewObejct.index);
}

const filtrarElemento = () => {
    const btnAction = document.querySelectorAll('.btn-carrusel a');
    btnAction.forEach((btn,index) => {
        btn.addEventListener('click', function(e){
            e.preventDefault();
            const crewDatos = JSON.parse(sessionStorage.getItem('crew'))
            const encontradoCrew = crewDatos.find(element => element.index === index)
            dibujarElemento(encontradoCrew)
        })
    })
}

const active = (active) => {
    const btnAction = document.querySelectorAll('.btn-carrusel a');
    btnAction.forEach((btn) => {
        btn.classList.toggle('active', parseInt(btn.dataset.id) === active);
    })
}

const traerDatos = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();

    const dataCrew = data.crew;
    const newDatos = dataCrew.map((dato,index) => {
        return {
            dato,
            index
        }
    })
    sessionStorage.setItem('crew', JSON.stringify(newDatos));
    const ansari = newDatos.find(element => element.index === 3);
    dibujarElemento(ansari)
}

traerDatos(URL)