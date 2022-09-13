export enum EventTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

export interface ToastEvent {
  type: EventTypes;
  message: string;
}
