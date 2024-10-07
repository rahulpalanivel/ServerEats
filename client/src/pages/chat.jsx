import io from "socket.io-client";
try {
  const socket = io.connect("http://localhost:3030");
} catch (e) {
  console.log("Message" + e.message());
}

const chat = () => {
  const sendMessage = () => {
    //socket.emit();
    //console.log(socket.id);
  };
  return (
    <div>
      <h1>Hello</h1>
      <input />
      <button onClick={sendMessage}>Send message</button>
    </div>
  );
};

export default chat;
