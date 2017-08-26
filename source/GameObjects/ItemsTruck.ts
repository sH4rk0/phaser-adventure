module z89 {
    
        export class ItemsTruck extends Items {
    
            game: Phaser.Game;
            private isMoving:boolean;
            private truck:Phaser.Sprite;
            private wheels:Array<Phaser.Sprite>;
            private wAngle:number;
        
            constructor(game: Phaser.Game, itemObj: any) {
    
                itemObj.x=-1000;
                super(game, itemObj);

            
                this.wAngle=0;
                this.truck=this.game.add.sprite(0,-5,"truck");
                this.truck.anchor.set(.5,1);
                this.addChild(this.truck);

                this.game.add.tween(this.truck).to({ y: this.truck.y-5 }, 200, Phaser.Easing.Quadratic.Out, true, 0, -1, true);
                this.wheels=[];
                this.wheels.push(this.game.add.sprite(-55,-37,"truck-wheel"));
                this.wheels.push(this.game.add.sprite(88,-37,"truck-wheel"));

                this.wheels[0].anchor.set(.5);
                this.wheels[1].anchor.set(.5);
            
                this.addChild(this.wheels[0]);
                this.addChild(this.wheels[1]);

                
                this.action();

    
               
            }
    
    
            update() {

                this.wheels[0].angle+=this.wAngle;
                this.wheels[1].angle+=this.wAngle;

    
              
            }


            render(){

                this.game.debug.body(this)
            }

            action(){


                this.wAngle=20;
                this.tweenAngle(20,0,1000,7000);
            
                let _tweenA:Phaser.Tween=this.game.add.tween(this).to({ x: 500 }, 8000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);
                
                
                _tweenA.onComplete.add(()=>{

                    
                    this.wAngle=0;
                    let tween= this.game.add.tween(this).to({ x: 6000 }, 30000, Phaser.Easing.Quadratic.In, true, 5000, 0, false);
                    tween.onStart.add(()=>{
                        this.tweenAngle(0,15,15000,0);
                    });

                    tween.onComplete.add(()=>{
                        console.log("kill")
                        this.kill()
                        this.destroy();
                    },this)


                   
                    

                });
              


                

            }


            tweenAngle(start:number,end:number,duration:number,delay:number){
               
                let _angle:any={value:start,end:end};
                console.log("tweenangle",_angle);
                let _tweenA:Phaser.Tween=this.game.add.tween(_angle).to({ value: _angle.end }, duration, Phaser.Easing.Quadratic.InOut, true, delay, 0, false);
                
                _tweenA.onComplete.add(()=>{});
                _tweenA.onUpdateCallback((tween:Phaser.Tween)=>{

                  
                    this.wAngle=_angle.value;
                

                })



            }


           
         
    
    
    
        }
    
    }