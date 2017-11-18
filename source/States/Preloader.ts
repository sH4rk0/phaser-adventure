module z89 {
	export class Preloader extends Phaser.State {

		game: Phaser.Game;
		startBtn: Phaser.Sprite;
		loadingBar: Phaser.Sprite;
		loadingPerc: Phaser.Text;
		z89:any;
		raster:Phaser.TileSprite;

		constructor() {
			
									super();
									
			
							}


		updateRaster(){
			
			this.raster.y=this.game.rnd.integerInRange(-500,0);
			
					if(this.loadingBar.visible) this.game.time.events.add(50,()=>this.updateRaster(),this);
			
					}

		preload() {

			this.game.load.onLoadStart.add( () => { }, this);
			this.game.load.onFileComplete.add(this.fileComplete, this);

			this.game.load.onLoadComplete.add(()=> {

				this.loadingBar.visible = false;
				this.loadingPerc.visible = false;
				this.startBtn.visible = true;
				this.game.input.onDown.addOnce( () => { goState("GameCity", this.game); }, this);

			}, this);
			
			//raster
			//--------------------------
			this.raster=this.game.add.tileSprite(0,0,1024,1768,"raster");
			this.raster.y=-500;
			//start button
			//--------------------------
			this.startBtn = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('startBtn'));
			this.startBtn.anchor.setTo(0.5);

			var _spriteText = this.game.add.text(0, 0, 'START', { fill: '#ffffff' });

			_spriteText.anchor.set(0.5);
			this.startBtn.addChild(_spriteText);
			this.startBtn.visible = false;
			// this.loadingContainer.addChild(this.startBtn);

			//Loading container
			//--------------------------
			
			this.loadingBar = this.game.add.sprite(this.game.world.width / 2, this.game.world.height / 2, this.game.cache.getBitmapData('loadingBar'));
			this.loadingBar.anchor.setTo(0.5);
			this.loadingPerc = this.game.add.text(0, 0, '0%', { wordWrap: true, wordWrapWidth: this.loadingBar.width, fill: '#ffffff', stroke: '#0096ff', strokeThickness: 5 });
			this.loadingPerc.anchor.set(0.5);
			this.loadingBar.addChild(this.loadingPerc);
			this.game.load.setPreloadSprite(this.loadingBar);

			
			this.loadAssets();

			this.game.load.script('webfont', 'js/libs/webfonts.js');

			

			this.updateRaster();

		}


	

		fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
			
			
			this.loadingPerc.text = progress + "%"; }


	

		loadAssets():void{

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