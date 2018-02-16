import { Component } from '@angular/core';
import { ElectronService,  DataService, PdfGeneratorService, XlGenService } from './providers';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HomeComponent, DataService, PdfGeneratorService, XlGenService]
})
export class AppComponent {
  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              public homeComponent: HomeComponent) {

    translate.setDefaultLang('en');

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
      this.listenToRendererProcessEvents();
    } else {
      console.log('Mode web');
    }
  }

  listenToRendererProcessEvents() {
    this.electronService.ipcRenderer.on('call-angular-method', this.callAngularMethod.bind(this));
    this.electronService.ipcRenderer.on('download-pdf', this.homeComponent.downloadPDF.bind(this.homeComponent));
  }

  callAngularMethod() {
    console.log('electron invoked angular method');
  }
}
