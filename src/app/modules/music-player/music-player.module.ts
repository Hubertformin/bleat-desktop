import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MusicPlayerComponent} from './music-player/music-player.component';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [MusicPlayerComponent],
  exports: [
    MusicPlayerComponent
  ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule
    ]
})
export class MusicPlayerModule { }
