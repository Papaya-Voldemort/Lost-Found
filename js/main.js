document.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const navRect = nav.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();

    if (navRect.top > headerRect.bottom) {
        nav.classList.add('floating');
    } else {
        nav.classList.remove('floating');
    }
});