import React from "react"
import { GETTING_STARTED_CATEGORY } from "../constants"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Guide } from "../types/Guide"
import { Section } from "../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../../docs/components/ModuleLinkMarkup"
import { Code } from "../../../common/markdown/components/Code"
import { InlineCode } from "../../../common/markdown/components/InlineCode"

export const addingCommands: Guide = {
  slug: "adding-commands",
  category: GETTING_STARTED_CATEGORY,
  title: "Adding commands",
  description: "How to add commands to a Gears bot",
  render: () => (
    <>
      <Paragraph>
        So our bot is working, but you can't really do anything with it. Let's start by
        adding a command!
      </Paragraph>
      <Section title="Adding our first command">
        <Paragraph>
          <ModuleLinkMarkup>
            In this guide we'll be using the [[CommandBuilder]], as it is more intuitive
            and also fully typesafe if you're using TypeScript. If you don't want to do
            that, you can still use the [[Command]] class in your own code.
          </ModuleLinkMarkup>
          <br />
          <br />
          Let's create a simple command that just sums a list of numbers. We'll define it
          like so:
        </Paragraph>
        <Code>
          {`
const { matchPrefixes } = require("@enitoni/gears")
const { Bot, Adapter, CommandBuilder } = require("@enitoni/gears-readline")

const sumCommand = new CommandBuilder()
  .match(matchPrefixes("sum "))
  .use(context => {
    const numbers = context.content.split(" ").map(n => Number(n))
    const summed = numbers.reduce((a, b) => a + b)

    console.log(summed)
  })
  .done() // Calling done will return a Command instance, don't forget this!

const adapter = new Adapter({})
const bot = new Bot({ adapter, commands: [sumCommand] })

bot.start().then(() => {
  console.log("Hello world!")
})

          `}
        </Code>
        <Paragraph>
          So, we define a matcher by calling <InlineCode>.match()</InlineCode> on the
          builder. Then we set some middleware for the command, using{" "}
          <InlineCode>.use()</InlineCode>. Now, if you run your code again, you should be
          able to type <InlineCode>sum 4 4</InlineCode> and get <InlineCode>8</InlineCode>{" "}
          back in return.
          <br />
          <br />
          Nice! You just defined your first command!
        </Paragraph>
      </Section>
      <Section title="Adding another command">
        <Paragraph>
          We'll add another command to make the bot even more feature fledged. Let's add
          another math related command, one multiplies the numbers instead. Define it like
          so:
        </Paragraph>
        <Code>
          {`
const multiplyCommand = new CommandBuilder()
  .match(matchPrefixes("multiply "))
  .use(context => {
    const numbers = context.content.split(" ").map(n => Number(n))
    const multiplied = numbers.reduce((a, b) => a * b)

    console.log(multiplied)
  })
  .done()
          `}
        </Code>
        <Paragraph>
          Now add it to the command array in the bot, after the{" "}
          <InlineCode>sumCommand</InlineCode>.
          <br />
          Again, run your code and check that it's working. You should be able to type{" "}
          <InlineCode>multiply 2 2</InlineCode> and get <InlineCode>4</InlineCode> in
          return.
        </Paragraph>
      </Section>
    </>
  ),
}
