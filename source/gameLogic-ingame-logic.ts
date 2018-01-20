
gameData.ingame.logic =

    {



        // examine terminal 
        EXAMINE_2: (cs: z89.GameCity) => {

            if (cs.gameItemsUtils.getItemById(2).itemObj.working) {
                cs.player.showBaloon(z89.getLabel(82));
            }
                else{

                    cs.player.showBaloon(z89.getLabel(81));

                }

            
        },
         // use terminal
        USE_2: (cs: z89.GameCity) => {
            
            if (cs.gameItemsUtils.getItemById(2).itemObj.working) {
                        cs.Terminal.show(0);
                        cs.playerActions.hide();}
                        else{

                            cs.player.showBaloon(z89.getLabel(83));

                        }
                    },
       
        // examine drink machine
        EXAMINE_50: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(78));
        },
        // examine drink machine
        EXAMINE_1: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(6));
        },

        // devday palace
        EXAMINE_21: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(38));
        },

        // devday screen
        EXAMINE_22: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(75));
        },

        //use devday
        USE_21: (cs: z89.GameCity) => {

            let convObj: any = {
                key: "TALKTO_devday",
                action: null,
                inventory: null,
                item: null
            }


            cs.conversationBaloon.setUpConversation(convObj);


        },


        //examine garbage 
        EXAMINE_4: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(62));
        },
        //push garbage 
        PUSH_4: (cs: z89.GameCity) => {

            let item: any = cs.gameItemsUtils.getItemById(4);
            if (!item.itemObj.moved) {
                cs.player.play("use");
                item.itemObj.moved = true;
                if (cs.player.x < 450) {
                    cs.game.add.tween(item).to({ x: 500 }, 500, Phaser.Easing.Quadratic.Out, true, 400, 0, false);
                    item.updateItemObj("x", 500);
                } else {
                    cs.game.add.tween(item).to({ x: 400 }, 500, Phaser.Easing.Quadratic.Out, true, 400, 0, false);
                    item.updateItemObj("x", 400);
                }

            } else {
                cs.player.showBaloon("Nothing to do with this!");

            }


        },

        //examine scotch tape
        EXAMINE_24: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(58));


        },

        //examine energy box
        EXAMINE_23: (cs: z89.GameCity) => {

            if (cs.gameItemsUtils.getItemById(23).itemObj.fixed) {

                cs.player.showBaloon(z89.getLabel(60));
            } else {
                cs.player.showBaloon(z89.getLabel(59));

            }


        },

        //pickup scotch
        PICKUP_24: (cs: z89.GameCity) => { cs.addInventoryItem(cs.gameItemsUtils.getItemById(24)); },

        //drop scotch
        DROP_24: (cs: z89.GameCity) => { cs.dropInventoryItem(); },

        //use scotch on broken 
        USE_24_23: (cs: z89.GameCity) => {

            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(1000, () => {
                cs.updateItemObject(23, "name", z89.getLabel(57))

                cs.gameItemsUtils.getItemById(23).playAnim("fixed");
                cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
                cs.gameItemsUtils.getItemById(22).start();
                
                cs.updateItemObject(22, "isStarted", true);
                cs.updateItemObject(19, "conversationStatus", 1);

                cs.updateItemObject(2,"working", true);
                cs.gameItemsUtils.getItemById(2).playAnim("working");
                
                cs.saveGameObj.updateItems();

            });

        },
        //examine gerardo
        EXAMINE_16: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(43));
        },
        TALKTO_16: (cs: z89.GameCity) => {

            cs.conversationBaloon.setUpConversation({
                key: "TALKTO_16",
                action: null,
                inventory: null,
                item: cs.currentItem
            });
        },
        //examine daniele
        EXAMINE_17: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(63));
        },
        //examine davide
        EXAMINE_18: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(64));
        },
        //examine michele
        EXAMINE_19: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(32));
        },

        //talkto michele
        TALKTO_19: (cs: z89.GameCity) => {


            let item: any = cs.gameItemsUtils.getItemById(19);
            let convObj: any = {
                key: "",
                action: null,
                inventory: null,
                item: cs.currentItem
            }

            //console.log(item.itemObj.conversationStatus)
            switch (item.itemObj.conversationStatus) {

                case null:
                    convObj.key = "TALKTO_19_null";
                    break;

                case 0:
                    convObj.key = "TALKTO_19_0";
                    break;

                case 1:
                    convObj.key = "TALKTO_19_1";
                    break;

            }

            cs.conversationBaloon.setUpConversation(convObj);

        },






    }




/*

gameData.ingame.logic =

    {

        // devday palace
        EXAMINE_21: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(38));
        },
        USE_21: (cs: z89.GameCity) => {

            cs.conversationBaloon.setUpConversation({
                key: "TALKTO_devday",
                action: null,
                inventory: null,
                item: null
            });

            cs.player.showBaloon(z89.getLabel(38));
        },

        // scotch tape
        EXAMINE_24: (cs: z89.GameCity) => {

            cs.player.showBaloon(z89.getLabel(58));
        },

        //broken energy box
        EXAMINE_23: (cs: z89.GameCity) => {

            if (cs.gameItemsUtils.getItemById(23).itemObj.fixed) {

                cs.player.showBaloon(z89.getLabel(60));
            } else {
                cs.player.showBaloon(z89.getLabel(59));

            }


        },

        PICKUP_24: (cs: z89.GameCity) => { cs.addInventoryItem(cs.gameItemsUtils.getItemById(24)); },
        DROP_24: (cs: z89.GameCity) => { cs.dropInventoryItem(); },

        USE_24_23: (cs: z89.GameCity) => {

            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(1000, () => {
                cs.gameItemsUtils.getItemById(23).updateItemObj("name", z89.getLabel(57));
                cs.gameItemsUtils.getItemById(23).playAnim("fixed");
                cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
                cs.gameItemsUtils.getItemById(22).start();
                cs.saveGameObj.updateItems();

            });

        },

        //use money on drink machine
        USE_8_1: (cs: z89.GameCity) => {
            cs.player.play("use");
            cs.removeInventoryItems();
            cs.gameUtils.addDelay(2000, () => { cs.gameItemsUtils.addItem(7); });

        },

        //use coin o coin
        USE_8_15: (cs: z89.GameCity) => {
            console.log("coin on coins");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(7);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(7));

        },

        //use block on chain
        USE_8_28: (cs: z89.GameCity) => {
            console.log("block on chain");
            cs.playerBaloon.showBaloon("I GOT BLOCKCHAIN!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(30);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(30));

        },
        //use bit o coin
        USE_29_15: (cs: z89.GameCity) => {
            console.log("bit on coin");
            cs.playerBaloon.showBaloon("I GOT A BITCOIN!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(32);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(32));

        },
        USE_30_32: (cs: z89.GameCity) => {
            console.log("bitcoin on blockchain");
            cs.playerBaloon.showBaloon("I GOT DEVDAY PASS!");
            cs.removeInventoryItems();
            cs.gameItemsUtils.addItem(31);
            cs.addInventoryItem(cs.gameItemsUtils.getItemById(31));

        },

        GIVE_31_13: (cs: z89.GameCity) => {
            console.log("pass to daniele");
            cs.player.play("use");
            cs.removeInventoryItems();

            let convObj: any = {
                key: "TALKTO_custom",
                action: null,
                inventory: null,
                item: cs.currentItem
            }
            cs.gameUtils.addDelay(1000, () => {

                cs.conversationBaloon.setUpConversation(convObj);

            });


        }

    }

*/