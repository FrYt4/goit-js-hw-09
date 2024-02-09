import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// --------------------------SET VARS---------------------------------------------//
const ref ={
timerWrapper: document.querySelector('div.timer'),
timerValues: document.querySelectorAll('span.value'),
dateInput: document.querySelector(`input[type="text"]`),
startButton: document.querySelector('button[data-start]')
};


// --------------------------SET STYLE---------------------------------------------//
const { timerWrapper, timerValues, dateInput, startButton } = ref;

timerWrapper.style.display = 'flex';
timerWrapper.style.gap = '10px';
timerWrapper.style.marginTop = '25px';

document.querySelectorAll('div.field').forEach(label => {
  label.style.display = 'flex';
  label.style.flexDirection = 'column';
  label.style.fontSize = '20px';
  label.style.alignItems = 'center';
  label.style.fontFamily = 'monospace';
});

timerValues.forEach(value => {
  value.style.fontSize = '28px';
});
// --------------------------IMPLEMENT FUNCTIONS---------------------------------------------//
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

        return {
            days: Math.floor(ms / day),
            hours: Math.floor((ms % day) / hour),
            minutes: Math.floor(((ms % day) % hour) / minute),
            seconds: Math.floor((((ms % day) % hour) % minute) / second)
          };
        }

function timerSets({days, hours, minutes, seconds}) {
const setsRefs = {
    timerDays: document.querySelector('span[data-days]'),
    timerHours: document.querySelector('span[data-hours]'),
    timerMinutes: document.querySelector('span[data-minutes]'),
    timerSeconds: document.querySelector('span[data-seconds]')
};
const {timerDays, timerHours, timerMinutes, timerSeconds} = setsRefs;
const totalSeconds = days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
timerDays.textContent = `${days}`;
timerHours.textContent = `${hours}`;
timerMinutes.textContent = `${minutes}`;
timerSeconds.textContent = `${seconds}`;

const countdown = setInterval(() => {
    if(totalSeconds <= 0){
    clearInterval(countdown);
    return;
}
},1000);
}


// --------------------------RECEIVE AN OBJECT OF PICKR PARAMETERS---------------------------------------------//
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    isActive: false,
    onClose(selectedDates) {
        if (new Date() - selectedDates[0] > 0) {
          alert('Please choose a date in the future');
          startButton.disabled = !this.isActive;
          return;
      }
      startButton.disabled = this.isActive;
      startButton.addEventListener('click' , (evt) => {
        if(this.isActive){
            return;
        };
        this.isActive = true;
        startButton.disabled = !this.isActive;
        const timerId = setInterval(() => {
            if(selectedDates[0] - new Date() <=0){
                clearInterval(timerId);
                return;
            };
            timerSets(convertMs(selectedDates[0] - new Date()));
        }, 1000);
    });
},
};
// --------------------------OTHER---------------------------------------------//

startButton.disabled = true;
flatpickr('input#datetime-picker', options);
