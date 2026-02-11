export function initFloatingNav() {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");

    if (!nav || !header) return;

    function onScroll() {
        const navRect = nav.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();

        nav.classList.toggle(
            "floating",
            navRect.top > headerRect.bottom
        );
    }

    document.addEventListener("scroll", onScroll);
}
