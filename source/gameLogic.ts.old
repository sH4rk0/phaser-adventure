

let gameData = {

    chapters:[
        {
            title:"Chapter one",
            completed:false,
            tasks:[
                {

                }
            ]

        }


    ],
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

                    text: "OK! ora puoi entrare!",
                    isItem: true,
                    next: 2000,
                },
                {

                    text: "@##@ @##@!!!",
                    isItem: false,
                    end: 2000,
                }


            ],

            TALKTO_13: [

                {

                    text: "Ciao Daniele, e' iniziato l'evento?",
                    isItem: false,
                    next: 3000,
                },

                {

                    text: "Hai prenotato il biglietto?",
                    isItem: true,
                    next: 3000,
                },

                {

                    text: "No! Ma io sono Francesco del Devday Salerno!!!",
                    isItem: false,
                    next: 4000,
                },

                {

                    text: "No Biglietto! No Meetup!",
                    isItem: true,
                    end: 3000,
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

            USE_24_23: (currentState: z89.GameCity) => {
               
                console.log("use");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.addDelay(1000, () => { currentState.getItemSpriteId(22).start(); });
                
            },

            //use coin o coin
            USE_8_15: (currentState: z89.GameCity) => {
                console.log("coin on coins");
                currentState.removeInventoryItems();
                currentState.addItem(7);
                currentState.addInventoryItem(currentState.getItemSpriteId(7));

            },

            //use coin o coin
            USE_8_28: (currentState: z89.GameCity) => {
                console.log("block on chain");
                currentState.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
                currentState.removeInventoryItems();
                currentState.addItem(30);
                currentState.addInventoryItem(currentState.getItemSpriteId(30));

            },
            //use bit o coin
            USE_29_15: (currentState: z89.GameCity) => {
                console.log("bit on coin");
                currentState.playerBaloon.showBaloon("I GOT A BITCOIN!");
                currentState.removeInventoryItems();
                currentState.addItem(32);
                currentState.addInventoryItem(currentState.getItemSpriteId(32));

            },
            USE_30_32: (currentState: z89.GameCity) => {
                console.log("bitcoin on blockchain");
                currentState.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
                currentState.removeInventoryItems();
                currentState.addItem(31);
                currentState.addInventoryItem(currentState.getItemSpriteId(31));

            },

            GIVE_31_13: (currentState: z89.GameCity) => {
                console.log("pass to daniele");
                currentState.player.play("use");
                currentState.removeInventoryItems();

                let convObj: any = {
                    key: "TALKTO_custom",
                    action: null,
                    inventory: null,
                    item: currentState.currentItem
                }
                currentState.addDelay(1000, () => {

                    currentState.conversationBaloon.setUpConversation(convObj);

                });




            }

        },

        //items logic
        items: [

            {
                id: 1,
                type: 1,
               
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 1100,
                y: 724,
                onStart: true,
                interactive: true,
                firstMessage: [z89.getLabel(15)],
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },
                    1: { action: false, answer: [z89.getLabel(2)] },
                    2: { action: false, answer: [z89.getLabel(3)] },
                    3: { action: false, answer: [z89.getLabel(4)] },
                    4: { action: false, answer: [z89.getLabel(5)] },
                    5: { action: true, janswer: [z89.getLabel(6), z89.getLabel(14)] },
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
                type: 1,
                onStart: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true }],
                name: z89.getLabel(12),
                x: 1214,
                y: 644,
                interactive: true,

                offsetX: 50,
                coins: 0,
                fixedToCamera: false,
                checkIntersect: false

            },

            {
                id: 3,
                type: 1,
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
                type: 1,
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
                type: 1,
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
                type: 1,
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
                type: 1,
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
                type: 1,
                sprite: "chain",
                onStart: false,
                name: z89.getLabel(44),
                x: 1000,//500,
                y: 745, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(45)] },

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
                id: 9,
                type: 1,
                sprite: "coins",
                onStart: false,
                name: z89.getLabel(23),
                x: 350,//500,
                y: 660, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(27)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },


                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false

            },

            {
                id: 10,
                type: 1,
                sprite: "block",
                onStart: false,
                name: z89.getLabel(46),
                x: 380,//500,
                y: 740, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(47)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },
            {
                id: 11,
                type: 1,
                sprite: "bit",
                onStart: false,
                name: z89.getLabel(48),
                x: 570,//500,
                y: 650, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(49)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },
                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false

            },

            {
                id: 12,
                type: 1,
                sprite: "blockchain",
                onStart: false,
                name: z89.getLabel(50),
                x: 550,//500,
                y: 650, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(51)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },
            {
                id: 13,
                type: 1,
                sprite: "invite",
                onStart: false,
                name: z89.getLabel(54),
                x: 550,//500,
                y: 650, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(55)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },
            {
                id: 14,
                type: 1,
                sprite: "bitcoin",
                onStart: false,
                name: z89.getLabel(52),
                x: 550,//500,
                y: 650, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: [z89.getLabel(53)] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },


            {
                id: 15,
                type: 1,
                onStart: false,
                sprite: "travolta",
                animations: [{ name: "idle", frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1], rate: 15, loop: true }],
                name: "John",
                x: 1050,
                y: 610,
                interactive: true,
                offsetX: 80,
                scale: .55,
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

            {
                id: 16,
                type: 1,
                onStart: false,
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

            {
                id: 17,
                type: 1,
                onStart: false,
                sprite: "daniele",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
                name: z89.getLabel(41),
                x: 650,
                y: 650,
                turnLeft: true,
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
                id: 18,
                type: 1,
                onStart: false,
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
                id: 19,
                type: 1,
                onStart: false,
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


            {
                id: 20,
                type: 2,
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
                id: 21,
                type: 1,
                onStart: true,
                animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
                sprite: "devday",
                name: "DEV DAY PALACE",
                x: 869,
                y: 198,
                interactive: true,
                offsetX: 0,
                fixedToCamera: false,
                checkIntersect: false,
                actions: {
                    5: { action: false, answer: [z89.getLabel(38)], options: [{ option: "DEVDAY galaxy", link: "http://dd.zero89.it" }, { option: "DEVDAY WEBSITE", link: "http://www.devday.it" }] },

                },
                logic: {

                    EXAMINE: (currentState: z89.GameCity) => { currentState.returnMessageExtra(); },


                }

            },


            {
                id: 22,
                type: 3,
                onStart: true,
                sprite: "newsbg",
                name: "Dev day events",
                x: 866,
                y: 339,
                interactive: true,
                offsetX: 0,
                fixedToCamera: false,
                contexts:["gamedev","phaser"]
               
            },
            {
                id: 23,
                type: 1,
                sprite: "cable",
                onStart: true,
                name: "Broken cable",
                x: 650,//500,
                y: 600, //745,
                interactive: true,
                actions: {
                   // 5: { action: false, answer: [z89.getLabel(53)] },

                },
                logic: {

                    //PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false

            },

            {
                id: 24,
                type: 1,
                sprite: "scotch",
                onStart: true,
                name: "Scotch",
                x: 450,//500,
                y: 700, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: ["Scotch"] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },
                    DROP: (currentState: z89.GameCity) => { currentState.dropInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: true,
                checkIntersect: false

            },



        ]




    },


    assets: {
        spritesheets: [

            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "arete", path: "assets/images/game/people/arete.png", width: 65, height: 138, frames: 4 },
            { name: "daniele", path: "assets/images/game/people/daniele.png", width: 65, height: 138, frames: 4 },
            { name: "davide", path: "assets/images/game/people/davide.png", width: 65, height: 138, frames: 4 },
            { name: "michele", path: "assets/images/game/people/michele.png", width: 65, height: 138, frames: 4 },
            { name: "inventory", path: "assets/images/game/inventory.png", width: 70, height: 70, frames: 2 },

            { name: "icons", path: "assets/images/game/icons/icons.png", width: 50, height: 50, frames: 3 },
            { name: "beam", path: "assets/images/game/beam.png", width: 200, height: 200, frames: 12 },
            { name: "devday", path: "assets/images/game/items/devday.png", width: 320, height: 87, frames: 2 },
            { name: "explosion", path: "assets/images/game/explosion.png", width: 80, height: 80, frames: 28 },
            { name: "meteor", path: "assets/images/game/meteor.png", width: 80, height: 109, frames: 9 },
            { name: "travolta", path: "assets/images/game/people/travolta2.png", width: 248, height: 200, frames: 25 },


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
            { name: "hack", path: "assets/images/game/items/hack.png" },
            { name: "chain", path: "assets/images/game/items/chain.png" },
            { name: "block", path: "assets/images/game/items/block.png" },
            { name: "bit", path: "assets/images/game/items/bit.png" },
            { name: "blockchain", path: "assets/images/game/items/blockchain.png" },
            { name: "bitcoin", path: "assets/images/game/items/bitcoin.png" },
            { name: "invite", path: "assets/images/game/items/invite.png" },
            { name: "newsbg", path: "assets/images/game/items/news-bg.png" },
            { name: "triangleBtn", path: "assets/images/game/triangle-btn.png" },
            { name: "cable", path: "assets/images/game/items/cable.png" },
            { name: "scotch", path: "assets/images/game/items/scotch.png" },
            { name: "spinner", path: "assets/images/game/spinner.png" },
            

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

        { name: "DevDay", frame: 2, to: 875, x: -130, y: -220},
        { name: "News", frame: 0, to: 1354, x: -60, y: -220 },
        { name: "Cake", frame: 0, to: 1590, x: 10, y: -220 },
        { name: "Arcade", frame: 1, to: 2100, x: 80, y: -220 },

        { frame: 0, to: 2580, x: -130, y: -150 },
        { frame: 0, to: 3170, x: -60, y: -150 },
        { frame: 0, to: 4000, x: 10, y: -150 },
        { frame: 0, to: 4500, x: 80, y: -150 }


    ]

}
