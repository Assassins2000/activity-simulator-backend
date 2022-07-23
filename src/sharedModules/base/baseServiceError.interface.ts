export interface BaseServiceError<E, D = Record<string, unknown>> {
  code: E;
  message: string;
  details?: D;
}
