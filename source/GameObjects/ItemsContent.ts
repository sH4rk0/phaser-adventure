module z89 {

    export class ItemsContent extends Items {

        //game: Phaser.Game;

        //private currentState: GameCity;
        public itemObj: any;
        // private id: number;
        private arrowLeft: Phaser.Sprite;
        private arrowRight: Phaser.Sprite;
        private btnGo: Phaser.Sprite;
        private contents: Array<any>;
        private contexts: Array<string>;
        private contentImage: Phaser.Image;
        private contentText: Phaser.Text;
        private currentIndex: number = 0;
        private isAnimating: boolean = false;
        private filtersArr: Array<Phaser.Filter>;
        private isStarted: boolean = false;
        private spinner: Phaser.Sprite;

        constructor(game: Phaser.Game, itemObj: any) {

            //console.log(itemObj)
            super(game, itemObj);
            // super(game, itemObj.x, itemObj.y, itemObj.sprite);
            // this.currentState = <GameCity>this.game.state.getCurrentState();
            this.anchor.set(0.5);

            if (itemObj.scale != undefined) this.scale.set(itemObj.scale);

            this.id = itemObj.id;
            this.itemObj = itemObj;
            this.inputEnabled = true;
            this.name = itemObj.name;
            this.input.priorityID = 1;
            this.interactive = itemObj.interactive;
            this.contexts = itemObj.contexts;
            this.fixedToCamera = itemObj.fixedToCamera;

            this.contents = this.currentState.getContentsBycontexts(this.contexts);

            console.log(this.contents);

            this.events.onInputDown.add(() => {

                //let _currentItem: Items = this.currentState.getCurrentItem();
                //console.log("item down")

            }, this);

            this.contentImage = this.game.add.image(0, 0, itemObj.sprite);

            //  this.contentText = this.game.add.image(0, 0, itemObj.sprite);

            this.contentImage.x = -this.contentImage.width / 2;
            this.contentImage.y = -this.contentImage.height / 2;
            this.contentImage.alpha = 0;

            /* let mask = game.add.graphics(0, 0);
 
             //	Shapes drawn to the Graphics object must be filled.
             mask.beginFill(0xffffff);
             mask.drawRect(-200, -100, 400, 200);
 
             this.addChild(mask);
             this.contentImage.mask = mask;
             */

            this.addChild(this.contentImage);

            let _style = { font: 'normal 18px', fill: '#ffffff', stroke: '#000000', strokeThickness: 5 };
            this.contentText = this.game.add.text(-180, -85, "", _style);
            this.contentText.font = 'Press Start 2P';
            this.contentText.anchor.set(0);
            this.contentText.wordWrap = true;
            this.contentText.wordWrapWidth = 380;
            this.addChild(this.contentText);


            this.spinner = this.game.add.sprite(0, 0, "spinner");
            this.spinner.anchor.set(.5);
            this.spinner.alpha = 0;


            this.addChild(this.spinner);

            this.arrowLeft = this.game.add.sprite(-30, 0, "triangleBtn");
            this.arrowLeft.anchor.set(.5);
            this.arrowLeft.inputEnabled = false;
            this.arrowLeft.scale.set(2);
            this.arrowLeft.angle = -90;
            this.arrowLeft.tint = 0x222222;

            this.addChild(this.arrowLeft);

            this.arrowRight = this.game.add.sprite(30, 0, "triangleBtn");
            this.arrowRight.anchor.set(.5);
            this.arrowRight.inputEnabled = false;
            this.arrowRight.scale.set(2);
            this.arrowRight.angle = 90;
            this.arrowRight.tint = 0x222222;

            this.addChild(this.arrowRight);


            this.btnGo = this.game.add.sprite(0, 133, ("readmore"));
            this.btnGo.anchor.set(.5);
            this.btnGo.inputEnabled = false;
            this.btnGo.alpha = 0;


            _style = { font: 'normal 16px', fill: '#ffffff', stroke: '#000000', strokeThickness: 0 };
            let _readMore = this.game.add.text(0, 5, "READ MORE", _style);
            _readMore.anchor.set(.5);
            _readMore.font = 'Press Start 2P';
            this.btnGo.addChild(_readMore);
            this.addChild(this.btnGo);

            this.contentImage.tint = 0x555555;
            this.game.add.existing(this);

            let cropRect = new Phaser.Rectangle(0, 0, 400, 200);

            this.contentImage.crop(cropRect);

            this.filtersArr = [];

            this.filtersArr.push(new grayShader(this.game));
            // this.filtersArr.push(new noiseShader(this.game));
            this.filtersArr.push(new convergenceShader(this.game));
            //

            if (this.itemObj.isStarted) this.start();

        }

        start(): void {

            this.itemObj.isStarted = true;

            this.game.add.tween(this.arrowRight).to({ x: 210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false);

            this.game.add.tween(this.btnGo).to({ alpha: 1 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {

                this.btnGo.inputEnabled = true;
                this.btnGo.input.priorityID = 3;
                this.btnGo.events.onInputDown.add(() => { this.goDetail(); }, this);

            });


            this.game.add.tween(this.arrowLeft).to({ x: -210 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, 0, false).onComplete.add(() => {
                this.isStarted = true;
                this.game.add.tween(this.arrowRight).to({ x: this.arrowRight.x + 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
                this.arrowLeft.inputEnabled = true;
                this.arrowLeft.input.priorityID = 3;
                this.arrowLeft.events.onInputDown.add(() => { this.arrowLeft.tint = 0x00FF00; this.goPrev(); }, this);
                this.arrowLeft.events.onInputUp.add(() => { this.arrowLeft.tint = 0xFFFFFF; }, this);

                this.currentState.gameUtils.tweenTint(this.arrowLeft, 0x222222, 0xffffff, 1000, 0, null);
                this.currentState.gameUtils.tweenTint(this.arrowRight, 0x222222, 0xffffff, 1000, 0, null);
                this.currentState.gameUtils.tweenTint(this.contentImage, 0x222222, 0xffffff, 1000, 0, null);
                this.contentImage.filters = [this.filtersArr[0], this.filtersArr[1]];
                this.contentText.filters = [this.filtersArr[1]];
                this.spinner.filters = [this.filtersArr[1]];
                this.arrowRight.inputEnabled = true;
                this.arrowRight.input.priorityID = 3;
                this.arrowRight.events.onInputDown.add(() => { this.arrowRight.tint = 0x00FF00; this.goNext() }, this);
                this.arrowRight.events.onInputUp.add(() => { this.arrowRight.tint = 0xFFFFFF; }, this);
                this.game.add.tween(this.arrowLeft).to({ x: this.arrowLeft.x - 10 }, 1000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);

                this.isAnimating = true;
                this.loadImage();


            });



        }


        update(): void {

            if (this.isStarted) {

                this.filtersArr[1].randomize();

                if (this.isAnimating) {

                    this.spinner.angle += 2;

                }


            }



        }

        goNext(): void {
            this.currentIndex++;
            if (this.currentIndex > this.contents.length - 1) this.currentIndex = 0;
            this.goTo();
        }
        goPrev(): void {

            if (this.isAnimating) return;
            this.currentIndex--;
            if (this.currentIndex < 0) this.currentIndex = this.contents.length - 1;
            this.goTo();

        }

        goTo(): void {
            if (this.isAnimating) return;

            this.isAnimating = true;
            // this.hideContent();

            this.loadImage()

        }

        goDetail(): void {


            //console.log("detail", this.contents[this.currentIndex]);


            window.open(this.contents[this.currentIndex].url, "_blank");

        }

        isInteractive(): boolean {

            return this.interactive;

        }


        loadImage() {
            let _content: any = this.contents[this.currentIndex];

            if (_content == undefined) return;

            if (_content.loaded != undefined && _content.loaded == true) {

                this.hideContent(true);

            } else {

                this.isAnimating = true;
                this.hideContent();

                let _obj: any = {
                    type: 'image',
                    key: '',
                    url: '',
                    data: null,
                    error: false,
                    game: this.game,
                    state: this
                };

                _obj.key = "zeroImg" + _content.key
                _obj.url = "http://www.zero89.it/" + _content.c
                _obj.data = new Image();

                _obj.data.onload = () => {

                    _content.loaded = true;
                    _obj.game.cache.addImage(_obj.key, _obj.url, _obj.data);

                    _obj.state.contentImage.loadTexture("zeroImg" + _obj.state.contents[_obj.state.currentIndex].key);
                    _obj.state.showContent();

                };

                _obj.data.onerror = () => { _content.error = true; };
                _obj.data.crossOrigin = '';
                _obj.data.src = _obj.url;


            }

        }

        hideContent(preloaded?: boolean): void {
            this.isAnimating = true;
            this.game.add.tween(this.spinner).to({ alpha: 1 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false)

            this.game.add.tween(this.contentText).to({ alpha: 0, y: this.contentText.y  }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false)
            this.game.add.tween(this.contentImage).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false).onComplete.add(() => {


                if (preloaded) {

                    this.contentImage.loadTexture("zeroImg" + this.contents[this.currentIndex].key);

                    this.showContent();
                }

            }, this);


        }

        showContent(): void {

            this.game.add.tween(this.spinner).to({ alpha: 0 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false)

            this.contentText.text = this.contents[this.currentIndex].t;
            let colors:Array<number>=[];
            colors.push(this.contents[this.currentIndex].t.length);
            console.log(colors)
            if(this.contents[this.currentIndex].a!=undefined){

                let _json=JSON.parse(this.contents[this.currentIndex].a);

                if(_json.link!=undefined) {this.contents[this.currentIndex].url=_json.link; }

                if(_json.dd!=undefined) {
                    this.contentText.text = "DEVDAY " + _json.dd + "\n"+this.contentText.text;
                    colors.push(_json.dd.length+7);
                } 

                if(_json.date!=undefined)  this.contentText.text += "\n\n"+_json.date;
             
            }

            this.contentText.addColor('#00ff00', 0);
            this.contentText.addColor('#ffffff', colors[1]);
            //this.contentText.addColor('#aaaaaa', colors[0]);

            this.game.add.tween(this.contentText).to({ alpha: 1, y: this.contentText.y }, 500, Phaser.Easing.Quadratic.In, true, 100, 0, false).onComplete.add(() => {

                this.isAnimating = false;

            }, this);
            this.game.add.tween(this.contentImage).to({ alpha: .8 }, 300, Phaser.Easing.Quadratic.In, true, 0, 0, false)

        }




    }

}