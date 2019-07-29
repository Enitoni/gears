import { createGzip, createDeflate } from "zlib"
import { Transform } from "stream"

export const BUILD_FOLDER = "./build"
export const BUILD_PUBLIC_FOLDER = "./build/public"

export const MAX_BODY_WIDTH = "1270px"
export const BODY_PADDING = "32px"

export const DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
export const IS_SERVER = process.env.__SERVER__ === "true"

export const SERVER_SUPPORTED_ENCODINGS = {
  gzip: createGzip,
  deflate: createDeflate,
  // Identity encoding means the browser doesn't accept above compression modes.
  // Creates a transform stream that doesn't transform anything
  identity: () =>
    new Transform({ transform: (data, _, callback) => callback(null, data) })
} as const

export const CANONICAL_HOST = "https://gears.enitoni.com"
