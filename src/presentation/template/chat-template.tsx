import { useState } from "react";
import { GPTMessage } from "../components/chatBubbles/GPTMessage";
import { MyMessage } from "../components/chatBubbles/MyMessage";
import { TextMessageBox } from "../components/chatInputBoxes/TextMessageBox";
import { TypingLoader } from "../components/loaders/TypingLoader";

interface Message {
  text: string;
  isGPT: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((previous) => [...previous, { text: text, isGPT: false }]);

    // TODO: USECASE

    setIsLoading(false);

    //TODO: AÑADIR MSG DE ISGPT EN TRUE
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correciones" />

          {messages.map((message, index) =>
            // el index aquí no se debe poner nunca como key pero...
            message.isGPT ? (
              <GPTMessage key={index} text="OpenAI text" />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader className="fade-in" />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeHolder="Type anything"
        disableCorrections
      />
    </div>
  );
};
