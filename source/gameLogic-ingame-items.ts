
    gameData.ingame.items = [

      

        {
            id: 50,
            type: 4,
            onStart: true,
            sprite: "skills",
            name: z89.getLabel(79),
            x:1161+174,
            y: 4+215-48,
            interactive: true,
            offsetX: 0,
            isStarted:false,
            fixedToCamera: false,
            checkIntersect: false,
            working:false

        },
        {
            id: 21,
            type: 1,
            onStart: true,
            animations: [{ name: "idle", frames: [0, 1], rate: 1, loop: true }],
            sprite: "devday",
            currentAnimation:"idle",
            name: z89.getLabel(61),
            x: 869,
            y: 218-48,
            interactive: true,
            offsetX: 0,
            fixedToCamera: false,
            checkIntersect: false

        },
        {
            id: 22,
            type: 3,
            onStart: true,
            sprite: "newsbg",
            name: z89.getLabel(76),
            x: 866,
            y: 336-48,
            interactive: true,
            offsetX: 0,
            fixedToCamera: false,
            isStarted:false,
            contexts: ["gamedev", "phaser"],
            //working:false

        },

        {
            id: 4,
            type: 1,
            onStart: true,
            sprite: "trash",
            name: z89.getLabel(16),
            x: 450,
            y: 649-48,
            interactive: true,
            firstMessage: [z89.getLabel(18)],
            offsetX: 50,
            fixedToCamera: false,
            checkIntersect: false,
            moved:false

        },

        
        {
            id: 19,
            type: 1,
            onStart: true,
            sprite: "michele",
            animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5, loop: true }],
            currentAnimation:"idle",
            conversationStatus:null,
            name: z89.getLabel(31),
            x: 800,
            y: 650-48,
            interactive: true,
            offsetX: 80,
            fixedToCamera: false,
            checkIntersect: false
           
         

        }, {
            id: 17,
            type: 1,
            onStart: true,
            sprite: "daniele",
            animations: [{ name: "idle", frames: [1, 2, 3, 0], rate: 4.5, loop: true }],
            name: z89.getLabel(41),
            currentAnimation:"idle",
            x: 1040,
            y: 650-48,
            turnLeft: true,
            interactive: true,
            offsetX: 80,
            fixedToCamera: false,
            checkIntersect: false,
            
        },
        {
            id: 18,
            type: 1,
            onStart: true,
            sprite: "davide",
            animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.5, loop: true }],
            name: z89.getLabel(42),
            currentAnimation:"idle",
            x: 950,
            y: 650-48,
            interactive: true,
            offsetX: 80,
            fixedToCamera: false,
            checkIntersect: false
            
        },

        {
            id: 16,
            type: 1,
            onStart: true,
            sprite: "arete",
            animations: [{ name: "idle", frames: [0, 1, 2, 3], rate: 5.2, loop: true }],
            name: z89.getLabel(40),
            currentAnimation:"idle",
            x: 720,
            y: 650-48,
            interactive: true,
            offsetX: 80,
            fixedToCamera: false,
            checkIntersect: false,
            turnLeft: true,
            
        },


        {
            id: 23,
            type: 1,
            sprite: "cable",
            onStart: true,
            name:  z89.getLabel(56),
            animations: [{ name: "fixed", frames: [9,8,7,6,5,4,3,2,1], rate: 15, loop: true },{ name: "broken", frames: [19,18,17,16,15,14,13,12,11,10], rate: 15, loop: true }],
            currentAnimation:"broken",
            x: 650,
            y: 600-48, 
            interactive: true,
            offsetX: 30,
            fixedToCamera: false,
            checkIntersect: false,
            fixed:false

        },

        {
            id: 24,
            type: 1,
            sprite: "scotch",
            onStart: true,
            name: z89.getLabel(55),
            x: 450,
            y: 648-48,
            interactive: true,
            offsetX: 30,
            fixedToCamera: false,
            checkIntersect: false

        }, {
            id: 2,
            type: 1,
            onStart: true,
            sprite: "terminal",
            animations: [{ name: "notWorking", frames: [0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4], rate: 5, loop: true },{ name: "working", frames: [5, 6], rate: 1, loop: true }],
            currentAnimation:"notWorking",
            working:false,
            name: z89.getLabel(12),
            x: 1214,
            y: 644-48,
            interactive: true,
            offsetX: 50,
            fixedToCamera: false,
            checkIntersect: false

        },

        {
            id: 5,
            type: 1,
            onStart: true,
            sprite: "cake",
            animations: [{ name: "idle", frames: [0,1,2,3,4,5,6,7,8], rate: 10, loop: true }],
            currentAnimation:"idle",
            name: "cake",
            x: 1679,
            y: 290-48,
            interactive: true,
            offsetX: 50,
            fixedToCamera: false,
            checkIntersect: false

        },  
        
        {
            id: 1,
            type: 1,
            sprite: "drink-machine",
            name: z89.getLabel(0),
            x: 1700,
            y: 724-48,
            animations: [{ name: "idle", frames: [0,1], rate: 1, loop: true }],
            currentAnimation:"idle",
            onStart: true,
            interactive: true,
            offsetX: 70,
            fixedToCamera: true,
            checkIntersect: true


        }




    ]













