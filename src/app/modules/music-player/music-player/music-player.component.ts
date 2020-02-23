import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('audioPlayer') audioPlayer: ElementRef<HTMLAudioElement>;
  playerState = {
    currentTime: 0,
    duration: 0,
    percentPlayed: 0,
    playing: false,
    volume: 1
  };
  private isPlayerFocused: boolean;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.initializePlayer();
  }
  private initializePlayer() {
    this.audioPlayer.nativeElement.play();
    // set volume
    this.playerState.volume = this.audioPlayer.nativeElement.volume;
    // get full play time
    this.playerState.duration = this.audioPlayer.nativeElement.duration;
    // listen for progress bar
    this.audioPlayer.nativeElement.ontimeupdate = (ev) => {
      this.playerState.percentPlayed = (this.audioPlayer.nativeElement.currentTime / this.audioPlayer.nativeElement.duration) * 100;
      this.ref.detectChanges();
    };
    // if play
    this.audioPlayer.nativeElement.onplay = () => {
      this.playerState.playing = true;
    };
    // if paused
    this.audioPlayer.nativeElement.onpause = (ev) => {
      this.playerState.playing = false;
    };
  }
  /*
  * Audio player controls
  * */
  play() {
    this.audioPlayer.nativeElement.play();
  }
  pause() {
    this.audioPlayer.nativeElement.pause();
  }

  changeVolume($e) {
    this.playerState.volume = $e.target.value;
    this.audioPlayer.nativeElement.volume = $e.target.value;
  }

  playerFocused() {
    this.isPlayerFocused = true;
    this.pause();
  }

  changeTime($event) {
    if (this.isPlayerFocused) {
      this.pause();
      this.audioPlayer.nativeElement.currentTime = (($event.target.value / 100) * this.audioPlayer.nativeElement.duration);
      this.isPlayerFocused = false;
      this.play();
    }
  }
}
