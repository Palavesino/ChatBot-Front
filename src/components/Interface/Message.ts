import { OptionMessage } from "../Enum/OptionMessage";
import { TypeMessage } from "../Enum/TypeMessage";

export interface Message {
    id: string;
    name: string;
    body: string;
    typeMessage: TypeMessage | string;
    option: OptionMessage | string;
    childMessages: Message[] | null
}