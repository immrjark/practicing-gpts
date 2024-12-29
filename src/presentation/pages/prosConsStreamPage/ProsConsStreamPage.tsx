import { useState } from "react";
import { GPTMessage } from "../../components/chatBubbles/GPTMessage";
import { MyMessage } from "../../components/chatBubbles/MyMessage";
import { TextMessageBox } from "../../components/chatInputBoxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { prosConsStreamUseCase } from "../../../core/useCases/prosConsStream.useCase";

interface Message {
  text: string;
  isGPT: boolean;
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((previous) => [...previous, { text: text, isGPT: false }]);

    // TODO: USECASE
    const reader = await prosConsStreamUseCase(text);
    // setIsLoading(false);

    if (!reader) return alert("Error en la comparación");
    // Generar el último msg
    const decoder = new TextDecoder("utf-8");
    let msgs = "";
    setMessages((mssgs) => [...mssgs, { text: msgs, isGPT: true }]);

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      msgs += decodedChunk;

      // esto sirve para actualizar el último mensaje y que no se siga propagando
      setMessages((mssgs) => {
        const newMsgs = [...mssgs];
        newMsgs[newMsgs.length - 1].text = msgs;
        return newMsgs;
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessage text="Qué deseas comparar? 😌" />

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
