import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// --------------------------SET VARS---------------------------------------------//
const ref ={
timerWrapper: document.querySelector('div.timer'),
timerFields: document.querySelectorAll('div.field'),
timerValues: document.querySelectorAll('span.value'),
dateInput: document.querySelector(`input [type="text"]`),
startButton: document.querySelector('button[data-start]')
};
const {timerWrapper , timerFields , timerValues , dateInput , startButton} = ref;

// --------------------------SET STYLE---------------------------------------------//
timerWrapper.style.display = 'flex';
timerWrapper.style.gap = '10px';
timerWrapper.style.marginTop = '25px';

timerFields.forEach(label => {
    label.style.display = 'flex';
    label.style.flexDirection = 'column';
    label.style.fontSize = '20px';
    label.style.alignItems = 'center';
    label.style.fontFamily = 'monospace'
});

timerValues.forEach(value => {
    value.style.fontSize = '28px';

});

// --------------------------IMPLEMENT FUNCTIONS---------------------------------------------//
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }


  