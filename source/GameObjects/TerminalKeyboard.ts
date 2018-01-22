module z89 {

   
  

    export class TerminalKeyboard {


        private game: Phaser.Game;
        private terminal: Terminal;
        private keyGroup: Phaser.Group;
        private keys:Array<any>=[
            {v:'Q',x:192+40+6,y:49,w:40,h:40},
            {v:'W',x:192+(40*2)+(6*2),y:49,w:40,h:40},
            {v:'E',x:192+(40*3)+(6*3),y:49,w:40,h:40},
            {v:'R',x:192+(40*4)+(6*4),y:49,w:40,h:40},
            {v:'T',x:192+(40*5)+(6*5),y:49,w:40,h:40},
            {v:'Y',x:192+(40*6)+(6*6),y:49,w:40,h:40},
            {v:'U',x:192+(40*7)+(6*7),y:49,w:40,h:40},
            {v:'I',x:192+(40*8)+(6*8),y:49,w:40,h:40},
            {v:'O',x:192+(40*9)+(6*9),y:49,w:40,h:40},
            {v:'P',x:192+(40*10)+(6*10),y:49,w:40,h:40},
            {v:'backspace',x:192+(40*11)+(6*11),y:49,w:40,h:40},

            {v:'7',x:192+(40*13)+(6*13),y:49,w:40,h:40},
            {v:'8',x:192+(40*14)+(6*14),y:49,w:40,h:40},
            {v:'9',x:192+(40*15)+(6*15),y:49,w:40,h:40},

            {v:'A',x:192+40+6,y:49+51,w:40,h:40},
            {v:'S',x:192+(40*2)+(6*2),y:49+51,w:40,h:40},
            {v:'D',x:192+(40*3)+(6*3),y:49+51,w:40,h:40},
            {v:'F',x:192+(40*4)+(6*4),y:49+51,w:40,h:40},
            {v:'G',x:192+(40*5)+(6*5),y:49+51,w:40,h:40},
            {v:'H',x:192+(40*6)+(6*6),y:49+51,w:40,h:40},
            {v:'J',x:192+(40*7)+(6*7),y:49+51,w:40,h:40},
            {v:'K',x:192+(40*8)+(6*8),y:49+51,w:40,h:40},
            {v:'L',x:192+(40*9)+(6*9),y:49+51,w:40,h:40},

            {v:'enter',x:192+(40*11)+(6*11),y:49+51+50,w:40,h:90},

            {v:'4',x:192+(40*13)+(6*13),y:49+51,w:40,h:40},
            {v:'5',x:192+(40*14)+(6*14),y:49+51,w:40,h:40},
            {v:'6',x:192+(40*15)+(6*15),y:49+51,w:40,h:40},

            {v:'Z',x:192+40+6,y:49+51+50,w:40,h:40},
            {v:'X',x:192+(40*2)+(6*2),y:49+51+50,w:40,h:40},
            {v:'C',x:192+(40*3)+(6*3),y:49+51+50,w:40,h:40},
            {v:'V',x:192+(40*4)+(6*4),y:49+51+50,w:40,h:40},
            {v:'B',x:192+(40*5)+(6*5),y:49+51+50,w:40,h:40},
            {v:'N',x:192+(40*6)+(6*6),y:49+51+50,w:40,h:40},
            {v:'M',x:192+(40*7)+(6*7),y:49+51+50,w:40,h:40},
            {v:'doublequote',x:192+(40*8)+(6*8),y:49+51+50,w:40,h:40},
            {v:'comma',x:192+(40*9)+(6*9),y:49+51+50,w:40,h:40},
            {v:'dot',x:192+(40*10)+(6*10),y:49+51+50,w:40,h:40},

            {v:'1',x:192+(40*13)+(6*13),y:49+51+50,w:40,h:40},
            {v:'2',x:192+(40*14)+(6*14),y:49+51+50,w:40,h:40},
            {v:'3',x:192+(40*15)+(6*15),y:49+51+50,w:40,h:40},
            {v:'up',x:192+(40*16)+(6*16),y:49+51+50,w:40,h:40},

            {v:'space',x:192+(40*2)+(6*2),y:49+51+50+50,w:(40*8)+40,h:40},

            {v:'0',x:192+(40*13)+(6*13),y:49+51+50+50,w:40,h:40},
            {v:'left',x:192+(40*15)+(6*15),y:49+51+50+50,w:40,h:40},
            {v:'down',x:192+(40*16)+(6*16),y:49+51+50+50,w:40,h:40},
            {v:'right',x:192+(40*17)+(6*17),y:49+51+50+50,w:40,h:40},

           
          

        ];

        constructor(game: Phaser.Game, terminal: Terminal) {

            this.game = game;
            
            this.terminal = terminal;
            this.keyGroup =  this.game.add.group();
            this.keyGroup.x=0;
            this.keyGroup.y=510;
            let keyboard:Phaser.Sprite=this.game.add.sprite(0,0,"terminalKeyboard",0,this.keyGroup);

            keyboard.anchor.set(0);

            let sprite:Phaser.Sprite;
            this.keys.forEach(e => {

                sprite=this.game.add.sprite(e.x,e.y,this.game.cache.getBitmapData('key'),0,this.keyGroup);
                sprite.width=e.w;
                sprite.anchor.set(0,1)
                sprite.height=e.h;
                sprite.name=e.v;

                sprite.inputEnabled = true;
                sprite.input.priorityID = 3;
                sprite.alpha=.2;
               
                sprite.events.onInputDown.add((sprite:Phaser.Sprite) => {
                   this.pressKey(sprite.name);
                   sprite.alpha=.5;

                }, this, 3);

                sprite.events.onInputUp.add((sprite:Phaser.Sprite) => {
                    sprite.alpha=.2;
                    
                 }, this, 3);
                
            });
           


            this.terminal.addChild(this.keyGroup);

        }


        pressKey(_key:string):void{



console.log(_key)



            switch(_key){

                case "enter": this.terminal.TerminalWriter.submitCommand();  break;
                case "backspace": this.terminal.TerminalWriter.removeChar();  break;
                case "up": this.terminal.TerminalWriter.charUp();  break;
                case "down": this.terminal.TerminalWriter.charDown();  break;
                case "left": this.terminal.TerminalWriter.charLeft();  break;
                case "right": this.terminal.TerminalWriter.charRight();  break;
                default:
                    let char="";
                    switch(_key){
                        case "doublequote": char='"'; break;
                        case "space": char=' '; break;
                        case "dot": char='.'; break;
                        case "comma": char=','; break;
                        default: char=_key; break;
                    }
                    this.terminal.TerminalWriter.addChar(char);

                break;

            }


        }

        destroy():void{



            console.log("destroy keyboard")

        }
        



    }
}

