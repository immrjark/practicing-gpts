import { useState } from "react";
import { GPTMessage } from "../../components/chatBubbles/GPTMessage";
import { MyMessage } from "../../components/chatBubbles/MyMessage";
import { TextMessageBox } from "../../components/chatInputBoxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { prosConsUseCase } from "../../../core/useCases/prosCons.useCase";

interface Message {
  text: string;
  isGPT: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((previous) => [...previous, { text: text, isGPT: false }]);

    // TODO: USECASE
    const data = await prosConsUseCase(text);
    const { ok, content } = data;
    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [...prev, { text: content, isGPT: true }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessage text="Puedes escribir aquello que compare para darte mis puntos de vista." />

          {messages.map((message, index) =>
            // el index aquí no se debe poner nunca como key pero...
            message.isGPT ? (
              <GPTMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
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
