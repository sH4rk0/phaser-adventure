
module z89 {



    export class conversationBaloon extends Phaser.Group {

        game: Phaser.Game;
        private currentState: GameCity;
        private baloonText: Phaser.BitmapText;
        private baloonBg: Phaser.Image;
        private baloonBorder: Phaser.Image;
        private baloonPin: Phaser.Image;
        private forkBtns: Phaser.Group;

        private baloonTarget: Items;
        private conversationKey: string;
        private conversationObj: any;
        private currentStep: number;

        private baloonX: number;
        private baloonY: number;
        private isPlaying: boolean;

        private timeEvent: Phaser.TimerEvent;
        private isSkippable: boolean;

        // this.game.time.events

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game);

            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.isSkippable = true;
            this.isPlaying = false;
            this.baloonBg = this.game.add.image(0, 20, this.game.cache.getBitmapData("baloonBg"));
            this.baloonBg.anchor.set(0.5, 1);
            this.baloonBg.alpha = .8;
            this.baloonBg.inputEnabled = true;

            this.baloonBg.events.onInputDown.add(() => {

                this.skip();

            }, this);
            this.add(this.baloonBg);

            this.baloonBorder = this.game.add.image(0, 20, this.game.cache.getBitmapData("baloonBorder"));
            this.baloonBorder.anchor.set(0.5, 1);
            this.add(this.baloonBorder);

            this.baloonPin = this.game.add.image(0, 30, this.game.cache.getBitmapData("baloonPin"));
            this.baloonPin.anchor.set(0.5, 1);
            this.add(this.baloonPin);

            this.baloonText = this.game.add.bitmapText(-140, 0, "commodore", "", 16);
            this.baloonText.maxWidth = 300;
            this.baloonText.anchor.set(0, 1);

            this.add(this.baloonText);
            this.alpha = 0;
            this.forkBtns = this.game.add.group();

            this.add(this.forkBtns);
            this.game.add.existing(this);
        }

        skip(): void {

            if (!this.isSkippable) return;
            this.hideBaloon();
            this.game.time.events.remove(this.timeEvent);
            this.currentStep++;
            let _obj = this.conversationObj[this.currentStep];
            if (_obj != undefined) { this.displayStep(); } else { this.isPlaying = false; }
            //console.log(_obj)

            //if(_obj.next!=undefined ){ this.displayStep(); }

        }

        public showBaloon(_text: string): void {

            if (_text == undefined) return;

            //this.baloonText.tint = 0x00ff00;
            this.baloonText.text = _text;

            this.fixSize();

            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => { }, this);

        }

        public hideBaloon(): void {

            this.game.add.tween(this).to({ y: this.y - 10, alpha: 0 }, 200, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);


        }

        stopConversation(): void {
            this.forkBtns.removeAll();
            this.baloonText.y = 0;
            this.isPlaying = false;
            this.hideBaloon();

            if (this.baloonTarget != null) {

                this.baloonX = this.baloonTarget.x;
                this.baloonY = this.baloonTarget.y - this.baloonTarget.height - 50;
                this.showBaloon(z89.getLabel(39));
                this.game.time.events.add(1500, () => { this.hideBaloon(); }, this);
            }



        }



        setUpConversation(_actionObj: any): void {
            this.isPlaying = true;
            this.currentStep = 0;
            if (_actionObj.item != null) this.setItemTarget(_actionObj.item);
            this.setConversationKey(_actionObj.key);
            this.setConversationObj(_actionObj.key);

            this.startConversation();
        }

        setItemTarget(item: Items): void { this.baloonTarget = item; }
        setConversationKey(key: string): void { this.conversationKey = key; }
        setConversationObj(key: string): void { if (gameData.ingame.conversation[key] != undefined) this.conversationObj = gameData.ingame.conversation[key]; }

        fixSize(): void {

            this.x = this.baloonX;
            this.y = this.baloonY;
            this.baloonBg.height = this.baloonText.height + 40;

        }


        startConversation(): void {

            if (this.baloonTarget != null) {
                if (this.currentState.player.x < this.baloonTarget.x) {
                    this.baloonTarget.turnLeft();
                } else {
                    this.baloonTarget.turnRight();
                }
            }

            this.hideBaloon();
            this.displayStep();

        }

        displayStep(): void {
            this.baloonText.y = 0;
            this.forkBtns.removeAll();
            this.isSkippable = true;
            if (!this.isPlaying) { return; };
            let _obj = this.conversationObj[this.currentStep];
            if (_obj == undefined) { this.hideBaloon(); return; }


            if (_obj.isItem) {
                this.baloonText.tint = 0xffffff;
                this.baloonBorder.tint = 0xffffff;
                this.baloonPin.tint = 0xffffff;

                this.baloonX = this.baloonTarget.x;
                this.baloonY = this.baloonTarget.y - this.baloonTarget.height - 50;

            } else {
                this.baloonText.tint = 0x00ff00;
                this.baloonBorder.tint = 0x00ff00;
                this.baloonPin.tint = 0x00ff00;
                this.baloonX = this.currentState.player.x;
                this.baloonY = this.currentState.player.y - this.currentState.player.height - 50;

            }


            if (_obj.next != undefined) { this.timeEvent = this.game.time.events.add(this.getTime(_obj.text.length), () => { this.currentStep++; this.displayStep(); }, this) }

            if (_obj.end != undefined) { this.timeEvent = this.game.time.events.add(this.getTime(_obj.text.length), () => { this.currentStep = 0; this.hideBaloon(); this.isPlaying = false; }, this) }

            if (_obj.callback != undefined) {
                
                _obj.callback(this.currentState);
             }

            if (_obj.fork != undefined) {
                this.isSkippable = false;
                this.showOptions(_obj);
                return;

            }


            this.showBaloon(_obj.text);


        }

        getTime(textLenght:number):number{

           let _time:number=(textLenght*1000)/15;
            
           if(_time<1500) return 1500;

           return _time;
            


        }
        showOptions(_obj: any): void {


            if (_obj == undefined) return;
            this.x = this.baloonX;
            this.y = this.baloonY;

            let _btn: Phaser.Sprite;
            let _btnText: Phaser.BitmapText;
            let _nextPos: number = 0;
            let _totHeight: number = 0;
            _obj.options.forEach((element, index) => {


                _btn = this.game.add.sprite(0, _nextPos, this.game.cache.getBitmapData("forkBtn"))
                _btn.inputEnabled = true;
                _btn.input.priorityID=10;
                _btn.anchor.set(.5, 1);

                _btn.events.onInputDown.add((a, b, c) => {

                    if (c.goto != undefined) { this.currentStep = this.goToLabel(c.goto); }
                    if (c.link != undefined) { this.currentStep++; window.open(c.link, "_blank"); }
                    if (c.action != undefined) { c.action(this.currentState, this.baloonTarget); this.hideBaloon(); return; }

                    this.displayStep();

                }, this, null, element);

                _btnText = this.game.add.bitmapText(0, _nextPos-10, "commodore", element.option, 16);
                _btnText.maxWidth = 290;

                _btnText.anchor.set(.5, 1);

                if (_obj.isItem) { _btn.tint = 0x333333; _btnText.tint = 0xfefefe; } else { _btn.tint = 0x0f6c0f; _btnText.tint = 0xffffff; }


                _btn.height = _btnText.height + 30;
                _nextPos = _nextPos - (_btnText.height + 25) - 20;
                _totHeight = _totHeight + _btnText.height + 50;
                this.forkBtns.add(_btn);
                this.forkBtns.add(_btnText);

            });

            if (_obj.text != undefined && _obj.text != "") {

                this.baloonText.text = _obj.text;
                this.baloonText.y = _nextPos ;
                _totHeight += this.baloonText.height + 15;

            }


            this.baloonBg.height = _totHeight + 15;

            this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);


        }


        goToLabel(label: string): number {


            let _index: number = 0;
            this.conversationObj.forEach((element: any, index: number) => {

                if (element.label != undefined && element.label == label) { _index = index; }

            });

            return _index;

        }


        isConversationActive(): boolean {

            return this.isPlaying;
        }



        update(): void { }



    }

}