

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
                id: 23,
                type: 1,
                sprite: "cable",
                onStart: true,
                name: "Broken cable",
                x: 650,//500,
                y: 600, //745,
                interactive: true,
                actions: {
                   
                },
                logic: {  },

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
