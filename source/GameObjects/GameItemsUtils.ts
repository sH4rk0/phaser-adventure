module z89 {

    export class GameItemsUtils {

        game: Phaser.Game;
        currentState: GameCity;
        


        constructor(game: Phaser.Game, currentState: any) {

            this.game=game;
            this.currentState=currentState;
           
        }

        addItem(id: number): void {
            
                                    let _itemObj: any = this.getItemObjById(id);
                                    if (_itemObj != undefined) {
            
            
                                            switch (_itemObj.type) {
            
            
                                                    case 2:
                                                            this.currentState.groupAll.add(new ItemsTruck(this.game, _itemObj));
                                                            break;
            
                                                    case 3:
                                                            this.currentState.groupAll.add(new ItemsContent(this.game, _itemObj));
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