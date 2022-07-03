const bufferToB64 = (file: string) => {
  Buffer.from(file).toString('ascii')
}

const b64ToBuffer = (file: string) => {
  Buffer.from(file, 'binary')
}

export { bufferToB64, b64ToBuffer }
