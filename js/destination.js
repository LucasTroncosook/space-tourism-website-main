const URL = `../starter-code/data.json`;
const mainDibujar = document.getElementById('main-dibujar');

const dibujarPlanetaSeleccionado = (planetaObject) => {
    const {name, images,travel,description,distance} = planetaObject;
    const {webp} = images;
    mainDibujar.innerHTML = `
    <section>
      <h2 id="h2"><span>01</span> Pick your destination</h2>
      <img src="${webp}" alt="${name}}">
    </section>
    <section>
      <section>
        <nav>
          <a href="#">Moon</a>
          <a href="#" class="active">Mars</a>
          <a href="#">Europa</a>
          <a href="#">Titan</a>
        </nav>

        <article>
          <h2>${name}</h2>
          <p>
            ${description}
          </p>
        </article>

        <section>
          <div>
            <span>Avg. distance</span>
            <h3>${distance}</h3>          
          </div>
          <div>
            <span>Est. travel time</span>
            <h3>${travel}</h3>
          </div>
        </section>
      </section>      
    </section>
    `
    attachEventListeners();
    setActiveLink(name)
}

const attachEventListeners = ()=>{
    const navListaLinks = document.querySelectorAll('main section:nth-child(2) section nav a');
    navListaLinks.forEach(link => {
        link.addEventListener('click', function(e){
            e.preventDefault();
            const planetaName = e.target.textContent;
            const planetas = JSON.parse(sessionStorage.getItem('planetas'));
            console.log(planetas)
            const encontrado = planetas.find(planeta => planeta.name === planetaName);
            
            dibujarPlanetaSeleccionado(encontrado)
        })
    })
}

const setActiveLink = (active) => {
    const navListaLinks = document.querySelectorAll('main section:nth-child(2) section nav a');
    navListaLinks.forEach(link => {
        link.classList.toggle('active', link.textContent === active)
    })
}

const extraerValores = async (URL)=>{
    const response = await fetch(URL);
    const data = await response.json();
    const dataDestinations = data.destinations;
    sessionStorage.setItem('planetas', JSON.stringify(dataDestinations))

    const mars = dataDestinations.find(planeta => planeta.name === 'Mars');

    dibujarPlanetaSeleccionado(mars);
}

extraerValores(URL);