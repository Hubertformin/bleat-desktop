import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Library',
      url: '/views/library',
      icon: 'musical-notes'
    },
    {
      title: 'Downloads',
      url: '/views/downloads',
      icon: 'download'
    },
    {
      title: 'Favorites',
      url: '/views/favorites',
      icon: 'heart'
    },
    /*{
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }*/
  ];
  public playlist = ['Last played', 'Recently added'];

  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('views/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    // indexer
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('./indexer.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage('hello');
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }
}
