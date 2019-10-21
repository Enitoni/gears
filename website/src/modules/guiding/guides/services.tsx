import { Guide } from "../types/Guide"
import { SERVICE_CATEGORY } from "../constants"
import React from "react"
import { Paragraph } from "../../../common/markdown/components/Paragraph"
import { Section } from "../../../common/markdown/components/Section"

export const services: Guide = {
  slug: "service-introduction",
  category: SERVICE_CATEGORY,
  title: "Introduction to services",
  description: "An introduction on what services are and when to use them",
  render: () => (
    <>
      <Paragraph>
        In an advanced bot, you might want to store some state, run a task on an interval,
        or just listen to events. This is where services come in, they allow you to define
        stateful logic within your bot, which can be accessed from commands.
      </Paragraph>
      <Section title="When to use a service">
        <Paragraph>
          It may be a little confusing to know when to use a service, so here's a list of
          reasons to help you out. You should use a service when you want to...
        </Paragraph>
        <ul>
          <li>Persist data between commands</li>
          <li>Do something on an interval or listen to an event</li>
          <li>Consume a stateful API and interact with it using commands</li>
        </ul>
        <Paragraph>
          There might be other reasons why you would want to use a service, but these are
          the most common.
        </Paragraph>
      </Section>
    </>
  ),
}
