import { Content } from "../../../common/markdown/components/Content"
import { Heading } from "../../../common/markdown/components/Heading"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Link } from "../../../common/navigation/components/Link"
import { useStores } from "../../../common/state/hooks/useStores"
import { Section } from "../../../common/markdown/components/Section"
import { Demonstration } from "../../demo/components/Demonstration"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"

export function HomePage() {
  const { documentationStore } = useStores()
  const { latestVersion } = documentationStore

  return (
    <Content>
      <Heading icon="home">Welcome</Heading>
      <Paragraph>
        {"Gears is a JavaScript library for building command powered bots."}
        <br />
        <Link to={`/guides/installation`}>Get started here</Link>
        {" or "}
        <Link to={`/docs/${latestVersion}`}>Check out the documentation</Link>
      </Paragraph>
      <Paragraph>
        Also check out{" "}
        <ExternalLink to="https://gitlab.com/enitoni-gears/gears/tree/master/gears">
          the repository
        </ExternalLink>{" "}
        if you are curious or have any issues you want to address.
      </Paragraph>
      <Section icon="generic" title="Demo">
        <Demonstration />
      </Section>
    </Content>
  )
}
