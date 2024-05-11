import { Message } from "./Message";
import { User } from "./User";

export class Discussion{
    id:number=0;
    Date:Date;
    status:string;
    idMe:number;
    idOtherUser:number;
    me:User;
    OtherUser:User;
    messages:Message[];
}
