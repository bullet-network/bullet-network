const { RPC_PORT, ENABLE_SEQUENCER, ENABLE_RPC } = require("./config.json");

const { startServer } = require("./src/client/server");

(async () => {
    await startServer({ RPC_PORT, ENABLE_SEQUENCER, ENABLE_RPC });
})();
