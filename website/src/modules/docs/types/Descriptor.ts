export interface Descriptor<T extends string> {
  id: number
  name: string
  kind: T
}
