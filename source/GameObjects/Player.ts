
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
        private currentItem: any;
        public myArea: Phaser.Sprite;
        private playerTween: Phaser.Tween;
        private money: number = 10;
        private inventory: Array<string> = [];
        private intersect:boolean;

        private baloon: PlayerBaloon;




        constructor(game: Phaser.Game) {

            super(game, 100, 650, "deluca");

            this.baloon = new PlayerBaloon(game);
            this.animations.add("idle", [8, 9, 10, 11], 5, true);
            this.animations.add("walk", [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
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

            this.hideBaloon();
            this.play("walk");
            if (this.playerTween != undefined) this.playerTween.stop();
            this.currentItem = null;
            if (_x > this.x) {

                if (this.direction != PlayerDirection.RIGHT) this.changeDirection();
                this.direction = PlayerDirection.RIGHT;
            } else {

                if (this.direction != PlayerDirection.LEFT) this.changeDirection();
                this.direction = PlayerDirection.LEFT;
            }

            this.intersect=false;
            let _intersect: any = this.checkIntersect({ x1: _x, y1: _y + 1 });

            if (_intersect.point != null) {

                let _offset: number = 0;
                if (this.y < _intersect.point.y) { _offset = -5 } else { _offset = +5 }
                _x = _intersect.point.x;
                _y = _intersect.point.y + _offset;
                _item = null;
                this.intersect=true;

            }

            if (_y > this.yMax) _y = this.yMax;
            if (_y < this.yMin) _y = this.yMin;
            let distance: number;
            let distanceX: number = Phaser.Math.distance(this.x, 0, _x, 0);
            let distanceY: number = Phaser.Math.distance(0, this.y, 0, _y);


            if (distanceX > distanceY) { distance = distanceX } else { distance = distanceY }

            this.playerTween = this.game.add.tween(this).to({ x: _x, y: _y + 1 }, 7.5 * distance, Phaser.Easing.Default, true, 0, 0, false);
            this.playerTween.onComplete.add((_player:Player,_tween:Phaser.Tween,_intersect:boolean) => {
                this.play("idle");
                if (_item != null) {
                    
                    this.currentItem = _item;
                    if (_item.isInteractive()) this.currentState.playerActions.show();
                    this.executeItemLogic(_item);
                    if(_item._itemObj.firstMessage!=undefined){
                        this.showBaloon(_item._itemObj.firstMessage[this.game.rnd.integerInRange(0,_item._itemObj.firstMessage.length)]);

                    }
                    this.currentState.setCurrentItem(_item);

                }
                if (_intersect[0]) this.showBaloon(z89.getLabel(11));

            }, this,null,[this.intersect]);


        }

        checkIntersect(_toPosition: any): any {

            let _obj: any = { point: null }
            let line1: Phaser.Line = new Phaser.Line(_toPosition.x1, _toPosition.y1, this.x, this.y)
            let line2: Phaser.Line;
            let intersectPoint: Phaser.Point;


            this.currentState.getSprites().forEach((sprite) => {

                if (sprite.name != "player") {

                    line2 = new Phaser.Line(sprite.x - (sprite.width / 2) - 10, sprite.y, sprite.x + (sprite.width / 2) + 10, sprite.y);
                    intersectPoint = line1.intersects(line2, true);
                    if (intersectPoint != null) {
                        _obj.point = intersectPoint;

                    }

                }

            }, this);

            return _obj;




        }


        executeItemLogic(_item?: any): void {

            if (_item != undefined) { _item.logic(); } else if (this.currentItem != undefined) { this.currentItem.logic(); }

        }


        changeDirection(): void {

            this.scale.x *= -1;

        }


        public blinkTo(_x: number) {

            this.hideBaloon();
            this.currentState.playerMenu.hide();
            this.currentState.playerActions.hide();
            this.y=650;
            this.x = _x;


        }

        public showBaloon(_text: string) {

            this.baloon.showBaloon(_text);


        }

        public hideBaloon() {

            this.baloon.hideBaloon();


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