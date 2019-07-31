import { Guide } from "../types/Guide"
import { BASIC_CATEGORY } from "../constants"
import React from "react"

export const gettingStarted: Guide = {
  slug: "getting-started",
  category: BASIC_CATEGORY,
  title: "Getting started",
  description: "A guide to getting started with Gears",
  render: () => <>Test</>,
}
