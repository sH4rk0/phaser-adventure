class rippleShader extends Phaser.Filter {
    
        constructor(game: Phaser.Game) {
    
             let uniforms:any={
                
                //resolution      : { type: '2f', value: { x: 1, y: 1 }},
                resolution: {type: '4fv', value: [1024, 768, 0, 0]},
                time      : { type: '1f', value: .0 },
                mouse  : { type: '2f', value: { x: 100.0, y: 100.0 } },
                //iChannel0: { type: 'sampler2D', value: image.texture, textureData: { repeat: true } }
                
                };
    
            super(game, uniforms, game.cache.getShader("ripple"));
    
        }
    
        randomize(){
    
            //this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
            //this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
            
    
    
        }
    
    }