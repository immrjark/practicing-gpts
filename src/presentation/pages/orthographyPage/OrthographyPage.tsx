import { useState } from "react";
import { GPTMessage } from "../../components/chatBubbles/GPTMessage";
import { MyMessage } from "../../components/chatBubbles/MyMessage";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBox } from "../../components/chatInputBoxes/TextMessageBox";
import { orthographyCheckUseCase } from "../../../core/useCases/orthography.useCase";
import { GPTOrthographyMsg } from "../../components/chatBubbles/GPTOrthographyMsg";

interface Message {
  text: string;
  isGPT: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((previous) => [...previous, { text: text, isGPT: false }]);

    // TODO: USECASE
    const data = await orthographyCheckUseCase(text);
    if (data.ok) {
      setMessages((previous) => [
        ...previous,
        {
          text: "No se puedo realizar la corrección. Inténtalo más tarde.",
          isGPT: true,
        },
      ]);
    } else {
      setMessages((previous) => [
        ...previous,
        {
          text: data.message,
          isGPT: true,
          info: {
            errors: data.errors,
            userScore: data.userScore,
            message: data.message,
          },
        },
      ]);
    }

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
              <GPTOrthographyMsg
                key={index}
                errors={message.info!.errors}
                message={message.info!.message}
                userScore={message.info!.userScore}
              />
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
        desableCorrections
      />
    </div>
  );
};
