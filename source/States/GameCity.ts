module z89 {




        export class GameCity extends Phaser.State {

                player: Player;
                playerMenu: PlayerMenu;
                playerActions: PlayerActions;
                playerBaloon: PlayerBaloon;
                conversationBaloon: conversationBaloon;
                currentItem: Items;
                Terminal: Terminal;

                private bgLevel1: Phaser.TileSprite;
                private bgLevel2: Phaser.TileSprite;
                private street: Phaser.TileSprite;
                private front: Phaser.TileSprite;
                private ground: Phaser.Sprite;

                private groupStreet: Phaser.Group;
                public groupAll: Phaser.Group;
                private groupBaloon: Phaser.Group;

                public groupCity: Phaser.Group;
                private groupFront: Phaser.Group;
                private groupMenu: Phaser.Group;
                private groupAction: Phaser.Group;
                private logicCombination: string;

                private filters: Array<Phaser.Filter>;
                private gameInteracion: boolean = true;

                public saveGameObj: saveGame;
                public gameUtils: GameUtils;
                public gameItemsUtils: GameItemsUtils;

                public chapterTitle: Phaser.BitmapText;
                public currentChapter: number;

                private half: Phaser.TileSprite;

                constructor() {

                        super();
                        this.gameInteracion = true;

                }

                preload() {

                }

                create() {
                        
                        playSound(gameSound.intro);
                        document.getElementsByTagName("body")[0].className = "game";

                        this.game.cache.getBitmapFont("commodore").font.lineHeight = 18;
                        this.game.cache.getBitmapFont("commodore2").font.lineHeight = 36;
                        this.game.world.setBounds(0, 0, 3670, 720);
                        //this.game.renderer.renderSession.roundPixels=true;

                        this.gameUtils = new GameUtils(this.game);
                        this.gameItemsUtils = new GameItemsUtils(this.game);
                        this.saveGameObj = new saveGame(this.game);


                        // +++++++++++++++++++++++++++++++++++++++
                        // group city
                        // +++++++++++++++++++++++++++++++++++++++
                       this.groupCity = this.game.add.group();
                       
                        let bgLevel0: Phaser.Image = this.game.add.image(0, 0, 'bg-level0');
                        bgLevel0.fixedToCamera = true;
                        this.groupCity.add(bgLevel0);
   
                        //palazzi sfondo bg lvl1
                        this.bgLevel1 = this.game.add.tileSprite(0, 0, 1080, 642, 'bg-level1');
                        this.bgLevel1.fixedToCamera = true;
                        this.groupCity.add(this.bgLevel1);

                        //palazzi group bg lvl2
                        this.bgLevel2 = this.game.add.tileSprite(0, 55, 1080, 548, 'bg-level2');
                        this.bgLevel2.fixedToCamera = true;
                        this.groupCity.add(this.bgLevel2);
                        
                        
                        let street:Phaser.Image=this.game.add.image(0, 592, 'street-level0');
                        street.fixedToCamera = true;
                        this.groupCity.add(street);

                        let buildings:Array<any>=[{s:"bg-home",x:0,y:640-48},{s:"bg-devday",x:624,y:640-48},{s:"bg-skills",x:1114,y:640-48},{s:"bg-cake",x:1550,y:640-36},{s:"bg-arcade",x:1800,y:640-48},{s:"bg-aerosol",x:2400,y:640-48},{s:"bg-contact",x:3000,y:640-36}]
                        let building:Phaser.Image;
                        buildings.forEach(element => {
                                
                                building=this.game.add.image(element.x, element.y, element.s,0,this.groupCity);
                                building.anchor.set(0,1)

                               
                                
                        });

                        // +++++++++++++++++++++++++++++++++++++++
                        // group street
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupStreet = this.game.add.group();
                        this.street = this.game.add.tileSprite(0, 703-48, 1080, 65, 'street-level1');
                        this.street.fixedToCamera = true;
                        this.groupStreet.add(this.street);


                        // +++++++++++++++++++++++++++++++++++++++
                        // group All
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupAll = this.game.add.group();
                        this.player = new Player(this.game);

                        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, .1, .1);


                        this.groupAll.add(this.player);

                        // +++++++++++++++++++++++++++++++++++++++
                        // group Front
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupFront = this.game.add.group();
                        this.front = this.game.add.tileSprite(0, 768 - 93 -48, 1080, 720, 'street-level2');
                        this.front.fixedToCamera = true;
                        this.groupFront.add(this.front);

                        // +++++++++++++++++++++++++++++++++++++++
                        // group Baloon
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupBaloon = this.game.add.group();
                        this.playerBaloon = new PlayerBaloon(this.game);
                        this.groupBaloon.add(this.playerBaloon);

                        this.conversationBaloon = new conversationBaloon(this.game, 0, 0);
                        this.groupBaloon.add(this.conversationBaloon);

                        // +++++++++++++++++++++++++++++++++++++++
                        // group Action
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupAction = this.game.add.group();
                        this.playerActions = new PlayerActions(this.game);
                        this.groupAction.add(this.playerActions);

                        // +++++++++++++++++++++++++++++++++++++++
                        // group Menu
                        // +++++++++++++++++++++++++++++++++++++++
                        this.groupMenu = this.game.add.group();
                        this.playerMenu = new PlayerMenu(this.game);
                        this.groupMenu.add(this.playerMenu);

                        // +++++++++++++++++++++++++++++++++++++++
                        // group Terminal
                        // +++++++++++++++++++++++++++++++++++++++

                        this.Terminal = new Terminal(this.game);
                        this.Terminal.fixedToCamera = true;
                        this.Terminal.cameraOffset.x =  0;//(1080 - 640) / 2;
                        this.Terminal.cameraOffset.y = 0;//(720 - 500) / 2;
                        this.Terminal.inputEnableChildren = false;
                        this.Terminal.alpha = 0;

                        //this.groupTerminal.alpha=0;

                        // this.groupTerminal.fixedToCamera=true;
                        // +++++++++++++++++++++++++++++++++++++++
                        // GROUND
                        // +++++++++++++++++++++++++++++++++++++++

                        
                        
                        this.ground = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("ground"));
                        this.ground.inputEnabled = true;
                        this.ground.input.priorityID = 0;

                        this.ground.fixedToCamera = true;
                        this.ground.alpha = 0;

                        this.ground.events.onInputDown.add((ground: Phaser.Sprite) => {

                                if (!this.gameInteracion) return;

                                if (this.playerActions.IsOpen()) this.playerActions.hide();
                                this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                        }, this, null, [this.ground]);
                        

                        //if game is saved
                        if (this.saveGameObj.gameIsSaved()) {
                                this.processSavedGame();
                        } else {
                                gameData.ingame.items.forEach(element => {

                                        if (element.onStart) {

                                                this.gameItemsUtils.addItem(element.id)

                                        }

                                });
                                this.saveGameObj.updatePlayerPosition(this.player.x, this.player.y);
                                this.saveGameObj.updateItems();
                                this.playerMenu.openOnStart();
                        }


                       let half: Phaser.TileSprite = this.game.add.tileSprite(0, 0,100,720, "halftone");
                        half.fixedToCamera = true;

                        let half2: Phaser.TileSprite = this.game.add.tileSprite(1080, 0,100,720, "halftone");
                        half2.fixedToCamera = true;
                        half2.scale.x = -1;

                        this.chapterTitle = this.game.add.bitmapText(512, 200, "commodore2", "", 48);
                        this.chapterTitle.fixedToCamera = true;
                        this.chapterTitle.anchor.set(.5);
                        this.chapterTitle.alpha = 0;



                        let _woofer=this.gameItemsUtils.getItemById(12);
                        _woofer.tween = this.game.add.tween(_woofer.scale).to( { x: .95, y: .975 }, 230, "Sine.easeInOut", true, 0, -1, true);

                        // this.chapterTitle.tint=0x00ff00;


                        /*  let convObj: any = {
                                 key: "TALKTO_devday",
                                 action: null,
                                 inventory: null,
                                 item: null
                             }
                             
                 
                                 this.conversationBaloon.setUpConversation(convObj);
 
                        let half3:Phaser.Sprite=this.game.add.sprite(1024,0,"halftone");
                         half3.fixedToCamera=true;
                        // half3.scale.x = -1;
                         half3.angle=90;
 
                         let half4:Phaser.Sprite=this.game.add.sprite(0,768,"halftone");
                         half4.fixedToCamera=true;
                        // half3.scale.x = -1;
                         half4.angle=-90;
                        */
                        /*  gameData.ingame.items.forEach(element => {
  
                                  if (element.onStart) {
  
                                          this.gameItemsUtils.addItem(element.id)
  
                                  }
  
  
                          });
                          */


                        //this.addInventoryItem(this.getItemSpriteId(31));
                        //this.addInventoryItem(this.getItemSpriteId(15));

                        //this.meteor(null);

                        //this.shootFromHigh([10,13], null, null)



                        //let bmd = this.game.make.bitmapData(400, 256);
                        //bmd.draw('zeroImg210');
                        //let _img:Phaser.Sprite = this.game.add.sprite(0,0,bmd)

                        /*
                       _img.width = 800;
                       _img.height = 600;

                       */


                        //this.filters[0].setResolution(this.game.width,this.game.height);
                        /*
                        //_img.filters = [this.filters[0]];

                       
*/
                        //this.player.filters = [this.filters[0]];

                        /*
                        let _item: Items = this.getItemSpriteId(10);
                        _item.filters = [this.filters[0]];

                        let _item2: Items = this.getItemSpriteId(20);
                        _item2.filters = [this.filters[1]];
                        
                        let _item2: Items = this.getItemSpriteId(33);
                        _item2.filters = [this.filters[0]];
                       */


                        /* 
                        //test filter 
                        this.filters = [];
                         this.filters.push(new testShader(this.game));
                         this.game.stage.filters=[this.filters[0]];
                           */


                        // this.game.add.sprite(100,100,this.game.cache.getBitmapData("roundedBtn"))

                }

                stopSound():void{

                        stopSoundAll();

                }

                playSound(sound:gameSound):void{

                        stopSoundAll();
                        playSound(sound);

                }

                restartGame():void {

                        this.saveGameObj.destroy();
                        document.location.reload();
                        console.log("restart game")

                }

                update():void {


                        //this.filters[0].randomize();
                        //this.filters[0].update();
                        //if (this.gameInteracion) {

                        
                        this.bgLevel1.tilePosition.x = this.camera.x * -0.2;
                        this.bgLevel2.tilePosition.x = this.camera.x * -0.7;
                        this.street.tilePosition.x = this.camera.x * -1.1;
                        this.front.tilePosition.x = this.camera.x * -1.25;

                        this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);

                        //}



                }

                processSavedGame(): void {


                        let _saved = this.saveGameObj.getSaved();
                        this.player.x = _saved.position.x;
                        this.player.y = _saved.position.y;

                        if (_saved.items != undefined) {

                                this.gameItemsUtils.addSavedItems(_saved.items)


                        }


                        if (_saved.inventory != undefined && _saved.inventory.length > 0) {
                                _saved.inventory.forEach(element => {

                                        let item: any;
                                        // console.log(element.type )
                                        switch (element.type) {


                                                case 2:
                                                        this.groupAll.add(new ItemsTruck(this.game, element));
                                                        break;

                                                case 3:
                                                        this.groupAll.add(new ItemsContent(this.game, element));
                                                        break;


                                                default:
                                                        this.groupAll.add(new Items(this.game, element));
                                                        break;


                                        }

                                        //console.log(element,this.getItemSpriteId(element))

                                        this.addInventoryItem(this.gameItemsUtils.getItemById(element.id));
                                });

                        }




                }





                render() {

                        //this.game.debug.cameraInfo(this.game.camera, 500, 232);
                        //this.game.debug.spriteCoords(this.player, 32, 32);
                        //this.game.debug.bodyInfo(this.player, 32, 32);
                        //this.game.debug.body(this.player.myArea)
                }

                startConversation(): void {



                        let _actionObj = this.getActionObject();

                        this.conversationBaloon.setUpConversation(_actionObj);



                }

                doActionSequence(_item?: Items): void {
                        // console.log("checkActions");
                        this.createActionObject(); //create the action object based on action/inventory/items selection
                        this.createActionText(); //create the action text based on the above selection

                        let _actionObj = this.getActionObject();

                        if (_actionObj.action != -1 && (_actionObj.inventory.length > 0 || _actionObj.item != null)) {

                                if (this.executeActionLogic(_item)) {
                                        this.playerBaloon.hideBaloon();
                                        this.playerActions.hide();
                                        this.playerMenu.hide();
                                        this.saveGame();
                                        this.resetActions();
                                        this.setActionObject(null);
                                        this.game.time.events.add(3000, () => { this.playerActions.setText(""); })
                                }
                        }


                }

                saveGame(): void {

                        console.log("game saved")

                }

                createActionObject(_itemSelected?: Items): any {

                        // console.log("createActionObject");
                        let returnObj: any = {
                                key: null,
                                action: null,
                                inventory: null,
                                item: null
                        };

                        let _currentAction: string = this.getCurrentActionString();
                        let _currentActionValue: number = this.getCurrentAction();

                        if (_currentAction == undefined) { _currentAction = ""; returnObj.action = _currentActionValue = -1; } else {

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

                        if (_currentAction != "" && _Inventoryitems != "" && ItemId != "") { returnObj.key = _currentAction + "_" + _Inventoryitems + ItemId; }

                        else if (_currentAction != "" && _Inventoryitems != "" && ItemId == "") { returnObj.key = _currentAction + "_" + _Inventoryitems }

                        else if (_currentAction != "" && _Inventoryitems == "" && ItemId != "") { returnObj.key = _currentAction + "_" + ItemId }

                        else if (_currentAction != "" && _Inventoryitems == "" && ItemId == "") { returnObj.key = _currentAction }

                        else if (_currentAction == "") {

                                returnObj.key = "noAction";
                        }

                        this.logicCombination = returnObj;


                        return this.logicCombination;

                }

                createActionText(): void {

                        //console.log("createActionText")
                        let _actionObj = this.getActionObject();

                        let _actionText: string = "";

                        if (_actionObj == null) {


                                if (this.getCurrentItem() != undefined) _actionText = this.getCurrentItem().name;

                        } else {

                                let _destText: string = "";
                                if (_actionObj.action == PlayerActionList.GIVE) { _destText = " to "; }
                                else if (_actionObj.action == PlayerActionList.USE) { _destText = " on "; }


                                if (_actionObj.inventory.length == 0 && _actionObj.item == null) {
                                        //console.log("case 1")
                                        _actionText = this.getCurrentActionLabel();

                                }
                                else if (_actionObj.action != -1 && _actionObj.inventory.length == 0 && _actionObj.item != null) {
                                        //console.log("case 2")
                                        _actionText = this.getCurrentActionLabel() + " " + _actionObj.item.name;

                                }
                                else if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                                        //console.log("case 3")
                                        //console.log(_actionObj.inventory.length)
                                        if (_actionObj.inventory.length == 1) {
                                                _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText

                                        } else if (_actionObj.inventory.length == 2) {

                                                _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText + _actionObj.inventory[1].name

                                        }

                                }
                                else if (_actionObj.inventory.length > 0 && _actionObj.item != null) {
                                        //console.log("case 4")

                                        if (_actionObj.inventory.length == 1) {
                                                _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText + _actionObj.item.name

                                        }


                                }

                                else if (_actionObj.key == "noAction" && _actionObj.item != null) {
                                        //console.log("case 5", _actionObj.item.name);

                                        _actionText = _actionObj.item.name

                                }


                        }

                        //console.log(_actionText);
                        this.setActionText(_actionText);

                }

                checkCombinedItems(): boolean {
                        let _actionObj: any = this.getActionObject();
                        if (_actionObj.inventory.length == 2) {


                                let _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[0].id + "_" + _actionObj.inventory[1].id;
                                // console.log(_key)
                                if (gameData.ingame.logic[_key] != undefined) return true;
                                _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[1].id + "_" + _actionObj.inventory[0].id;
                                if (gameData.ingame.logic[_key] != undefined) return true;
                                // console.log(_key)
                        }
                        return false;

                }

                checkCombinedItemsKey(): string {
                        let _actionObj: any = this.getActionObject();
                        if (_actionObj.inventory.length == 2) {


                                let _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[0].id + "_" + _actionObj.inventory[1].id;
                                // console.log(_key)
                                if (gameData.ingame.logic[_key] != undefined) return _key;
                                _key = this.getCurrentActionLabel() + "_" + _actionObj.inventory[1].id + "_" + _actionObj.inventory[0].id;
                                if (gameData.ingame.logic[_key] != undefined) return _key;
                                // console.log(_key)
                        }
                        return "";

                }

                executeActionLogic(_item?: any): boolean {



                        let _actionObj: any = this.getActionObject();
                        console.log(_actionObj);
                        //console.log(this.checkCombinedItems())
                        if (_actionObj.inventory.length > 0 && _actionObj.item == null) {
                                console.log("logic 0")

                                //console.log(_actionObj.inventory.length, this.getCurrentActionString(), _actionObj.key)
                                if (_actionObj.inventory.length == 1 && gameData.ingame.logic[_actionObj.key] != undefined) {
                                        console.log("logic 1")

                                        gameData.ingame.logic[_actionObj.key](this);
                                        return true;

                                } else if (_actionObj.inventory.length == 2 && this.checkCombinedItems()) {


                                        console.log("logic item on item", _actionObj.key);

                                        gameData.ingame.logic[this.checkCombinedItemsKey()](this);
                                        return true;

                                }

                        }
                        else if (_actionObj.inventory.length == 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                                console.log("logic 2", _actionObj.key)

                                //if (_actionObj.item.itemObj.logic != undefined && _actionObj.item.itemObj.logic[this.getCurrentActionString()] != undefined) { _actionObj.item.itemObj.logic[this.getCurrentActionString()](this); return true; }

                                gameData.ingame.logic[_actionObj.key](this);
                                return true;




                        }
                        else if (_actionObj.inventory.length > 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                                console.log("logic 3", _actionObj.key)

                                gameData.ingame.logic[_actionObj.key](this);
                                return true;

                        }
                        else {

                                this.player.illogicAction();


                        }


                        return false;


                }

                resetActions(): void {
                        //console.log("resetActions ")
                        this.playerActions.resetActions();
                        this.currentItem = null;

                }

                returnMessage(): void {


                        let _currActionObj: any = this.getActionObject();
                        let _item: Items;
                        if (_currActionObj.item == null) { _item = _currActionObj.inventory[0] } else { _item = _currActionObj.item }


                        let _mess: string = _item.itemObj.actions[_currActionObj.action].answer[this.game.rnd.integerInRange(0, _item.itemObj.actions[_currActionObj.action].answer.length - 1)];

                        this.player.showBaloon(_mess);

                }

                returnMessageExtra(): void {
                        let _currActionObj: any = this.getActionObject();
                        let _item: Items;
                        if (_currActionObj.item == null) { _item = _currActionObj.inventory[0] } else { _item = _currActionObj.item }

                        let _obj: any = _item.itemObj.actions[_currActionObj.action];
                        this.player.showBaloonExtra(_obj);

                }


                setCurrentItem(_item: Items): void { this.currentItem = _item; }

                getCurrentItem(): any { return this.currentItem; }

                getInventory(): Array<Items> { return this.playerActions.getInventory(); }

                getInventorySelected(): Array<Items> { return this.playerActions.getInventorySelected(); }

                setActionText(_text: string) {
                        // console.log("setActionText: " + _text); 
                        this.playerActions.setText(_text)
                }

                getActionObject(): any { return this.logicCombination; }

                setActionObject(value: any): void { this.logicCombination = value; }

                getCurrentAction(): number { return this.playerActions.getCurrentAction(); }

                getCurrentActionString(): string { return this.playerActions.getCurrentActionString(); }

                getCurrentActionLabel(): string { return this.playerActions.getCurrentActionLabel(); }

                getSprites(): Phaser.Group { return this.groupAll; }

                disableInteraction(): void { this.gameInteracion = false; }

                enableInteraction(): void { this.gameInteracion = true; }

                isInteractionDisabled(): boolean { return !this.gameInteracion; }



                addInventoryItem(item?: Items): void {

                        if (item != undefined) {

                                // console.log(item);

                                this.playerActions.addItem(item);
                                this.groupAll.remove(item);
                                this.player.play("pickdrop");


                        } else {

                                let _currActionObj: any = this.getActionObject();
                                let _item: Items;
                                if (_currActionObj.item == null) { _item = _currActionObj.inventory[0] } else { _item = _currActionObj.item }

                                //console.log(this.playerActions.isInInventory(_item));

                                if (this.playerActions.isInInventory(_item)) {

                                        this.player.showBaloon(z89.getLabel(28));

                                } else {

                                        this.player.play("pickdrop");
                                        this.playerActions.addItem(_item);
                                        this.groupAll.remove(_item);
                                        this.setCurrentItem(null);



                                }


                        }


                        this.saveGameObj.updateItems();
                }

                updateItemObject(itemId: number, key: string, value: any): void {

                        this.gameItemsUtils.getItemById(itemId).updateItemObj(key, value);

                }

                removeInventoryItems(): void { this.playerActions.removeItems(this.getActionObject().inventory); }

                dropInventoryItem(): void {


                        let _currActionObj: any = this.getActionObject();
                        let _item: Items;

                        if (_currActionObj.item == null) { _item = _currActionObj.inventory[0] } else { _item = _currActionObj.item }


                        if (!this.playerActions.isInInventory(_item)) { return; }

                        if (this.player.y >= 705) {
                                _item.itemObj.fixedToCamera = true;

                                let _x = this.player.x * 1.08;

                                _item.itemObj.x = _x;
                                _item.itemObj.y = this.player.y;

                        } else {
                                _item.itemObj.fixedToCamera = false;
                                _item.itemObj.x = this.player.x;
                                _item.itemObj.y = this.player.y + 10;
                        }


                        let _newItem = new Items(this.game, _item.itemObj);

                        this.groupAll.add(_newItem);

                        this.playerActions.removeItem(_item);
                        _item.destroy();
                        this.player.play("pickdrop");

                        this.saveGameObj.updateItems();

                }

                displayChapterTitle(chapterIndex: number): void {


                       if(chapterIndex!=undefined) this.currentChapter = chapterIndex;

                        this.chapterTitle.text = gameData.chapters[this.currentChapter].title
                        this.game.add.tween(this.chapterTitle).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.In, true, 500, 0, false).onComplete.add(() => {

                                this.game.add.tween(this.chapterTitle).to({ alpha: 0 }, 1000, Phaser.Easing.Quadratic.In, true, 2000, 0, false);

                        }, this);



                }

                removeItem(itemIndex: number): void {

                        this.groupAll.remove(this.gameItemsUtils.getItemById(itemIndex), true);

                }

                getContentsBycontexts(contexts: Array<string>): Array<any> {

                        
                        let _arr: Array<any> = getZero89Data();
                       // console.log(contexts,_arr)
                        if (_arr == undefined) return [{}];
                        let _con: Array<any>;
                        let _result: Array<any> = [];
                        let ele: boolean = false;

                        _arr.forEach(element => {

                                _con = element.contexts;

                                if (_con != undefined) {
                                        _con.forEach(_context => {

                                                ele = false;
                                                _context.c.forEach(tag => {

                                                        contexts.forEach(ctag => {

                                                                if (ctag == tag.t && ele == false) {
                                                                        ele = true; _result.push(element)
                                                                }
                                                        });
                                                });
                                        });
                                }
                        });

                        return _result;

                }



                shootFromHigh(targets: Array<number>, shot?: any, callback?: any) {

                        //console.log(target);
                        // obj example
                        shot = {
                                delay: 1000,
                                missile: { name: "meteor", animation: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8], rate: 5, loop: true } },
                                explosion: { name: "explosion", animation: { frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], rate: 25, loop: false } }
                        };


                        let _shot: Phaser.Sprite;
                        let _explosion: Phaser.Sprite;

                        targets.forEach((element, index) => {


                                this.groupAll.forEach((sprite: any) => {

                                        if (sprite.id == element) {

                                                //console.log(sprite);

                                                _shot = this.game.add.sprite(sprite.x, -100, shot.missile.name);
                                                _shot.anchor.set(.5, 1);
                                                _shot.animations.add("run", shot.missile.animation.frames, shot.missile.animation.rate, shot.missile.animation.loop).play();

                                                this.game.add.tween(_shot).to({ y: sprite.y }, 1000, Phaser.Easing.Quadratic.In, true, shot.delay * index, 0, false).onComplete.add((shoot: Phaser.Sprite) => {

                                                        this.game.camera.flash(0xffffff, 2000);
                                                        _explosion = this.game.add.sprite(sprite.x, sprite.y, "explosion");
                                                        _explosion.anchor.set(.5, 1);
                                                        _explosion.scale.set(2);
                                                        this.groupAll.remove(this.gameItemsUtils.getItemById(sprite.id));
                                                        _explosion.animations.add("run", shot.explosion.animation.frames, shot.explosion.animation.rate, shot.explosion.animation.loop).play().onComplete.add((explosion: Phaser.Sprite) => {

                                                                explosion.kill();

                                                                if (index == targets.length - 1) {
                                                                        console.log("callaback");
                                                                }

                                                        }, _explosion);

                                                        shoot.kill()

                                                }, this)
                                        }

                                }, this)


                        });




                        /*
                        _meteor.anchor.set(.5);
                        _meteor.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8], 5, true).play();
                        this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add((a, b, c: Phaser.Sprite) => {

                                this.game.camera.flash();
                                this.groupAll.remove(this.getItemSpriteId(16));
                                let exp = this.game.add.sprite(600, 600, "explosion");
                                exp.anchor.set(.5);
                                exp.scale.set(2);
                                exp.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 25, false).play().onComplete.add((a, b, c) => {

                                        a.kill();
                                        this.playerBaloon.showBaloon("Noooooooooo!!!! :D");

                                }, exp);


                                c.kill()


                        }, this, null, _meteor);

                        */

                }

                meteor2(target: Items) {

                        //console.log(target);

                        let _meteor = this.game.add.sprite(this.player.x, -100, "meteor");

                        _meteor.anchor.set(.5);
                        _meteor.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8], 5, true).play();
                        this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add((a, b, c: Phaser.Sprite) => {

                                this.game.camera.flash();
                                this.player.kill();

                                let exp = this.game.add.sprite(this.player.x, this.player.y - 50, "explosion");
                                exp.anchor.set(.5);
                                exp.scale.set(2);
                                exp.animations.add("run", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27], 25, false).play().onComplete.add((sprite) => {

                                        sprite.kill();
                                        // this.playerBaloon.showBaloon("Noooooooooo!!!! :D");


                                        this.conversationBaloon.setUpConversation({
                                                key: "TALKTO_custom",
                                                action: null,
                                                inventory: null,
                                                item: target
                                        });

                                }, exp);


                                c.kill()


                        }, this, null, _meteor);

                }



        }


}