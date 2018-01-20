module z89 {

    export class GameUtils {

         game: Phaser.Game;
         currentState: GameCity;
        


        constructor(game: Phaser.Game) {

            this.game=game;
            this.currentState=<GameCity>this.game.state.getCurrentState();
           
        }

        addDelay(delay: number, callback: any): void {
                
                
                                        this.game.time.events.add(delay, callback);
                
                
                                }

        tweenTint(obj, startColor, endColor, time = 250, delay = 0, callback = null) {
            // check if is valid object
            if (obj) {
                    // create a step object
                    let colorBlend = { step: 0 };
                    // create a tween to increment that step from 0 to 100.
                    let colorTween = this.game.add.tween(colorBlend).to({ step: 100 }, time, Phaser.Easing.Linear.None, delay);
                    // add an anonomous function with lexical scope to change the tint, calling Phaser.Colour.interpolateColor
                    colorTween.onUpdateCallback(() => {

                            obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, null);
                    });
                    // set object to the starting colour
                    obj.tint = startColor;
                    // if you passed a callback, add it to the tween on complete
                    if (callback) {
                            colorTween.onComplete.add(callback, this);
                    }
                    // finally, start the tween
                    colorTween.start();
            }
    }
      
      

    }

}