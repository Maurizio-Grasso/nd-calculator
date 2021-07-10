'use strict';

// const stepsAll = ['all' , 'full stops' , 'full and halfs' , 'full and thirds'];

// Elements

const elTimesList = document.getElementById('exposure-time-initial');
const elNdFilters = document.getElementById('nd-intensity');
const elNewTime   = document.getElementById('new-exposure');

let baseExposureIndex, ndStops, newTime;

printTimes();
printNds();


// In base alla scelta dell'utente (radio button) determina
// Quali stop e frazioni di stop mostrare nella select

function setSteps() {

    let steps = Number(document.querySelector('input[name=steps]:checked').value);
    console.log(steps);

    switch (steps) {
        case 0:
            // mostra tutto
            console.log("Mostro tutto");
            return (value) => false;
            case 1:
                //  Solo full stops
                console.log("Mostro solo Full Stop");
                return (value) => value % 4 !== 0 ? true : false;
                case 2:
                    //  Solo full stops e mezzi stop
                    console.log("Mostro Full Stops e Mezzi Stops");
                    return (value) => value % 2 !== 0 ? true : false;
                    case 3:
                        // full stops e terzi di stop
                        console.log("Mostro Full Stops e Terzi di Stops");                        
                        return (value) => ((value + 2) % 4) === 0 ? true : false;
                        default:
                            return -1;
                        }
}


// Inserisce nella relativa select i tempi di posa che sarà possibile selezionare

function printTimes(){
    
    elTimesList.innerHTML = '';

    let skip = setSteps();

    for(let i = 0; i < exposureTimesAll.length; i++){
        console.log(exposureTimesAll[i].label);
        if(skip(i)) continue
        else elTimesList.innerHTML += `<option value="${i}">${exposureTimesAll[i].label}</option>`;
    }
}

// Stampa nella relativa select tutti i filtri ND supportati dall'applicazione

function printNds(){
    ndFiltersAlll.forEach((element , index) => {
        elNdFilters.innerHTML += `<option value="${index}">${element.label}</option> `;
    });
}

//  Legge tempo di posa selezionato dall'utente

function getBaseExposureTime() {
    baseExposureIndex = parseInt(elTimesList.value);
}

//  Legge filtro ND selezionato dall'utente

function getNdIntensity() {
    ndStops = parseInt(ndFiltersAlll[elNdFilters.value].value);
}


//  Calcola il nuovo tempo di posa

function getNewExposure() {

    // Posizioni (dell'array) che separano il tempo iniziale da quello risultante
    let indexOffset = ndStops * 4;

    // Se il tempo risultante è fra quelli gestiti dall'array viene restituito l'elemento stesso dell'array
    
    if( baseExposureIndex + indexOffset <= exposureTimesAll.length - 1 ) {
        newTime = exposureTimesAll[baseExposureIndex + indexOffset].label;
        // elNewTime.innerHTML = newTime;
    }

    // Se il tempo risultante NON è fra quelli gestiti dall'array viene effettuato il calcolo
    
    else if ( baseExposureIndex + indexOffset > exposureTimesAll.length - 1 ) {

        newTime = exposureTimesAll[baseExposureIndex].value;
        
        for (let i = 0; i < ndStops; i++) newTime *= 2;   // raddippio ad ogni stop

        newTime = Math.ceil(newTime);   // arrotonda
    }

    elNewTime.innerHTML = timeString(formatTime(newTime));
    
    if (newTime > 10) runCountdown(newTime);    // debug only

}

// Passato come argomento il tempo di posa in secondi, restituisce un array che
// indica il tempo nel formato [secondi , minuti , ore]

function formatTime(time) {

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

// Restituisce una stringa indicante il tempo di posa nel formato "X h X min X sec"

function timeString(time) {
    
    let timeString  = '';

    if ((time.length > 2) && time[2] )
        timeString += time[2] + ' h ';
    
    if ((time.length > 1) && time[1] )
        timeString += time[1] + ' min ';

    if (time[0])
        timeString += time[0] + ' sec';

    return timeString;
}

function runCountdown(time){
    
    const elCountdown = document.querySelector('#countdown');

    const timer = setInterval(() => {
        if (time === 0) {
            clearInterval(timer);
            elCountdown.innerHTML = 'Exposure Completed';
        } else
            elCountdown.innerHTML = timeString(formatTime(time--));        
    }, 100);

}