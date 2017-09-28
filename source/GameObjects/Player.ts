module z89 {

    export enum PlayerStates { IDLE, WALKING, RUNNING, JUMPING }
    export enum PlayerDirection { LEFT, RIGHT, UP, DOWN, NONE }

    export class Player extends Phaser.Sprite {

        game: Phaser.Game;


        private cursors: Phaser.CursorKeys;
        private currentState: GameCity;
        private yMin: number = 654;
        private yMax: number = 768;
        private direction: PlayerDirection = PlayerDirection.RIGHT;
        private playerState: PlayerStates = PlayerStates.IDLE;
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
            this.cursors = game.input.keyboard.createCursorKeys();

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


        goTo(_x: number, _y: number, _item?: Items): void {

            this.hideBaloon();

            if (this.currentState.playerActions.IsOpen() && this.currentState.currentItem != undefined && _item != undefined && this.currentState.currentItem.itemObj.id != _item.itemObj.id) this.currentState.playerActions.hide();

            if (this.currentState.conversationBaloon.isConversationActive() && (_x != this.x || _y != this.y - 5)) { this.currentState.conversationBaloon.stopConversation() }

            this.play("walk");
            if (this.playerTween != undefined) this.playerTween.stop();
            if (_item == undefined) this.currentState.currentItem = null;

            if (this.direction == PlayerDirection.NONE) { }
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

                    this.currentState.doActionSequence(_item);

                    if (_item.isInteractive()) this.currentState.playerActions.show();

                }
                //if (_intersect[0]) this.showBaloon(z89.getLabel(11));

            }, this, null, [this.intersect]);


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

            if (this.currentState.conversationBaloon.isConversationActive()) { this.currentState.conversationBaloon.stopConversation() }
            
            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();


            this.beamOut(_x);



        }


        beamIn(toX: number) {



            this.y = 648;
            this.x = toX;
            this.width = 126;
            this.height = 126;
            this.alpha = 0;

            let beam: Phaser.Sprite = this.game.add.sprite(toX, 0, "beam");
            beam.height = 660;
            beam.anchor.set(.5, 0);
            beam.width = 150;
            beam.alpha = 0;
            beam.animations.add("beam", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true).play();

            this.tweenTint(this, 0x00ff00, 0xffffff, 500, 0, null);

            let tweenBeam: Phaser.Tween = this.game.add.tween(beam).to({ alpha: .5, width: 200 }, 500, Phaser.Easing.Quadratic.InOut, true, 300, 0, false);

            tweenBeam.onComplete.add(() => {

                this.game.add.tween(this).to({ alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

                this.game.add.tween(beam).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {
                    beam.kill()
                    beam.destroy();

                });

            });



        }


        beamOut(toX: number) {


            let beam: Phaser.Sprite = this.game.add.sprite(this.x, 0, "beam");
            beam.height = 660;
            beam.width = 100;
            beam.anchor.set(.5, 0);
            beam.alpha = 0;
            beam.animations.add("beam", [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 15, true).play();



            let tweenBeam: Phaser.Tween = this.game.add.tween(beam).to({ alpha: .3, width: 150 }, 300, Phaser.Easing.Quadratic.InOut, true, 200, 0, false);

            tweenBeam.onComplete.add(() => {

                this.game.add.tween(beam).to({ alpha: 0 }, 100, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {
                    beam.kill()
                    beam.destroy();

                });

            });

            this.tweenTint(this, 0xffffff, 0x00ff00, 300, 0, null);

            let test: Phaser.Tween = this.game.add.tween(this).to({ height: 30, width: 200 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

            test.onComplete.add(() => {


                this.game.add.tween(this).to({ width: 20, height: 700, alpha: 0 }, 300, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {
                    this.beamIn(toX);

                }, this);



            }, this);

        }

        tweenTint(obj, startColor, endColor, time = 250, delay = 0, callback = null) {
            // check if is valid object
            if (obj) {
                // create a step object
                let colorBlend = { step: 0 };
                // create a tween to increment that step from 0 to 100.
                let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, time, Phaser.Easing.Linear.None, delay);
                // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
                colorTween.onUpdateCallback(() => {
                    obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, null);
                });
                // set object to the starting colour
                obj.tint = startColor;
                // if you passed a callback, add it to the tween on complete
                if (callback) {
                    colorTween.onComplete.add(callback, this);
                }
                // finally, start the tween
                colorTween.start();
            }
        }

        public showBaloon(_text: string) { this.currentState.playerBaloon.showBaloon(_text); }
        public showBaloonExtra(_obj: any) { this.currentState.playerBaloon.showBaloonExtra(_obj); }

        public hideBaloon() { this.currentState.playerBaloon.hideBaloon(); }


        update(): void {

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;


            if (this.cursors.left.isDown) {


                this.body.velocity.x = -140;
                if (this.direction != PlayerDirection.LEFT) {
                    this.turnLeft();
                    this.play('walk');
                    this.direction = PlayerDirection.LEFT;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.right.isDown) {

                this.body.velocity.x = 140;
                if (this.direction != PlayerDirection.RIGHT) {
                    this.turnRight();
                    this.play('walk');
                    this.direction = PlayerDirection.RIGHT;
                    this.playerState = PlayerStates.WALKING;
                }
            }

            else if (this.cursors.up.isDown) {

                if (this.y < this.yMin) return;
                this.body.velocity.y = -140;
                if (this.direction != PlayerDirection.UP) {
                    this.play('walk');
                    this.direction = PlayerDirection.UP;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else if (this.cursors.down.isDown) {

                console.log(this.x, this.cameraOffset.x)
                if (this.y > this.yMax) return;
                this.body.velocity.y = 140;
                if (this.direction != PlayerDirection.DOWN) {
                    this.play('walk');
                    this.direction = PlayerDirection.DOWN;
                    this.playerState = PlayerStates.WALKING;
                }
            }
            else {


                if (this.playerState != PlayerStates.IDLE) {
                    this.animations.stop();
                    this.play("idle");
                    this.playerState = PlayerStates.IDLE;
                    this.direction = PlayerDirection.NONE;
                }

            }



        }















    }

}