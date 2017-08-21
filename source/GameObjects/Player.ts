
module z89 {

    export enum PlayerStates { IDLE, RUNNING, JUMPING }
    export enum PlayerDirection { LEFT, RIGHT }

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;


        private cursors: Phaser.CursorKeys;
        private currentState: GameCity;
        private yMin: number = 650;
        private yMax: number = 768;
        private direction: PlayerDirection = PlayerDirection.RIGHT;
        public myArea: Phaser.Sprite;
        private playerTween: Phaser.Tween;
        private money: number = 10;
        private inventory: Array<string> = [];
        private intersect: boolean;
        private baloon: PlayerBaloon;
        private illogicText: Array<string> = [z89.getLabel(19), z89.getLabel(20), z89.getLabel(13), z89.getLabel(21)]

        constructor(game: Phaser.Game) {

            super(game, 100, 650, "player");

            this.animations.add("idle", [8, 9, 10, 11], 5, true);
            this.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
            this.animations.add("punch", [12, 13, 14, 15], 7, false).onComplete.add(() => { this.play("idle"); }, this);
            this.animations.add("pickdrop", [16, 17, 18, 19], 7, false).onComplete.add(() => { this.play("idle"); }, this);
            this.animations.add("use", [19, 20, 21, 20, 19], 7, false).onComplete.add(() => { this.play("idle"); }, this);
            this.play("idle")
            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.anchor.set(0.5, 1);
            this.scale.set(1);
            this.name = "player";

            this.money = 0;

            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true;
            //this.cursors = game.input.keyboard.createCursorKeys();

            this.myArea = this.game.add.sprite(0, -30, this.game.cache.getBitmapData("hitArea"))
            this.myArea.anchor.set(.5, 1);
            this.myArea.inputEnabled = true;
            this.myArea.input.priorityID = 2;
            this.myArea.alpha = 0;
            this.myArea.height = this.height;
            this.myArea.events.onInputDown.add(() => { this.currentState.playerMenu.toggle(); }, this);

            this.addChild(this.myArea);

            this.game.add.existing(this);


        }


        goTo(_x: number, _y: number, _item?: any): void {

            // console.log(_item);
            this.hideBaloon();
            this.play("walk");
            if (this.playerTween != undefined) this.playerTween.stop();
            if (_item == undefined) this.currentState.currentItem = null;

            if (_x > this.x) {

                if (this.direction != PlayerDirection.RIGHT) this.changeDirection();

            } else {

                if (this.direction != PlayerDirection.LEFT) this.changeDirection();

            }

            this.intersect = false;
            let _intersect: any = this.checkIntersect({ x1: _x, y1: _y + 1 });

            if (_intersect.point != null) {

                let _offset: number = 0;
                if (this.y < _intersect.point.y) { _offset = -5 } else { _offset = +5 }
                _x = _intersect.point.x;
                _y = _intersect.point.y + _offset;
                _item = null;
                this.intersect = true;

            }

            if (_y > this.yMax) _y = this.yMax;
            if (_y < this.yMin) _y = this.yMin;
            let distance: number;
            let distanceX: number = Phaser.Math.distance(this.x, 0, _x, 0);
            let distanceY: number = Phaser.Math.distance(0, this.y, 0, _y);

            if (distanceX > distanceY) { distance = distanceX } else { distance = distanceY }

            this.playerTween = this.game.add.tween(this).to({ x: _x, y: _y + 1 }, 7.5 * distance, Phaser.Easing.Default, true, 0, 0, false);

            //moving player tween end
            this.playerTween.onComplete.add((_player: Player, _tween: Phaser.Tween, _intersect: boolean) => {
                this.play("idle");

                //check if an item is passed as destination
                if (_item != null) {

                    this.currentState.setCurrentItem(_item);
                    
                    if (this.x < _item.x) {

                        if (this.direction == PlayerDirection.LEFT) this.changeDirection();
                    } else {

                        if (this.direction == PlayerDirection.RIGHT) this.changeDirection();

                    }

                    this.currentState.checkActions();
                    this.executeItemLogic(_item);
                    this.currentState.setActionText();
                    this.currentState.resetActions();
                    this.currentState.setActionObject(null);
                    console.log(this.currentState.getActionObject());
                    console.log("-------------------------------------------")


                    if (_item.isInteractive()) this.currentState.playerActions.show();

                }
                //if (_intersect[0]) this.showBaloon(z89.getLabel(11));

            }, this, null, [this.intersect]);


        }

        

        executeItemLogic(_item?: any): void {

            //let _actionObj: any = this.currentState.checkActions(_item);

            console.log("executeItemLogic");
            let _actionObj: any = this.currentState.getActionObject();

            console.log(_actionObj)

            if (_actionObj != null && gameData.ingame.logic[_actionObj.key] != undefined) {
               
                console.log("logic 1")
                gameData.ingame.logic[_actionObj.key](this.currentState);
            }

            else {

                if (_item != undefined) 
                { console.log("logic 2"); _item.logic(); } 
                else if (this.currentState.getCurrentItem() != undefined) 
                { console.log("logic 3"); this.currentState.getCurrentItem().logic(); }

                else if (_item.itemObj.firstMessage != undefined) {

                    console.log("logic 4");
                    this.showBaloon(_item.itemObj.firstMessage[this.game.rnd.integerInRange(0, _item.itemObj.firstMessage.length - 1)]);

                }

            }

            this.game.time.events.add(3000,()=>{ this.currentState.playerActions.hideText();},this);


        }

        changeDirection(): void {

            if (this.direction == PlayerDirection.RIGHT) {

                this.turnLeft();

            } else {

                this.turnRight();
            }

        }

        illogicAction() {


            this.currentState.player.showBaloon(this.illogicText[this.game.rnd.integerInRange(0, this.illogicText.length - 1)]);

        }

        turnLeft(): void {

            this.scale.x = -1;
            this.direction = PlayerDirection.LEFT;
        }

        turnRight(): void {

            this.scale.x = 1;
            this.direction = PlayerDirection.RIGHT;
        }

        checkIntersect(_toPosition: any): any {

            let _obj: any = { point: null }
            let line1: Phaser.Line = new Phaser.Line(_toPosition.x1, _toPosition.y1, this.x, this.y)
            let line2: Phaser.Line;
            let intersectPoint: Phaser.Point;


            this.currentState.getSprites().forEach((sprite) => {

                if (sprite.name != "player" && sprite.itemObj.checkIntersect) {

                    line2 = new Phaser.Line(sprite.x - (sprite.width / 2) - 10, sprite.y, sprite.x + (sprite.width / 2) + 10, sprite.y);
                    intersectPoint = line1.intersects(line2, true);
                    if (intersectPoint != null) {
                        _obj.point = intersectPoint;

                    }

                }

            }, this);

            return _obj;

        }

        public blinkTo(_x: number) {

            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();
            this.y = 650;
            this.x = _x;


        }

        public showBaloon(_text: string) {

            this.currentState.playerBaloon.showBaloon(_text);


        }

        public hideBaloon() {

            this.currentState.playerBaloon.hideBaloon();


        }

        public getMoney(): number {

            return this.money;
        }

        public setMoney(_money: number): void {

            this.money = _money;

        }


        update(): void {





            /*
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.cursors.left.isDown) {
                // card.x -= 4;
                this.body.velocity.x = -120;
            }
            else if (this.cursors.right.isDown) {
                // card.x += 4;
                this.body.velocity.x = 120;
            }

            if (this.cursors.up.isDown) {
                // card.y -= 4;
                if (this.y < this.yMin) return;
                this.body.velocity.y = -120;
            }
            else if (this.cursors.down.isDown) {
                // card.y += 4;
                if (this.y > this.yMax) return;
                this.body.velocity.y = 120;
            }
            */


        }















    }

}