export interface ServerError {
  detail?: { msg: string }[];
}

export interface Error {
  response?: { data: { detail?: Array<{ msg: string }> } };
}
