'use strict';

// Elements

const elTimesList      = document.getElementById('exposure-time-initial');
const elNdFilters      = document.getElementById('nd-intensity');
const elNewTime        = document.getElementById('new-exposure');
const elCountdown      = document.getElementById('countdown');
const elRadioSteps     = document.querySelector('.radio-outer');
const elNewExp         = document.querySelector('.btn--get-exposure');
const elCountdownBox   = document.querySelector('.countdown-box');
const elCountdownAbort = document.querySelector('.btn--clear-countdown');
const elCountdownRun   = document.querySelector('.btn--countdown');
const elResetAll       = document.querySelector('.btn--reset-all');

let baseExposureIndex, ndStops, newTime, timer;

printRadioValues();
printTimes();
printNds();

function resetAll() {

    stopCountdown();
    toggleControls(false);
    hideCountdownBox();
}

function showCountdownBox(){
    elCountdownBox.classList.remove('hidden');
    elCountdown.textContent = '';
}

function hideCountdownBox(){
    elCountdownBox.classList.add('hidden');
}

function toggleControls(bool) {
    
    elTimesList.disabled = bool;
    elNdFilters.disabled = bool;
    elNewExp.disabled    = bool;
    elCountdownRun.disabled = bool;
    elCountdownAbort.disabled = bool ? false : true;

    const radioStepsAll = document.querySelectorAll('input[name=steps]');

    radioStepsAll.forEach(el => {
        el.disabled = bool;
    });
}


function setSteps() {
    // In base alla scelta dell'utente (radio button) determina
    // Quali stop e frazioni di stop mostrare nella select

    let steps = Number(document.querySelector('input[name=steps]:checked').value);

    switch (steps) {
        case 0:
            // mostra tutto
            return (value) => false;
            case 1:
                //  Solo full stops
                return (value) => value % 4 !== 0 ? true : false;
                case 2:
                    //  Solo full stops e mezzi stop
                    return (value) => value % 2 !== 0 ? true : false;
                    case 3:
                        // full stops e terzi di stop
                        return (value) => ((value + 2) % 4) === 0 ? true : false;
                        default:
                            return -1;
                        }
}

function printTimes(){    
    // Inserisce nella relativa select i tempi di posa che sarà possibile selezionare
    
    elTimesList.innerHTML = `<option value="-1"></option>`;

    let skip = setSteps();

    for(let i = 0; i < exposureTimesAll.length; i++){
        if(skip(i)) continue
        else elTimesList.innerHTML += `<option value="${i}">${exposureTimesAll[i].label}</option>`;
    }

    baseExposureIndex = -1; // default

}

function printNds(){
    // Stampa nella relativa select tutti i filtri ND supportati dall'applicazione

    elNdFilters.innerHTML = `<option value="-1"></option> `;

    ndFiltersAlll.forEach((element , index) => {
        elNdFilters.innerHTML += `<option value="${index}">${element.label}</option> `;
    });

    ndStops = -1;   // default

}

function printRadioValues() {

    elRadioSteps.innerHTML = '';

    for (let i = 0; i < stepsAll.length ; i++) {

        elRadioSteps.innerHTML += `<div>`;
        
        elRadioSteps.innerHTML += `<input onchange="printTimes()" id="steps-${i}" type="radio" name="steps" value="${i}">`;
        elRadioSteps.innerHTML += `<label for="steps-${i}">${stepsAll[i]}</label>`;
        
        elRadioSteps.innerHTML += `</div>`;
        
    }

    document.getElementById('steps-1').checked = true;  // di default viene selezionata opzione 1 (full stops)

} 

function getNewExposure() {
    //  Calcola il nuovo tempo di posa

    // parametri necessari non selezionati
    if(Number(elTimesList.value) === -1 || Number(elNdFilters.value) === -1){
        elNewTime.textContent = "Please, select both base Exposure Time and ND Filter"
        return;
    }

    // Parametri non modificati rispetto al calcolo precedente
    if( baseExposureIndex === Number(elTimesList.value) &&  ndStops === Number(ndFiltersAlll[elNdFilters.value].value) ) {
        console.log("Stai cercando di eseguire la stessa ricerca. Non proseguirò");
        return;
    }
        
    console.log("Sto Calcolando nuovo tempo di posa");  // debug

    baseExposureIndex = parseInt(elTimesList.value);
    ndStops = parseInt(ndFiltersAlll[elNdFilters.value].value);

    hideCountdownBox();

    let indexOffset = ndStops * 4;  // Posizioni (dell'array) che separano il tempo iniziale da quello risultante

    //  Se il tempo risultante È fra quelli gestiti dall'array 
    //  viene stampato l'elemento stesso dell'array
    
    if( baseExposureIndex + indexOffset <= exposureTimesAll.length - 1 ) {

        elNewTime.textContent = exposureTimesAll[baseExposureIndex + indexOffset].label;
        newTime = exposureTimesAll[baseExposureIndex + indexOffset].value;

    }
    
    //  Se il tempo risultante NON è fra quelli gestiti dall'array
    //  viene effettuato il calcolo tramite ciclo for
    
    else if ( baseExposureIndex + indexOffset > exposureTimesAll.length - 1 ) {

        newTime = exposureTimesAll[baseExposureIndex].value;
        
        for (let i = 0; i < ndStops; i++) newTime *= 2;   // raddippio ad ogni stop

        newTime = Math.ceil(newTime);   // arrotonda

        elNewTime.innerHTML = timeString(formatTime(newTime));
    }

    if (newTime >= 5) showCountdownBox(); //  Per tempi di almeno 5 secondi mostra box countdown

}


function formatTime(time) {
    // Passato come argomento il tempo di posa in secondi, restituisce un array che
    // indica il tempo nel formato [secondi , minuti , ore]

    let timeSeconds = 0;
    let timeMinutes = 0;
    let timeHours   = 0;

    timeSeconds = time;

    if (timeSeconds >= 60) {
        timeMinutes = Math.floor(timeSeconds / 60);
        timeSeconds = timeSeconds % 60;

        if (timeMinutes > 60) {
            timeHours = Math.floor(timeMinutes / 60);
            timeMinutes = timeMinutes % 60;
        }
    }
    return [timeSeconds , timeMinutes , timeHours];
}


function timeString(time) {
    // Restituisce una stringa indicante il tempo di posa nel formato "X h X min X sec"
    
    let timeString  = '';

    if ((time.length > 2) && time[2] )
        timeString += time[2] + ' h ';
    
    if ((time.length > 1) && (time[1] || time[2]) )
        timeString += time[1] + ' min ';

        timeString += time[0] + ' sec';

    return timeString;
}


function runCountdown() {
    //  Avvia countDown

    if (typeof newTime !== 'number') return;
    if (timer) return;

    console.log("sono nel countdown");
    toggleControls(true);

    let time = newTime;

    timer = setInterval(() => {
        if (time === 0) {
            clearInterval(timer);
            elCountdown.textContent = 'Exposure Completed';
            toggleControls(false);
            timer = null;
        } else
            elCountdown.textContent = timeString(formatTime(time--));        
    }, 50);    // debug only (replace with 1000)
}

function stopCountdown() {
    // Interrompe CountDown
    toggleControls(false);

    if (timer) clearInterval(timer);
    timer = null;
    elCountdown.textContent = 'Timer Stopper';
}