export interface Theme {
  colors: {
    primary: string
    accent: string
  }
  fontColors: {
    normal: string
    muted: string
  }
  syntaxColors: {
    background: string
    keyword: string
    primitive: string
    function: string
    class: string
    operator: string
    comment: string
    lineNumber: string
  }
  transparencies: {
    positive: string
    negative: string
  }
  durations: {
    normal: string
  }
}
