
module z89 {



    export class PlayerMenu extends Phaser.Group {

        game: Phaser.Game;

        private currentState: GameCity;
        private isOpen: boolean = false;
        private menuBg: Phaser.Sprite;
        private loadBg: Phaser.Sprite;
        private isOpenOnStart: boolean = false;


        constructor(game: Phaser.Game) {

            super(game);

            this.fixedToCamera = true;
            this.currentState = <GameCity>this.game.state.getCurrentState();
            this.menuBg = this.game.add.sprite(512, 450, "menuBg")
            this.menuBg.alpha = 1;
            this.menuBg.anchor.set(0.5);
            this.menuBg.height = 350;
            this.add(this.menuBg);

            this.menuBg.inputEnabled = true;
            this.menuBg.input.priorityID = 2;
            this.menuBg.events.onInputDown.add(() => {
                if (!this.isOpenOnStart) this.hide();
            }, this);

            let blinkBtn: Phaser.Sprite;
            gameData.menuBlink.forEach(element => {

                blinkBtn = this.game.add.sprite(element.x, element.y, "icons")
                blinkBtn.inputEnabled = true;
                blinkBtn.frame = element.frame;
                blinkBtn.input.priorityID = 3;
                blinkBtn.name = "iconsBtn";
                blinkBtn.events.onInputDown.add(() => {
                    this.currentState.player.blinkTo(element.to);
                }, this);
                this.menuBg.addChild(blinkBtn);
            });

            //action btn
            //+++++++++++++++++++++++++++++++++
            let actionBtn: Phaser.Sprite;
            actionBtn = this.game.add.sprite(-60, -290, "icons")
            actionBtn.inputEnabled = true;
            actionBtn.input.priorityID = 3;
            actionBtn.name = "iconsBtn";
            actionBtn.events.onInputDown.add(() => {
                this.currentState.playerActions.show();
                this.hide();
            }, this);
            this.menuBg.addChild(actionBtn);

            //new game btn
            //+++++++++++++++++++++++++++++++++
            let newGame: Phaser.Sprite;
            newGame = this.game.add.sprite(-130, -290, this.game.cache.getBitmapData("roundedBtn"));
            newGame.name = "startBtn"
            newGame.inputEnabled = true;
            newGame.input.priorityID = 3;
            newGame.tint = 0x2a7600;
            newGame.events.onInputDown.add(() => {
                this.isOpenOnStart = false;
                this.hide();

            }, this);
            let newGameText: Phaser.BitmapText = this.game.add.bitmapText(265 / 2, 30, "commodore", "NEW GAME", 20);
            newGameText.anchor.set(.5);
            newGame.addChild(newGameText);
            this.menuBg.addChild(newGame);

            //no game btn
            //+++++++++++++++++++++++++++++++++
            let noGame: Phaser.Sprite;
            noGame = this.game.add.sprite(-130, -220, this.game.cache.getBitmapData("roundedBtn"));
            noGame.name = "startBtn"
            noGame.inputEnabled = true;
            noGame.input.priorityID = 3;
            noGame.tint = 0x2a7600;
            noGame.events.onInputDown.add(() => {
                this.isOpenOnStart = false;
                this.hide();

            }, this);
            let noGameText: Phaser.BitmapText = this.game.add.bitmapText(265 / 2, 30, "commodore", "NO GAME", 20);
            noGameText.anchor.set(.5);
            noGame.addChild(noGameText);
            this.menuBg.addChild(noGame);

            this.cameraOffset.y = 710;
            this.game.add.existing(this);
        }

        update() { }

        toggle() {

            if (this.isOpen) { this.hide() } else { this.showIcons(); this.show() }


        }

        openOnStart() {
            this.isOpenOnStart = true;
            this.hideIcons();
            this.show();


        }

        hideIcons() {

            this.menuBg.children.forEach((element: Phaser.Sprite) => {

                if (element.name == "iconsBtn") {
                    element.alpha = 0; element.inputEnabled = false
                } else {
                    element.alpha = 1; element.inputEnabled = true;
                }

            }, this);

        }

        showIcons() {

            this.menuBg.children.forEach((element: Phaser.Sprite) => {

                if (element.name == "iconsBtn") {
                    element.alpha = 1; element.inputEnabled = true;
                    element.input.priorityID = 3;
                } else {
                    element.alpha = 0; element.inputEnabled = false;


                }

            }, this);

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