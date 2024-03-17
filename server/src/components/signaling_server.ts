import express, { Express } from "express"; // Express.js for creating the HTTP server
import { Server as HttpServer } from "http"; // Node.js built-in HTTP module
import { Server as IOServer, Socket } from "socket.io"; // Socket.IO for real-time communication

// Create an Express application
const app: Express = express();

// Create an HTTP server using the Express application
const server: HttpServer = new HttpServer(app);

// Attach a Socket.IO server to the HTTP server
const io: IOServer = new IOServer(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});
// Simple in-memory storage for rooms
// This is an object where the keys are room IDs and the values are arrays of user IDs
const rooms: { [key: string]: string[] } = {};

// Set up an event listener for new Socket.IO connections
io.on("connection", (socket: Socket) => {
  // When a user wants to join a room
  socket.on("join-room", (roomId: string, userId: string) => {
    // If the room doesn't exist yet, create it
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // Add the user to the room
    rooms[roomId].push(userId); 
    socket.join(roomId);

    // Notify the room that a new user has connected
    socket.to(roomId).emit("user-connected", userId);
    socket.emit("connection-success", {
      message: "You have successfully connected to the room.",
    });
    console.log(`Connected succesfully ${roomId}, ${userId}`)

    // When the user disconnects
    socket.on("disconnect", () => {
      // Remove the user from the room
      const index = rooms[roomId].indexOf(userId);
      if (index !== -1) {
        rooms[roomId].splice(index, 1);
      }

      // Notify the room that the user has disconnected
      socket.to(roomId).emit("user-disconnected", userId);
    });

    // When the user wants to send a signal to another user
    socket.on("signal", (toId: string, signal: any) => {
      // Forward the signal to the intended recipient
      io.to(toId).emit("signal", userId, signal);
    });
  });
});

// Export the HTTP server, Socket.IO server, and Express application for use in other modules
export { server, io, app };
