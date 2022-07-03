const bufferToB64 = (file?: any) =>
  file ? Buffer.from(file).toString('ascii') : file

const b64ToBuffer = (file: string) =>
  file ? Buffer.from(file, 'binary') : file

export { bufferToB64, b64ToBuffer }
