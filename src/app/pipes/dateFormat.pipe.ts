import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "dateFormat",
})
export class DateFormatPipe implements PipeTransform {
  private datePipe = new DatePipe("es-ES"); // Cambia el idioma a español

  transform(value: string | Date | null | undefined, format: string = "d 'de' MMMM 'de' y"): string {
    if (!value) return "Fecha Inválida";

    // Reemplaza las barras por guiones para que DatePipe lo interprete correctamente
    const formattedValue = typeof value === "string" ? value.replace(/\//g, "-") : value;

    const transformedDate = this.datePipe.transform(formattedValue, format);
    return transformedDate ?? "Fecha Inválida";
  }
}
