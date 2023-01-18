
//the follow 2 IIFEs are used to read/initialize form local Storage
window.addEventListener('DOMContentLoaded', (event) => {
    console.styledLog('info', 'DOM fully loaded and parsed');
});

(() => {
    const html = document.firstElementChild;
    //init theme scheme
    let localThemeScheme = localStorage.getItem('theme-scheme') == null ? "blue" : localStorage.getItem('theme-scheme');
    html.setAttribute('data-theme-scheme', localThemeScheme)

    //init theme mode
    let localthemeMode = localStorage.getItem('theme-mode') == null ? "light" : localStorage.getItem('theme-mode');
    html.setAttribute('data-theme-mode', localthemeMode);
    if (localthemeMode === "dark") document.getElementById("theme-switch").setAttribute('active', 'active')

})();


//assign click event listenrs to buttons with their appropriate function invocations
(() => {
    document
        .querySelectorAll("[data-color]")
        .forEach((b) =>
            b.addEventListener("click", (e) => updateThemeScheme(e.target.value))
        );
    document.getElementById('theme-scheme-select').addEventListener('change', (e) => {
        updateThemeScheme(e.target.value)
    })

    document
        .querySelectorAll("[data-color]")
        .forEach((b) =>
            b.addEventListener("click", (e) => updateThemeScheme(e.target.value))
        );
    document.getElementById('theme-switch').addEventListener('click', () => {
        updateThemeMode();
        let toggle = document.getElementById('theme-switch');
        let current = localStorage.getItem('theme-mode');
        if (current === 'dark')
            toggle.setAttribute('active', 'active')
        else toggle.removeAttribute('active')
    })
})()


//Theme switch toggle button


export let updateThemeMode = () => {
    const html = document.firstElementChild;
    let mode = html.getAttribute('data-theme-mode');
    console.styledLog('success', `mode toggled to ${mode}`)
    mode = mode === "light" ? "dark" : "light";
    html.setAttribute('data-theme-mode', mode)
    localStorage.setItem('theme-mode', mode)

}


export let updateThemeScheme = (scheme) => {
    const html = document.firstElementChild;
    html.setAttribute('data-theme-scheme', scheme)
    localStorage.setItem('theme-scheme', scheme)
    console.styledLog("success", `scheme changed to ${scheme}`);
}
