module z89 {

        export class GameCity extends Phaser.State {

                player: Player;
                playerMenu: PlayerMenu;
                playerActions: PlayerActions;
                playerBaloon: PlayerBaloon;
                conversationBaloon: conversationBaloon;
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

                        console.log(getZero89Data());
                        this.game.cache.getBitmapFont("commodore").font.lineHeight = 45;
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

                        this.conversationBaloon = new conversationBaloon(this.game, 0, 0);
                        this.groupBaloon.add(this.conversationBaloon);

                        this.playerActions = new PlayerActions(this.game);
                        this.groupAction.add(this.playerActions);

                        this.playerMenu = new PlayerMenu(this.game);
                        this.groupMenu.add(this.playerMenu);

                        gameData.ingame.items.forEach(element => {

                                if (element.onStart) {

                                        this.addItem(element.id)


                                }


                        });

                        this.ground = this.game.add.sprite(0, 644, this.game.cache.getBitmapData("ground"));
                        this.ground.inputEnabled = true;
                        this.ground.input.priorityID = 0;

                        this.ground.fixedToCamera = true;
                        this.ground.alpha = 0;


                        this.ground.events.onInputDown.add((ground: Phaser.Sprite) => {

                                if (!this.gameInteracion) return;

                                if (this.playerActions.IsOpen()) this.playerActions.hide();
                                this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                        }, this, null, [this.ground]);


                        //this.addInventoryItem(this.getItemSpriteId(8));
                        //this.addInventoryItem(this.getItemSpriteId(15));

                        //this.meteor(null);


                }


                addDelay(delay: number, callback: any): void {


                        this.game.time.events.add(delay, callback);


                }

                addItem(id: number): void {

                        let _itemObj: any = this.getItembyId(id);

                        switch (_itemObj.type) {


                                case 8:
                                        this.groupAll.add(new ItemsTruck(this.game, _itemObj));
                                        break;


                                default:
                                        this.groupAll.add(new Items(this.game, _itemObj));
                                        break;


                        }



                }

                getItembyId(id: number): any {

                        let _itemObj: any;
                        gameData.ingame.items.forEach(element => { if (element.id == id) _itemObj = element; });

                        return _itemObj;

                }

                getItemSpriteId(id: number): any {

                        let _itemObj: Items;

                        this.groupAll.forEach((element: any) => {
                                
                                               if(element.id==id) _itemObj=element;
                                
                                            }, this);


                        return _itemObj;

                }


                update() {

                        this.bg.tilePosition.x = this.camera.x * -0.2;
                        this.bg2.tilePosition.x = this.camera.x * -0.7;
                        this.street.tilePosition.x = this.camera.x * -1.1;
                        this.front.tilePosition.x = this.camera.x * -1.25;
                        this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);

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
                                        this.resetActions();
                                        this.setActionObject(null);
                                        this.game.time.events.add(3000, () => { this.playerActions.setText(""); })
                                }
                        }


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

                        if (_currentAction != "" && _Inventoryitems != "" && ItemId != "")

                        { returnObj.key = _currentAction + "_" + _Inventoryitems + ItemId; }

                        else if (_currentAction != "" && _Inventoryitems != "" && ItemId == "")

                        { returnObj.key = _currentAction + "_" + _Inventoryitems }

                        else if (_currentAction != "" && _Inventoryitems == "" && ItemId != "")

                        { returnObj.key = _currentAction + "_" + ItemId }

                        else if (_currentAction != "" && _Inventoryitems == "" && ItemId == "")

                        { returnObj.key = _currentAction }

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

                                        if (_actionObj.inventory.length == 1) {
                                                _actionText = this.getCurrentActionLabel() + " " + _actionObj.inventory[0].name + _destText

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

                        //console.log("executeActionLogic");

                        let _actionObj: any = this.getActionObject();

                        //console.log(this.checkCombinedItems())
                        if (_actionObj.inventory.length > 0 && _actionObj.item == null) {


                                // console.log(_actionObj);

                                if (_actionObj.inventory.length == 1 && _actionObj.inventory[0].itemObj.logic[this.getCurrentActionString()] != undefined) {
                                        //console.log("logic 1")

                                        _actionObj.inventory[0].itemObj.logic[this.getCurrentActionString()](this);
                                        return true;

                                } else if (_actionObj.inventory.length == 2 && this.checkCombinedItems()) {


                                        // console.log("logic item on item", _actionObj.key);

                                        gameData.ingame.logic[this.checkCombinedItemsKey()](this);
                                        return true;

                                }

                        }
                        else if (_actionObj.inventory.length == 0 && _actionObj.item != null) {
                                //console.log("logic 2", _actionObj.item)

                                if (_actionObj.item.itemObj.logic != undefined && _actionObj.item.itemObj.logic[this.getCurrentActionString()] != undefined) { _actionObj.item.itemObj.logic[this.getCurrentActionString()](this); return true; }

                        }
                        else if (_actionObj.inventory.length > 0 && _actionObj.item != null && gameData.ingame.logic[_actionObj.key] != undefined) {
                                //console.log("logic 3", _actionObj.key)

                                gameData.ingame.logic[_actionObj.key](this);
                                return true;

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

                returnMessageExtra():void{
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

                setActionText(_text: string) { console.log("setActionText: " + _text); this.playerActions.setText(_text) }

                getActionObject(): any { return this.logicCombination; }

                setActionObject(value: any): void { this.logicCombination = value; }

                getCurrentAction(): number { return this.playerActions.getCurrentAction(); }

                getCurrentActionString(): string { return this.playerActions.getCurrentActionString(); }

                getCurrentActionLabel(): string { return this.playerActions.getCurrentActionLabel(); }

                getSprites(): Phaser.Group { return this.groupAll; }

                disableInteraction(): void { this.gameInteracion = false; }

                enableInteraction(): void { this.gameInteracion = true; }





                addInventoryItem(item?: Items): void {

                        if (item != undefined) {

                                // console.log(item);

                                this.playerActions.addItem(item);
                                this.groupAll.remove(item);


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

                        } else { _item.itemObj.fixedToCamera = false; }
                        let _newItem = new Items(this.game, _item.itemObj);

                        if (!_item.itemObj.fixedToCamera) {

                                _newItem.x = this.player.x;
                                _newItem.y = this.player.y + 10;
                        }

                        this.groupAll.add(_newItem);

                        this.playerActions.removeItem(_item);
                        _item.destroy();

                        this.player.play("pickdrop");

                }


                meteor(target:Items){

                        //console.log(target);
                        
                        let _meteor = this.game.add.sprite(600,-100,"meteor");

                        _meteor.anchor.set(.5);
                        _meteor.animations.add("run",[0,1,2,3,4,5,6,7,8],5,true).play();
                        this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add((a,b,c:Phaser.Sprite)=>{

                                this.game.camera.flash();
                                this.groupAll.remove(this.getItemSpriteId(16));
                                let exp=this.game.add.sprite(600,600,"explosion");
                                exp.anchor.set(.5);
                                exp.scale.set(2);
                                exp.animations.add("run",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],25,false).play().onComplete.add((a,b,c)=>{

                                a.kill();
                                this.playerBaloon.showBaloon("Noooooooooo!!!! :D");
                               
                                },exp);


                        c.kill()


                        },this,null,_meteor);
                       
                }

                meteor2(target:Items){
                        
                                                //console.log(target);
                                                
                                                let _meteor = this.game.add.sprite(this.player.x,-100,"meteor");
                        
                                                _meteor.anchor.set(.5);
                                                _meteor.animations.add("run",[0,1,2,3,4,5,6,7,8],5,true).play();
                                                this.game.add.tween(_meteor).to({ y: 600 }, 1000, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add((a,b,c:Phaser.Sprite)=>{
                        
                                                        this.game.camera.flash();
                                                        this.player.kill();
                                                       
                                                        let exp=this.game.add.sprite(this.player.x,this.player.y-50,"explosion");
                                                        exp.anchor.set(.5);
                                                        exp.scale.set(2);
                                                        exp.animations.add("run",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],25,false).play().onComplete.add((sprite)=>{
                        
                                                                sprite.kill();
                                                       // this.playerBaloon.showBaloon("Noooooooooo!!!! :D");

                                                      
                                                       this.conversationBaloon.setUpConversation({
                                                        key: "TALKTO_custom",
                                                        action: null,
                                                        inventory: null,
                                                        item: target
                                                });
                                                       
                                                        },exp);
                        
                        
                                                c.kill()
                        
                        
                                                },this,null,_meteor);
                                               
                                        }



        }


}