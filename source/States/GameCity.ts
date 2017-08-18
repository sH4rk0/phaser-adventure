


module z89 {

        export class GameCity extends Phaser.State {

                player: Player;
                playerMenu: PlayerMenu;
                playerActions: PlayerActions;

                private bg: Phaser.TileSprite;
                private bg2: Phaser.TileSprite;
                private street: Phaser.TileSprite;
                private front: Phaser.TileSprite;
                private ground: Phaser.Sprite;


                private groupStreet: Phaser.Group;
                private groupAll:Phaser.Group;

                private groupCity: Phaser.Group;
                private groupFront: Phaser.Group;
                private groupMenu: Phaser.Group;
                private groupAction: Phaser.Group;

                private currentItem: number = 0;

                private gameInteracion:boolean=true;

                constructor() {

                        super();
                        this.gameInteracion=true;

                }

                preload() {

                }

                create() {

                        this.game.world.setBounds(0, 0, 5000, 768);


                        this.groupCity = this.game.add.group();
                        this.groupStreet= this.game.add.group();  
                        
                        this.groupAll = this.game.add.group();
                       
                        this.groupFront = this.game.add.group();

                        this.groupAction = this.game.add.group();
                        this.groupMenu = this.game.add.group();


                        this.currentItem = 0;
                        let sky: Phaser.Image = this.game.add.image(0, 0, 'sky');
                        sky.fixedToCamera = true;

                        this.groupCity.add(sky);

                        this.bg = this.game.add.tileSprite(0, 0, 1024, 768, 'bg');
                        this.bg.fixedToCamera = true;
                        this.groupCity.add(this.bg);
                
                        this.bg2 = this.game.add.tileSprite(0, 0, 1024, 768, 'bg2');
                        this.bg2.fixedToCamera = true;
                        this.groupCity.add(this.bg2);
                        
                        this.groupCity.add(this.game.add.image(0, 0, 'city'));


                        this.street = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl1');
                        this.street.fixedToCamera = true;
                        this.groupStreet.add(this.street);
                        
                        this.front = this.game.add.tileSprite(0, 0, 1024, 768, 'streetLvl0');
                        this.front.fixedToCamera = true;
                        this.groupFront.add(this.front);

                        this.playerActions = new PlayerActions(this.game);
                        this.groupAction.add(this.playerActions);

                        

                        this.player = new Player(this.game);
                        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
                        this.groupAll.add(this.player);

                        this.playerMenu = new PlayerMenu(this.game);
                        this.groupMenu.add(this.playerMenu);

                        gameData.ingame.items.forEach(element => {

                                if(element.bgItem){

                                
                                switch (element.type) {


                                        case 1:
                                                this.groupAll.add(new ItemsDrink(this.game, element));
                                                break;

                                        case 2:
                                                this.groupAll.add(new ItemsPhones(this.game, element));
                                                break;

                                         case 3:
                                                this.groupAll.add(new ItemsGarbage(this.game, element));
                                                break;

                                         case 4:
                                                this.groupAll.add(new ItemsHydrant(this.game, element));
                                                break;


                                }
                                        }



                        });

                      
                      


                        this.ground = this.game.add.sprite(0, 644, this.game.cache.getBitmapData("ground"));
                        this.ground.inputEnabled = true;
                        this.ground.input.priorityID = 0;

                        this.ground.fixedToCamera = true;
                        this.ground.alpha = 0;


                        this.ground.events.onInputDown.add((ground: Phaser.Sprite) => {

                                /*if (((this.game.input.x > ground.x + 50) || (this.game.input.x < ground.x - 50))
                                        && (this.game.input.y > 600)) {

                                        this.currentItem = 0;

                                        if (this.playerActions.IsOpen()) this.playerActions.Hide();
                                        this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                                }*/
                                if(!this.gameInteracion) return;

                                this.currentItem = 0;

                                if (this.playerActions.IsOpen()) this.playerActions.hide();
                                this.player.goTo(this.game.input.x + this.game.camera.x, this.game.input.y);

                        }, this, null, [this.ground]);



                }


                update() {

                        this.bg.tilePosition.x = this.camera.x * -0.2;
                        this.bg2.tilePosition.x = this.camera.x * -0.7;
                        this.street.tilePosition.x = this.camera.x * -1.1;
                        this.front.tilePosition.x = this.camera.x * -1.25;
                        this.groupAll.sort('y', Phaser.Group.SORT_ASCENDING);


                }


                render() {

                        //this.game.debug.cameraInfo(this.game.camera, 500, 32);
                        //this.game.debug.spriteCoords(this.player, 32, 32);

                        //               this.game.debug.bodyInfo(this.player, 32, 32);
                        //this.game.debug.body(this.player.myArea)
                }


                setCurrentItem(_item: any): void {


                        this.currentItem = _item;

                }

                getCurrentItem(): any {


                        return this.currentItem;

                }

                getSprites():Phaser.Group{

                        return this.groupAll;
                }

                disableInteraction():void{

                        this.gameInteracion=false;
                        this.groupAll.ignoreChildInput=true;

                }

                enableInteraction():void{

                        this.gameInteracion=true;
                        this.groupAll.ignoreChildInput=false;
                }





        }


}