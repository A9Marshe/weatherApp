export const setLog = () => {
    console.styledLog = function (status, msg) {
        let bg;
        switch (String(status).toLowerCase()) {
            case 'success':
                bg = `green`;
                break;
            case 'error':
                bg = `firebrick`;
                break
            case 'info':
                bg = 'teal';
                break
            default:
                bg = `transparent;border-style:solid;border-color:white;border-width:3px`
                break;
        }
        let style = `width:20px;background-color:${bg};color:white;font-size:18px;padding-inline:100px;border-radius:50px`;

        console.log(`%c${status}: ${msg} `, style)
    }
}
(() => {
    setLog();
})()