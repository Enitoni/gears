import { Guide } from "../types/Guide"
import { categorize } from "../../../common/lang/array/categorize"
import {
  CategoryLink,
  Category,
} from "../../../common/navigation/components/CategoryNavigation"

export const getGuideCategories = (guides: Guide[]) => {
  const categories = categorize(guides, guide => guide.category)

  const mapGuide = (guide: Guide): CategoryLink => {
    const { slug, title } = guide

    const to = `/guides/${slug}`

    return {
      to,
      icon: "book",
      label: title,
    }
  }

  const mapCategory = (category: [string, Guide[]]): Category => {
    const [name, guides] = category

    return {
      name,
      items: guides.map(mapGuide),
    }
  }

  return Object.entries(categories).map(mapCategory)
}
