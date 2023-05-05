// Establish a connection with the server
const socket = io.connect("http://" + document.domain + ":" + location.port);

// When the connection is established
socket.on("connect", () => {
  console.log("Connected to the server");
});

// Listen for updates from the server
socket.on("note_update", (data) => {
  console.log("Received note update:", data);

  // Update the note on the E-Ink board
  // This is just an example; adapt this code based on your actual HTML structure and note representation
  const noteElement = document.getElementById(`note-${data.note_id}`);
  if (noteElement) {
    noteElement.textContent = data.note_content;
  }
});

// Listen for new notes from the server
socket.on("new_note", (data) => {
  console.log("Received new note:", data);

  // Refresh the page to show the new note
  const noteElement = document.getElementById(`note-${data.note_id}`);
  if (noteElement) {
    noteElement.textContent = data.note_content;
  }
});
