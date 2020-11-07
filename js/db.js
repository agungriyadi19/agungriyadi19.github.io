function cekDatabase(idb) {
    var dbPromised = idb.open("Football-liga", 1, function(upgradeDb) {    
        if (!upgradeDb.objectStoreNames.contains(storeNameTeam)) {
            var teamsObjectStore = upgradeDb.createObjectStore(storeNameTeam, {
                keypath: "id"
            });
            
            teamsObjectStore.createIndex("team_name", "name", {
                unique: false
            });
        }
    });

    return dbPromised;
}

function addToFavorite(data, storeName) {
    var dataPrimaryKey;
    if (storeName == storeNameTeam) {
        dataPrimaryKey = data.id;        
    }

    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);
            
            store.put(data, dataPrimaryKey);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil ditambahkan ke favorite",
            });
        });
}

function removeFromFavorites(ID, storeName) {
    console.log(ID + " " + storeName);
    cekDatabase(idb)
        .then(function(db) {
            var tx = db.transaction(storeName, "readwrite");
            var store = tx.objectStore(storeName);

            store.delete(ID);

            return tx.complete;
        })
        .then(function() {
            M.toast({
                html: "Berhasil dihapus dari favorite",
            });
        });

    location.reload();
}

function getAllFavorites(storeName) {
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);
                
                return store.getAll();
            })
            .then(function(data) {
                resolve(data);
            });
    });
}

function getById(ID, storeName) {
    return new Promise(function(resolve, reject) {
        cekDatabase(idb)
            .then(function(db) {
                var tx = db.transaction(storeName, "readonly");
                var store = tx.objectStore(storeName);

                return store.get(ID);
            })
            .then(function(data) {
                resolve(data);
            });
    });
}