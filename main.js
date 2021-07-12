'use strict';

// Elements

const elTimesList      = document.getElementById('exposure-time-initial');
const elNdFilters      = document.getElementById('nd-intensity');
const elNewTime        = document.getElementById('new-exposure');
const elRadioSteps     = document.querySelector('.radio-outer');
const elNewExp         = document.querySelector('.btn--get-exposure');
const elResetAll       = document.querySelector('.btn--reset-all');

const elCountdown      = document.getElementById('countdown');
const elCountdownBox   = document.querySelector('.countdown-box');
const elCountdownAbort = document.querySelector('.btn--clear-countdown');
const elCountdownRun   = document.querySelector('.btn--countdown');

const elCountdownBar   = document.querySelector('.countdown-bar');

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
    if (newTime < 5) return;
    elCountdownBox.classList.remove('hidden');
    elCountdown.textContent = '';
}

function hideCountdownBox(){
    resetCountdownBar();
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

function printRadioValues() {
    console.log(baseExposureIndex);
    elRadioSteps.innerHTML = '';

    for (let i = 0; i < stepsAll.length ; i++) {

        if (i == 0) continue;   // salta elemento 0 (show all utile solo per debug)

        elRadioSteps.innerHTML += `<div>`;
        elRadioSteps.innerHTML += `<input onchange="printTimes()" id="steps-${i}" type="radio" name="steps" value="${i}">`;
        elRadioSteps.innerHTML += `<label for="steps-${i}">${stepsAll[i]}</label>`;        
        elRadioSteps.innerHTML += `</div>`;
        
    }

        document.getElementById('steps-1').checked = true;  // di default viene selezionata opzione 1 (full stops)
    
}

function printTimes(){    
    // Inserisce nella relativa select i tempi di posa che sarà possibile selezionare
    
    elTimesList.innerHTML = `<option value="-1"></option>`;

    let skip = setSteps();

    for(let i = 0; i < exposureTimesAll.length; i++){
        if(skip(i)) continue
        else elTimesList.innerHTML += `<option value="${i}">${exposureTimesAll[i].label}</option>`;
    }

    if(!baseExposureIndex) baseExposureIndex = -1; // default

    elTimesList.value = baseExposureIndex;  // preserva eventuale valore precedentemente selezionato dopo la ristampa dei tempi
    
}

function printNds(){
    // Stampa nella relativa select tutti i filtri ND supportati dall'applicazione

    elNdFilters.innerHTML = `<option value="-1"></option> `;

    ndFiltersAlll.forEach((element , index) => {
        elNdFilters.innerHTML += `<option value="${index}">${element.label}</option> `;
    });

    ndStops = -1;   // default

}

function getNewExposure() {
    //  Calcola il nuovo tempo di posa

    // Eccezione: parametri necessari non selezionati
    if(Number(elTimesList.value) === -1 || Number(elNdFilters.value) === -1){
        elNewTime.textContent = "Please, select both base Exposure Time and ND Filter"
        return;
    }

    // Eccezione:  parametri non modificati rispetto al calcolo precedente
    if( baseExposureIndex === Number(elTimesList.value) &&  ndStops === Number(ndFiltersAlll[elNdFilters.value].value) ) {
        console.log("Stai cercando di eseguire la stessa ricerca. Non proseguirò");
        showCountdownBox(); // Mostra comunque pannello countdown

        return;
    }
        
    hideCountdownBox();

    console.log("Sto Calcolando nuovo tempo di posa");

    baseExposureIndex = parseInt(elTimesList.value);
    ndStops = parseInt(ndFiltersAlll[elNdFilters.value].value);


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

        elNewTime.innerHTML = timeString(newTime);
    }

    showCountdownBox();

}

function formatTime(timeSeconds) {

    // Passato come parametro il tempo di posa in secondi, restituisce un oggetto
    // indica il tempo nel formato secondi , minuti , ore

    const timeObj = {timeSeconds : timeSeconds};

    if (timeObj.timeSeconds >= 60) {
        timeObj.timeMinutes = Math.floor(timeObj.timeSeconds / 60);
        timeObj.timeSeconds = timeObj.timeSeconds % 60;

        if (timeObj.timeMinutes > 60) {
            timeObj.timeHours = Math.floor(timeObj.timeMinutes / 60);
            timeObj.timeMinutes = timeObj.timeMinutes % 60;
        }
    }

    return timeObj;
}

function timeString(time) {
    // Compone una stringa che indica il tempo di posa nel formato " h : min : sec "
    
    time = formatTime(time);
    return `${(time.timeHours) ? time.timeHours +' h ' : ''}${(time.timeHours || time.timeMinutes) ? time.timeMinutes + ' min ' : ''}${time.timeSeconds} sec`;

}

function runCountdown() {
    //  Avvia countDown

    if (typeof newTime !== 'number') return;
    if (timer) return;

    console.log("sono nel countdown");

    toggleControls(true);   // disattiva controlli

    let time = newTime;
    resetCountdownBar();

    animateCountdownBar(time);

    elCountdown.textContent = timeString(time);
    
    timer = setInterval(() => {
        if (time === 0) {
            clearInterval(timer);
            elCountdown.textContent = 'Exposure Completed';
            resetCountdownBar();
            elCountdownBar.classList.add('bg-green');
            toggleControls(false);
            timer = null;
        } else {
            elCountdown.textContent = timeString(--time);
        }
    }, 1000);    // 1s
}

function stopCountdown() {
    // Interrompe CountDown

    resetCountdownBar();
    toggleControls(false);

    if (timer) clearInterval(timer);
    timer = null;
    elCountdown.textContent = 'Timer Stopped';
}

function animateCountdownBar(duration){
    resetCountdownBar();
    elCountdownBar.style.animationDuration = duration + 's';
    elCountdownBar.classList.add('fill');
}

function resetCountdownBar(){
    elCountdownBar.classList.remove('fill' , 'bg-green');
    elCountdownBar.style.animationDuration = 'unset';
}