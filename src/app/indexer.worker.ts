/// <reference lib="webworker" />
import Dexie from 'dexie';
import * as os from 'os';
import {join} from 'path';
import {readdir} from 'fs';


addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  postMessage(response);
});

const db = new Dexie('_db');
db.version(1).stores({
  // only specify the properties would be queried
  users: '++id, name, email, phone, password',
  songs: '++id',
  albums: '++id',
  playlists: '++id',
  settings: '&id, *directories, theme'
});

const musicPath = join(os.homedir(), 'Music');
console.log(musicPath);
/*readdir(musicPath, (err, dirs) => {
  console.dir(dirs);
});*/

db.table('settings').add({
  id: 1,
  directories: [musicPath]
}).catch(err => {});

