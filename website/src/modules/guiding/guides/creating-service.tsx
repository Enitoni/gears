import { Guide } from "../types/Guide"
import { SERVICE_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"
import { ModuleLinkMarkup } from "../../docs/components/ModuleLinkMarkup"
import { Code } from "../../../common/markdown/components/Code"
import { Alert } from "../../../common/markdown/components/Alert"
import { InlineCode } from "../../../common/markdown/components/InlineCode"

export const creatingService: Guide = {
  slug: "creating-service",
  category: SERVICE_CATEGORY,
  title: "Creating a service",
  description: "A quick and simple example of a service",
  render: () => (
    <>
      <Paragraph>
        To create a service, simply import the{" "}
        <ModuleLinkMarkup>[[Service]]</ModuleLinkMarkup> class from your binding library
        of choice, and define a class extending the service.
      </Paragraph>
      <Code>
        {`
const { Service } = require("your-gears-binding-library")

class MyService extends Service {
  
}
        `}
      </Code>
      <Paragraph>
        Now you've defined a service called "MyService". In order to actually use the
        service, you'll need to add it to the bot, which can be done like so:
      </Paragraph>
      <Code>
        {`
const bot = new Bot({
  adapter, services: [MyService]
})
        `}
      </Code>
      <Alert type="warning">
        Do not instantiate the service using the "new" keyword when passing it to the bot,
        simply pass the class. This is because services are instantiated automatically by
        the bot's <ModuleLinkMarkup>[[ServiceManager]]</ModuleLinkMarkup>
      </Alert>
      <Paragraph>
        Now you can access the service via the{" "}
        <ModuleLinkMarkup>
          [[ServiceManager]] on [[Context]] within [[Middleware]].
        </ModuleLinkMarkup>
      </Paragraph>
      <Section title="Service hooks">
        <Paragraph>
          During a service's lifecycle, certain hooks are called depending on the state of
          the bot. These are necessary for things like timers and events.
        </Paragraph>
        <Paragraph>
          Check out the{" "}
          <ModuleLinkMarkup>
            [[Service]] class in the docs for a detailed list of each hook and what it
            does.
          </ModuleLinkMarkup>
          <br />
          Let's use the initialization hook to set some initial state.
        </Paragraph>
        <Code>
          {`
class MyService extends Service {
  serviceDidInitialize() {
    this.count = 0
  }
}
          `}
        </Code>
        <Paragraph>
          This will set a new property called "count" on the service right after calling{" "}
          <InlineCode>.start()</InlineCode> on the bot.
        </Paragraph>
      </Section>
    </>
  ),
}
