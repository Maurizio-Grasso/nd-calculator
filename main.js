'use strict';

const stepsAll = ['all' , 'full stops' , 'full and halfs' , 'full and thirds'];

let steps = 0;

const exposureTimesAll = [  // Tutti i possibili tempi di esposizione selezionabili
                     '1 / 8000 sec',
                     '1 / 6400 sec',
                     '1 / 6000 sec',
                     '1 / 5000 sec',

                     '1 / 4000 sec',
                     '1 / 3200 sec',
                     '1 / 3000 sec',
                     '1 / 2500 sec',
                     
                     '1 / 2000 sec',
                     '1 / 1600 sec',
                     '1 / 1500 sec',
                     '1 / 1250 sec', 

                     '1 / 1000 sec',                     
                     '1 / 800 sec',
                     '1 / 750 sec',  
                     '1 / 640 sec', 

                     '1 / 500 sec', 
                     '1 / 400 sec',
                     '1 / 350 sec',  
                     '1 / 320 sec',

                     '1 / 250 sec', 
                     '1 / 200 sec',
                     '1 / 180 sec',
                     '1 / 160 sec',

                     '1 / 125 sec', 
                     '1 / 100 sec',
                     '1 / 90 sec',
                     '1 / 80 sec',

                     '1 / 60 sec', 
                     '1 / 50 sec',
                     '1 / 45 sec',
                     '1 / 40 sec',

                     '1 / 30 sec',
                     '1 / 25 sec',
                     '1 / 23 sec',
                     '1 / 20 sec',

                     '1 / 15 sec',
                     '1 / 13 sec',
                     '1 / 11 sec',
                     '1 / 10 sec',

                     '1 / 8 sec' ,                     
                     '1 / 6 sec (1/8 + 1/3)',
                     '1 / 6 sec (1/8 + 1/2)',
                     '1 / 5 sec',

                     '1 / 4 sec',
                     '1 / 5 sec',
                     '0,3 sec ',
                     '0,4 sec ',

                     '1 / 2 (0,5) sec' ,
                     '0,6 sec' ,
                     '0,7 sec' ,
                     '0,8 sec' ,

                     '1 sec' ,
                     '1,3 sec',
                     '1,5 sec',
                     '1,6 sec',

                     '2 sec' ,
                     '2,5 sec',
                     '3 sec',
                     '3,2 sec',

                     '4 sec' ,
                     '5 sec (4 + 1/3)',
                     '5 sec (4 + 1/2)',
                     '6 sec',

                     '8 sec' ,
                     '10 sec',
                     '11 sec',
                     '13 sec',

                     '15 sec' ,
                     '20 sec',
                     '22 sec',
                     '25 sec',

                     '30 sec' ,
                     '40 sec',
                     '45 sec',
                     '50 sec',

                     '60 sec'
                    ];
                    
const ndFiltersAlll    = [ // Tutti i tipi di Filtri ND supportati
                            { 
                                outputName : 'ND 2 - 0.3 (1 Stop)',
                                stops      : 1
                            },
                            { 
                                outputName : 'ND 4 - 0.6 (2 Stop)',
                                stops      : 2
                            },
                            { 
                                outputName : 'ND 8 - 0.9 (3 Stop)',
                                stops      : 3
                            },
                            { 
                                outputName : 'ND 16 - 1.2 (4 Stop)' ,
                                stops      : 4
                            },
                            { 
                                outputName : 'ND 32 - 1.5 (5 Stop)' ,
                                stops      : 5
                            },
                            { 
                                outputName : 'ND 64 - 1.8 (6 Stop)' ,
                                stops      : 6
                            },
                            { 
                                outputName : 'ND 128 - 2.1 (7 Stop)' ,
                                stops      : 7
                            },
                            { 
                                outputName : 'ND 256 - 2.4 (8 Stop)' ,
                                stops      : 8
                            },
                            { 
                                outputName : 'ND 512 - 2.7 (9 Stop)' ,
                                stops      : 9
                            },
                            { 
                                outputName : 'ND 1000/1024 - 3.0 (10 Stop)',
                                stops      : 10
                            }
                        ];

// Elements

const elTimesList = document.getElementById('exposure-time-initial');
const elNdFilters = document.getElementById('nd-intensity');
const elNewTime   = document.getElementById('new-exposure');

let baseExposureIndex;
let ndStops;
let newTime;


printData();

getBaseExposureTime();

getNdIntensity();


//  Stampa le options corrispondenti a tempi di posa e filtri ND
function printData() {

    let skip;

    // Tempi di Posa
    switch (steps) {
        case 0:
            // mostra tutto
            // non si salta niente
            console.log("Mostro tutto");
            skip = (value) => false;
            break;
        case 1:
            //  mostra solo full stops
            //  salta le posizioni in cui i % 4 !== 0
            console.log("Mostro solo Full Stop");
            skip = (value) => value % 4 !== 0 ? true : false;
            break;
        case 2:
            //  mostra full stops e mezzi stop
            //  salta le posizioni in cui i % 2 !== 0
            console.log("Mostro Full Stops e Mezzi Stops");
            skip = (value) => value % 2 !== 0 ? true : false;
            break;
        case 3:
            //  mostra full stops e terzi di stop
            //  salta (i + 2) % 4 === 0;
            console.log("Mostro Full Stops e Terzi di Stops");
            skip = (value) => ((value + 2) % 4) === 0 ? true : false;
            //
            break;
    
        default:
            break;
    }


    for(let i = 0; i < exposureTimesAll.length; i++){
        elTimesList.innerHTML += `<option value="${i}">${exposureTimesAll[i]}</option> `;
        if(skip(i)) console.log("Skippo " + exposureTimesAll[i]);
        else console.log(exposureTimesAll[i]);
    }

    // Filtri ND
    ndFiltersAlll.forEach((element , index) => {
        elNdFilters.innerHTML += `<option value="${index}">${element.outputName}</option> `;
    });
}

    //  Legge tempo di posa selezionato dall'utente
function getBaseExposureTime() {
    baseExposureIndex = parseInt(elTimesList.value);
}

//  Legge filtro ND selezionato dall'utente
function getNdIntensity() {
    ndStops = parseInt(ndFiltersAlll[elNdFilters.value].stops);
}

function getNewExposure() {
//  Calcola il nuovo tempo di posa

    let indexOffset = ndStops * 4;  // Posizioni (dell'array) che separano il tempo iniziale da quello risultante

    if( baseExposureIndex + indexOffset <= exposureTimesAll.length - 1 ) {
        // Se il tempo risultante è fra quelli gestiti dall'array (default: entro i 60") viene restituito l'elemento stesso dell'array
        newTime = exposureTimesAll[baseExposureIndex + indexOffset];
    }
    else {
        //  Se il tempo risultante è superiore a quello massimo (60 secondi)

        let overflow = (baseExposureIndex + indexOffset) - (exposureTimesAll.length - 1); // overflow è il numero di posizioni che mancano, giunti al termine dell'array, per ottenere il tempo di posa risultante (ogni stop equivale a 4 posizioni)
        let overflowStops = Math.floor(overflow / 4);
        let fractionStops = overflow % 4;

        // A questo punto, il tempo risultante sarà uguale a:
        //
        // exposureTimesAll.length - 1   -->  (tempo max gestito dall'array) +
        // overflowStops                 -->  (Stop interi in eccesso) +
        // fractionStops                 -->  (frazioni di stop in eccesso)

        console.log("Overflow: "+ overflow + " posizioni \n" + overflowStops + " Stop Interi \n e " + fractionStops + " che rimangono da gestire" );
        
        newTime = parseInt(exposureTimesAll[exposureTimesAll.length - 1]);    // = 60

        for (let i = 0; i < overflowStops; i++) {
            newTime *= 2;
        }

        switch (fractionStops) {
            case 1:
                newTime *= (1 + (1/3));                
                break;
            case 2:
                newTime *= 1.5;
            
                break;
            case 3:
                newTime *= (1 + (2/3));
                break;
        
            default:
                //  No fractions
                break;
        }
        
    }
    
    if(newTime >= 60) {
        newTime = stringFromTime( Math.ceil(newTime) );
    }

    elNewTime.innerHTML = newTime;

}

function stringFromTime(timeSeconds) {
    // Trasforma il tempo di posa grezzo (in secondi) in una stringa pronta da stampare
    // Convertendolo, eventualmente in ore : minuti : secondi

    var timeString = '';

    if(timeSeconds >= 60){

        var timeMinutes = Math.floor(timeSeconds / 60);
        timeSeconds = timeSeconds % 60;
        
        if(timeMinutes >= 60){
            var timeHours = Math.floor(timeMinutes / 60);
            timeMinutes = (timeMinutes % 60);
            timeString += timeHours.toString() + ' h ';
        }

        timeString += timeMinutes.toString() + ' min ';

    }

    return timeString += timeSeconds.toString() + ' sec';

}