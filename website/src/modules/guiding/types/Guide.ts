export interface Guide {
  slug: string
  title: string
  category: string
  description: string
  render: () => React.ReactNode
}
