import { Component } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './components/home/home.component';
import { DataService } from './providers/data.service';
import { PdfGeneratorService } from './providers/pdfGenerator.service';
import { ExcelService } from './providers/excel.service';
import { XlGenService } from './providers/xlgen.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HomeComponent, DataService, PdfGeneratorService, ExcelService, XlGenService]
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
