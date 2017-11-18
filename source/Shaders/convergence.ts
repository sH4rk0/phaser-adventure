
class convergenceShader extends Phaser.Filter {
    
        constructor(game: Phaser.Game) {
    
             let uniforms:any={
                rand: {type: '1f', value: 0.5},
                dimensions: {type: '4fv', value: [0, 0, 0, 0]}
              };
        
    
            super(game, uniforms, game.cache.getShader("convergence"));
    
        }
    
        randomize(){
    
            this.uniforms.rand.value = this.game.rnd.realInRange(0, .25);

        }
    
    }
    