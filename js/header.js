import {initMenuModal} from './menu.js'

const header = document.getElementById('header');
const dibujarHeader = () => {
    header.innerHTML = `
        <figure>
            <img src="./assets/shared/logo.svg" alt="logo">
        </figure>
        <nav>
            <div>
                <a href="index.html"><span>00</span> Home</a>
                <a href="../starter-code/destination-mars.html"><span>01</span> Destination</a>
                <a href="../starter-code/crew-engineer.html"><span>02</span> Crew</a>
                <a href="../starter-code/technology-vehicle.html"><span>03</span> Technology</a>
                <a href="#" id="menu">
                    <img src="./assets/shared/icon-hamburger.svg" alt="icon-hamburger">
                </a>
            </div>
        </nav>
    `;
    const aLink = document.querySelectorAll('nav div a:not(#menu)');
    aLink.forEach(link => {
        link.addEventListener('click', function(e) {
            aLink.forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    

    const currentURL = window.location.pathname.split('/').pop();
    aLink.forEach(link => {
        if (currentURL.includes(link.getAttribute('href').split('/').pop())) {
            link.classList.add('active');
        }
    });

    initMenuModal();
};

dibujarHeader();

