module z89 {

    export class ItemsSkill extends Items {

        public itemObj: any;

        private isStarted: boolean = false;
        private skills: Array<any> = [];
        private skillsObj: Array<Phaser.Sprite> = [];

        constructor(game: Phaser.Game, itemObj: any) {

            super(game, itemObj);

            this.anchor.set(0.5);
            this.skills = gameData.skills;

            let _text: Phaser.BitmapText;
            let _bar: Phaser.Sprite;

            let _y: Array<number> = [8-215, 123-215, 239-215, 355-215];

            for (var i = 0; i < 4; i++) {

                this.skillsObj.push(this.game.add.sprite(16-174, _y[i], ""));

                _bar = this.game.add.sprite(0, 0, this.game.cache.getBitmapData("skill"));
                _bar.width = 4;
                _bar.anchor.set(0);
                _bar.alpha = .4;
                this.skillsObj[i].addChild(_bar);

                _text = this.game.add.bitmapText(5, 14, "commodore", "test", 24);
                _text.alpha = 0;
                _text.anchor.set(0);
                this.skillsObj[i].addChild(_text);

                this.addChild(this.skillsObj[i]);

            }

            if (this.itemObj.isStarted) this.start();

        }

        start() {
            this.itemObj.isStarted = true;
            this.rewrite();
            this.game.time.events.repeat(5000, 1000, this.rewrite, this);
        }



        rewrite() {

            let _arr: Array<any> = this.skills.slice();
            Phaser.ArrayUtils.shuffle(_arr);
            let _text: Phaser.BitmapText;
            let _bar: Phaser.Sprite;

            this.skillsObj.forEach((element: Phaser.Sprite, index: number) => {

                _bar = <Phaser.Sprite>element.getChildAt(0);
                           
                this.game.add.tween(_bar).to({ width: (_arr[index].v * 316) / 100 }, 1000, Phaser.Easing.Elastic.Out, true, 200 * index, 0, false);

                _text = <Phaser.BitmapText>element.getChildAt(1);
                _text.text = _arr[index].s;
                _text.alpha = 0;
                this.game.add.tween(_text).to({ alpha: 1 }, 500, Phaser.Easing.Default, true, 100 * index, 0, false);

            });



        }



    }

}