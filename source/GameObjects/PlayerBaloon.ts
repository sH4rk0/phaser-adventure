
module z89 {

   

    export class PlayerBaloon extends Phaser.Group {

        game: Phaser.Game;
        private currentState: GameCity;
        private baloonText:Phaser.BitmapText;
        private baloonBg:Phaser.Image;
        private baloonBorder:Phaser.Image;
        private baloonPin:Phaser.Image;
        private optionsBtns: Phaser.Group;


        constructor(game: Phaser.Game) {

            super(game);

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

            this.baloonBorder.tint=0x00ff00;
            this.baloonPin.tint=0x00ff00;

            this.baloonText = this.game.add.bitmapText(0, 0, "commodore", "", 18);
            this.baloonText.maxWidth=300;
            this.baloonText.tint=0x00ff00;
            this.baloonText.anchor.set(0.5,1);

           
            this.add(this.baloonText);
            this.alpha=0;
            this.optionsBtns = this.game.add.group();
            this.add(this.optionsBtns);
            this.game.add.existing(this);
        }

        public showBaloonExtra(_obj:any){
            
           
                        if(_obj==undefined) return;


                        let _btn:Phaser.Sprite;
                        let _btnText:Phaser.BitmapText;
                        let _nextPos:number=0;
                        let _totHeight:number=0;
                        _obj.options.forEach((element,index) => {
            
                            
                            _btn=this.game.add.sprite(0,_nextPos,this.game.cache.getBitmapData("forkBtn"))
                            _btn.inputEnabled=true;
                            _btn.anchor.set(.5,1);
                            _btn.tint=0x0d3700;
                            _btn.events.onInputDown.add((a,b,c)=>{ 
            
                               if(c.link!=undefined) { window.open(c.link,"_blank");}
            
                            },this,null, element);
            
                            _btnText=this.game.add.bitmapText(0,_nextPos,"commodore",element.option,18);
                            _btnText.maxWidth = 300;
                            
                            _btnText.anchor.set(.5, 1);
                            _btnText.tint=0x00ff00;
                           
                           _btn.height=_btnText.height+20;
                           _nextPos= _nextPos - (_btnText.height+20) -20;
                           _totHeight = _totHeight + _btnText.height+40;
                            this.optionsBtns.add(_btn);
                            this.optionsBtns.add(_btnText);
            
                        });
            
                        if(_obj.answer!=undefined && _obj.answer.length>0) {
                            
                            this.baloonText.text = _obj.answer[this.game.rnd.integerInRange(0,_obj.answer.length-1)];
                            this.baloonText.y=_nextPos+10;
                            _totHeight+=this.baloonText.height+15;
            
                        }
            
                        this.baloonBg.height = _totHeight+15;
                        this.x=this.currentState.player.x;
                        this.y=this.currentState.player.y-this.currentState.player.height-50;
            
                        this.game.add.tween(this).to({ y: this.y + 10, alpha: 1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
                        console.log("end")
                       
                    }
       
        public showBaloon(_text:any){

            if(_text==undefined) return;
            this.baloonText.text=_text;

            this.fixSize();

            this.game.add.tween(this).to({ y: this.y+10,alpha:1 }, 500, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => { }, this);
            
        }

      
        public hideBaloon(){
            this.baloonText.y=0;
            this.optionsBtns.removeAll();
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