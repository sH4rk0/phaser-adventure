

let gameData = {


    ingame: {
        // 0-PUSH, 1-PULL, 2-GIVE, 3-OPEN, 4-CLOSE, 5-EXAMINE, 6-USE, 7-PICKUP, 8-TALKTO
        //game logic
        conversations: {

            EXAMINE_12: [{

                text: "Here is where the DEVDAY Team organize montly meeting...",
                isItem: false,
                fork: true,
                options: [{ option: "Devday website", link: "http://www.devday.it" }]
            }],



            TALKTO_15: [{

                text: z89.getLabel(33),
                isItem: false,
                next: 2000,
            },
            {

                text: z89.getLabel(34),
                isItem: true,
                next: 2000,


            },
            {

                text: z89.getLabel(35),
                isItem: false,
                next: 2000,

            },
            {

                text: z89.getLabel(36),
                isItem: true,
                next: 5000,

            },
            {

                text: z89.getLabel(37),
                isItem: false,

                end: 2000
            },
            ],

            TALKTO_custom: [
                
                                {
                
                                    text: "LOL!",
                                    isItem: true,
                                    next: 4000,
                                }],

            TALKTO_10: [

                {

                    text: "Ciao Gerardo, sto cercando un corso completo sulle Single Page Application...",
                    isItem: false,
                    next: 4000,
                },

                {

                    text: "Che mi insegni tutto di Angular e Typescript...",
                    isItem: false,
                    next: 4000,
                },

                {

                    text: "Mi puoi consigliare qualcosa??",
                    isItem: false,
                    next: 4000,
                },

                {
                   
                    isItem: true,
                    fork: true,
                    options: [{
                        option: "Ti colpisca un meteorite se esiste!!", function: (currentState: z89.GameCity,target:z89.Items) => {

                           currentState.meteor2(target);
                           
                        }
                    }, { option: "Ovvio che si!", goto: "label1" }]


                },
                {

                    label: "label1",
                    text: "Vieni sabato 23 settembre alle 16:00 presso Analist Group, Michele Aponte ci svelera' tutti i segreti delle SPA!!\n Non Mancare!",
                    isItem: true,
                    next: 10000,

                },
                {

                   
                    text: "ALLA GRANDISSIMA!!!",
                    isItem: false,
                    end: 2000,

                }

            ]


        },
        logic:

        {
            //use money on drink machine
            USE_8_1: (currentState: z89.GameCity) => {
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(2000, () => { currentState.addItem(7); });

            },
            //use coin o coin
            USE_8_15: (currentState: z89.GameCity) => {
                console.log("coin on coins");
                currentState.removeInventoryItems();
                currentState.addItem(7);
                currentState.addInventoryItem(currentState.getItemSpriteId(7));

            }

        },

        //items logic
        items: [

            {
                id: 1,
                type: 1,
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 1000,
                y: 744,
                onStart: true,
                interactive: true,
                firstMessage: [z89.getLabel(15)],
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, answer: [z89.getLabel(6), z89.getLabel(14)] },
                    6: { action: true, answer: [z89.getLabel(7)] },
                    7: { action: false, answer: [z89.getLabel(8)] },
                    8: { action: false, answer: [z89.getLabel(22)] },
                    9: { action: false, answer: [z89.getLabel(9)] }
                },

                logic: {

                    PUSH: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    PULL: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    GIVE: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    OPEN: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    CLOSE: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    EXAMINE: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    USE: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    PICKUP: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    DROP: (currentState: z89.GameCity) => {
                        currentState.returnMessage();
                    },
                    TALKTO: (currentState: any) => {
                        currentState.returnMessage();
                    }

                },

                offsetX: 70,
                fixedToCamera: true,
                checkIntersect: true

            },



            {
                id: 2,
                type: 2,
                onStart: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true }],
                name: z89.getLabel(12),
                x: 1114,
                y: 644,
                interactive: true,

                offsetX: 50,
                coins: 0,
                fixedToCamera: false,
                checkIntersect: false

            },

            {
                id: 3,
                type: 2,
                onStart: true,
                sprite: "phoneWork",
                animations: [{ name: "idle", frames: [0, 1], rate: 3, loop: true }],
                name: z89.getLabel(12),
                x: 1526,
                y: 644,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false

            },


            {
                id: 4,
                type: 3,
                onStart: true,
                sprite: "trash",
                name: z89.getLabel(16),
                x: 500,
                y: 649,
                interactive: true,
                firstMessage: [z89.getLabel(18)],
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: false

            },


            {
                id: 5,
                type: 4,
                onStart: true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 852,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,
                checkIntersect: true

            },


            {
                id: 6,
                type: 4,
                onStart: true,
                sprite: "hydrant",
                name: z89.getLabel(17),
                x: 1809,
                y: 712,
                interactive: true,
                offsetX: 50,
                fixedToCamera: true,
                checkIntersect: true

            },
            {
                id: 7,
                type: 5,
                sprite: "coke",
                onStart: false,
                name: z89.getLabel(10),
                x: 1000,
                y: 745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    5: { action: false, answer: [z89.getLabel(26)] },
                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                    DROP: (currentState: z89.GameCity) => { currentState.dropInventoryItem(); },

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); }

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: true

            },

            {
                id: 8,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 300,//500,
                y: 705, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(27)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                    DROP: (currentState: z89.GameCity) => { currentState.dropInventoryItem(); },

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },


                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },

            {
                id: 15,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 350,//500,
                y: 705, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(27)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                    DROP: (currentState: z89.GameCity) => { currentState.dropInventoryItem(); },

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },


                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },

            {
                 id: 10,
                 type: 7,
                 onStart: true,
                 sprite: "arete",
                 animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 4, loop: true }],
                 name: z89.getLabel(40),
                 x: 600,
                 y: 650,
                 interactive: true,
                 offsetX: 80,
                 fixedToCamera: false,
                 checkIntersect: false,
                 actions: {
                     5: { action: false, answer: [z89.getLabel(43)] },
 
                 },
                 logic: {
 
                     TALKTO: (currentState: z89.GameCity) => { currentState.startConversation(); },
 
                     EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },
 
 
                 },
 
             },
 /* 
             {
                 id: 13,
                 type: 7,
                 onStart: true,
                 sprite: "daniele",
                 animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
                 name: z89.getLabel(41),
                 x: 770,
                 y: 650,
                 turnLeft:true,
                 interactive: true,
                 offsetX: 80,
                 fixedToCamera: false,
                 checkIntersect: false,
                 actions: {
                     5: { action: false, answer: [z89.getLabel(32)] },
 
                 },
                 logic: {
 
                     TALKTO: (currentState: z89.GameCity) => { currentState.startConversation(); },
                     EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },
 
 
                 },
 
             },
 
             {
                 id: 14,
                 type: 7,
                 onStart: true,
                 sprite: "davide",
                 animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.5, loop: true }],
                 name: z89.getLabel(42),
                 x: 950,
                 y: 650,
                 interactive: true,
                 offsetX: 80,
                 fixedToCamera: false,
                 checkIntersect: false,
                 actions: {
                     5: { action: false, answer: [z89.getLabel(32)] },
 
                 },
                 logic: {
 
                     TALKTO: (currentState: z89.GameCity) => { currentState.startConversation(); },
 
                     EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },
 
 
                 },
 
             },

            {
                id: 16,
                type: 7,
                onStart: true,
                sprite: "michele",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
                name: z89.getLabel(31),
                x: 600,
                y: 650,
                interactive: true,
                offsetX: 80,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(32)] },

                },
                logic: {

                    TALKTO: (currentState: z89.GameCity) => { currentState.startConversation(); },

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessage(); },


                },

            },
*/

            {
                id: 11,
                type: 8,
                onStart: false,
                sprite: "truck-empty",
                name: "",
                x: 0,
                y: 680,
                interactive: false,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect: true

            },

            {
                id: 12,
                type: 9,
                onStart: true,
                animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
                sprite: "devday",
                name: "DEV DAY PALACE",
                x: 869,
                y: 220,
                interactive: true,
                offsetX: 0,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(38)], options: [{ option: "DEVDAY galaxy", link: "http://dd.zero89.it" }, { option: "DEVDAY WEBSITE", link: "http://www.devday.it" }] },

                },
                logic: {

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessageExtra(); },


                },

            }



        ]




    },


    assets: {
        spritesheets: [

            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 4 },
            { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 5 },
            { name: "daniele", path: "assets/images/game/people/daniele.png", width: 65, height: 138, frames: 4 },
            { name: "davide", path: "assets/images/game/people/davide.png", width: 65, height: 138, frames: 4 },
            { name: "michele", path: "assets/images/game/people/michele.png", width: 65, height: 138, frames: 4 },
            { name: "inventory", path: "assets/images/game/inventory.png", width: 70, height: 70, frames: 2 },

            { name: "icons", path: "assets/images/game/icons/icons.png", width: 50, height: 50, frames: 3 },
            { name: "beam", path: "assets/images/game/beam.png", width: 200, height: 200, frames: 12 },
            { name: "devday", path: "assets/images/game/items/devday.png", width: 320, height: 87, frames: 2 },
            { name: "explosion", path: "assets/images/game/explosion.png", width: 80, height: 80, frames: 28 },
            { name: "meteor", path: "assets/images/game/meteor.png", width: 80, height: 109, frames: 9 },

        ],

        images: [
            { name: "city", path: "assets/images/game/cityBW.png" },
            { name: "bg2", path: "assets/images/game/city2.png" },
            { name: "bg", path: "assets/images/game/bgBW.png" },
            { name: "streetLvl1", path: "assets/images/game/streetLvl1BW.png" },
            { name: "streetLvl0", path: "assets/images/game/streetLvl0BW.png" },
            { name: "sky", path: "assets/images/game/skyBW.png" },
            { name: "menuBg", path: "assets/images/game/menu.png" },
            { name: "drink-machine", path: "assets/images/game/items/drink-machine.png" },

            { name: "trash", path: "assets/images/game/items/trash.png" },
            { name: "hydrant", path: "assets/images/game/items/hydrant.png" },
            { name: "coke", path: "assets/images/game/items/coke.png" },
            { name: "coins", path: "assets/images/game/items/coins.png" },

            { name: "truck", path: "assets/images/game/items/truck.png" },
            { name: "truck-wheel", path: "assets/images/game/items/truck-wheel.png" },
            { name: "truck-empty", path: "assets/images/game/items/truck-empty.png" },

        ],

        sounds: [
            /*
                        { name: "intro", paths: ["assets/sounds/intro.ogg", "assets/sounds/intro.m4a"], volume: 1, loop: false },
                        
            */
        ],

        bitmapfont: [
            { name: "commodore", imgpath: "assets/fonts/carrier_command.png", xmlpath: "assets/fonts/carrier_command.xml" }
        ]

    },
    menuBlink: [
        { name: "HOME", frame: 0, to: 100, x: -130, y: -290 },

        { name: "DevDay", frame: 2, to: 875, x: -130, y: -220 },
        { name: "News", frame: 0, to: 1354, x: -60, y: -220 },
        { name: "Cake", frame: 0, to: 1590, x: 10, y: -220 },
        { name: "Arcade", frame: 1, to: 2100, x: 80, y: -220 },

        { frame: 0, to: 2580, x: -130, y: -150 },
        { frame: 0, to: 3170, x: -60, y: -150 },
        { frame: 0, to: 4000, x: 10, y: -150 },
        { frame: 0, to: 4500, x: 80, y: -150 }


    ]

}
