
module z89 {

   

    export class PlayerBaloon extends Phaser.Group {

        game: Phaser.Game;
        private currentState: GameCity;
        private baloonText:Phaser.BitmapText;
        private baloonBg:Phaser.Image;
        private baloonBorder:Phaser.Image;
        private baloonPin:Phaser.Image;



        constructor(game: Phaser.Game) {

            super(game,);

            this.currentState = <GameCity>this.game.state.getCurrentState();

            this.baloonBg=this.game.add.image(0,20,this.game.cache.getBitmapData("baloonBg"));
            this.baloonBg.anchor.set(0.5,1);
            this.baloonBg.alpha=.8;
            this.add(this.baloonBg);

            this.baloonBorder=this.game.add.image(0,20,this.game.cache.getBitmapData("baloonBorder"));
            this.baloonBorder.anchor.set(0.5,1);
            this.add(this.baloonBorder);

            this.baloonPin=this.game.add.image(0,30,this.game.cache.getBitmapData("baloonPin"));
            this.baloonPin.anchor.set(0.5,1);
            this.add(this.baloonPin);





            this.baloonText = this.game.add.bitmapText(0, 0, "commodore", "", 18);
            this.baloonText.maxWidth=300;
            this.baloonText.anchor.set(0.5,1);

            

            
            this.add(this.baloonText);
            this.alpha=0;

            this.game.add.existing(this);
        }


        


       

        public showBaloon(_text:string){

            if(_text==undefined) return;
        if(this.baloonText.tint==0x00ff00){
            this.baloonText.tint = 0x00ff10}else{this.baloonText.tint = 0x00ff00}
          
            this.baloonText.text=_text;

            this.fixSize();


            this.game.add.tween(this).to({ y: this.y+10,alpha:1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => { }, this);
            
        }

        public hideBaloon(){

            this.alpha=0;
            

        }

        fixSize(){

            this.x=this.currentState.player.x;
            this.y=this.currentState.player.y-this.currentState.player.height-50;
            this.baloonBg.height=this.baloonText.height+40;
            
        }
     


        update(): void {

         
          

        }















    }

}