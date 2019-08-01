import { Guide } from "../types/Guide"
import { BASIC_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../../docs/components/ModuleLinkMarkup"
import { Code } from "../../../common/markdown/components/Code"
import { commandTree } from "../diagrams"
import { Diagram } from "../components/Diagram"
import { Alert } from "../../../common/markdown/components/Alert"
import { ExternalLink } from "../../../common/navigation/components/ExternalLink"
import { Subsection } from "../../../common/markdown/components/Subsection"

export const understandingGears: Guide = {
  slug: "understanding-gears",
  category: BASIC_CATEGORY,
  title: "Understanding Gears",
  description: "How Gears works under the hood",
  render: () => (
    <>
      <Paragraph>
        Before we get started, you should know how Gears works as it will make it easier
        to use the library. Don't worry if you can't understand this page right away. You
        can come back to it after reading the other guides if you are confused.
      </Paragraph>
      <Section title="The adapter">
        <Paragraph>
          <ModuleLinkMarkup>
            The [[ClientAdapter]] is what makes Gears work with any messaging interface.
            It works by exposing "hooks" that are called by the client when a message or
            any other event occurs. These hooks then trigger the internals inside a
            [[Bot]] which sends the message through the tree.
          </ModuleLinkMarkup>
        </Paragraph>
        <Paragraph>
          Here's an example of the adapter from the{" "}
          <ExternalLink to="https://discord.js.org/#/">Discord.js</ExternalLink> bindings:
        </Paragraph>
        <Code>
          {`
class Adapter extends ClientAdapter {
  register(options, hooks) {
    const { token, listenToSelf, ...clientOptions } = options
    const client = new Discord.Client(clientOptions)

    client.on("message", message => {
      if (client.user.id !== message.author.id || listenToSelf) {
        hooks.message(message)
      }
    })

    client.on("ready", hooks.ready)
    client.on("resume", hooks.ready)
    client.on("disconnect", hooks.unready)
    client.on("error", hooks.error)

    return {
      client,
      methods: {
        start: async () => {
          await client.login(token)
        },
        getMessageContent: (message: Message) => message.content
      }
    }
  }
}
          `}
        </Code>
      </Section>
      <Section title="The command tree">
        <Paragraph>
          <ModuleLinkMarkup>
            When you define your bot using [[Command]] and [[CommandGroup]], you are
            creating a tree which will be traversed upon a message.
          </ModuleLinkMarkup>
          <br />
          Here's an example:
        </Paragraph>
        <Code>
          {`
const a = new Command({
  matcher: matchPrefixes("a"),
  ...
})

const b = new Command({
  matcher: matchPrefixes("b"),
  ...
})

const c = new Command({
  matcher: matchPrefixes("c"),
  ...
})

const group = new CommandGroup({
  matcher: matchPrefixes("!"),
  commands: [a, b]
})

const bot = new Bot({ commands: [group, c] })
            `}
        </Code>
        <Alert type="note">
          Be aware that the order is important. If for example "group" also matched on the
          prefix "c", the "c" command would never fire because the group is tested before
          it.
        </Alert>
        <Paragraph>This example would produce the following tree:</Paragraph>
        <Diagram name="commandTree" />
        <Subsection title="Traversing the tree">
          <Paragraph>
            <ModuleLinkMarkup>
              When a message is sent, the tree is traversed. During this process, a
              [[Chain]] is created. A chain is a list of [[CommandLike]] along with the
              [[Context]] at the point it was matched. With the above example in mind, if
              we sent a message like "!b", the tree would get traversed like this (from
              left to right):
            </ModuleLinkMarkup>
          </Paragraph>
          <Diagram name="traversedDiagram" />
          <Paragraph>
            Once the tree is traversed, the generated chain looks like this:
          </Paragraph>
          <Diagram name="chain" />
          <Paragraph>
            When the chain has been generated, the middleware inside each entry in the
            chain will be composed and executed, which brings us to...
          </Paragraph>
        </Subsection>
      </Section>
      <Section title="Middleware">
        <Paragraph>
          <ModuleLinkMarkup>[[Middleware]]</ModuleLinkMarkup> in Gears is heavily inspired
          by <ExternalLink to="https://koajs.com/">Koa.js</ExternalLink>, so if you
          understand that, this should be easy too.
          <br />
          <br />
          When the chain is being executed, the middleware will be sequentially executed
          in the order of the chain, along with its context. With our example, this means
          that the middleware in "group" will be executed, then "b".
          <br />
          <br />
          Understanding how <ModuleLinkMarkup>[[Context]]</ModuleLinkMarkup> works in a
          chain is very important. When a list of middleware in a chain is executed, it is
          executed with the resulting context that the matcher returned at that point.
        </Paragraph>
        <Subsection title="Example">
          <Paragraph>
            Imagine that in this example, the message sent was "An interesting message".
          </Paragraph>
          <Code>
            {`
const a = new CommandBuilder()
  .match(matchPrefix("a"))
  // The callback in .use is our middleware
  .use((context) => {
    console.log(context.content)
    // The above log would be "n interesting message"
    // because the matcher removes the prefixed word from content.
  })
              `}
          </Code>
        </Subsection>
      </Section>
    </>
  ),
}
