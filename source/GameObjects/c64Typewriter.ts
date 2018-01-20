



module z89 {
    export class c64Typewriter {


        private letters: Array<any>;
        private lettersObj: Array<Phaser.BitmapText> = [];
        private game: Phaser.Game;
        private typeGroup: Phaser.Group;
        private currentElement: number = 0;
        private tint: number = 0x6C5EB5;
        private cursor: Phaser.Sprite;
        private currentRow: number;
        private currentColumn: number;

        private ready: any = { text: '>:', sDelay: 0, cDelay: 25, row: 0, cursor: "blink" };

        constructor(game: Phaser.Game, letters: Array<any>, group: Phaser.Group, tint?: number) {

            this.game = game;
            this.letters = letters;
            this.typeGroup = group;
            if (tint != null) this.tint = tint;

            this.cursor = this.game.add.sprite(0, 0, "cursor");
            this.cursor.tint = this.tint;
            this.cursor.animations.add("blink", [0, 1], 2, true);
            this.cursor.animations.add("hide", [1], 0, false);
            this.cursor.animations.add("stop", [0], 0, false);

            this.cursor.play("blink");
            this.typeGroup.add(this.cursor);
            this.typePhrase();

        }

        typePhrase(): void {

            let element: any = this.letters[this.currentElement];
            if (element == undefined) return;
            let textObj: Phaser.BitmapText;

            if (this.lettersObj[element.obj] == undefined) {
                textObj = this.lettersObj[element.obj] = this.game.add.bitmapText(0, 16 * element.row, "commodore", "", 16, this.typeGroup);
            } else {
                textObj = this.lettersObj[element.obj];
            }

            if (element.cursor != undefined) this.cursor.play(element.cursor);

            this.cursor.y = 16 * element.row;


            if (element.tint != undefined) this.tint = element.tint;
            textObj.tint = this.tint;

            if (element.charDelay == 0) {

                textObj.text = element.text;
                this.cursor.x = element.text.length * 16;
                this.game.time.events.add(element.stringDelay, () => {

                    if (element.callback != undefined) {
                        this.cursor.destroy(); element.callback();
                    } else {
                        this.currentElement++;
                        this.typePhrase();
                    }

                }, this);

            } else {



                let nextText = element.text.substring(0, i);
                for (var i = 0; i <= element.text.length; i++) {

                    let nextText = element.text.substring(0, i);


                    this.game.time.events.add((element.charDelay * i) + element.stringDelay, () => {
                        this.cursor.play("stop");
                        textObj.text = nextText;
                        this.cursor.x = nextText.length * 16;

                    });

                }

                this.game.time.events.add((element.charDelay * (i + 1)) + element.stringDelay, () => {
                    this.cursor.play("blink");
                    //textObj.text = nextText;

                    if (element.callback != undefined) {
                        this.cursor.destroy(); element.callback();
                    } else {

                        this.currentElement++;
                        this.typePhrase();

                    }

                });

            }
        }




        removeLines(): void {

            this.lettersObj.forEach(element => {
                element.destroy();
            });
        }



        destroy(): void {

            this.removeLines();
            this.cursor.destroy();

        }




    }
}

