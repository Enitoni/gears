import React from "react"
import { styled } from "../../../modules/theming/themes"
import { useRouteLink } from "../../routing/hooks/useRouteLink"
import { getFontColor, getDuration } from "../../../modules/theming/helpers"

export interface CategoryChild {
  label: string
  to: string
}

export interface CategoryItem {
  name: string
  items: CategoryChild[]
}

export interface CategoryNavigationProps {
  categories: CategoryItem[]
}

const Container = styled.div``

const Category = styled.div`
  font-weight: 600;
  font-size: 24px;

  > .children {
    margin-top: 16px;
  }

  & ~ & {
    margin-top: 32px;
  }
`

const Child = styled.a<{ active: boolean }>`
  display: block;

  font-weight: 600;
  font-size: 18px;
  color: ${getFontColor("muted")};

  transition: ${getDuration("normal")} ease;
  transition-property: color;

  a ~ & {
    margin-top: 16px;
  }

  ${props => {
    const active = `
      color: ${props.theme.colors.accent};
    `

    const inactive = `
      &:hover {
        color: ${props.theme.fontColors.normal};
      }
    `

    return props.active ? active : inactive
  }}
`

export function CategoryChildRenderer(props: CategoryChild) {
  const { label, to } = props
  const [active, click] = useRouteLink(to)

  return (
    <Child href={to} active={active} onClick={click}>
      {label}
    </Child>
  )
}

export function CategoryNavigation(props: CategoryNavigationProps) {
  const { categories } = props

  const renderedCategories = categories.map(category => {
    const renderedChildren = category.items.map(child => (
      <CategoryChildRenderer {...child} />
    ))

    return (
      <Category key={category.name}>
        <div className="title">{category.name}</div>
        <div className="children">{renderedChildren}</div>
      </Category>
    )
  })

  return <Container>{renderedCategories}</Container>
}
