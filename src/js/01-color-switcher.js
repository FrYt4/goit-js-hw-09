const  bodyChangeColor = document.querySelector(`body`);
const btnStart = document.querySelector(`[data-start]`);
const btnStop = document.querySelector(`[data-stop]`);

let intervalid = null

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


  btnStop.setAttribute("disabled", "");

  btnStart.addEventListener(`click`, element =>{
  element.target.setAttribute("disabled" , true );
  btnStart.removeAttribute("disabled");

    setInterval.setInterval(() =>{
        bodyChangeColor.style.backgroundColor = getRandomHexColor();
    },1000);
  });


    btnStop.addEventListener('click', element => {
    element.target.setAttribute("disabled", true);
    btnStart.removeAttribute("disabled");

    clearInterval(intervalid);
    })