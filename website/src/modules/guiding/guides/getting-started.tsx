import { Guide } from "../types/Guide"
import { BASIC_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Code } from "../../../common/markdown/components/Code"
import { Section } from "../../../common/markdown/components/Section"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"

export const gettingStarted: Guide = {
  slug: "installation",
  category: BASIC_CATEGORY,
  title: "Installation",
  description: "How to install Gears",
  render: () => (
    <>
      <Paragraph>
        In order to use Gears, you'll need to install it. If you are using TypeScript you
        do not need to worry about types as they are included natively.
      </Paragraph>
      <Code>npm install @enitoni/gears</Code>
      <Paragraph>Or, if you're using Yarn</Paragraph>
      <Code>yarn add @enitoni/gears</Code>
      <Section title="Using with third party libraries">
        <Paragraph>
          Gears is designed so that it is fully generic and can work with anything that
          has a messaging interface. A messaging interface refers to anything that outputs
          a message, an example would be the demo on the home page, a Discord bot, or even
          typing things in a command line.
        </Paragraph>
        <Paragraph>
          Currently, we provide these official libraries for working with Gears:
        </Paragraph>
        <ul>
          <li>
            <ExternalLink to="https://www.npmjs.com/package/@enitoni/gears-discordjs">
              Discord.js bindings
            </ExternalLink>
          </li>
        </ul>
        <Paragraph>
          Keep in mind that if you're using TypeScript, you'll need to import the modules
          from that library. If you don't, then you'll have to deal with type arguments on
          each module. Even if you're using JavaScript we strongly recommend importing
          from the bindings library as your code editor may still use the types to aid in
          IntelliSense.
        </Paragraph>
        <Paragraph>Correct example:</Paragraph>
        <Code>{`import { Bot, Adapter, Command } from "@enitoni/gears-discordjs"`}</Code>
        <Paragraph>Incorrect example:</Paragraph>
        <Code>{`import { Bot, Adapter, Command } from "@enitoni/gears"`}</Code>
      </Section>
    </>
  ),
}
