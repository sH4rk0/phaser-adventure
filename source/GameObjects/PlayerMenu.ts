
module z89 {



    export class PlayerMenu extends Phaser.Group {

        game: Phaser.Game;

        private currentState: GameCity;
        private isOpen: boolean = false;
        private menuBg: Phaser.Sprite;
        private isOpenOnStart: boolean = false;


        constructor(game: Phaser.Game) {

            super(game);

            this.fixedToCamera = true;
            this.currentState = <GameCity>this.game.state.getCurrentState();
            this.menuBg = this.game.add.sprite(512, 450, "menu-phone")
            this.menuBg.alpha = 1;
            this.menuBg.anchor.set(0.5);
            this.menuBg.height = 350;
            this.add(this.menuBg);

            this.menuBg.inputEnabled = true;
            this.menuBg.input.priorityID = 2;
            this.menuBg.events.onInputDown.add(() => {
                if (!this.isOpenOnStart) this.hide();
            }, this);

            //blinks btns
            //+++++++++++++++++++++++++++++++++
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

                blinkBtn.addChild(this.game.add.bitmapText(0, 80, "commodore", element.name, 12))
                this.menuBg.addChild(blinkBtn);
            });

            //action btn
            //+++++++++++++++++++++++++++++++++
            let actionBtn: Phaser.Sprite;
            actionBtn = this.game.add.sprite(-35, -300, "icons");
            actionBtn.frame = 1;
            actionBtn.inputEnabled = true;
            actionBtn.input.priorityID = 3;
            actionBtn.name = "iconsBtn";
            actionBtn.events.onInputDown.add(() => {
                console.log("actionBtn")
                this.currentState.playerActions.show();
                this.hide();
            }, this);
            actionBtn.addChild(this.game.add.bitmapText(0, 80, "commodore", "Menu", 12))
            this.menuBg.addChild(actionBtn);

            //RESTART btn
            //+++++++++++++++++++++++++++++++++
            let restartBtn: Phaser.Sprite;
            restartBtn = this.game.add.sprite(60, -300, "icons");
            restartBtn.frame = 10;
            restartBtn.inputEnabled = true;
            restartBtn.input.priorityID = 3;
            restartBtn.name = "iconsBtn";
            restartBtn.events.onInputDown.add(() => {


                this.currentState.conversationBaloon.setUpConversation({
                    key: "RESTART",
                    action: null,
                    inventory: null,
                    item: null
                });
                this.hide();

               
            }, this);
            restartBtn.addChild(this.game.add.bitmapText(0, 80, "commodore", "Restart", 12))
            this.menuBg.addChild(restartBtn);


            //info btn
            //+++++++++++++++++++++++++++++++++
            let infoBtn: Phaser.Sprite;
            infoBtn = this.game.add.sprite(-130, 0, "icons");
            infoBtn.frame = 2;
            infoBtn.inputEnabled = true;
            infoBtn.input.priorityID = 3;
            infoBtn.name = "iconsBtn";
            infoBtn.events.onInputDown.add(() => {


                this.currentState.conversationBaloon.setUpConversation({
                    key: "INFO",
                    action: null,
                    inventory: null,
                    item: null
                });
                this.hide();

               
            }, this);
            infoBtn.addChild(this.game.add.bitmapText(0, 80, "commodore", "Info", 12))
            this.menuBg.addChild(infoBtn);

            //credits btn
            //+++++++++++++++++++++++++++++++++
            let optionBtn: Phaser.Sprite;
            optionBtn = this.game.add.sprite(-35, 0, "icons")
            optionBtn.frame = 3;
            optionBtn.inputEnabled = true;
            optionBtn.input.priorityID = 3;
            optionBtn.name = "iconsBtn";
            optionBtn.events.onInputDown.add(() => {
                this.currentState.conversationBaloon.setUpConversation({
                    key: "OPTIONS",
                    action: null,
                    inventory: null,
                    item: null
                });
                this.hide();

            }, this);
            optionBtn.addChild(this.game.add.bitmapText(0, 80, "commodore", "Options", 12))
            this.menuBg.addChild(optionBtn);

            //intro btn
            //+++++++++++++++++++++++++++++++++
            let introText: Phaser.BitmapText = this.game.add.bitmapText(-130, -290, "commodore", "Welcome to my adventure website experiment.\nComplete the quests to access the website sections... or explore the website without playing!", 16);
            introText.name = "start"
            introText.maxWidth=300;
            this.menuBg.addChild(introText);

            //new game btn
            //+++++++++++++++++++++++++++++++++
            let newGame: Phaser.Sprite;
            newGame = this.game.add.sprite(-130, -80, this.game.cache.getBitmapData("roundedBtn"));
            newGame.name = "start"
            newGame.inputEnabled = true;
            newGame.input.priorityID = 3;
            newGame.tint = 0x2a7600;
            newGame.events.onInputDown.add(() => { this.newGame(); }, this);
            let newGameText: Phaser.BitmapText = this.game.add.bitmapText(265 / 2, 18, "commodore", "NEW GAME", 16);
            newGameText.anchor.set(0.5, 0);
            newGame.addChild(newGameText);
            this.menuBg.addChild(newGame);

            //no game btn
            //+++++++++++++++++++++++++++++++++
            let noGame: Phaser.Sprite;
            noGame = this.game.add.sprite(-130, 0, this.game.cache.getBitmapData("roundedBtn"));
            noGame.name = "start"
            noGame.inputEnabled = true;
            noGame.input.priorityID = 3;
            noGame.tint = 0x2a7600;
            noGame.events.onInputDown.add(() => { this.noGame(); }, this);
            let noGameText: Phaser.BitmapText = this.game.add.bitmapText(265 / 2, 18, "commodore", "NO GAME", 16);
            noGameText.anchor.set(.5, 0);
            noGame.addChild(noGameText);
            this.menuBg.addChild(noGame);

            this.cameraOffset.y = 710;
            this.game.add.existing(this);
        }

        update() { }

        newGame(): void {
            this.currentState.displayChapterTitle(0);
            this.isOpenOnStart = false;
            this.hide();

        }

        noGame(): void {
            console.log("nogame");


            gameData.chapters.forEach(element => {

                element.complete(this.currentState);
                
            });
            this.isOpenOnStart = false;
            this.hide();
        }


        resetGame(): void { }

        toggle() {

            if (this.isOpen) { this.hide() } else { this.showState("iconsBtn"); this.show() }

        }

        openOnStart() {
            this.isOpenOnStart = true;
            this.showState("start");
            this.show();
        }

        showState(state: string) {

            this.menuBg.children.forEach((element: Phaser.Sprite) => {

                if (element.name == state) {
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