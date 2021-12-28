import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[impOnlyNumber]',
})
export class OnlyNumbersDirective {

  private regex: RegExp = new RegExp(/^\d*\.?\d{0,3}$/g);
  private regexEnteros: RegExp = new RegExp(/^\d*$/g);
  private specialKeys: Array<string> = ['Control', 'v', 'c', 'Enter', 'Backspace', 'Tab', 'End', 'Home', '-', 'ArrowLeft', 'ArrowRight', 'Del', 'Delete'];
  private keyRemove: RegExp = new RegExp(/[^\w\a-zA-ZÁ-ú-.()'_+¿?!¡ /\\\n]/g);

  @Input() limiteMillon!: boolean;
  @Input() integerNumber!: boolean;

  constructor(private element: ElementRef) {
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // console.log(event.key, ' <- key press');
    // Si se ingresa un guion, no permite escritura
    if (event.key === '-') {
      event.preventDefault();
      return;
    }
    // Allow Backspace, tab, end, and home keys
    // if (this.specialKeys.indexOf(event.key) !== -1) {
    //   return;
    // }
    const current: string = this.element.nativeElement.value;
    const position = this.element.nativeElement.selectionStart;
    // tslint:disable-next-line:triple-equals
    const next: string = [current.slice(0, position), event.key == 'Decimal' ? '.' : event.key, current.slice(position)].join('');
    // Se hace una busqueda de puntos para artificio que permite agregar puntos sin completar el numero
    let obtieneSeparacionPuntuacion:any[] = [];
    if (next !== undefined && next !== null) {
      obtieneSeparacionPuntuacion = next.toString().split('.');
    }
    if (this.integerNumber) {
      this.regex = this.regexEnteros;
    }

    // Validacion para valores decimales
    if (this.specialKeys.indexOf(event.key) === -1 && next && !String(next).match(this.regex)) {
      event.preventDefault();
    } else {
      // Validacion unica para permitir un punto y continuar con las proximas validaciones de formato de numeros
      if (this.limiteMillon
        && obtieneSeparacionPuntuacion.length > 1
        && obtieneSeparacionPuntuacion[1].length === 0) {
        // Permite continuar
      } else
        // Limita el numero máximo a las cifras del millon
        if (this.limiteMillon && !(/^\d{1,7}(\.\d{1,})?$/).test(next)) {
          event.preventDefault();
        }
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    setTimeout(() => {
      if (this.integerNumber) {
      //   this.element.nativeElement.value = this.element.nativeElement.value.replace(this.keyRemoveAlphanumeric, '');
      // } else {
        // const alpha = 'abcdefghijklmnñopqrstuvwxyzáéíóúABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚ';
        // while (this.element.nativeElement.value.includes(alpha) !== -1) {
        //   this.element.nativeElement.value = this.element.nativeElement.value.replace(alpha, '');
        // }
      }
    }, 0);
  }
}
