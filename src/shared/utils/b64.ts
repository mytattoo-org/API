const bufferToB64 = (file?: Buffer) =>
  file ? Buffer.from(file).toString('ascii') : undefined

const b64ToBuffer = (file: string) =>
  file ? Buffer.from(file, 'binary') : undefined

export { bufferToB64, b64ToBuffer }
