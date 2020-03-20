import { Guide } from "../types/Guide"
import { SERVICE_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../../docs/components/ModuleLinkMarkup"
import { Code } from "../../../common/markdown/components/Code"
import { Alert } from "../../../common/markdown/components/Alert"
import { InlineCode } from "../../../common/markdown/components/InlineCode"

export const usingService: Guide = {
  slug: "using-service",
  category: SERVICE_CATEGORY,
  title: "Using the service",
  description: "How to use a service within middleware",
  render: () => (
    <>
      <Paragraph>Now that you've created a service, let's use it in a command.</Paragraph>
      <Paragraph>
        To use a service within middleware use the <InlineCode>manager</InlineCode>{" "}
        property on the <ModuleLinkMarkup>[[Context]]</ModuleLinkMarkup> like so:
      </Paragraph>
      <Code>
        {`
const myService = context.manager.getService(MyService)
        `}
      </Code>
      <Paragraph>
        Note that we pass the <InlineCode>MyService</InlineCode> class, not a string. This
        is important because it makes it possible to be typesafe with TypeScript.
      </Paragraph>
      <Paragraph>Now, we can get the count from the service:</Paragraph>
      <Code>
        {`
const command = new Command()
  .match(matchPrefixes("count"))
  .use((context) => {
    const myService = context.manager.getService(MyService)

    console.log(\`The count is \${myService.count}\`)
  })

// Input: "count"
// Output: "The count is 0"
        `}
      </Code>
      <Section title="Adding a method">
        <Paragraph>Let's add a method to the service to increment the count.</Paragraph>
        <Code>
          {`
class MyService extends Service {
  serviceDidInitialize() {
    this.count = 0
  }

  increment() {
    this.count += 1
  }
}
          `}
        </Code>
        <Paragraph>
          And now we can use this to increment the count in our command:
        </Paragraph>
        <Code>
          {`
const command = new Command()
  .match(matchPrefixes("count"))
  .use((context) => {
    const myService = context.manager.getService(MyService)

    myService.increment()
    console.log(\`The count is \${myService.count}\`)
  })

// Input: "count"
// Output: "The count is 1"

// Input: "count"
// Output: "The count is 2"

// Input: "count"
// Output: "The count is 3"
          `}
        </Code>
      </Section>
    </>
  ),
}
