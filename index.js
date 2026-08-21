import http from "http";
import makeWASocket, {
  useMultiFileAuthState
} from "@whiskeysockets/baileys";

import pino from "pino";

const PORT = process.env.PORT || 3000;

// Simple web server for Render
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/plain; charset=utf-8"
  });

  res.end("GODEM X MD is alive 🚀");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on port ${PORT}`);
});


async function startGodemXMD() {

  console.log("");
  console.log("╔══════════════════════════════╗");
  console.log("║          GODEM X MD          ║");
  console.log("║       Starting engine...     ║");
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
        console.log("🔄 GODEM X MD is connecting...");
      }

      if (connection === "open") {
        console.log("");
        console.log("✅ GODEM X MD CONNECTED!");
        console.log("🚀 Engine is running.");
        console.log("");
      }

      if (connection === "close") {
        console.log("❌ WhatsApp connection closed.");
      }
    }
  );
}

startGodemXMD().catch((error) => {
  console.error("❌ GODEM X MD failed to start:");
  console.error(error);
});
