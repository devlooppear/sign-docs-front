export function onlyNumbers(value: string): string {
  return value.replace(/\D/g, "");
}
