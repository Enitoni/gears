import { styled } from "../../../modules/theming/themes"
import { getTransparency, getSyntaxColor } from "../../../modules/theming/helpers"
import React from "react"
import Prism from "prismjs"
import { IS_SERVER } from "../../../modules/core/constants"
import { CONTENT_BREAKPOINT } from "./Content"

if (IS_SERVER) {
  // Don't remove trailing slash, doesn't work without for whatever reason.
  const loadLanguages = eval("require")("prismjs/components/")
  loadLanguages(["typescript"])
}

const Container = styled.pre`
  position: relative;

  white-space: pre-wrap;
  word-break: break-word;

  font-family: Fira Mono, monospace;
  font-size: 15px;
  line-height: 21px;

  background: ${getSyntaxColor("background")};
  border-radius: 3px;

  padding: 24px;
  padding-left: 64px;

  @media ${CONTENT_BREAKPOINT} {
    margin-left: -32px;
    margin-right: -32px;
    border-radius: 0px;

    padding: 32px;
    font-size: 14px;

    .line-numbers-rows {
      display: none;
    }
  }

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
    top: 24px;
    left: 24px;
    width: 24px;

    user-select: none;
  }

  .line-numbers-rows > span {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  .line-numbers-rows > span::before {
    word-break: keep-all;
    content: counter(linenumber);
    color: ${getSyntaxColor("lineNumber")};
    display: block;
    padding-right: 0.6em;
    text-align: right;
  }
`

export function Code(props: { children: string }) {
  const code = props.children.trim()
  const html = Prism.highlight(code, Prism.languages.typescript, "typescript")

  const lineCount = code.split("\n").length
  const lines = Array(lineCount)
    .fill("<span></span>")
    .join("")

  const withLineNumbers =
    html + `<span aria-hidden="true" class="line-numbers-rows">${lines}</span>`

  return (
    <code>
      <Container dangerouslySetInnerHTML={{ __html: withLineNumbers }} />
    </code>
  )
}
