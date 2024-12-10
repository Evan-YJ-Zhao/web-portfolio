export type OptionalClassName = {
  className ?: string;
}

export type StringValues<T extends string> =  Record<T, string>

// two layers JSON
export type JSONObject = {
  [key: string]: string | number | boolean | JSONObject;
}
