import { Guide } from "../types/Guide"
import { GETTING_STARTED_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../../docs/components/ModuleLinkMarkup"
import { Link } from "../../../common/navigation/components/Link"
import { Code } from "../../../common/markdown/components/Code"
import { InlineCode } from "../../../common/markdown/components/InlineCode"

export const addingGroups: Guide = {
  slug: "adding-groups",
  category: GETTING_STARTED_CATEGORY,
  title: "Adding command groups",
  description: "How to use the CommandGroup",
  render: () => (
    <>
      <Paragraph>
        What if we wanted to prefix all commands with something? We can use a command
        group for that.
        <br />
        <br />
        <ModuleLinkMarkup>
          A [[CommandGroup]] is the same as a [[Command]] except it contains a list of
          commands and/or command groups. The group will only match if its matcher and any
          of the children inside of it also match.
        </ModuleLinkMarkup>{" "}
        You should know how this works from the{" "}
        <Link to="/guides/understanding-gears">understanding gears guide.</Link>
      </Paragraph>
      <Section title="Creating the command group">
        <Paragraph>
          Let's make our command group and make it match on "!", like this:
        </Paragraph>
        <Code>
          {`
const group = new CommandGroup()
  .match(matchPrefixes("!"))
  .setCommands(sumCommand, multiplyCommand)
          `}
        </Code>
        <Paragraph>And then, let's replace our bot's commands:</Paragraph>
        <Code>
          {`
const bot = new Bot({ adapter, commands: [group] })
          `}
        </Code>
        <Paragraph>
          Now, run your bot again and try a command like <InlineCode>!sum 8 8</InlineCode>{" "}
          and it should return <InlineCode>16</InlineCode>
        </Paragraph>
      </Section>
      <Section title="Using middleware in command groups">
        <Paragraph>
          We can improve our code even more, by using middleware in the command group.
          Wouldn't it be nice if we could just return the message instead of logging it
          manually? Since middleware is async, we can{" "}
          <InlineCode>await next()</InlineCode> to wait for the next middleware to be
          executed. When you do this, you also get the response returned from the promise.
          <br />
          <br />
          So let's define some middleware that does exactly that:
        </Paragraph>
        <Code>
          {`
const loggingMiddleware = async (context, next) => {
  const response = await next()

  console.log(\`Result: \${response}\`)
  return response
  // Always return the response,
  // otherwise the response event on the bot
  // will not be usable
}
`}
        </Code>
        <Paragraph>Now let's change the rest of our code to reflect this:</Paragraph>
        <Code>
          {`
const { matchPrefixes } = require("@enitoni/gears")
const {
  Bot,
  Adapter,
  Command,
  CommandGroup,
} = require("@enitoni/gears-readline")

const numberMiddleware = (context, next) => {
  const { content, state } = context

  const numbers = content.split(" ").map(n => Number(n))

  if (numbers.some(n => isNaN(n))) {
    console.log("Please specify a list of numbers separated by space.")
    return
  }

  state.numbers = numbers
  return next()
}

const loggingMiddleware = async (context, next) => {
  const response = await next()

  console.log(\`Result: \${response}\`)
  return response
  // Always return the response,
  // otherwise the response event on the bot
  // will not be usable
}

const sumCommand = new Command()
  .match(matchPrefixes("sum "))
  .use(numberMiddleware)
  .use(context => {
    const { numbers } = context.state
    return numbers.reduce((a, b) => a + b)
  })

const multiplyCommand = new Command()
  .match(matchPrefixes("multiply "))
  .use(numberMiddleware)
  .use(context => {
    const { numbers } = context.state
    return numbers.reduce((a, b) => a * b)
  })

const group = new CommandGroup()
  .match(matchPrefixes("!"))
  .use(loggingMiddleware)
  .setCommands(sumCommand, multiplyCommand)

const adapter = new Adapter({})
const bot = new Bot({ adapter, commands: [group] })

bot.start().then(() => {
  console.log("Hello world!")
})
          `}
        </Code>
        <Paragraph>
          Run your code and type <InlineCode>!multiply 1 9 2 9</InlineCode> and you should
          get <InlineCode>Result: 162</InlineCode> back in return.
        </Paragraph>
      </Section>
    </>
  ),
}
