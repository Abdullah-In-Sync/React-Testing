type SessionObject = {
  label: string;
  value: string;
};

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

export const getSessionOptions = (): SessionObject[] => {
  const tempSession = [{ value: "start", label: "Start" }];
  for (let i = 1; i <= 50; i++) {
    tempSession.push({ value: i.toString(), label: `Session ${i}` });
  }
  return tempSession;
};

export const getfiterObject = (
  arrObj: SessionObject[],
  filterValue: string
): SessionObject => {
  if (filterValue) return arrObj.find((item) => item.value == filterValue);
  else return {} as SessionObject;
};
