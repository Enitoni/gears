export interface Descriptor<T extends string> {
  id: number
  name: string
  usage?: string
  kind: T
}
