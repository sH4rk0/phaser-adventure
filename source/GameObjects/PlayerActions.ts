
module z89 {


    export enum PlayerActionList { PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO }


    export class PlayerActions extends Phaser.Group {

        game: Phaser.Game;

        private currentState: GameCity;
        private isOpen: boolean = false;
        private toggleBtn: Phaser.Sprite;
        private menuBg: Phaser.Sprite;
        private actionList: Array<string> = ["PUSH", "PULL", "GIVE", "OPEN", "CLOSE", "EXAMINE", "USE", "PICK UP", "TALK TO"];
        private actionText: Phaser.BitmapText;
        private _currentAction: number = -1;

        constructor(game: Phaser.Game) {

            super(game);


            this.fixedToCamera = true;

            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.menuBg = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("menuAction"))
            this.menuBg.alpha = .8;
            this.menuBg.anchor.set(0);
            this.add(this.menuBg);

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

                    this._currentAction = btn.z;


                    this.setText(this.actionList[btn.z] + " " + this.currentState.getCurrentItem().name);
                    this.currentState.player.executeItemLogic();


                }, this, null, [_btn]);

                _btn.addChild(_txt)
                this.addChild(_btn);

            });

            this.actionText = this.game.add.bitmapText(200, 725, "commodore", "", 20);
            this.actionText.alpha = 0;
            this.addChild(this.actionText);

            this.cameraOffset.x = -300;
            this.game.add.existing(this);
        }



        update() { }


        toggle() {

            if (this.isOpen) { this.hide() } else { this.show() }

        }

        show() {
            if(this.isOpen) return;
            this.currentState.disableInteraction();
            this.actionText.text = "";
            this.game.add.tween(this.cameraOffset).to({ x: -40 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.isOpen = true;
                this.currentState.enableInteraction();
                this.setText(this.currentState.getCurrentItem().name);

            }, this);



        }

        hide() {

            if(!this.isOpen) return;
            this.game.add.tween(this.cameraOffset).to({ x: -300 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.isOpen = false;
                this._currentAction = -1;

            }, this);

            this.game.add.tween(this.actionText).to({ alpha: 0, x: 200 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);


        }

        IsOpen(): boolean { return this.isOpen; }

        currentAction(): number { return this._currentAction; }

        setText(_string: string): void {

            this.actionText.text = _string;

            if(this.actionText.tint==0x00ff00){
                this.actionText.tint = 0x00ff10}else{this.actionText.tint = 0x00ff00}
            //this.actionText.tint = 0x2ec517 + this.game.rnd.integerInRange(0, 100);

            this.game.add.tween(this.actionText).to({ alpha: 1, x: 320 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);


        }













    }

}