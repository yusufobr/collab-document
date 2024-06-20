const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const documentRoute = require("./routes/document.route");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const Document = require("./models/document.model.js");

// initialize constants
const PORT = process.env.PORT || 3000;
const ORIGIN = "https://loquacious-kitsune-eee948.netlify.app";

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api/document", documentRoute);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ORIGIN,
    methods: ["GET", "POST"],
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected", socket.id);

  // Get document
  socket.on("get-document", async (documentId) => {
    const document = await findOrCreateDocument(documentId);
    socket.join(documentId);

    // Add user to the document's online users
    if (!onlineUsers[documentId]) {
      onlineUsers[documentId] = [];
    }
    onlineUsers[documentId].push(socket.id);

    // Notify all users in the document about the updated online users
    io.to(documentId).emit("update-online-users", onlineUsers[documentId]);

    // Load document
    socket.emit("load-document", document);

    // Listen for changes
    socket.on("send-changes", (delta) => {
      socket.broadcast.to(documentId).emit("receive-changes", delta);
    });

    // Save document
    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(documentId, {
        data: data.data,
        title: data.title,
      });
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);

      // Remove user from the document's online users
      if (onlineUsers[documentId]) {
        onlineUsers[documentId] = onlineUsers[documentId].filter(
          (id) => id !== socket.id
        );
        // Notify all users in the document about the updated online users
        io.to(documentId).emit("update-online-users", onlineUsers[documentId]);
      }
    });
  });
});

// Find or create a document
const findOrCreateDocument = async (id) => {
  if (id == null) return;

  const document = await Document.findById(id);
  if (document) return document;

  return await Document.create({ _id: id, data: "", title: "New Document"});
};

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
