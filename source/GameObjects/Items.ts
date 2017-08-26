module z89 {

    export class Items extends Phaser.Sprite {

        game: Phaser.Game;

        private currentState: GameCity;
        public itemObj: any;
        private id: number;
        public inventoryIndex: number;


        constructor(game: Phaser.Game, itemObj: any) {

            //console.log(itemObj)
            super(game, itemObj.x, itemObj.y, itemObj.sprite);

            

            if (itemObj.animations != undefined) {
                itemObj.animations.forEach(element => {

                    this.animations.add(element.name, element.frames, element.rate, element.loop);
                    this.play(element.name);
                    
                });
            }


            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.anchor.set(0.5, 1);
            this.id = itemObj.id;
            this.itemObj = itemObj;
            this.inputEnabled = true;
            this.name = itemObj.name;
            this.input.priorityID = 1;
            this.interactive = itemObj.interactive;

            this.fixedToCamera = itemObj.fixedToCamera;

            this.events.onInputDown.add(() => {

                let _currentItem: Items = this.currentState.getCurrentItem();

                if (this.currentState.playerActions.IsOpen() && _currentItem != undefined && _currentItem.id != this.id) this.currentState.playerActions.hide();

                let _playerDest: number = this.x;
                if (this.currentState.player.x < this.x) {

                    _playerDest -= this.itemObj.offsetX;

                } else {

                    _playerDest += this.itemObj.offsetX;

                }

                this.currentState.player.goTo(_playerDest, this.y, this);

            }, this);

            this.game.add.existing(this);
        }


        update() {

           if (this.fixedToCamera) this.cameraOffset.x = (this.currentState.camera.x * -1.1) + this.itemObj.x;
           
        }

        isInteractive(): boolean {

            return this.interactive;

        }

     



    }

}