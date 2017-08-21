
module z89 {



    export class PlayerMenu extends Phaser.Group {

        game: Phaser.Game;

        private currentState: GameCity;
        private isOpen: boolean = false;
        private menuBg: Phaser.Sprite;


        constructor(game: Phaser.Game) {

            super(game);


            this.fixedToCamera = true;

            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.menuBg = this.game.add.sprite(512, 450, "menuBg")
            this.menuBg.alpha = 1;
            this.menuBg.anchor.set(0.5);
            this.menuBg.height = 350;
            this.add(this.menuBg);

            this.menuBg.inputEnabled=true;
            this.menuBg.events.onInputDown.add(function () {
                this.hide();
            }, this);

            let blinkBtn:Phaser.Sprite;
            gameData.menuBlink.forEach(element => {

                blinkBtn = this.game.add.sprite(element.x, element.y, this.game.cache.getBitmapData("btn"))
                blinkBtn.inputEnabled = true;
                blinkBtn.events.onInputDown.add(function () {
                    this.currentState.player.blinkTo(element.to);
                }, this);
                this.menuBg.addChild(blinkBtn);
            });


            let actionBtn:Phaser.Sprite;
            actionBtn = this.game.add.sprite(-60, -290, this.game.cache.getBitmapData("btn"))
            actionBtn.inputEnabled = true;
            actionBtn.events.onInputDown.add(function () {
                this.currentState.playerActions.show();
                this.hide();
            }, this);
            this.menuBg.addChild(actionBtn);

      

            this.cameraOffset.y = 710;
            this.game.add.existing(this);
        }



        update() { }


        toggle() {

            if (this.isOpen) { this.hide() } else { this.show() }


        }

        show() {

            this.currentState.disableInteraction();
            this.game.add.tween(this.cameraOffset).to({ y: 100 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.isOpen = true;

            }, this);


            this.game.add.tween(this.menuBg.scale).to({ y: 1.3, x: 1.3 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 1000 }, 600, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);


        }

        hide() {

            this.game.add.tween(this.cameraOffset).to({ y: 710 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.isOpen = false;
                this.currentState.enableInteraction();

            }, this);

            this.game.add.tween(this.menuBg.scale).to({ y: 1, x: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
            this.game.add.tween(this.menuBg).to({ height: 350 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);





        }













    }

}