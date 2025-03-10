import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  private datePipe = new DatePipe("es-ES"); // Cambia el idioma a español

  transform(value: string | Date | null | undefined, format: string = "d 'de' MMMM 'de' y"): string {
    if (!value) return "Fecha Inválida";

    // Si es un string, lo transformamos a Date
    const dateValue = typeof value === "string" ? new Date(value.replace(/\//g, "-")) : value;

    // Si no es una fecha válida, devolvemos "Fecha Inválida"
    if (!(dateValue instanceof Date) || isNaN(dateValue.getTime())) {
      return "Fecha Inválida";
    }

    const transformedDate = this.datePipe.transform(dateValue, format);
    return transformedDate ?? "Fecha Inválida";
  }
}
