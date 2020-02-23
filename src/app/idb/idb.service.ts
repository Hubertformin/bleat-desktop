import { Injectable } from '@angular/core';
import {DexieService} from './core/dexie.service';
import Dexie from 'dexie';

@Injectable()
export class IdbService {
  private users: Dexie.Table<any, any>;
  private songs: Dexie.Table<any, any>;

  constructor(private dexie: DexieService) {
    this.users = this.dexie.table('users');
    this.songs = this.dexie.table('songs');
  }
}
