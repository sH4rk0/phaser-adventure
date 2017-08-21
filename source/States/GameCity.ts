


module z89 {

        export class GameCity extends Phaser.State {

                player: Player;
                playerMenu: PlayerMenu;
                playerActions: PlayerActions;
                playerBaloon: PlayerBaloon;
                currentItem: Items;

                private bg: Phaser.TileSprite;
                private bg2: Phaser.TileSprite;
                private street: Phaser.TileSprite;
                private front: Phaser.TileSprite;
                private ground: Phaser.Sprite;

                private groupStreet: Phaser.Group;
                private groupAll: Phaser.Group;
                private groupBaloon: Phaser.Group;

                private groupCity: Phaser.Group;
                private groupFront: Phaser.Group;
                private groupMenu: Phaser.Group;
                private groupAction: Phaser.Group;
                private logicCombination: string;


                private gameInteracion: boolean = true;

                constructor() {

                        super();
                        this.gameInteracion = true;

                }

                preload() {

                }

                create() {

                        this.game.world.setBounds(0, 0, 5000, 768);


                        this.groupCity = this.game.add.group();
                        this.groupStreet = this.game.add.group();

                        this.groupAll = this.game.add.group();
                        this.groupBaloon = this.game.add.group();


                        this.groupFront = this.game.add.group();

                        this.groupAction = this.game.add.group();
                        this.groupMenu = this.game.add.group();

                        let sky: Phaser.Image = this.game.add.image(0, 0, 'sky');
                        sky.fixedToCamera = true;

                        this.groupCity.add(sky);

                        this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'bg');
                        this.bg.fixedToCamera = true;
                        this.groupCity.add(this.bg);

                        this.bg2 = this.game.add.tileSprite(0, 0, 1024, 768, 'bg2');
                        this.bg2.fixedToCamera = true;
                        this.groupCity.add(this.bg2);

                        this.groupCity.add(this.game.add.image(0, 0, 'city'));


                        this.street = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl1');
                        this.street.fixedToCamera = true;
                        this.groupStreet.add(this.street);

                        this.front = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl0');
                        this.front.fixedToCamera = true;
                        this.groupFront.add(this.front);




                        this.player = new Player(this.game);
                        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
                        this.groupAll.add(this.player);

                        this.playerBaloon = new PlayerBaloon(this.game);
                        this.groupBaloon.add(this.playerBaloon);

                        this.playerActions = new PlayerActions(this.game);
                        this.groupAction.add(this.playerActions);

                        this.playerMenu = new PlayerMenu(this.game);
                        this.groupMenu.add(this.playerMenu);

                        gameData.ingame.items.forEach(element => {

                                if (element.onStart) {

                                        this.groupAll.add(new Items(this.game, element));

                                }


                        });





                        this.ground = this.game.add.sprite(0, 644, this.game.cache.getBitmapData("ground"));
                        this.ground.inputEnabled = true;
                        this.ground.input.priorityID = 0;

                        this.ground.fixedToCamera = true;
                        this.ground.alpha = 0;


                        this.ground.events.onInputDown.add((ground: Phaser.Sprite) => {

                                /*if (((this.game.input.x > ground.x + 50) || (this.game.input.x < ground.x - 50))
                                        && (this.game.input.y > 600)) {

                                        this.currentItem = 0;

                                        if (this.playerActions.IsOpen()) this.playerActions.Hide();
                                        this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                                }*/
                                if (!this.gameInteracion) return;

                                //this.currentItem = 0;

                                if (this.playerActions.IsOpen()) this.playerActions.hide();
                                this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                        }, this, null, [this.ground]);



                }


                update() {

                        this.bg.tilePosition.x = this.camera.x * -0.2;
                        this.bg2.tilePosition.x = this.camera.x * -0.7;
                        this.street.tilePosition.x = this.camera.x * -1.1;
                        this.front.tilePosition.x = this.camera.x * -1.25;
                        this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);


                }


                render() {

                        //this.game.debug.cameraInfo(this.game.camera, 500, 32);
                        //this.game.debug.spriteCoords(this.player, 32, 32);

                        //               this.game.debug.bodyInfo(this.player, 32, 32);
                        //this.game.debug.body(this.player.myArea)
                }

                resetActions() {

                        this.playerActions.resetActions();
                        this.currentItem=null;

                }


                setCurrentItem(_item: Items): void {

                        this.currentItem = _item;

                }

                getCurrentItem(): any {


                        return this.currentItem;

                }

                getInventory(): Array<Items> {

                        return this.playerActions.getInventory();

                }

                getInventorySelected(): Array<Items> {

                        return this.playerActions.getInventorySelected();

                }



                checkActions(_itemSelected?: Items): any {

                        console.log("checkActions");
                        let returnObj: any = {
                                key: null,
                                action: null,
                                inventory: null,
                                item: null
                        };

                        let _currentAction: string = this.getCurrentActionString();
                        let _currentActionValue: number = this.getCurrentAction();

                        if (_currentAction == undefined) { _currentAction =""; returnObj.action = _currentActionValue = -1; } else {
                                
                                returnObj.action = _currentActionValue;

                        }

                        let _currentItem: Items;
                        let _inventoryIds: Array<string> = [];
                        let _Inventoryitems: string = "";

                        returnObj.inventory = this.getInventorySelected();

                        let _Item: Items;

                        if (_itemSelected != undefined) { _Item = _itemSelected } else { _Item = this.getCurrentItem(); }
                        let ItemId: string = "";
                        returnObj.item = _Item;
                        if (returnObj.item != null) ItemId = returnObj.item.id;

                        returnObj.inventory.forEach((element: Items) => { _inventoryIds.push(element.itemObj.id); });
                        if (_inventoryIds.length > 0) _Inventoryitems = _inventoryIds.join("_");

                        if (ItemId != "" && _Inventoryitems != "") _Inventoryitems = _Inventoryitems + "_";

                        let key: string = "";


                        console.log(_Inventoryitems,ItemId,_currentAction);
                        if (_currentAction != ""  && _Inventoryitems != "" && ItemId != "" ) 

                        { returnObj.key = _currentAction + "_" + _Inventoryitems + ItemId; } 

                        else if( _currentAction != ""  && _Inventoryitems != "" && ItemId == "" )

                        {returnObj.key = _currentAction + "_" + _Inventoryitems}

                        else if( _currentAction != ""  && _Inventoryitems == "" && ItemId != "" )
                                
                        {returnObj.key = _currentAction + "_" + ItemId}

                        else if( _currentAction != ""  && _Inventoryitems == "" && ItemId == "" )
                                
                        {returnObj.key = _currentAction }

                        else if(_currentAction == ""){

                                returnObj.key = "noAction";
                        }
                        
                        
                        this.logicCombination = returnObj;


                        return this.logicCombination;

                }




                getActionObject(): any {

                        return this.logicCombination;

                }

                setActionObject(value: any): void {

                        this.logicCombination = value;

                }

                setActionText(): void {

                        this.playerActions.setActionText();

                }



                getCurrentAction(): number {

                        return this.playerActions.getCurrentAction();
                }

                getCurrentActionString(): string {

                        return this.playerActions.getCurrentActionString();
                }

                getCurrentActionLabel(): string {
                        
                                                return this.playerActions.getCurrentActionLabel();
                                        }

                getSprites(): Phaser.Group {

                        return this.groupAll;
                }

                disableInteraction(): void {

                        this.gameInteracion = false;
                        //this.groupAll.ignoreChildInput=true;

                }

                enableInteraction(): void {

                        this.gameInteracion = true;
                        //this.groupAll.ignoreChildInput=false;
                }

                addInventoryItem(item: Items): void {

                        this.playerActions.addItem(this.currentItem);
                        this.groupAll.remove(this.currentItem);
                        this.setCurrentItem(null);

                }
                removeInventoryItems() {

                        this.playerActions.removeItems(this.getActionObject().inventory);
                }

                dropInventoryItem() {

                        this.groupAll.add(this.currentItem);

                }



        }


}