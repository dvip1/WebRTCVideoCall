import { server, io, app } from "./components/signaling_server";
import { Request, Response } from "express";
const cors = require("cors");
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Restrict to your frontend origin
};
app.use(cors(corsOptions));
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
server.listen(port, () => console.log(`Server listening on port ${port}!`));
