import moment from "moment";
import { Meeting } from "../models/meeting.model";

export const getFormatedValue = (key: keyof Meeting, item: Meeting) => {
    if (item[key as keyof Meeting]) {
      switch (key) {
        case "fromDateTime":
          return moment.unix(item[key]).format("MM/DD/YYYY HH:MM");
        case "toDateTime":
          return moment.unix(item[key]).format("MM/DD/YYYY HH:MM");
        default:
          return item[key as keyof Meeting];
      }
    }
    return "";
};