'use strict';
// Tutti i possibili tempi di esposizione selezionabili

const exposureTimesAll = [  
                    
    {
        label : '1 / 8000 sec' ,
        value :   1 / 8000
    },

    {
        label : '1 / 6400 sec' ,
        value :   1 / 6400
    } ,

    {
        label : '1 / 6000 sec' ,
        value :   1 / 6000
    } ,

    {
        label : '1 / 5000 sec' ,
        value :   1 / 5000
    },

    {
        label : '1 / 4000 sec' ,
        value :  1 / 4000
    },

    {
        label : '1 / 3200 sec' ,
        value :  1 / 3200
    },

    {
        label : '1 / 3000 sec' ,
        value :  1 / 3000
    },

    {
        label : '1 / 2500 sec' ,
        value :  1 / 2500
    },

    {
        label : '1 / 2000 sec' ,
        value :  1 / 2000
    },

    {
        label : '1 / 1600 sec' ,
        value :  1 / 1600
    } ,

    {
        label : '1 / 1500 sec' ,
        value :  1 / 1500
    },

    {
        label : '1 / 1250 sec' , 
        value :  1 / 1250
    },

    {
        label : '1 / 1000 sec' ,                     
        value :  1 / 1000
    },
    
    {
        label : '1 / 800 sec' ,
        value :  1 / 800
    },

    {
        label : '1 / 750 sec' ,  
        value :  1 / 750
    },

    {
        label : '1 / 640 sec' , 
        value :  1 / 640
    },

    {
        label : '1 / 500 sec' , 
        value :  1 / 500
    },

    {
        label : '1 / 400 sec' ,
        value :  1 / 400
    },

    {
        label : '1 / 350 sec' ,  
        value :  1 / 350
    },

    {
        label : '1 / 320 sec' ,
        value :  1 / 320
    },

    {
        label : '1 / 250 sec' , 
        value :  1 / 250
    },

    {
        label : '1 / 200 sec' ,
        value :  1 / 200
    },

    {
        label : '1 / 180 sec' ,
        value :  1 / 180
    },

    {
        label : '1 / 160 sec' ,
        value :  1 / 160
    },

    {
        label : '1 / 125 sec' , 
        value :  1 / 125
    },

    {
        label : '1 / 100 sec' ,
        value :  1 / 100
    },

    {
        label : '1 / 90 sec' ,
        value :  1 / 90
    },

    {
        label : '1 / 80 sec' ,
        value :  1 / 80
    },

    {
        label : '1 / 60 sec' , 
        value :  1 / 60
    },

    {
        label : '1 / 50 sec' ,
        value :  1 / 50
    },

    {
        label : '1 / 45 sec' ,
        value :  1 / 45
    },

    {
        label : '1 / 40 sec' ,
        value :  1 / 40
    },

    {
        label : '1 / 30 sec' ,
        value :  1 / 30
    },

    {
        label : '1 / 25 sec' ,
        value :  1 / 25
    },

    {
        label : '1 / 23 sec' ,
        value :  1 / 23
    },

    {
        label : '1 / 20 sec' ,
        value :  1 / 20
    },

    {
        label : '1 / 15 sec' ,
        value :  1 / 15
    },

    {
        label : '1 / 13 sec' ,
        value :  1 / 13
    },

    {
        label : '1 / 11 sec' ,
        value :  1 / 11
    },

    {
        label : '1 / 10 sec' ,
        value :  1 / 10
    },

    {
        label : '1 / 8 sec' ,                     
        value :  1 / 8
    },

    {
        label : '1 / 6 sec' ,
        value :  1 / 6
    },

    {
        label :  '1 / 6 sec' ,
        value :   1 / 6
    },

    {
        label :  '1 / 5 sec' ,
        value :   1 / 5
    },

    {
        label :  '1 / 4 sec' ,
        value :   1 / 4
    },

    {
        label :  '1 / 5 sec' ,
        value :   1 / 5
    },

    {
        label :  '0,3 sec' ,
        value :   0.3
    },

    {
        label :  '0,4 sec' ,
        value :   0.4
    },

    {
        label :  '1 / 2 (0,5) sec' ,
        value :   0.5
    },

    {
        label :  '0,6 sec' ,
        value :   0.6
    },

    {
        label :  '0,7 sec' ,
        value :   0.7
    },

    {
        label :  '0,8 sec' ,
        value :   0.8
    },

    {
        label :  '1 sec' ,
        value :   1
    },

    {
        label :  '1,3 sec' ,
        value :   1.3
    },

    {
        label :  '1,5 sec' ,
        value :   1.5
    },

    {
        label :  '1,6 sec' ,
        value :   1.6
    },

    {
        label :  '2 sec' ,
        value :   2
    },

    {
        label :  '2,5 sec' ,
        value :   2.5
    },

    {
        label :  '3 sec' ,
        value :   3
    },

    {
        label :  '3,2 sec' ,
        value :   3.2
    },

    {
        label :  '4 sec' ,
        value :   4
    },

    {
        label :  '5 sec' ,
        value :   5
    },

    {
        label :  '5 sec',
        value :   5
    },

    {
        label :  '6 sec',
        value :   6
    },

    {
        label :  '8 sec' ,
        value :   8
    },

    {
        label :  '10 sec',
        value :   10
    },

    {
        label :  '11 sec',
        value :   11
    },

    {
        label :  '13 sec',
        value :   13
    },

    {
        label :  '15 sec' ,
        value :   15
    },

    {
        label :  '20 sec',
        value :   20
    },

    {
        label :  '22 sec',
        value :   22
    },

    {
        label :  '25 sec',
        value :   25
    },

    {
        label :  '30 sec' ,
        value :   30
    },

    {
        label :  '40 sec' ,
        value :   40
    },

    {
        label :  '45 sec' ,
        value :   45
    },

    {
        label :  '50 sec' ,
        value :   50
    },

    {
        label :  '60 sec' ,
        value :   60
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