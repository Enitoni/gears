import { Content } from "../../../common/markdown/components/Content"
import { Heading } from "../../../common/markdown/components/Heading"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Link } from "../../../common/navigation/components/Link"
import { useStores } from "../../../common/state/hooks/useStores"
import { Section } from "../../../common/markdown/components/Section"
import { Demonstration } from "./Demonstration"

export function HomePage() {
  const { documentationStore } = useStores()
  const { latestVersion } = documentationStore

  return (
    <Content>
      <Heading icon="home">Home</Heading>
      <br />
      <Paragraph>
        {
          "Gears is a library used to create command interfaces, such as chat bots and more."
        }
        <br />
        <Link to={`/docs/${latestVersion}`}>Check out the documentation</Link>
      </Paragraph>
      <Section icon="generic" title="Demo">
        <Demonstration />
      </Section>
    </Content>
  )
}
