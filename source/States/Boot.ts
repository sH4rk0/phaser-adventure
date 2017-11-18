

module z89{
    export class Boot extends Phaser.State{

        preload(){
         var bmd : Phaser.BitmapData = this.game.add.bitmapData(200,50);
			
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('loadingBar', bmd);


			bmd = this.game.add.bitmapData(1024,260);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 1024, 260);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('ground', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('startBtn', bmd);
			
			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#0096ff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('button', bmd);

			bmd = this.game.add.bitmapData(50,50);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('btn', bmd);


			bmd = this.game.add.bitmapData(300,768);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 300, 768);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menuAction', bmd);

			bmd = this.game.add.bitmapData(200,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 200, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('menuActionBtn', bmd);

			bmd = this.game.add.bitmapData(50,100);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 50, 100);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('hitArea', bmd);

			bmd = this.game.add.bitmapData(340,50);
			bmd.ctx.fillStyle = '#000000';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 340, 50);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonBg', bmd);

			bmd = this.game.add.bitmapData(340,5);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 340, 5);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonBorder', bmd);

			bmd = this.game.add.bitmapData(25,25);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(0, 12.5);
			bmd.ctx.lineTo(25, 12.5);
			bmd.ctx.lineTo(12.5, 25);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonPin', bmd);

			

			bmd = this.game.add.bitmapData(40,40);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 40, 40);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('arrow', bmd);

			bmd = this.game.add.bitmapData(400,200);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 400, 200);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('contents', bmd);



			bmd = this.game.add.bitmapData(265,50);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(265,50);
			bmd.ctx.arcTo(0,50,0,0,10);
			bmd.ctx.arcTo(0,0,50,0,10);
			bmd.ctx.arcTo(265,0,265,50,10);
			bmd.ctx.arcTo(265,50,0,50,10);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('roundedBtn', bmd);


			
			
		
			





			this.game.load.image("raster", "assets/images/game/raster.png");




        }

     create(){
        

		   if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
				setDevice(true);
            }
            else {
                setDevice(false);
            }

			/*var fragmentSrc = [
				"precision mediump float;",
				// Incoming texture coordinates. 
				'varying vec2 vTextureCoord;',
				// Incoming vertex color
				'varying vec4 vColor;',
				// Sampler for a) sprite image or b) rendertarget in case of game.world.filter
				'uniform sampler2D uSampler;',
	
				"uniform vec2      resolution;",
				"uniform float     time;",
				"uniform vec2      mouse;",
	
				"void main( void ) {",
				//"colorRGBA = (y % 2) * texel(u,v);",
			    //"gl_FragColor = mod(gl_FragCoord.y,2.0) * texture2D(uSampler, vTextureCoord);",
	
			   "gl_FragColor = vColor(0.0, 0.58, 0.86, 1.0);",
				"}"
			];
			
			var filter = new Phaser.Filter(this.game, null,fragmentSrc);
			this.game.stage.filters = [filter];
*/
            this.game.stage.backgroundColor = '#000000';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
			this.game.state.start('Preloader');
			

		
			
			



           
        }
    }
}