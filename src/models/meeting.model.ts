export interface Meeting {
  _id: string,
  visitorType: string;
  visitorName: string;
  mobileNumber: number;
  emailId: string;
  gender: string;
  bloodGroup: string;
  visitorStatus: string;
  meetingStatus: string;
  toMeet: string;
  fromDateTime: number;
  toDateTime: number;
}