import {
  SpeechRecognitionResponse,
  SpeechRecognitionStarted,
  SpeechRecognitionStopped,
  useConversation,
  usePlaythroughContext,
} from "@charisma-ai/react";
import RecordingSwitch from "./RecordingSwitch";
import MessagesView from "./MessagesView";
import Header from "./Header";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import RecordingIndicator from "./RecordingIndicator";

type ConversationViewProps = {
  conversationUuid: string | undefined;
  startGraphReferenceId: string | undefined;
};

const ConversationView = ({
  conversationUuid,
  startGraphReferenceId,
}: ConversationViewProps) => {
  const [service, setService] = useState<string>("");
  const playthroughContext = usePlaythroughContext();
  const playthrough = playthroughContext?.playthrough;

  const { messages, start, inputValue, reply, type } = useConversation({
    conversationUuid,
  });
  console.log("messages", messages);
  const handleSpeechRecognitionResponse = (
    speechRecognitionResponse: SpeechRecognitionResponse,
  ) => {
    if (speechRecognitionResponse.isFinal) {
      reply({ text: speechRecognitionResponse.text });
      type("");
    } else {
      type(speechRecognitionResponse.text);
    }
  };

  const handleSpeechRecognitionStarted = (
    speechRecognitionStarted: SpeechRecognitionStarted,
  ) => {
    setService(speechRecognitionStarted.service);
  };

  const handleSpeechRecognitionStopped = (
    speechRecognitionStopped: SpeechRecognitionStopped,
  ) => {
    setService("");
  };

  useEffect(() => {
    playthrough?.on(
      "speech-recognition-result",
      handleSpeechRecognitionResponse,
    );
    playthrough?.on(
      "speech-recognition-started",
      handleSpeechRecognitionStarted,
    );
    playthrough?.on(
      "speech-recognition-stopped",
      handleSpeechRecognitionStopped,
    );
    return () => {
      playthrough?.off(
        "speech-recognition-result",
        handleSpeechRecognitionResponse,
      );
      playthrough?.off(
        "speech-recognition-started",
        handleSpeechRecognitionStarted,
      );
      playthrough?.off(
        "speech-recognition-stopped",
        handleSpeechRecognitionStopped,
      );
    };
  }, [playthrough]);

  if (!conversationUuid) {
    return <div>Getting Conversation...</div>;
  }
  if (playthroughContext?.connectionStatus !== "connected") {
    return <div>Connecting...</div>;
  }
  console.log(
    "playthroughContext.connectionStatus",
    playthroughContext.connectionStatus,
  );
  return (
    <>
      <Header connectionStatus={playthroughContext.connectionStatus} />
      <div className="convoWrapper">
        {messages.length ? (
          <div className="messagesWrapper">
            <MessagesView messages={messages} />
          </div>
        ) : (
          <div className="startWrapper">
            <span className=" button-wrapper">
              <button onClick={() => start({ startGraphReferenceId })}>
                Start
              </button>
            </span>
          </div>
        )}
      </div>
      <Footer
        service={service}
        inputValue={inputValue}
        type={type}
        reply={reply}
      />
    </>
  );
};

export default ConversationView;
