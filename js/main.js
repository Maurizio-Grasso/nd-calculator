'use strict';

// Elements

const elTimesList = {
    box     : document.querySelector('.set-time'),
    heading : document.querySelector('.set-time__heading'),
    select  : document.querySelector('.set-time__select')
}

const elNdList  = {
    box     : document.querySelector('.set-nd'),
    heading : document.querySelector('.set-nd__heading'),
    select  : document.querySelector('.set-nd__select'),
}

const elQuery       = {
    box     : document.querySelector('.current-query') ,
    nd      : document.querySelector('.current-query__ND'),
    oldTime : document.querySelector('.current-query__old-time'),
    newTime : document.querySelector('.current-query__new-time') ,
}

const elCountdown = {
    box   : document.querySelector('.countdown__box') ,
    text  : document.querySelector('.countdown__text'),
    abort : document.querySelector('.btn--clear-countdown'),
    run   : document.querySelector('.btn--countdown'),
    bar   : document.querySelector('.countdown__bar'),
}

const elRadioSteps     = document.querySelector('.radio-select');

const elNewExp         = document.querySelector('.btn--get-exposure');
const elResetAll       = document.querySelector('.btn--reset-all');

const elError = {
    box : document.querySelector('.error-message'),
    message : document.querySelector('.error-message__text'),
}

let baseExposureIndex, ndStops, newTime, timer;

printRadioValues();
printTimes();
printNds();

function resetAll() {

    stopCountdown();
    toggleControls(false);
    hideCountdownBox();
    elQuery.box.classList.add('hidden');
}

function showCountdownBox(){
    if (newTime < 5) return;
    elCountdown.box.classList.remove('hidden');
    elCountdown.text.textContent = '';
}

function hideCountdownBox(){
    resetCountdownBar();
    elCountdown.box.classList.add('hidden');
}

function toggleControls(bool) {
    
    elTimesList.select.disabled = bool;
    elNdList.select.disabled = bool;
    elNewExp.disabled    = bool;
    elCountdown.run.disabled = bool;
    elCountdown.abort.disabled = bool ? false : true;

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
    elRadioSteps.innerHTML = '';

    for (let i = 0; i < stepsAll.length ; i++) {

        if (i == 0) continue;   // salta elemento 0 (show all utile solo per debug)

        elRadioSteps.innerHTML += `<div class="radio-select__option"><input class="radio-select__input" onchange="printTimes()" id="steps-${i}" type="radio" name="steps" value="${i}"><label class="radio-select__label" for="steps-${i}">${stepsAll[i]} </label></div>`;
        
    }

    document.getElementById('steps-1').checked = true;  // di default viene selezionata opzione 1 (full stops)
    
}

function printTimes(){    
    // Inserisce nella relativa select i tempi di posa che sarà possibile selezionare
    
    elTimesList.select.innerHTML = `<option value="-1"></option>`;

    let skip = setSteps();

    for(let i = 0; i < exposureTimesAll.length; i++){
        if(skip(i)) continue
        else elTimesList.select.innerHTML += `<option value="${i}">${exposureTimesAll[i].label}</option>`;
    }

    baseExposureIndex = baseExposureIndex ?? -1;

    elTimesList.select.value = baseExposureIndex;  // riseleziona eventuale valore precedentemente selezionato dopo la ristampa dei tempi
    
}

function printNds(){
    // Stampa nella relativa select tutti i filtri ND supportati dall'applicazione

    elNdList.select.innerHTML = `<option value="-1"></option> `;

    ndFiltersAlll.forEach((element , index) => {
        elNdList.select.innerHTML += `<option value="${index}">${element.label}</option> `;
    });

    ndStops = -1;   // default

}

function readExposurTime(){
    baseExposureIndex = Number(elTimesList.select.value);
    baseExposureIndex === -1 ? elTimesList.heading.classList.add('color-red') : elTimesList.heading.classList.remove('color-red');
    console.log(baseExposureIndex); 
}

function readNdFilter(){
    ndStops = (ndFiltersAlll[Number(elNdList.select.value)]?.value) ?? -1;
    ndStops === -1 ? elNdList.heading.classList.add('color-red') : elNdList.heading.classList.remove('color-red');
    console.log(ndStops);
}

function showError(message){
    elError.message.textContent = message;
    elError.box.classList.remove('hidden');
}

function clearError() {
    elError.message.textContent = '';
    elError.box.classList.add('hidden');
}

function getNewExposure() {
    //  Calcola nuovo tempo di posa

    elQuery.box.classList.add('hidden');

    // Eccezione: parametri necessari non selezionati
    
    if(baseExposureIndex === -1 || ndStops === -1){

        if (baseExposureIndex !== -1) {
            showError("Please, select ND Filter");
            return;
        }

        if (ndStops !== -1) {
            showError("Please, select base Exposure Time");
            return;
        }

        showError("Please, select both base Exposure Time and ND Filter");
        return;

    }

    clearError();
    elQuery.box.classList.remove('hidden');

    hideCountdownBox();
        
    console.log("Sto Calcolando nuovo tempo di posa\n" + elTimesList.select.value);

    elQuery.oldTime.textContent = exposureTimesAll[elTimesList.select.value].label;
    elQuery.nd.textContent = 'ND ' + ndFiltersAlll[elNdList.select.value].value + ' Stop';


    let indexOffset = ndStops * 4;  // Posizioni (dell'array) che separano il tempo iniziale da quello risultante

    //  Se il tempo risultante È fra quelli gestiti dall'array 
    //  viene stampato l'elemento stesso dell'array
    
    if( baseExposureIndex + indexOffset <= exposureTimesAll.length - 1 ) {

        elQuery.newTime.textContent = exposureTimesAll[baseExposureIndex + indexOffset].label;
        newTime = exposureTimesAll[baseExposureIndex + indexOffset].value;

    }
    
    //  Se il tempo risultante NON è fra quelli gestiti dall'array
    //  viene effettuato il calcolo tramite ciclo for
    
    else if ( baseExposureIndex + indexOffset > exposureTimesAll.length - 1 ) {

        newTime = exposureTimesAll[baseExposureIndex].value;
        
        for (let i = 0; i < ndStops; i++) newTime *= 2;   // raddippio ad ogni stop

        newTime = Math.ceil(newTime);   // arrotonda

        elQuery.newTime.innerHTML = timeString(newTime);
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

    elCountdown.text.textContent = timeString(time);
    
    timer = setInterval(() => {
        if (time === 0) {
            clearInterval(timer);
            elCountdown.text.textContent = 'Exposure Completed';
            resetCountdownBar();
            elCountdown.bar.classList.add('countdown__bar--complete');
            toggleControls(false);
            timer = null;
        } else {
            elCountdown.text.textContent = timeString(--time);
        }
    }, 1000);    // 1s
}

function stopCountdown() {
    // Interrompe CountDown

    resetCountdownBar();
    toggleControls(false);

    if (timer) clearInterval(timer);
    timer = null;
    elCountdown.text.textContent = 'Timer Stopped';
}

function animateCountdownBar(duration){
    resetCountdownBar();
    elCountdown.bar.style.animationDuration = duration + 's';
    elCountdown.bar.classList.add('countdown__bar--running');
}

function resetCountdownBar(){
    elCountdown.bar.classList.remove('countdown__bar--running' , 'countdown__bar--complete');
    elCountdown.bar.style.animationDuration = 'unset';
}