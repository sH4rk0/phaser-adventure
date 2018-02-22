module z89 {
	export class Preloader extends Phaser.State {

		game: Phaser.Game;
		startBtn: Phaser.Sprite;
		loadingBar: Phaser.Sprite;
		loadingPerc: Phaser.BitmapText;
		z89: any;
		scanlines: Phaser.TileSprite;
		c64Screen: Phaser.Group;
		c64OutScreen: Phaser.Group;
		raster: Phaser.Image;
		body: HTMLElement;

		private letters: Array<any> = [

			{ text: '    **** COMMODORE 64 BASIC V2 ****    ', stringDelay: 0, charDelay: 0, row: 1, obj:0 },
			{ text: ' 64K RAM SYSTEM  38911 BASIC BYTES FREE ', stringDelay: 0, charDelay: 0, row: 3, obj:1 },
			{ text: 'READY.', stringDelay: 0, charDelay: 0, row: 5, obj:2 },
			{ text: 'LOAD"' + getGameName() + '",8', stringDelay: 0, charDelay: 0, row: 6, obj:3 },
			{ text: 'SEARCHING FOR ' + getGameName(), stringDelay: 0, charDelay: 0, row: 8, obj:4, cursor:"hide" }

		];

		private letters2: Array<any> = [
			{ text: 'READY.', stringDelay: 0, charDelay: 0, row: 10, obj: 0, cursor:"hide" },
			{ text: '', stringDelay: 0, charDelay: 0, row: 11, obj: 1, cursor:"blink" },
			{ text: '', stringDelay: 1000, charDelay: 0, row: 11, obj: 1},
			{ text: 'RUN', stringDelay: 1000, charDelay: 100, row: 11, obj: 1, callback:()=>{
				this.loadingPerc.destroy();
				this.screens[0].destroy();
				this.screens[1].destroy();			 	
				new c64Typewriter(this.game,[{ text: '    *** TYPE EVERYWHERE TO START ***   ', stringDelay: 0, charDelay: 25, row: 12, obj: 0, callback:()=>{} }],this.c64Screen);

				this.game.input.onDown.addOnce(() => { goState("GameCity", this.game);  }, this);

			}}

		];

		private screens:Array<c64Typewriter>;

		private lettersObj: Array<Phaser.BitmapText> = [];

		constructor() { super(); }

		create() {}

		init() {

			this.body=document.getElementsByTagName("body")[0];
			this.screens=[];
			this.c64Screen = this.game.add.group();

			//bg
			//--------------------------

			let bg: Phaser.Image = this.game.add.image(0, 0, this.game.cache.getBitmapData("c64bg"));
			this.c64Screen.addChild(bg);
			this.c64Screen.x = (1080 - 640) / 2;
			this.c64Screen.y = (768 - 400) / 2;

			this.screens[0]=new c64Typewriter(this.game,this.letters,this.c64Screen);

			/*
			let graphic: Phaser.Graphics = this.game.add.graphics(0, 0);

			for (var i = 0; i <= 2048; i += 4) {

				graphic.beginFill(z89.getC64Color(this.game.rnd.integerInRange(0, 15)));
				graphic.drawRect(0, i, this.game.world.width, 4);
				graphic.endFill();

			}

			this.raster = this.game.add.image(0, -200, graphic.generateTexture(), 0, this.c64OutScreen);
			this.raster.alpha = 1;
			graphic.clear();
			graphic.destroy();
			*/

			this.loadingPerc = this.game.add.bitmapText(0, 16 * 9, "commodore", '', 16, this.c64Screen);
			this.loadingPerc.tint = 0x6C5EB5;


			//scanlines
			//--------------------------
			//this.scanlines = this.game.add.tileSprite(0, 0, 1024, 768, "scanlines");

			//start button
			//--------------------------
			this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));

			this.startBtn.anchor.setTo(0.5);
			var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });

			_spriteText.anchor.set(0.5);
			this.startBtn.addChild(_spriteText);
			this.startBtn.visible = false;


		}

		preload() {

			this.loadAssets();

		}

		fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {

			this.loadingPerc.text ="LOADING "+ progress + "%";
		}

		loadAssets(): void {

			this.body.className="loading";

			this.game.load.onLoadStart.add(() => { console.log("start asset load") }, this);
			this.game.load.onFileComplete.add(this.fileComplete, this);

			this.game.load.onLoadComplete.add(() => {
				
				setUpGame(this.game);
				
				/* comment this */
				goState("GameCity", this.game);
				this.body.className="";
				this.screens[1]=new c64Typewriter(this.game, this.letters2, this.c64Screen);
				
			}, this);

			this.game.load.script('webfont', 'js/libs/webfonts.js');

			//Assets Load
			//--------------------------	
			// IMAGES		
			gameData.assets.images.forEach(element => {
				this.game.load.image(element.name, element.path);
			});

			// SPRITESHEETS	
			gameData.assets.spritesheets.forEach(element => {
				this.game.load.spritesheet(element.name, element.path, element.width, element.height, element.frames);
			});

			//bitmap fonts
			gameData.assets.bitmapfont.forEach(element => {
				this.game.load.bitmapFont(element.name, element.imgpath, element.xmlpath);
			});

			// SOUNDS
			gameData.assets.sounds.forEach(element => {
				this.game.load.audio(element.name, element.paths);
			});


			this.game.load.shader("noise", "js/game/fragments/noise.frag");
			this.game.load.shader("convergence", "js/game/fragments/convergence.frag");
			this.game.load.shader("gray", "js/game/fragments/gray.frag");
			this.game.load.shader("ripple", "js/game/fragments/ripple.frag");
			this.game.load.shader("ripple2", "js/game/fragments/ripple2.frag");
			this.game.load.shader("test", "js/game/fragments/test.frag");
			this.game.load.shader("water", "js/game/fragments/water.frag");

		}



	}



}