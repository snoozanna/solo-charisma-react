import "./styles/Header.css";

const Header = ({ connectionStatus }: { connectionStatus: string }) => {
  console.log(
    "playthroughContext.connectionStatus in header",
    connectionStatus,
  );
  return (
    <header>
      <h1>Signal Fire System</h1>
      <div
        className={`connectionStatus ${
          connectionStatus === "connected" ? "connected" : ""
        }`}
      ></div>
    </header>
  );
};

export default Header;
