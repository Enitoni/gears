import { Guide } from "../types/Guide"
import { GETTING_STARTED_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"
import { Code } from "../../../common/markdown/components/Code"

export const creatingBot: Guide = {
  slug: "creating-bot",
  category: GETTING_STARTED_CATEGORY,
  title: "Creating your first bot",
  description: "A simple bot that can do mathematical operations",
  render: () => (
    <>
      <Paragraph>
        This guide will walk you through how to create your first bot using Gears. This
        bot is very simple and does not require any advanced third party library to work.
        <br />
        <br />
        We'll be using the official{" "}
        <ExternalLink to="https://www.npmjs.com/package/@enitoni/gears-readline">
          readline bindings
        </ExternalLink>{" "}
        so you can test the bot easily in your command-line.
      </Paragraph>
      <Section title="Preparing">
        <Paragraph>
          We'll assume that you know how Node.js and npm works, so create a package.json
          and run this command:
        </Paragraph>
        <Code>{`npm install @enitoni/gears @enitoni/gears-readline`}</Code>
      </Section>
      <Section title="Setting up the bot">
        <Paragraph>
          Now that you've installed the necessary libraries, create an index.js file and
          put the following code in it:
        </Paragraph>
        <Code>
          {`
import { Bot, Adapter } from "@enitoni/gears-readline"

const adapter = new Adapter({})
// This adapter takes no options,
// but they are always required,
// so we pass an empty object.

const bot = new Bot({ adapter })

bot.start().then(() => {
  console.log("Hello world!")
})
          `.trim()}
        </Code>
      </Section>
    </>
  ),
}
