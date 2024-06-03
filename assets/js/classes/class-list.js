class List {

    static listIds = [];
    static currentId = null;

    static getListIds()
    {
        return self.listIds;
    }

    static setListIds(ids)
    {
        self.listIds = ids;
        self.currentId = null;
    }

    static addListId(id)
    {
        if ( self.listIds.indexOf(id) == 0) {
            listIds.push(id);
        }
    }

    static getCurrentId()
    {
        return self.currentId;
    }

    static setCurrentId(id, callback)
    {
        self.currentId = id;
        callback();
    }

    static getCurrentIndex()
    {
        return self.listIds.indexOf(self.currentId);
    }


    static getNextId() {
        let currentIndex;
        let nextIndex;

        if ( self.currentId !== null ) {
            currentIndex = self.listIds.indexOf(self.currentId);
            nextIndex = currentIndex+1;
            if ( nextIndex >= self.listIds.length ) {
                nextIndex = currentIndex;
            }
        } else {
            nextIndex = 0;
        }

        let nextId = self.listIds[nextIndex];
        // self.setCurrentId(nextId);
        return nextId;
    }

    static getPrevId() {
        let currentIndex;
        let prevIndex;
        if ( self.currentId !== null ) {
            currentIndex = self.listIds.indexOf(self.currentId);
            prevIndex = currentIndex-1;
            if ( prevIndex < 0 ) {
                prevIndex = 0;
            }

        } else {
            prevIndex = self.listIds.length -1;
        }

        let prevId = self.listIds[prevIndex];
        // self.setCurrentId(prevId);
        return prevId;
    }

}

export default List;

