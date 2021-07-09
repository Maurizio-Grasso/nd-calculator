var exposureTimeArray = [ 
                     '1 / 8000 sec' ,
                     '1 / 6400 sec',
                     '1 / 6000 sec' ,
                     '1 / 5000 sec',

                     '1 / 4000 sec' ,
                     '1 / 3200 sec',
                     '1 / 3000 sec' ,
                     '1 / 2500 sec',
                     
                     '1 / 2000 sec' ,
                     '1 / 1600 sec',
                     '1 / 1500 sec' ,
                     '1 / 1250 sec', 

                     '1 / 1000 sec' ,                     
                     '1 / 800 sec',
                     '1 / 750 sec',
                     '1 / 640 sec', 

                     '1 / 500 sec' , 
                     '1 / 400 sec',
                     '1 / 350 sec',
                     '1 / 320 sec',

                     '1 / 250 sec' , 
                     '1 / 200 sec',
                     '1 / 180 sec',
                     '1 / 160 sec',

                     '1 / 125 sec' , 
                     '1 / 100 sec',
                     '1 / 90 sec',
                     '1 / 80 sec',

                     '1 / 60 sec' , 
                     '1 / 50 sec',
                     '1 / 45 sec',
                     '1 / 40 sec',

                     '1 / 30 sec' ,
                     '1 / 25 sec',
                     '1 / 23 sec',
                     '1 / 20 sec',

                     '1 / 15 sec' ,
                     '1 / 13 sec',
                     '1 / 11 sec',
                     '1 / 10 sec',

                     '1 / 8 sec' ,                     
                     '1 / 6 sec (1/8 + 1/3)',
                     '1 / 6 sec (1/8 + 1/2)',
                     '1 / 5 sec',

                     '1 / 4 sec ',
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
                    
var ndFiltersArray    = [ 
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
                    
var exposureTimesList = document.getElementById('exposure-time-initial');
var ndFilterList      = document.getElementById('nd-intensity');
var outputElement     = document.getElementById('new-exposure');

var baseExposureIndex;
var ndStops;


printData();
getBaseExposureTime();
getNdIntensity();

function printData() {
//  Stampa nel DOM le options corrispondenti a tempi di posa e filtri ND

    for(let i = 0; i < exposureTimeArray.length; i++) {
        // if(exposureTimeArray[i] != exposureTimeArray[i - 1]) {                        
            exposureTimesList.innerHTML += `<option value="${i}">${exposureTimeArray[i]}</option> `;
        // }
    }

    ndFiltersArray.forEach((element , index) => {
        ndFilterList.innerHTML += `<option value="${index}">${element.outputName}</option> `;
    });
}

function getBaseExposureTime() {
//  Legge tempo di posa selezionato dall'utente
    baseExposureIndex = parseInt(exposureTimesList.value);
}

function getNdIntensity() {
//  Legge filtro ND selezionato dall'utente
    ndStops = parseInt(ndFiltersArray[ndFilterList.value].stops);
}

function getNewExposure() {
//  Calcola il nuovo tempo di posa

    var indexOffset = ndStops * 4;

    if( baseExposureIndex + indexOffset <= exposureTimeArray.length - 1 ) {
        // Se il tempo risultante è inferiore o uguale a 60 secondi
        var newTime = exposureTimeArray[baseExposureIndex + indexOffset];
    }
    else {
        //  Se il tempo risultante è superiore a 60 secondi
        var overflow = (baseExposureIndex + indexOffset) - (exposureTimeArray.length - 1);        
        var overflowStops = Math.floor(overflow / 4);   // Stop interi di Overflow
        var fractionStops = overflow % 4;               // frazioni di stop rimanenti

        console.log("Overflow: "+ overflow + " posizioni \n" + overflowStops + " Stop Interi \n e " + fractionStops + " che rimangono da gestire" );
        
        newTime = parseInt(exposureTimeArray[exposureTimeArray.length - 1]);    // = 60

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

    outputElement.innerHTML = newTime;

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