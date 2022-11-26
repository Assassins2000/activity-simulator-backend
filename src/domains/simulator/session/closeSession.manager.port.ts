export interface CloseSessionManagerPort {
  findDateTimeLastKeyStrokeBySessionId(sessionId: string): Promise<Date | null>;
  closeSession(dateTimeLastKeystroke: Date, session: string): Promise<boolean>;
}
