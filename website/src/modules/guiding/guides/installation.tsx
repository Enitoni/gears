import { Guide } from "../types/Guide"
import { BASIC_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Code } from "../../../common/markdown/components/Code"
import { Section } from "../../../common/markdown/components/Section"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"

export const installation: Guide = {
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
          Gears is designed to be fully generic so it can work with anything that exposes
          a messaging interface. A messaging interface refers to anything that emits a
          message, an example would be the demo on the home page, a Discord bot, or even
          typing things in a command line.
        </Paragraph>
        <Paragraph>
          Currently, we provide these official libraries for working with Gears:
        </Paragraph>
        <ul>
          <li>
            <ExternalLink to="https://www.npmjs.com/package/@enitoni/gears-readline">
              Node.js readline bindings
            </ExternalLink>
          </li>
          <li>
            <ExternalLink to="https://www.npmjs.com/package/@enitoni/gears-discordjs">
              Discord.js bindings
            </ExternalLink>
          </li>
          <li>
            <ExternalLink to="https://www.npmjs.com/package/@enitoni/gears-ws">
              WebSocket bindings
            </ExternalLink>
          </li>
        </ul>
        <Paragraph>
          When you need to import the classes, import them from the binding library not
          Gears itself. You can import matchers from Gears itself since they will work
          regardless.
        </Paragraph>
        <Paragraph>Correct example:</Paragraph>
        <Code>{`import { Bot, Adapter, Command } from "@enitoni/gears-readline"`}</Code>
        <Paragraph>Incorrect example:</Paragraph>
        <Code>{`import { core } from "@enitoni/gears"`}</Code>
      </Section>
    </>
  ),
}
