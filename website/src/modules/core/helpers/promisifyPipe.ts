export const promisifyPipe = (from: NodeJS.ReadableStream, to: NodeJS.WritableStream) =>
  new Promise<void>((resolve, reject) => {
    from.on("data", chunk => to.write(chunk))
    from.on("end", resolve)
    from.on("error", reject)
  })
