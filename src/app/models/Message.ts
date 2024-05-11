import { Discussion } from "./Discussion";
import { User } from "./User";

export class Message{
  id:number=0;
  object:string;
  content:string;
  vu:boolean;
  date:Date;
  otherUserName:string;
  idMe:number;
  idOtherUser:number;
  idDiscussion:number;
  me:User;
  otherUser:User;
  Discussion:Discussion
}
