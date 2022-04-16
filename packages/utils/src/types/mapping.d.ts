export type Mapping<T> = {
  [P in keyof T]: T[P]
}
