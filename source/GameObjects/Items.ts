module z89 {

    export class Items extends Phaser.Sprite {

        game: Phaser.Game;

        public currentState: GameCity;
        public itemObj: any;
        public id: number;
        public inventoryIndex: number;
        public tween: Phaser.Tween;


        constructor(game: Phaser.Game, itemObj: any) {

            //console.log(itemObj)
            super(game, itemObj.x, itemObj.y, itemObj.sprite);

            if (itemObj.animations != undefined) {
             
                itemObj.animations.forEach(element => {

                    this.animations.add(element.name, element.frames, element.rate, element.loop);
                  
                });

                this.play(itemObj.currentAnimation);
            }


            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.anchor.set(0.5, 1);

            if (itemObj.scale != undefined) this.scale.set(itemObj.scale);
            
            this.id = itemObj.id;
            this.itemObj = itemObj;
           
            this.name = itemObj.name;
            this.interactive = itemObj.interactive;
            this.fixedToCamera = itemObj.fixedToCamera;

            if(itemObj.turnLeft!=undefined) this.turnLeft();

            if(this.interactive){
                this.inputEnabled = true;
                this.input.priorityID = 1;
            this.events.onInputDown.add(() => {

            
                if(this.currentState.isInteractionDisabled()) return;
                let _currentItem: Items = this.currentState.getCurrentItem();

               // if (this.currentState.playerActions.IsOpen() && _currentItem != undefined && _currentItem.id != this.id) this.currentState.playerActions.hide();

                let _playerDest: number = this.x;
                if (this.currentState.player.x < this.x) {

                    _playerDest -= this.itemObj.offsetX;

                } else {

                    _playerDest += this.itemObj.offsetX;

                }

                this.currentState.player.goTo(_playerDest, this.y, this);

            }, this);
        }

            this.game.add.existing(this);
        }


        update() {

            if (this.fixedToCamera) this.cameraOffset.x = (this.currentState.camera.x * -1.1) + this.itemObj.x;

        }

        isInteractive(): boolean {

            return this.interactive;

        }

        turnLeft(): void {

            
            this.scale.x = -1;

        }

        turnRight(): void {
           
            this.scale.x = 1;

        }

        updateItemObj(_key:string,_value:any):void{

            this.itemObj[_key]=_value;
            if(_key=="name") this.name=_value;
            

        }

        playAnim(_anim:string):void{

            this.itemObj.currentAnimation=_anim;
            this.play(_anim);
           
            

        }

        start():void{

            
        }





    }

}