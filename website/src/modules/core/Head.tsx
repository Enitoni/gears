import React from "react"

const IMPORTED_CHARACTERS = "ABCDEFGHIKLMNOPQRSTUVXYZabcdefghiklmnopqrstuvxyz"

export function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1" />
      <title>Gears</title>
      <link
        href="https://fonts.googleapis.com/css?family=Barlow+Semi+Condensed:700&display=swap&text=Gears"
        rel="stylesheet"
      />
      <link
        href={`https://fonts.googleapis.com/css?family=Barlow:400,600,700&display=swap&text=${IMPORTED_CHARACTERS}`}
        rel="stylesheet"
      />
    </>
  )
}
