import { useState } from "react";
import PlaySetup from "./PlaySetup";
import { LOCAL_STORAGE_KEY, PlayParameters } from "./PlayParameters";
import MyChat from "./MyChat";
import ConeyChat from "./ConeyChat";
import "./styles/generics.css";
import "./styles/App.css";
import Header from "./Header";
import Footer from "./Footer";

// const apiKey = process.env.REACT_APP_CHARISMA_API_KEY;
const apiKey = "c562e6a0-1f1e-4d91-8bc4-ac78408d14a8";

const emptyParameters: PlayParameters = {
  storyId: 27575,
  version: 2,
  startGraphReferenceId: "Interview",
  charismaUrl: "https://play.charisma.ai",
};

const emptyParametersString = JSON.stringify(emptyParameters);

function App() {
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [conversationParameters, setConversationParameters] = useState(
    JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY) || emptyParametersString,
    ) as PlayParameters,
  );
  // console.log("conversationParameters", conversationParameters);

  const sufficientParameters = conversationParameters.storyId;
  // console.log("sufficientParameters", sufficientParameters);
  // console.log("confirmed", confirmed);
  // console.log("apiKey", apiKey);

  return (
    <div className="App">
      <div className="appContainer">
        {!apiKey ? "Please set your API key" : null}
        {sufficientParameters && !confirmed && apiKey ? (
          <>
            <Header connectionStatus="" />
            <span className="button-wrapper">
              <button onClick={() => setConfirmed(true)}>Confirm</button>
            </span>
            <footer />
          </>
        ) : null}

        {confirmed ? (
          <ConeyChat
            conversationParameters={conversationParameters}
            apiKey={apiKey}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
