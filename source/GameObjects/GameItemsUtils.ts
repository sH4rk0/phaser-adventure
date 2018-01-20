module z89 {

        export class GameItemsUtils {

                game: Phaser.Game;
                currentState: GameCity;



                constructor(game: Phaser.Game) {

                        this.game = game;
                        this.currentState = <GameCity>this.game.state.getCurrentState();

                }

                addSavedItems(_items: Array<any>) {

                        _items.forEach(element => {
                                this.attachItem(element);
                        });


                }

                addItem(id: number): void {

                        let _itemObj: any = this.getItemObjById(id);

                        this.attachItem(_itemObj);

                }

                attachItem(_itemObj: any) {


                        if (_itemObj != undefined) {


                                switch (_itemObj.type) {


                                        case 2:
                                                this.currentState.groupAll.add(new ItemsTruck(this.game, _itemObj));
                                                break;

                                        case 3:
                                                this.currentState.groupAll.add(new ItemsContent(this.game, _itemObj));
                                                break;

                                        case 4:
                                                this.currentState.groupAll.add(new ItemsSkill(this.game, _itemObj));
                                                break;

                                        case 5:
                                        //console.log("5")
                                         this.currentState.groupCity.add(new Items(this.game, _itemObj));
                                       break;

                                        default:
                                                this.currentState.groupAll.add(new Items(this.game, _itemObj));
                                                break;


                                }
                        }



                }

                getItemObjById(id: number): any {

                        let _itemObj: any;
                        gameData.ingame.items.forEach(element => { if (element.id == id) _itemObj = element; });

                        return _itemObj;

                }

                getItemById(id: number): Items {

                        let _itemObj: Items;


                        this.currentState.groupAll.forEach((element: any) => {

                                if (element.id == id) _itemObj = element;

                        }, this);


                        return _itemObj;

                }





        }

}