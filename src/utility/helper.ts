export const uniqueString = (): string => {
  const buf = new Uint8Array(1);
  window.crypto.getRandomValues(buf);
  return Date.now().toString(36) + buf[0].toString(36).substring(2);
};
