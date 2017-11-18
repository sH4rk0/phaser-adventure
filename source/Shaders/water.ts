
class waterShader extends Phaser.Filter {
    
        constructor(game: Phaser.Game,image:Phaser.Sprite,mask:Phaser.Sprite) {
    
             let uniforms:any={
                time: {type:'1f',value:0},
                iChannel0 :{type:'sampler2D',value:image.texture},
                iChannel1 :{type:'sampler2D',value:mask.texture}
                };
    
            super(game, uniforms, game.cache.getShader("water"));
    
        }
    
        randomize(){
            this.uniforms.time.value +=0.02;
           // this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
           // this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
            
    
    
        }
    
    }
    