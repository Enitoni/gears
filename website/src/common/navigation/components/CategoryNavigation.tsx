import React from "react"

import { styled } from "../../../modules/theming/themes"
import { useRouteLink } from "../../routing/hooks/useRouteLink"

import { getFontColor, getDuration } from "../../../modules/theming/helpers"
import { size } from "polished"

import { IconType } from "../../icon/types/IconType"
import { Icon } from "../../icon/components/Icon"

export interface CategorySection {
  icon?: IconType
  label: string
  to: string
}

export interface Category {
  name: string
  items: CategorySection[]
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

const CategorySection = styled.a<{ active: boolean }>`
  height: 48px;

  display: flex;
  align-items: center;

  font-weight: 600;
  font-size: 18px;
  color: ${getFontColor("normal")};

  transition: ${getDuration("normal")} ease;
  transition-property: color;

  > .icon {
    ${size(24)}

    fill: ${getFontColor("normal")};
    margin-right: 16px;

    transition: ${getDuration("normal")} ease;
    transition-property: fill;
  }


  ${props => {
    const active = `
      color: ${props.theme.colors.accent};

      > .icon {
        fill: ${props.theme.colors.accent};
      }
    `

    const inactive = `
      &:hover {
        color: ${props.theme.fontColors.muted};
      }

      &:hover > .icon {
        fill: ${props.theme.fontColors.muted};
      }
    `

    return props.active ? active : inactive
  }}
`

export function CategorySectionItem(props: CategorySection) {
  const { icon, label, to } = props
  const [active, click] = useRouteLink(to)

  const renderIcon = () => {
    if (!icon) return null
    return <Icon className="icon" name={icon} />
  }

  return (
    <CategorySection href={to} active={active} onClick={click}>
      {renderIcon()}
      <div className="label">{label}</div>
    </CategorySection>
  )
}

export function CategoryNavigation(props: CategoryNavigationProps) {
  const { categories } = props

  const renderedCategories = categories.map(category => {
    const renderedChildren = category.items.map(child => (
      <CategorySectionItem key={child.to} {...child} />
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
