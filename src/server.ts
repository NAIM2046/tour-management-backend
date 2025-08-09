import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";


let server: Server;
const startServer = async () => {
   try {
      await mongoose.connect(envVars.DB_URL)
      console.log("connected to DB!!")
      server = app.listen(envVars.PORT, () => {
         console.log(`Server is listening to port ${envVars.PORT}`);
      })
   } catch (err) {
      console.log(err)
   }
}
startServer()
process.on("unhandledRejection", (err) => {
   console.log("unhandledRejection ...........", err)
   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }
   process.exit(1);
})

process.on("uncaughtException", (err) => {
   console.log("uncaughtException...........", err)
   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }
   process.exit(1);
})
process.on("SIGTERM", () => {
   console.log(" SIGTERM signal recieved  ...........")
   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }
   process.exit(1);
})

process.on("SIGINT", () => {
   console.log("  SIGINT   signal off ...........")
   if (server) {
      server.close(() => {
         process.exit(1);
      })
   }
   process.exit(1);
})