import * as momentTimezone from 'moment-timezone';
import { Constants } from '@app/global/constants';
/*import { Global } from '@app/global/constants';
import { AppParameterModel } from '@app/shared/model/general/app-parameter.model';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';*/

// to export globan things

/*import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';*/

export class UtilHelper {
  public static timezone = 'America/Lima';

  private static EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  private static EXCEL_EXTENSION = '.xlsx';



  public static parseCutomUTCDateToString(date: Date, format?: string): string {
    format = format || Constants.FORMAT_DATE_API;
    let valueConverted!: string ;
    if (momentTimezone(date).isValid()) {
      date = momentTimezone(date).subtract('hours', 0).toDate();

      valueConverted = momentTimezone(date).format(format);
    }
    return valueConverted;
  }



    /**
   * Parsear formatos de fecha en lectura de api para backend
   */
     public static parseUTCDate(date: string|undefined , format?: string): Date {
      format = format || Constants.FORMAT_DATE_API;
      let valueConverted!: Date
      if (momentTimezone(date, format).isValid()) {
        // date = momentTimezone(date).subtract('hours', UtilHelper.getClientTimeZone()).toDate();
        /*date = momentTimezone(date).subtract('hours', 0).toDate();*/
        valueConverted = momentTimezone(date, format).toDate();
      }
      return valueConverted;
    }




  /**
   * Exporta una lista en formato excel
   * @paramjson lista a exportar
   * @paramexcelFileName nombre de archivo
   */

  /*
  public static exportJsonToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    UtilHelper.saveAsExcelFile(excelBuffer, excelFileName);
  }


  public static saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '' + this.EXCEL_EXTENSION);
  }*/
}
