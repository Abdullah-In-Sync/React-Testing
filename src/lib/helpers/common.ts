import Cookies from "js-cookie";
import { env } from "./../env";
export const Link = Cookies.get("rootUrl")
  ? "https://" + Cookies.get("rootUrl")
  : env.v1.rootUrl;
export const msToTime = (duration: number) => {
  const milliseconds: string | number = Math.floor((duration % 1000) / 100);
  let seconds: string | number = Math.floor((duration / 1000) % 60),
    minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
    hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + "" + minutes + "" + seconds + "" + milliseconds;
};
