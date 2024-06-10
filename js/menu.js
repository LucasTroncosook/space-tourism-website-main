
const modalElement = document.querySelector('.modal');
const modalLinks = document.querySelectorAll('.modal nav a');
const body = document.body;

const showModal = () => {
    modalElement.classList.add('active');
    body.style.overflowY = 'hidden';
    setTimeout(() => {
        modalLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '1';
            }, index * 200);
        });
    }, 500);
};

const hideModal = () => {
    modalLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.opacity = '0';
        }, index * 200);
    });

    setTimeout(() => {
        modalElement.classList.remove('active');
        body.style.overflowY = 'scroll';
    }, modalLinks.length * 200);
};

const toggleModal = (e) => {
    e.preventDefault();
    const a = e.target.closest('a');
    const img = a.firstElementChild;
    if (modalElement.classList.contains('active')) {
        hideModal();
        img.setAttribute('src', './assets/shared/icon-hamburger.svg');
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    } else {
        showModal();
        img.setAttribute('src', './assets/shared/icon-close.svg');
    }
};

const initMenuModal = () => {
    const menu = document.getElementById('menu')
    if(menu){
        menu.addEventListener('click', toggleModal)
    }
}
export { initMenuModal };
