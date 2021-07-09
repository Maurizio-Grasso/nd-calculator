'use strict';
// Tutti i possibili tempi di esposizione selezionabili

const exposureTimesAll = [  
                    
    {
        label : '1 / 8000 sec' ,
        value :   0
    },

    {
        label : '1 / 6400 sec' ,
        value :   0
    } ,

    {
        label : '1 / 6000 sec' ,
        value :   0
    } ,

    {
        label : '1 / 5000 sec' ,
        value :   0
    },

    {
        label : '1 / 4000 sec' ,
        value :   0
    },

    {
        label : '1 / 3200 sec' ,
        value :   0
    },

    {
        label : '1 / 3000 sec' ,
        value :   0
    },

    {
        label : '1 / 2500 sec' ,
        value :   0
    },

    {
        label :'1 / 2000 sec' ,
        value :   0
    },

    {
        label :'1 / 1600 sec' ,
        value :   0
    } ,

    {
        label : '1 / 1500 sec' ,
        value :   0
    },

    {
        label : '1 / 1250 sec' , 
        value :   0
    },

    {
        label : '1 / 1000 sec' ,                     
        value :   0
    },
    
    {
        label : '1 / 800 sec' ,
        value :   0
    },

    {
        label : '1 / 750 sec' ,  
        value :   0
    },

    {
        label : '1 / 640 sec' , 
        value :   0
    },

    {
        label : '1 / 500 sec' , 
        value :   0
    },

    {
        label : '1 / 400 sec' ,
        value :   0
    },

    {
        label : '1 / 350 sec' ,  
        value :   0
    },

    {
        label : '1 / 320 sec' ,
        value :   0
    },

    {
        label : '1 / 250 sec' , 
        value :   0
    },

    {
        label : '1 / 200 sec' ,
        value :   0
    },

    {
        label : '1 / 180 sec' ,
        value :   0
    },

    {
        label : '1 / 160 sec' ,
        value :   0
    },

    {
        label : '1 / 125 sec' , 
        value :   0
    },

    {
        label : '1 / 100 sec' ,
        value :   0
    },

    {
        label : '1 / 90 sec' ,
        value :   0
    },

    {
        label : '1 / 80 sec' ,
        value :   0
    },

    {
        label : '1 / 60 sec' , 
        value :   0
    },

    {
        label : '1 / 50 sec' ,
        value :   0
    },

    {
        label : '1 / 45 sec' ,
        value :   0
    },

    {
        label : '1 / 40 sec' ,
        value :   0
    },

    {
        label : '1 / 30 sec' ,
        value :   0
    },

    {
        label : '1 / 25 sec' ,
        value :   0
    },

    {
        label : '1 / 23 sec' ,
        value :   0
    },

    {
        label : '1 / 20 sec' ,
        value :   0
    },

    {
        label : '1 / 15 sec' ,
        value :   0
    },

    {
        label : '1 / 13 sec' ,
        value :   0
    },

    {
        label : '1 / 11 sec' ,
        value :   0
    },

    {
        label : '1 / 10 sec' ,
        value :   0
    },

    {
        label : '1 / 8 sec' ,                     
        value :   0
    },

    {
        label : '1 / 6 sec' ,
        value :   0
    },

    {
        label :  '1 / 6 sec' ,
        value :   0
    },

    {
        label :  '1 / 5 sec' ,
        value :   0
    },

    {
        label :  '1 / 4 sec' ,
        value :   0
    },

    {
        label :  '1 / 5 sec' ,
        value :   0
    },

    {
        label :  '0,3 sec' ,
        value :   0
    },

    {
        label :  '0,4 sec' ,
        value :   0
    },

    {
        label :  '1 / 2 (0,5) sec' ,
        value :   0
    },

    {
        label :  '0,6 sec' ,
        value :   0
    },

    {
        label :  '0,7 sec' ,
        value :   0
    },

    {
        label :  '0,8 sec' ,
        value :   0
    },

    {
        label :  '1 sec' ,
        value :   0
    },

    {
        label :  '1,3 sec' ,
        value :   0
    },

    {
        label :  '1,5 sec' ,
        value :   0
    },

    {
        label :  '1,6 sec' ,
        value :   0
    },

    {
        label :  '2 sec' ,
        value :   0
    },

    {
        label :  '2,5 sec' ,
        value :   0
    },

    {
        label :  '3 sec' ,
        value :   0
    },

    {
        label :  '3,2 sec' ,
        value :   0
    },

    {
        label :  '4 sec' ,
        value :   0
    },

    {
        label :  '5 sec' ,
        value :   0
    },

    {
        label :  '5 sec',
        value :   0
    },

    {
        label :  '6 sec',
        value :   0
    },

    {
        label :  '8 sec' ,
        value :   0
    },

    {
        label :  '10 sec',
        value :   0
    },

    {
        label :  '11 sec',
        value :   0
    },

    {
        label :  '13 sec',
        value :   0
    },

    {
        label :  '15 sec' ,
        value :   0
    },

    {
        label :  '20 sec',
        value :   0
    },

    {
        label :  '22 sec',
        value :   0
    },

    {
        label :  '25 sec',
        value :   0
    },

    {
        label :  '30 sec' ,
        value :   0
    },

    {
        label :  '40 sec' ,
        value :   0
    },

    {
        label :  '45 sec' ,
        value :   0
    },

    {
        label :  '50 sec' ,
        value :   0
    },

    {
        label :  '60 sec' ,
        value :   0
    }

];
                    
     // Tutti i tipi di Filtri ND supportati
const ndFiltersAlll = [
    { 
        label : 'ND 2 - 0.3 (1 Stop)',
        value      : 1
    },
    { 
        label : 'ND 4 - 0.6 (2 Stop)',
        value      : 2
    },
    { 
        label : 'ND 8 - 0.9 (3 Stop)',
        value      : 3
    },
    { 
        label : 'ND 16 - 1.2 (4 Stop)' ,
        value      : 4
    },
    { 
        label : 'ND 32 - 1.5 (5 Stop)' ,
        value      : 5
    },
    { 
        label : 'ND 64 - 1.8 (6 Stop)' ,
        value      : 6
    },
    { 
        label : 'ND 128 - 2.1 (7 Stop)' ,
        value      : 7
    },
    { 
        label : 'ND 256 - 2.4 (8 Stop)' ,
        value      : 8
    },
    { 
        label : 'ND 512 - 2.7 (9 Stop)' ,
        value      : 9
    },
    { 
        label : 'ND 1000/1024 - 3.0 (10 Stop)',
        value      : 10
    }
];