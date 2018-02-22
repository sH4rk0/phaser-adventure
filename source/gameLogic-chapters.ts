gameData.chapters=[
    {
        title:"CHAPTER ONE:\nTHE DEVDAY TROUBLE!",
        completed:false,
        complete: (cs: z89.GameCity) => {
           
            cs.removeItem(24);
            cs.updateItemObject(23,"name", z89.getLabel(57))
            cs.gameItemsUtils.getItemById(23).playAnim("fixed");
            cs.gameItemsUtils.getItemById(23).itemObj.fixed = true;
            cs.gameItemsUtils.getItemById(22).start();
            cs.updateItemObject(2,"working", true);
            cs.gameItemsUtils.getItemById(2).playAnim("working");
            cs.updateItemObject(22, "isStarted", true);
            cs.updateItemObject(19,"conversationStatus", 1);
            cs.saveGameObj.updateItems();
        
                        }
    },
    {
        title:"CHAPTER TWO:\nBACK TO HOME!",
        completed:false,
        complete: (cs: z89.GameCity) => {
           
            cs.gameItemsUtils.getItemById(50).start();
            cs.updateItemObject(22, "isStarted", true);
            cs.saveGameObj.updateItems();
        
                        }
        

    }
]