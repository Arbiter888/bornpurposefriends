import { Character } from "@/lib/characters";
import { Message } from "./chat";

export interface ChatState {
  messages: Message[];
  newMessage: string;
  isLoading: boolean;
}

export interface ChatActions {
  setNewMessage: (message: string) => void;
  handleSendMessage: (character: Character | Character[]) => Promise<void>;
}

export interface UseChatResult extends ChatState, ChatActions {}