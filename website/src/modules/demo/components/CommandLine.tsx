import { styled } from "../../theming/themes"
import { CONTENT_BREAKPOINT } from "../../../common/markdown/components/Content"
import { getSyntaxColor, getColor, getFontColor } from "../../theming/helpers"
import { darken } from "polished"
import React, { useRef, useState, FormEvent, useLayoutEffect } from "react"

export interface CommandLineEntry {
  content: string
  type: "input" | "response"
}

export interface CommandLineProps {
  entries: CommandLineEntry[]
  onLine: (message: string) => void
}

const Container = styled.div`
  padding: 0px 24px;

  @media ${CONTENT_BREAKPOINT} {
    margin: 0px -32px;
  }
`

const Entries = styled.div`
  margin: 0px -24px;
  padding: 24px;
  padding-bottom: 0px;

  background: ${getSyntaxColor("background")};
  border-radius: 3px;
  overflow-y: auto;

  max-height: 270px;

  @media ${CONTENT_BREAKPOINT} {
    border-radius: 0px;
  }

  ::after {
    content: "";
    display: block;

    height: 38px;
  }
`

const Line = styled.div<{ response: boolean }>`
  font-family: Fira Mono, monospace;
  font-size: 1em;

  & ~ div {
    margin-top: 8px;
  }

  color: ${({ response, theme }) =>
    response ? theme.colors.accent : theme.syntaxColors.comment};

  ::before {
    content: ${props => (props.response ? `"«"` : `"»"`)};
    display: inline-block;
    margin-right: 8px;
  }
`

const Input = styled.input`
  position: relative;

  font-size: 1em;
  font-family: Fira Mono, monospace;

  display: block;

  padding: 8px;
  margin-top: -24px;

  background: ${props => darken(0.05, props.theme.colors.primary)};
  border: solid 3px ${getColor("primary")};
  border-radius: 6px;

  width: 100%;
  color: ${getFontColor("normal")};

  outline: none;

  &::placeholder {
    color: ${getSyntaxColor("comment")};
  }
`

export function CommandLine(props: CommandLineProps) {
  const { entries, onLine } = props

  const entryRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState("")

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    onLine(value)
    setValue("")
  }

  useLayoutEffect(() => {
    const { current: element } = entryRef

    if (element) {
      element.scrollTo(0, element.scrollHeight)
    }
  }, [entries.length])

  return (
    <Container>
      <Entries ref={entryRef}>
        {entries.map((entry, i) => (
          <Line response={entry.type === "response"} key={i}>
            {entry.content}
          </Line>
        ))}
      </Entries>
      <form onSubmit={submit}>
        <Input
          aria-label="input"
          placeholder="Type a message"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    </Container>
  )
}
