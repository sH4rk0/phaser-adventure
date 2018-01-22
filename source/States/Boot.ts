module z89 {
	export class Boot extends Phaser.State {

		c64Screen: Phaser.Group;
		c64OutScreen: Phaser.Group;

		private letters: Array<any> = [

			{ text: '    **** COMMODORE 64 BASIC V2 ****    ', stringDelay: 0, charDelay: 0, row: 1, obj:0 },
			{ text: ' 64K RAM SYSTEM  38911 BASIC BYTES FREE ', stringDelay: 0, charDelay: 0, row: 3, obj:1 },
			{ text: 'READY.', stringDelay: 0, charDelay: 0, row: 5, obj:2 },
			{ text: '', stringDelay: 2000, charDelay: 0, row: 6, obj:3 },
			{ text: 'LOAD"' + getGameName() + '",8', stringDelay: 1000, charDelay: 100, row: 6, obj:3, },
			{ text: 'SEARCHING FOR ' + getGameName(), stringDelay: 1000, charDelay: 0, row: 8, obj:4, cursor:"hide", callback:()=>{ 
				//goState("Preloader",this.game)
				this.game.state.start("Preloader");
			} }
		];

		private lettersObj:Array<Phaser.BitmapText>=[];


		preload() {
			var bmd: Phaser.BitmapData = this.game.add.bitmapData(200, 50);

			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);

			bmd = this.game.add.bitmapData(1080, 720);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1080, 720);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('ground', bmd);

			bmd = this.game.add.bitmapData(200, 50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);

			bmd = this.game.add.bitmapData(200, 50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);

			bmd = this.game.add.bitmapData(300, 50);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(300, 50);
			bmd.ctx.arcTo(0, 50, 0, 0, 10);
			bmd.ctx.arcTo(0, 0, 50, 0, 10);
			bmd.ctx.arcTo(300, 0, 300, 50, 10);
			bmd.ctx.arcTo(300, 50, 0, 50, 10);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('forkBtn', bmd);

			bmd = this.game.add.bitmapData(50, 50);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('btn', bmd);

			bmd = this.game.add.bitmapData(300, 768);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 300, 768);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menuAction', bmd);

			bmd = this.game.add.bitmapData(200, 50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menuActionBtn', bmd);

			bmd = this.game.add.bitmapData(50, 100);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('hitArea', bmd);

			bmd = this.game.add.bitmapData(340, 50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 340, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonBg', bmd);

			bmd = this.game.add.bitmapData(340, 5);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 340, 5);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonBorder', bmd);

			bmd = this.game.add.bitmapData(316, 52);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 316, 52);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('skill', bmd);

			bmd = this.game.add.bitmapData(640, 400);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 640, 400);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('terminal', bmd);

			bmd = this.game.add.bitmapData(25, 25);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(0, 12.5);
			bmd.ctx.lineTo(25, 12.5);
			bmd.ctx.lineTo(12.5, 25);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonPin', bmd);

			bmd = this.game.add.bitmapData(40, 40);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('arrow', bmd);

			bmd = this.game.add.bitmapData(400, 200);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 400, 200);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('contents', bmd);

			bmd = this.game.add.bitmapData(265, 50);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(265, 50);
			bmd.ctx.arcTo(0, 50, 0, 0, 10);
			bmd.ctx.arcTo(0, 0, 50, 0, 10);
			bmd.ctx.arcTo(265, 0, 265, 50, 10);
			bmd.ctx.arcTo(265, 50, 0, 50, 10);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('roundedBtn', bmd);

			bmd = this.game.add.bitmapData(400, 200);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 400, 200);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('contents', bmd);

			bmd = this.game.add.bitmapData(640, 600);
			bmd.ctx.fillStyle = "#352879"
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 640, 400);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('c64bg', bmd);

			
			bmd = this.game.add.bitmapData(40, 40);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(40, 40);
			bmd.ctx.arcTo(0, 40, 0, 0, 10);
			bmd.ctx.arcTo(0, 0, 40, 0, 10);
			bmd.ctx.arcTo(40, 0, 40, 40, 10);
			bmd.ctx.arcTo(40, 40, 0, 40, 10);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('key', bmd);


			bmd = this.game.add.bitmapData(1080, 150);
			bmd.ctx.fillStyle = "#00ff00"
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1080, 150);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('keyboard', bmd);

			
			this.game.load.bitmapFont("commodore", "assets/fonts/64_0.png", "assets/fonts/64.xml");
			this.game.load.bitmapFont("commodore2", "assets/fonts/64x32_0.png", "assets/fonts/64x32.xml");
			this.game.load.spritesheet("cursor", "assets/images/game/terminal/cursor.png", 16,16,2);
		}

		create() {

			this.c64Screen = this.game.add.group();

			let bg: Phaser.Image = this.game.add.image(0, 0, this.game.cache.getBitmapData("c64bg"));
			this.c64Screen.addChild(bg);
			this.c64Screen.x = (1080 - 640) / 2;

			let destY = (768 - 400) / 2;
			this.c64Screen.y = -400;
			this.c64Screen.alpha = 0;

			new c64Typewriter(this.game,this.letters,this.c64Screen);

			this.game.add.tween(this.c64Screen).to({ y: destY, alpha: 1 }, 1000, Phaser.Easing.Bounce.Out, true, 0, 0, false).onComplete.add(() => {});

			if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
				setDevice(true);
			}
			else {
				setDevice(false);
			}

			this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			this.game.stage.smoothed = false;
			this.game.scale.pageAlignHorizontally = true;
			this.game.scale.pageAlignVertically = true;
			//this.game.canvas.style.cursor = 'url(http://triplanetary.github.io/cursor.png),auto';

			this.game.state.start("Preloader");


		}






	}
}