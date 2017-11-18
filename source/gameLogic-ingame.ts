

 gameData.ingame.conversation= {


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


        }
        gameData.ingame.logic=

        {
            //use money on drink machine
            USE_8_1: (currentState: z89.GameCity) => {
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.gameUtils.addDelay(2000, () => { currentState.gameItemsUtils.addItem(7); });

            },

            USE_24_23: (currentState: z89.GameCity) => {
               
                console.log("use");
                currentState.player.play("use");
                currentState.removeInventoryItems();
                currentState.gameUtils.addDelay(1000, () => { currentState.gameUtils.getItemById(22).start(); });
                
            },

            //use coin o coin
            USE_8_15: (currentState: z89.GameCity) => {
                console.log("coin on coins");
                currentState.removeInventoryItems();
                currentState.gameItemsUtils.addItem(7);
                currentState.addInventoryItem(currentState.gameItemsUtils.getItemById(7));

            },

            //use coin o coin
            USE_8_28: (currentState: z89.GameCity) => {
                console.log("block on chain");
                currentState.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
                currentState.removeInventoryItems();
                currentState.gameItemsUtils.addItem(30);
                currentState.addInventoryItem(currentState.gameItemsUtils.getItemById(30));

            },
            //use bit o coin
            USE_29_15: (currentState: z89.GameCity) => {
                console.log("bit on coin");
                currentState.playerBaloon.showBaloon("I GOT A BITCOIN!");
                currentState.removeInventoryItems();
                currentState.gameItemsUtils.addItem(32);
                currentState.addInventoryItem(currentState.gameItemsUtils.getItemById(32));

            },
            USE_30_32: (currentState: z89.GameCity) => {
                console.log("bitcoin on blockchain");
                currentState.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
                currentState.removeInventoryItems();
                currentState.gameItemsUtils.addItem(31);
                currentState.addInventoryItem(currentState.gameItemsUtils.getItemById(31));

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
                currentState.gameUtils.addDelay(1000, () => {

                    currentState.conversationBaloon.setUpConversation(convObj);

                });




            }

        },


 gameData.ingame.items=[

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
                x: 950,//500,
                y: 650, //745,
                interactive: true,
                actions: {
                    5: { action: false, answer: ["Scotch"] },

                },
                logic: {

                    PICKUP: (currentState: z89.GameCity) => { currentState.addInventoryItem(); },
                    DROP: (currentState: z89.GameCity) => { currentState.dropInventoryItem(); },

                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect: false

            },



        ]




    
    
    
 


    


