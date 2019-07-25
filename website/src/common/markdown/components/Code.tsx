import { styled } from "../../../modules/theming/themes"
import { getTransparency, getFontColor } from "../../../modules/theming/helpers"
import React, { useLayoutEffect } from "react"
import Prism from "prismjs"

const Container = styled.pre`
  & > code {
    position: relative;
    font-family: Fira Mono, monospace;
    font-size: 15px;
    line-height: 21px;
  }

  background: ${getTransparency("negative")};
  border-radius: 3px;

  padding: 24px;
  padding-left: 64px;

  .token.comment,
  .token.block-comment,
  .token.prolog,
  .token.doctype,
  .token.cdata {
    color: ${getFontColor("muted")};
  }

  .token.punctuation {
    color: ${getFontColor("muted")};
  }

  .token.tag,
  .token.attr-name,
  .token.namespace,
  .token.deleted {
    color: #e2777a;
  }

  .token.function-name {
    color: #6196cc;
  }

  .token.boolean,
  .token.number,
  .token.function {
    color: #f08d49;
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: #f8c555;
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: #cc99cd;
  }

  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: #7ec699;
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: #67cdcc;
  }

  .token.important,
  .token.bold {
    font-weight: bold;
  }

  .token.italic {
    font-style: italic;
  }

  .token.inserted {
    color: green;
  }

  .line-numbers-rows {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: -2.6em;
    width: 2em;

    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span:before {
    content: counter(linenumber);
    color: ${getTransparency("positive")};
    display: block;
    padding-right: 0.6em;
    text-align: right;
  }
`

export function Code(props: { children: string }) {
  useLayoutEffect(() => {
    Prism.highlightAll()
  }, [props.children])

  return (
    <Container className="language-typescript line-numbers">
      <code>{props.children}</code>
    </Container>
  )
}
