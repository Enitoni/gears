import React from "react"
import { styled } from "../../../modules/theming/themes"

import { IconType } from "../../icon/types/IconType"
import { NavLink } from "../../../modules/core/components/NavLink"
import { useRouteLink } from "../../routing/hooks/useRouteLink"
import { useScrollAnchor } from "../../react/useScrollAnchor"

export type CategoryChild = Omit<CategoryLink, "children">

export interface CategoryLink {
  children?: CategoryChild[]
  icon: IconType
  label: string
  to: string
}

export interface Category {
  name: string
  items: CategoryLink[]
}

export interface CategoryNavigationProps {
  categories: Category[]
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

const Children = styled.div`
  margin-left: 32px;
`

export function CategoryLink(props: CategoryLink) {
  const { icon, label, to, children } = props
  const [active] = useRouteLink(to)
  const [ref] = useScrollAnchor(to, "center")

  const renderChildren = () => {
    if (!children || !active) return null

    return (
      <Children>
        {children.map(x => (
          <CategoryLink key={x.to} {...x} />
        ))}
      </Children>
    )
  }

  return (
    <div ref={ref} id={label}>
      <NavLink to={to} icon={icon}>
        {label}
      </NavLink>
      {renderChildren()}
    </div>
  )
}

export function CategoryNavigation(props: CategoryNavigationProps) {
  const { categories } = props

  const renderedCategories = categories.map(category => {
    const renderedChildren = category.items.map(child => (
      <CategoryLink key={child.to} {...child} />
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
