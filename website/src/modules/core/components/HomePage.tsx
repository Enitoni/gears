import { Content } from "../../../common/markdown/components/Content"
import { Heading } from "../../../common/markdown/components/Heading"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Link } from "../../../common/navigation/components/Link"

export function HomePage() {
  return (
    <Content>
      <Heading icon="home">Home</Heading>
      <Paragraph>
        {
          "Gears is a library used to create command interfaces, such as chat bots and more."
        }
      </Paragraph>
      <Link to={"/docs"}>Check out the documentation</Link>
    </Content>
  )
}
