export interface Descriptor<T extends string> {
  id: number
  name: string
  example?: string
  kind: T
}
