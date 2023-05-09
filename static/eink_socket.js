window.onload = function () {
    console.log('Window loaded');

    // Establish a connection with the server
    const socket = io.connect("http://" + document.domain + ":" + location.port);

    // When the connection is established
    socket.on("connect", () => {
        console.log("Connected to the server");
    });

    // Function to handle both note updates and new notes
    function handleNoteEvent(data) {
        console.log("Received note event:", data);
        console.log("check what it is:", data);
    
        if (data.is_new) {
            console.log("Handling new note event");
            // Add the new note to the E-Ink board
            // This is just an example; adapt this code based on your actual HTML structure and note representation
            const noteBox = document.querySelector(`.eink-note-box[data-group-id="${data.group_id}"]`);
            if (noteBox) {
                const newNote = document.createElement("div");
                newNote.classList.add("eink-note");
                newNote.setAttribute("data-note-id", data.note_id);
                newNote.innerHTML = `
          <p><strong>${data.note_content}</strong></p>
          <span class="eink-note-details">${data.member_name} at ${data.date_created}</span>
        `;
                noteBox.appendChild(newNote);
            }
        } else {
            console.log("Handling note update event");
            // Update the note on the E-Ink board
            const noteElement = document.querySelector(`.eink-note[data-note-id="${data.note_id}"]`);
            if (noteElement) {
                noteElement.querySelector("strong").textContent = data.note_content;
            }
        }
    }    

    // Listen for note events from the server
    socket.on("note_update", (data) => {
        console.log("Received note_update event:", data);
        handleNoteEvent(data);
    });

    // Add a new note to the E-Ink board
    console.log('Setting up new_note listener');
    socket.on('new_note', (data) => {
        console.log('New note received', data);
        handleNoteEvent(data);
    });

    // Add logging for disconnect and reconnect events
    socket.on("disconnect", () => {
        console.log("Disconnected from the server");
    });

    socket.on("reconnect", () => {
        console.log("Reconnected to the server");
    });

    socket.on("reconnecting", (attempt) => {
        console.log("Attempting to reconnect to the server, attempt number:", attempt);
    });
};
