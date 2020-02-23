import {Injectable} from '@angular/core';
import Dexie from 'dexie';
import 'dexie-observable';


@Injectable()
export class DexieService extends Dexie {
  constructor() {
    super('_db');
    this.version(1).stores({
      // only specify the properties would be queried
      users: '++id, name, email, phone, password',
      songs: '++id',
      albums: '++id',
      playlists: '++id',
      settings: '&id, *directories, theme'
     });
  }
}
