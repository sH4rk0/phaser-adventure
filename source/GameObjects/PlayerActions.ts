module z89 {


    export enum PlayerActionList { PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, DROP, TALKTO }


    export class PlayerActions extends Phaser.Group {

        game: Phaser.Game;

        private currentState: GameCity;
        private isOpen: boolean = false;
        private toggleBtn: Phaser.Sprite;
        private menuBg: Phaser.Sprite;
        private actionList: Array<string> = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICK UP", "DROP", "TALK TO"];
        private actionListFunctions: Array<string> = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICKUP", "DROP", "TALKTO"];
        private actionText: Phaser.BitmapText;
        private currentAction: number = -1;
        private iconGroup: Phaser.Group;
        private buttonGroup: Phaser.Group;
        private inventory: Array<Items> = [];
        private inventorySelected: Array<number> = [];
        private iconAlpha: number = .8;
        private actionTextTween: Phaser.Tween;


        constructor(game: Phaser.Game) {

            super(game);
            this.currentState = <GameCity>this.game.state.getCurrentState();
            this.fixedToCamera = true;
            this.menuBg = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("menuAction"))
            this.menuBg.alpha = .8;
            this.menuBg.anchor.set(0);
            this.add(this.menuBg);

            this.buttonGroup = this.game.add.group();
            this.iconGroup = this.game.add.group();


            //ACTION buttons
            let _btn: Phaser.Sprite;
            let _txt: Phaser.BitmapText;
            this.actionList.forEach((element, index) => {

                _btn = this.game.add.sprite(70, index * 60, this.game.cache.getBitmapData("menuActionBtn"));
                _btn.name = element;
                _btn.z = index;
                _btn.anchor.set(0);
                _txt = this.game.add.bitmapText(100, 15, "commodore", element, 20);
                _txt.anchor.set(.5, 0);
                _txt.tint = 0xffffff;
                _btn.inputEnabled = true;
                _btn.input.priorityID = 2;

                _btn.events.onInputDown.add((btn: Phaser.Sprite) => {

                    this.resetActions();

                    this.currentAction = btn.z;
                    //this.setText(this.actionList[btn.z]);

                    let _txt: Phaser.BitmapText = <Phaser.BitmapText>btn.getChildAt(0);
                    _txt.tint = 0x00ff00;

                    this.currentState.doActionSequence();

                }, this, null, [_btn]);

                _btn.addChild(_txt);
                this.buttonGroup.addChild(_btn);

            });

            this.add(this.buttonGroup);

            //inventory ICONS
            let _icon: Phaser.Sprite;
            let _iconPos: Array<any> = [{ x: 88, y: 600 }, { x: 178, y: 600 }, { x: 88, y: 685 }, { x: 178, y: 685 }];
            for (var index = 0; index < 4; index++) {

                _icon = this.game.add.sprite(_iconPos[index].x, _iconPos[index].y, "inventory", 0, this.iconGroup);
                _icon.inputEnabled = true;
                _icon.z = index;
                _icon.input.priorityID = 2;
                _icon.alpha = this.iconAlpha;
                _icon.events.onInputDown.add((icon: Phaser.Sprite) => {

                    if (icon.children.length == 0) return;

                    if (this.isInverntoryItemSelected(icon.z) != -1) {

                        if (this.currentAction == -1) {

                            this.currentState.player.showBaloon(z89.getLabel(29));
                        } else {

                            icon.frame = 0;
                            this.currentState.doActionSequence();
                        }

                    }
                    else {

                        if (this.currentAction == -1) {

                            this.currentState.player.showBaloon(z89.getLabel(29));
                        } else {

                            icon.frame = 1;
                            this.inventorySelected.push(icon.z);
                            this.currentState.doActionSequence();
                        }

                    };

                }, this);

            }


            this.add(this.iconGroup);

            this.actionText = this.game.add.bitmapText(320, 725, "commodore", "", 20);
            this.actionText.alpha = 0;
            this.addChild(this.actionText);

            this.cameraOffset.x = -300;
            this.game.add.existing(this);
        }



        update() { }

        private isInverntoryItemSelected(itemIndex: number): number {

            let _itemAt: number = this.inventorySelected.indexOf(itemIndex)
            if (_itemAt != -1) {

                this.inventorySelected.splice(_itemAt, 1);
                return _itemAt

            }
            return -1;

        }

        private deselectItems(): void {

            this.inventorySelected = [];
            this.iconGroup.setAll("frame", 0);

        }

        getInventory(): Array<Items> {

            return this.inventory;
        }

        getInventorySelected(): Array<Items> {

            let _selectedItems: Array<Items> = [];
            this.inventorySelected.forEach(element => {
                _selectedItems.push(this.inventory[element]);
            });
            return _selectedItems;
        }

        private toggle() {

            if (this.isOpen) { this.hide() } else { this.show() }

        }

        show() {
            //console.log("show")
            if (!this.isOpen) {

                this.currentState.disableInteraction();
                this.game.add.tween(this.cameraOffset).to({ x: -40 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                    this.isOpen = true;
                    this.currentState.enableInteraction();


                }, this);

            }

        }

        cleanAction(): void {
            this.buttonGroup.forEach((element: Phaser.Sprite) => {

                let _txt: Phaser.BitmapText = <Phaser.BitmapText>element.getChildAt(0);
                _txt.tint = 0xffffff;

            }, this);
        }

        resetActions(): void {

            //console.log("reset action")
            this.cleanAction();
            this.currentAction = -1;
            this.inventorySelected = [];
            this.iconGroup.setAll("frame", 0);


        }




        hide() {

            if (!this.isOpen) return;
            this.game.add.tween(this.cameraOffset).to({ x: -300 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.isOpen = false;
                this.currentAction = -1;

                this.deselectItems();
                this.resetActions();
                this.currentState.setActionObject(null);
                this.setText("");


            }, this);

            this.hideText();

        }


        hideText() {

            if (this.actionTextTween != undefined) this.actionTextTween.stop();
            this.actionTextTween = this.game.add.tween(this.actionText).to({ alpha: 0, x: 500 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.actionTextTween.onComplete.add(() => { this.actionText.x = 200; }, this);

        }

        IsOpen(): boolean { return this.isOpen; }

        getCurrentAction(): number { return this.currentAction; }
        getCurrentActionString(): string { return this.actionListFunctions[this.currentAction] }
        getCurrentActionLabel(): string { return this.actionList[this.currentAction] }

        setText(_string: string): void {

            //console.log("setText",_string)
            this.actionText.text = _string;

            /* if (this.actionText.tint == 0x00ff00) {
                 this.actionText.tint = 0x00ffff
             } else { this.actionText.tint = 0x00ff00 }
             */
            this.actionText.tint = 0x00ff00;

            if (this.actionTextTween != undefined) this.actionTextTween.stop();
            this.actionTextTween = this.game.add.tween(this.actionText).to({ alpha: 1, x: 320 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

        }

        removeItems(items: Array<Items>): void {

            items.forEach(element => {

                this.removeItem(element);
            });


        }

        removeItem(item: Items): void {

            this.cleanInventoryIcons();
            this.cleanInventoryFromItem(item);
            this.remapInventoryItemsIndex();
            this.assignItemToIcon();

        }

        private assignItemToIcon(): void {

            let _icon: Phaser.Sprite;
            this.inventory.forEach((element: Items, index: number) => {

                _icon = <Phaser.Sprite>this.iconGroup.getChildAt(index);
                let _inv: Phaser.Sprite = this.game.add.sprite(35, 35, element.itemObj.sprite);
                _inv.anchor.set(.5);
                _icon.addChild(_inv);

            });

        }

        //remove child items from the inventory icons
        private cleanInventoryIcons(): void {

            this.iconGroup.forEach((icon: Phaser.Sprite) => {

                if (icon.children.length > 0) icon.removeChildAt(0);

            }, this);

            this.iconGroup.setAll("frame", 0);

        }



        // remove itemes from inventory array
        private cleanInventoryFromItem(item: Items): void {

            this.inventory.splice(item.inventoryIndex, 1);

        }

        private remapInventoryItemsIndex() {

            this.inventory.forEach((element: Items, index: number) => { element.inventoryIndex = index; });

        }


        addItem(item: Items): void {

            item.inventoryIndex = this.inventory.length;
            this.inventory.push(item);

            let _icon: Phaser.Sprite = <Phaser.Sprite>this.iconGroup.getChildAt(this.inventory.length - 1)



            let _inv: Phaser.Sprite = this.game.add.sprite(35, 35, item.itemObj.sprite);
            _inv.anchor.set(.5);
            _icon.addChild(_inv);

            this.currentState.updatePlayerInventory(this.inventory);


        }

        isInInventory(item: Items): boolean {

            let match: boolean = false;
            this.inventory.forEach(element => {
                //console.log(item.itemObj.id, element.itemObj.id)
                if (item.itemObj.id == element.itemObj.id) match = true;

            });

            return match;
        }


        private dropItem(): void { }


    }

}