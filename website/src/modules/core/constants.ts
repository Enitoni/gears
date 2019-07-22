export const BUILD_FOLDER = "./build"
export const BUILD_PUBLIC_FOLDER = "./build/public"

export const MAX_BODY_WIDTH = "1230px"
export const BODY_PADDING = "16px"

export const DEVELOPMENT = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
export const IS_SERVER = process.env.__SERVER__ === "true"
