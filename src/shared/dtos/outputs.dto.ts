export interface Output<T> {
  message: string;
  data: T;
}

export interface DeleteOutput {
  message: string;
}

export interface Data<T> {
  data: T;
}
