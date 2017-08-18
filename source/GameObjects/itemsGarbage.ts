
module z89 {



    export class ItemsGarbage extends Items {

        game: Phaser.Game;
        private _itemObj:any;
       

        constructor(game: Phaser.Game, itemObj:any) {


            super(game,itemObj);
             this._itemObj=itemObj;
           
        }


       logic(){


        console.log("item logic:" + this._itemObj.id)

       }

       




    }

}