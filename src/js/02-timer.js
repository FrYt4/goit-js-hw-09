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

function timerSets({days, hours, minutes, second}){
const setsRefs = {
    timerDays: document.querySelector('span[data-days]'),
    timerHours:document.querySelector('span[data-hours]'),
    timerMinutes:document.querySelector('span[data-minutes]'),
    timerSeconds:document.querySelector('span[data-seconds]')
};
const {timerDays, timerHours, timerMinutes, timerSeconds} = setsRefs;
timerDays.textContent = `${days}`;
timerHours.textContent = `${hours}`;
timerMinutes.textContent = `${minutes}`;
timerSeconds.textContent = `${seconds}`;
};


// --------------------------RECEIVE AN OBJECT OF PICKR PARAMETERS---------------------------------------------//
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    isActive: false,
    onClose(selectedDates) {
      if(new Date() - selectedDates[0] > 0){
        alert('Please choose a date in the future');
        startButton.disabled = !this.isActive;
        return;
      }
      startButton.disabled = this.isActive;
      startButton.addEventListener('click' , evt =>{
        if(this.isActive){
            return;
        };
        this.isActive = true;
        startButton.disabled = !this.isActive;
        const convert = convertMs.bind(options);
        const timerId = setInterval(() => {
            if(selectedDates[0] - new Date() <=0){
                clearInterval(timerId);
                return;
            };
            const face = timerSets.bind(options);
            face(convert(selectedDates[0] - new Date()));
        }, 1000);
      });
    },
};
// --------------------------OTHER---------------------------------------------//

startButton.disabled = true;
flatpickr('input#datetime-picker', options);
