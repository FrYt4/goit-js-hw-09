const bodyChangeColor = document.querySelector(`body`);
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);

let intervalId = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

btnStop.setAttribute("disabled", "");

btnStart.addEventListener('click', element => {
    btnStart.setAttribute("disabled", true);
    btnStop.removeAttribute("disabled");

    intervalId = setInterval(() => {
        bodyChangeColor.style.backgroundColor = getRandomHexColor();
    }, 1000);
});

btnStop.addEventListener('click', element => {
    btnStop.setAttribute("disabled", true);
    btnStart.removeAttribute("disabled");

    clearInterval(intervalId);
});