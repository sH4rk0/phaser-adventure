

let gameData = {


    ingame: {
        // PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO
        //game logic
        logic:

        {
            //use money on drink machine
            USE_8_1: (currentState: any) => {
                currentState.player.play("use");                
                currentState.removeInventoryItems();
            },

            USE_9_1: (currentState: any) => {
                currentState.player.play("use");
                
                currentState.removeInventoryItems();
            }

        },

        //items logic
        items: [

            {
                id: 1,
                type: 1,
                sprite: "drink-machine",
                name: z89.getLabel(0),
                x: 500,
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

                    PUSH: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    PULL: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    GIVE: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    OPEN: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    CLOSE: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    EXAMINE: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    USE: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    PICKUP: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    DROP: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    },
                    TALKTO: (currentState: any) => {
                        currentState.currentItem.returnMessage();
                    }

                },

                offsetX: 70,
                fixedToCamera: true,
                checkIntersect:true

            },



            {
                id: 2,
                type: 2,
                onStart: true,
                sprite: "phoneNotWork",
                animations: [{ name: "idle", frames: [0,0,0,0,0,0,0,0,0,0,0,0,0,0, 1, 2, 3, 4], rate: 5, loop: true }],
                name: z89.getLabel(12),
                x: 1114,
                y: 644,
                interactive: true,

                offsetX: 50,
                coins: 0,
                fixedToCamera: false,
                checkIntersect:false

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
                checkIntersect:false

            },


            {
                id: 4,
                type: 3,
                onStart: true,
                sprite: "trash",
                name: z89.getLabel(16),
                x: 650,
                y: 649,
                interactive: true,
                firstMessage: [z89.getLabel(18)],
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect:false

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
                checkIntersect:true

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
                checkIntersect:true

            },
            {
                id: 7,
                type: 5,
                sprite: "coke",
                onStart: true,
                name: z89.getLabel(10),
                x: 400, //500,
                y: 650,//745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },

                },
                logic: {

                    PICKUP: (currentState: any) => {


                        currentState.addInventoryItem();
                        currentState.player.play("pickdrop");

                    },

                    DROP: (currentState: any) => {



                    },


                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect:true

            },

            {
                id: 8,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 300,//500,
                y: 654, //745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },

                },
                logic: {

                    PICKUP: (currentState: any) => { currentState.addInventoryItem();currentState.player.play("pickdrop"); },

                    DROP: (currentState: any) => { },


                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect:false

            },

            {
                id: 9,
                type: 6,
                sprite: "coins",
                onStart: true,
                name: z89.getLabel(23),
                x: 300,//500,
                y: 700, //745,
                interactive: true,
                actions: {
                    0: { action: false, answer: [z89.getLabel(1)] },

                },
                logic: {

                    PICKUP: (currentState: any) => { currentState.addInventoryItem();currentState.player.play("pickdrop"); },

                    DROP: (currentState: any) => { },


                },

                offsetX: 30,
                fixedToCamera: false,
                checkIntersect:false

            },
            {
                id: 3,
                type: 2,
                onStart: true,
                sprite: "4eyes",
                animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 4, loop: true }],
                name: z89.getLabel(25),
                x: 700,
                y: 650,
                interactive: true,
                offsetX: 50,
                fixedToCamera: false,
                checkIntersect:false

            },




        ]




    },


    assets: {
        spritesheets: [

            { name: "player", path: "assets/images/game/player.png", width: 126, height: 126, frames: 64 },
            { name: "phoneWork", path: "assets/images/game/items/phoneWork.png", width: 56, height: 132, frames: 2 },
            { name: "phoneNotWork", path: "assets/images/game/items/phoneNotWork.png", width: 52, height: 132, frames: 5 },
            { name: "4eyes", path: "assets/images/game/people/4eyes.png", width: 65, height: 138, frames: 4 },

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
            { name: "4eyes", path: "assets/images/game/people/4eyes.png" },
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
        { icon: "", to: 100, x: -130, y: -290 },

        { icon: "", to: 700, x: -130, y: -220 },
        { icon: "", to: 1254, x: -60, y: -220 },
        { icon: "", to: 1590, x: 10, y: -220 },
        { icon: "", to: 1900, x: 80, y: -220 },

        { icon: "", to: 2580, x: -130, y: -150 },
        { icon: "", to: 3170, x: -60, y: -150 },
        { icon: "", to: 4000, x: 10, y: -150 },
        { icon: "", to: 4500, x: 80, y: -150 }


    ]

}
