import { useState } from "react";
import { GPTMessage } from "../../components/chatBubbles/GPTMessage";
import { MyMessage } from "../../components/chatBubbles/MyMessage";
// import { TextMessageBox } from "../../components/chatInputBoxes/TextMessageBox";
import { TypingLoader } from "../../components/loaders/TypingLoader";
import { TextMessageBoxWithSelect } from "../../components/chatInputBoxes/TextMessageBoxWithSelect";

interface Message {
  text: string;
  isGPT: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    const newMsg = `Traduce: "${text}" al idioma ${selectedOption}`;

    setMessages((previous) => [...previous, { text: newMsg, isGPT: false }]);

    // TODO: USECASE

    setIsLoading(false);

    //TODO: AÑADIR MSG DE ISGPT EN TRUE
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GPTMessage text="Aquí puedes traducir todo lo que quireas!" />

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
      <TextMessageBoxWithSelect
        onSendMessage={handlePost}
        placeHolder="Type anything"
        options={languages}
      />
    </div>
  );
};
