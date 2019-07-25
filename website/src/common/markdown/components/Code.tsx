import { styled } from "../../../modules/theming/themes"
import { getTransparency, getSyntaxColor } from "../../../modules/theming/helpers"
import React from "react"
import Prism from "prismjs"
import { IS_SERVER } from "../../../modules/core/constants"

if (IS_SERVER) {
  // Don't remove trailing slash, doesn't work without for whatever reason.
  const loadLanguages = eval("require")("prismjs/components/")
  loadLanguages(["typescript"])
}

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
  .token.punctuation {
    color: ${getSyntaxColor("comment")};
  }

  .token.function-name,
  .token.function {
    color: ${getSyntaxColor("function")};
  }

  .token.property,
  .token.class-name,
  .token.constant,
  .token.symbol {
    color: ${getSyntaxColor("class")};
  }

  .token.selector,
  .token.important,
  .token.atrule,
  .token.keyword,
  .token.builtin {
    color: ${getSyntaxColor("keyword")};
  }

  .token.boolean,
  .token.number,
  .token.string,
  .token.char,
  .token.attr-value,
  .token.regex,
  .token.variable {
    color: ${getSyntaxColor("primitive")};
  }

  .token.operator,
  .token.entity,
  .token.url {
    color: ${getSyntaxColor("operator")};
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

  .line-numbers-rows > span::before {
    content: counter(linenumber);
    color: ${getSyntaxColor("lineNumber")};
    display: block;
    padding-right: 0.6em;
    text-align: right;
  }
`

export function Code(props: { children: string }) {
  const html = Prism.highlight(props.children, Prism.languages.typescript, "typescript")

  const lineCount = props.children.split("\n").length
  const lines = Array(lineCount)
    .fill("<span></span>")
    .join("")

  const withLineNumbers =
    html + `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`

  return (
    <Container className="language-typescript line-numbers">
      <code dangerouslySetInnerHTML={{ __html: withLineNumbers }} />
    </Container>
  )
}
