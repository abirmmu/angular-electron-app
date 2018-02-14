import { Component, OnInit } from '@angular/core';
import { DataService } from '../../providers/data.service';
import { PdfGeneratorService } from '../../providers/pdfGenerator.service';
import * as jsPDF from 'jspdf';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ExcelService } from '../../providers/excel.service';
import { XlGenService } from '../../providers/xlgen.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DataService, PdfGeneratorService, ExcelService, XlGenService]
})
export class HomeComponent implements OnInit {

  dataObj: any;
  columns: any;
  colHeaders: any;
  options: any;
  constructor(public dataService: DataService,
              public pdfGeneratorService: PdfGeneratorService,
              public excelService: XlGenService) { }

  ngOnInit() {
    this.dataService.getJSON().subscribe(data =>
      this.dataObj = data,
      error => console.log(error));

    this.columns = [
      {
        data: 'Select',
        type: 'checkbox',
        checkedTemplate: 'Yes',
        uncheckedTemplate: 'No'
      },
      {
        data: 'id',
        type: 'numeric'
      },
      {
        data: 'currencyCode',
        type: 'text'
      },
      {
        data: 'currency',
        type: 'text'
      },
      {
        data: 'level',
        type: 'numeric',
        numericFormat: {
          pattern: '0.0000'
        }
      },
      {
        data: 'units',
        type: 'text'
      },
      {
        data: 'asOf',
        type: 'date',
        dateFormat: 'MM/DD/YYYY'
      },
      {
        data: 'onedChng',
        type: 'numeric',
        numericFormat: {
          pattern: '0.00%'
        }
      }
    ];
    this.colHeaders =  [
      'Select',
      'ID',
      'Code',
      'Currency',
      'Level',
      'Units',
      'Date',
      'Change'
    ];
     this.options = {
      stretchH: 'all',
      manualColumnResize: true,
  //    manualRowResize: true,
      readOnly: true,
    //  fixedRowsTop: 2,
  //    fixedColumnsLeft: 2,
      mergeCells: true,
  //    contextMenu: true,
 //     manualRowMove: true,
      manualColumnMove: true,
      columnSorting: true,
  //    rowHeaders: true,
  //    colHeaders: true,
      colWidths: [40, 55, 80, 80, 80, 80, 80, 80],
  //    rowHeights: [50, 40, 100],
      // contextMenu: [
      //   'row_above', 'row_below', 'remove_row', 'Unpost Entry'
      // ],
      contextMenu: {
        callback: function (key, options) {
          if (key === 'unpost') {
            setTimeout(function () {
              // timeout is used to make sure the menu collapsed before alert is shown
              alert('Unposting Entry');
            }, 100);
          }
        },
        items: {
          'row_above': {
            name: 'Insert Entry Above',
            disabled: function () {
              // if first row, disable this option
         //     return hot3.getSelected()[0] === 0;
            }
          },
          'row_below': {
            name: 'Insert Entry Below',
            disabled: function () {
              // if last row, disable this option
              //     return hot3.getSelected()[0] === 0;
            }
          },
          'remove_row': {
            name: 'Delete Entry',
            disabled: function () {
              // if first row, disable this option
      //        return hot3.getSelected()[0] === 0
            }
          },
          'hsep2': '---------',
          'unpost': {
            name: 'Unpost Entry',
            disabled: function () {
              // if first row, disable this option
      //        return hot3.getSelected()[0] === 0
            }
          }
        }
      }
    };
  }

  downloadPDF() {
    const elementToPrint = document.getElementById('excel');
    this.pdfGeneratorService.GeneratePDF(elementToPrint);
  }

  exportToCSV() {
    const data = [
      {
        name: 'Test 1',
        age: 13,
        average: 8.2,
        approved: true,
        description: 'using Content here, content here '
      },
      {
        name: '',
        age: 11,
        average: 8.2,
        approved: true,
        description: 'using Content here, content here'
      },
      {
        name: 'Test 4',
        age: 10,
        average: 8.2,
        approved: true,
        description: 'using Content here, content here '
      },
    ];

    const angular2Csv = new Angular2Csv(data, 'My Report');
  }

  exportToExcel() {
  //  this.excelService.exportAsExcelFile(this.dataObj, 'export to excel');
    this.excelService.callgenXL();
  }

}
