
class grayShader extends Phaser.Filter {
    
        constructor(game: Phaser.Game) {
    
             let uniforms:any={
                gray      : { type: '1f', value: 1.0 }
                };
    
            super(game, uniforms, game.cache.getShader("gray"));
    
        }
    
        randomize(){
    
          //  this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
          //  this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
            
    
    
        }
    
    }
    