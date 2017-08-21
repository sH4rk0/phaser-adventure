

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
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 340, 5);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonBorder', bmd);

			bmd = this.game.add.bitmapData(25,25);
			bmd.ctx.fillStyle = '#00ff00';
			bmd.ctx.beginPath();
			bmd.ctx.moveTo(0, 12.5);
			bmd.ctx.lineTo(25, 12.5);
			bmd.ctx.lineTo(12.5, 25);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('baloonPin', bmd);

			bmd = this.game.add.bitmapData(70,70);
			bmd.ctx.fillStyle = '#ffffff';
			bmd.ctx.beginPath();
			bmd.ctx.rect(0, 0, 70, 70);
			bmd.ctx.fill();
			this.game.cache.addBitmapData('inventoryIconBg', bmd);


			
		



        }

     create(){
        

		   if (this.game.device.touch && (this.game.device.iOS || this.game.device.android || this.game.device.windowsPhone)) {
				setDevice(true);
            }
            else {
                setDevice(false);
            }

            this.game.stage.backgroundColor = '#000000';
		    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		    this.game.stage.smoothed=false;
		    this.game.scale.pageAlignHorizontally = true;
    	    this.game.scale.pageAlignVertically = true;
		    this.game.state.start('Preloader');



           
        }
    }
}