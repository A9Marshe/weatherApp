
//the follow 2 IIFEs are used to read/initialize form local Storage
window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

(() => {
    const html = document.firstElementChild;
    //init theme scheme
    let localThemeScheme = localStorage.getItem('theme-scheme') == null ? "blue" : localStorage.getItem('theme-scheme');
    html.setAttribute('data-theme-scheme', localThemeScheme)

    //init theme mode
    let localthemeMode = localStorage.getItem('theme-mode') == null ? "light" : localStorage.getItem('theme-mode');
    html.setAttribute('data-theme-mode', localthemeMode);


})();

export let updateThemeMode = () => {
    const html = document.firstElementChild;
    let mode = html.getAttribute('data-theme-mode');
    console.warn(mode)
    mode = mode === "light" ? "dark" : "light";
    html.setAttribute('data-theme-mode', mode)
    localStorage.setItem('theme-mode', mode)
    console.log(html.getAttribute('data-theme-mode'))
    console.log(`mode toggled to ${mode}`);
}


export let updateThemeScheme = (scheme) => {
    console.warn(typeof scheme);
    console.table(scheme)
    const html = document.firstElementChild;
    html.setAttribute('data-theme-scheme', scheme)
    localStorage.setItem('theme-scheme', scheme)
    console.log(`scheme changed to ${scheme}`);
}
