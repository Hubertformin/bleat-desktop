import {NgModule, Optional, SkipSelf} from '@angular/core';
import {DexieService} from './dexie.service';
import {IdbService} from '../idb.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [DexieService, IdbService]
})
export class DexieModule {
  constructor(@Optional() @SkipSelf() parentModule: DexieModule) {
    if (parentModule) {
      throw new Error(
        'DexieModule is already loaded. Import it in the AppModule only');
    }
  }
}
