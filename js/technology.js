const URL = `../starter-code/data.json`;
const dibujar = document.getElementById('section-main');
const dibujarTechnology = (technologyObject) => {
    console.log(technologyObject)
    const { description, name, images } = technologyObject.dato;
    const { landscape, portrait} = images;
    const imagenResize = () => {
        const technologyImage =  document.getElementById('technology-image');
        const width = window.innerWidth
        if(width <= 928){
           technologyImage.src = landscape;
           technologyImage.alt = `landscape ${name}`
        }else{
           technologyImage.src = portrait;
           technologyImage.alt = `portrait ${name}`
        }
    }
    

    dibujar.innerHTML = `
         <section>
            <nav>
                <a href="#" class="active">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            </nav>
            <article>
                    <span> The terminology...</span>
                    <h1>${name}</h1>
                    <p>
                        ${description}
                    </p>
            </article>
        </section>
        <section>
            <figure>
                <img id="technology-image" scr="" alt=""/>
            </figure>
        </section>
    
    `

    imagenResize();
    window.addEventListener('resize', imagenResize);
    encontrarTechnology();
    active(technologyObject.index)
}

const encontrarTechnology = () => {
    const navActive = document.querySelectorAll('#section-main nav a');
    const dataTechnology = JSON.parse(sessionStorage.getItem('technology'));
    navActive.forEach((btn,i) => {
        btn.addEventListener('click', function(e){
            e.preventDefault();
            const encontrado = dataTechnology.find(element => element.index === i);
            dibujarTechnology(encontrado)
        })
    })
}


const active = (index) => {
    const navActive = document.querySelectorAll('#section-main nav a');
    navActive.forEach((btn, i) => {
        if (i === index) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

const extraerValores = async (URL) => {
    const response = await fetch(URL);
    const data = await response.json();

    const dataTechnology = data.technology
    const newDataTechnology = dataTechnology.map((dato,index) =>{
        return{
            dato,
            index
        }
    })
    sessionStorage.setItem('technology', JSON.stringify(newDataTechnology));

    const launchVehicle = newDataTechnology.find(element => element.index === 0)
    dibujarTechnology(launchVehicle)
}

extraerValores(URL)