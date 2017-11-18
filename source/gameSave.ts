module z89 {

    export class saveGame {

        private currentState:GameCity;
        private playerX: number = 0;
        private playerY: number = 0;
        private savedObj: any;
        private isSaved: boolean = false;
        private inventory: Array<any>;
        private items:Array<any>;

        constructor(currentState:GameCity) {

            this.currentState=currentState;
            this.checkSaved();

        }

        updatePlayerPosition(x: number, y: number): void {

            this.playerX = x;
            this.playerY = y;
            this.updateSaveObj();


        }

        updatePlayerInventory(inventory:Array<number>): void {

            this.inventory=inventory;
            this.updateSaveObj();


        }


        updateItems(){

            
            let _itemsObj:Array<any>=[];

            
            console.log(this.currentState.groupAll);
            this.currentState.groupAll.children.forEach((element:Items) => {
                
                if(element.itemObj!=undefined){

                    _itemsObj.push(element.itemObj)
                }
            });

            //console.log(_itemsObj)
            this.items=_itemsObj;

            this.updateSaveObj();

        }

        gameIsSaved(): boolean {

            return this.isSaved;
        }

        setSaved(obj: any) {

            this.savedObj = obj;
            localStorage.setItem('savedObj', JSON.stringify(this.savedObj));

        }

        clearSaved(): void {

            this.savedObj = null;
            localStorage.removeItem("savedObj");

        }

        getSaved(): any { return this.savedObj; }

        checkSaved(): void {

            let _obj: any = JSON.parse(localStorage.getItem("savedObj"));
           // console.log(_obj)
            if (_obj != null) {
                this.savedObj = _obj;
                this.inventory=this.savedObj.inventory;
                this.items=this.savedObj.items;
                this.playerX=this.savedObj.position.x;
                this.playerY=this.savedObj.position.y;
                this.isSaved = true;
            } else {
                this.savedObj = null;
                this.isSaved = false;

            }

        }

        updateSaveObj(): any {

            let obj: any;

            obj = {

                position: { x: this.playerX, y: this.playerY },
                inventory: this.inventory,
                items: this.items

            }

           // console.log(obj);
            this.setSaved(obj);

        }

    }


}