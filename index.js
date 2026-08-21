import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";

async function startGodemXMD() {

  console.log("");
  console.log("╔══════════════════════════════╗");
  console.log("║        GODEM X MD            ║");
  console.log("║      Starting engine...      ║");
  console.log("╚══════════════════════════════╝");
  console.log("");

  const { state, saveCreds } =
    await useMultiFileAuthState("auth");

  const sock = makeWASocket({

    auth: state,

    logger: pino({
      level: "silent"
    }),

    printQRInTerminal: false

  });


  sock.ev.on(
    "creds.update",
    saveCreds
  );


  sock.ev.on(
    "connection.update",
    ({ connection }) => {

      if (connection === "connecting") {

        console.log(
          "🔄 GODEM X MD is connecting..."
        );

      }

      if (connection === "open") {

        console.log("");
        console.log(
          "✅ GODEM X MD CONNECTED!"
        );
        console.log(
          "🚀 Engine is running."
        );
        console.log("");

      }

      if (connection === "close") {

        console.log(
          "❌ Connection closed."
        );

      }

    }
  );

}

startGodemXMD();
