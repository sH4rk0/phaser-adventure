module z89 {
    export class Terminal extends Phaser.Group {



        private keyboard: Array<Phaser.Key> = [];

        //48-57 0-9
        //65-90 a-z
        //13 return

        //32 space
        //50 "
        //188 ,
        //190 .
        //8 backspace
        //38 40 37 49 up down left right
        private keys: Array<number> = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 13, 44, 32, 8, 38, 40, 37, 39, 188, 190];

        private terminalGroup: Phaser.Group;
        public currentState: GameCity;
        public TerminalWriter: TerminalLogic;
        private TerminalKeyboard: TerminalKeyboard;

        constructor(game: Phaser.Game) {

            super(game);

            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.addChild(this.game.add.sprite(0, 0, "terminalBg", this.terminalGroup));
            this.addChild(this.game.add.sprite((1080 - 640) / 2, ((720 - 500) / 2)-20, this.game.cache.getBitmapData("terminal"), this.terminalGroup));

            let closeBtn: Phaser.Sprite = this.game.add.sprite(670, 470, this.game.cache.getBitmapData("btn"));
            closeBtn.inputEnabled = true;
            closeBtn.input.priorityID = 4;
            closeBtn.events.onInputDown.add(() => {
                this.hide();
            }, this);
            closeBtn.alpha = 0;

            this.addChild(closeBtn);

            //console.log(Phaser.Keyboard.PERIOD,Phaser.Keyboard.A,Phaser.Keyboard.DOWN);
            


            if (!isMobile()) {

                this.keys.forEach((element: number, index: number) => {

                    this.keyboard.push(game.input.keyboard.addKey(element));
                    this.keyboard[index].onDown.add(this.addChar, this, null, this.keyboard[index]);

                });

            } else {


                this.keys.forEach((element: number, index: number) => {

                    this.keyboard.push(game.input.keyboard.addKey(element));
                    this.keyboard[index].onDown.add(this.addChar, this, null, this.keyboard[index]);

                });

            }







        }

        addChar(key): void {

            //console.log(key);
            //console.log(key.keyCode,key.event.key);

            if (key.keyCode == 13) {
                this.TerminalWriter.submitCommand();

            } else if (key.keyCode == 8) {
                this.TerminalWriter.removeChar();

            } else if (key.keyCode == 38) {//up
                this.TerminalWriter.charUp();

            } else if (key.keyCode == 40) {//down
                this.TerminalWriter.charDown();

            } else if (key.keyCode == 37) {//left
                this.TerminalWriter.charLeft();

            } else if (key.keyCode == 39) {//right
                this.TerminalWriter.charRight();
            }

            else {
                this.TerminalWriter.addChar(key.event.key);
            }


        }

        

        clear(): void { }

        show(index: number): void {

            this.game.add.tween(this).to({ alpha: 1 }, 400, Phaser.Easing.Quadratic.In, true, 0, 0, false);
            this.inputEnableChildren = true;
            this.currentState.disableInteraction();
            this.TerminalWriter = new TerminalLogic(this.game, this, 0x00ff00);
            if(isMobile()){

                this.TerminalKeyboard = new TerminalKeyboard(this.game,this,);

            }
            this.TerminalWriter.reset();
        }

        hide(): void {
            this.game.add.tween(this).to({ alpha: 0 }, 400, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(() => {

                this.destroy();
            }, this);

        }

        destroy(): void {
            this.inputEnableChildren = false;
                if (this.TerminalWriter != undefined) this.TerminalWriter.destroy();
                if (this.TerminalKeyboard != undefined) this.TerminalKeyboard.destroy();
                this.currentState.enableInteraction();
            }









    }
}

