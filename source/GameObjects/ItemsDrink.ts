
module z89 {



    export class ItemsDrink extends Items {

        game: Phaser.Game;
        private _itemObj:any;
      

        constructor(game: Phaser.Game, itemObj:any) {


            super(game,itemObj);
             this._itemObj=itemObj;
           
        }


       logic(){


        //console.log("item logic:" + this._itemObj.id)


        switch (this.getCurrentAction()){

            // PUSH, PULL, GIVE, OPEN, CLOSE, EXAMINE, USE, PICKUP, TALKTO
            case 0: 
            case 1: 
            case 2: 
            case 3: 
            case 4:
            case 5:
            case 7: 
            case 8: 
                this.returnMessage();
            break;

            case 6: 

                if (this.getPlayer().getMoney()>5){

                    console.log("get coke")


                }else{

                    this.returnMessage();
                }
            
            break;


        }




       }

       




    }

}