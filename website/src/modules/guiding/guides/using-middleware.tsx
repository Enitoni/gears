import { Guide } from "../types/Guide"
import { GETTING_STARTED_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { Code } from "../../../common/markdown/components/Code"
import { InlineCode } from "../../../common/markdown/components/InlineCode"

export const usingMiddleware: Guide = {
  slug: "using-middleware",
  category: GETTING_STARTED_CATEGORY,
  title: "Using middleware",
  description: "How to start using middleware effectively",
  render: () => (
    <>
      <Paragraph>
        So we have our two commands, but we're repeating a lot of code. Wouldn't it be
        nice if we could re-use the code that parses the list of numbers? That's where
        middleware comes in.
      </Paragraph>
      <Section title="Creating the middleware">
        <Paragraph>
          Let's create a standalone middleware function that parses the numbers for us and
          adds the result to context state. Create it like this:
        </Paragraph>
        <Code>
          {`
const numberMiddleware = (context, next) => {
  const { content, state } = context

  const numbers = content.split(" ").map(n => Number(n))
  state.numbers = numbers

  return next()
}

          `}
        </Code>
        <Paragraph>Now, we can add this middleware to our commands:</Paragraph>
        <Code>
          {`
const sumCommand = new CommandBuilder()
  .match(matchPrefixes("sum "))
  .use(numberMiddleware)
  .use(context => {
    const { numbers } = context.state
    const summed = numbers.reduce((a, b) => a + b)

    console.log(summed)
  })
  .done()

const multiplyCommand = new CommandBuilder()
  .match(matchPrefixes("multiply "))
  .use(numberMiddleware)
  .use(context => {
    const { numbers } = context.state
    const multiplied = numbers.reduce((a, b) => a * b)

    console.log(multiplied)
  })
  .done()

          `}
        </Code>
        <Paragraph>
          The advantage of using middleware is that we can re-use code for specific
          situations like this one. Let's make our middleware even better by validating
          that the numbers passed are actual numbers:
        </Paragraph>
        <Code>
          {`
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

          `}
        </Code>
        <Paragraph>
          If you run your code again and input <InlineCode>sum i am a number</InlineCode>{" "}
          you should get the message{" "}
          <InlineCode>"Please specify a list of numbers separated by space."</InlineCode>
        </Paragraph>
      </Section>
    </>
  ),
}
