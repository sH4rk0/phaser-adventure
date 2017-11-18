
class noiseShader extends Phaser.Filter {

    constructor(game: Phaser.Game) {

         let uniforms:any={
            rand      : {type: '1f', value: 1.5},
            strength  : {type: '1f', value: 0.25},
            dimensions: {type: '4fv', value: [0, 0, 0, 0]}
            };

        super(game, uniforms, game.cache.getShader("noise"));

    }

    randomize(){

        this.uniforms.rand.value = this.game.rnd.realInRange(0, 1);
        this.uniforms.strength.value = this.game.rnd.realInRange(0, .25);
        


    }

}
