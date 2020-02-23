(function () {
/*
*  Indexer version 1.0.1
*
* */
    const Dexie = require('dexie');
    const os = require('os');
    const path = require('path');

    const db = new Dexie('_db');
    // initialize settings, upsert default values
    const music_path = path.join(os.homedir(), 'Music');
    console.log(music_path);
    db.table('settings').add({
        id: 1,
        directories: [music_path]
    })

})();
