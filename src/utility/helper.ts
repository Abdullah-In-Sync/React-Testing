export const uniqueString = (): string => {
  const buf = new Uint8Array(1);
  if (typeof window !== "undefined") {
    window.crypto.getRandomValues(buf);
  }
  return Date.now().toString(36) + buf[0].toString(36).substring(2);
};

export const isAfter = ({ days = 1, date }) => {
  const noSpace = date.replace(/\s/g, "");
  if (noSpace.length < 3) {
    return true;
  }
  const patientCreateDate = new Date(date);
  return Date.now() > patientCreateDate.getTime() + 24 * days * 60 * 60 * 1000;
};
