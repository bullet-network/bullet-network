// Bad RPC server implementation, will be updated soon.

"use strict";

const fastify = require("fastify")();

const { isNumber } = require("../utils/utils");

function rpc(PORT, stateDB, sigDB, batchDB, contracts, client, transactionHandler, deposit, withdraw) {

    const [ addressManager, l1Bridge ] = contracts; 

    process.on("uncaughtException", err => console.log("LOG ::", err));

    fastify.post("/", async (req, reply) => {
        function throwError(message, status, payload = null) {
            reply.status(status);

            reply.send({
                success: false,
                payload: null,
                error: { message }
            });
        }

        function respond(payload) {
            reply.send({
                success: true,
                payload
            })
        }

        if (typeof req.body.params !== "object") {
            throwError("Invalid method.", 404);

            return;
        }

        switch (req.body.params.method) {

            case "get_balance":

                if ((await stateDB.keys().all()).includes(req.body.params.address)) {
                    respond(await stateDB.get(req.body.params.address));
                } else {
                    throwError("Invalid address.", 404);
                }

                break;
            
            case "bridge_deposit":
                const depositAmount = req.body.params.amount;
            
                if (
                    typeof depositAmount === "string"            &&  
                    isNumber(depositAmount)                      &&
                    (await signer.getBalance()) >= depositAmount
                ) {
                    await deposit(BigInt(depositAmount), l1Bridge);
                } else {
                    throwError(null);
                }

                break;
            
            case "bridge_withdraw":
                const withdrawAmount = req.body.params.amount;
            
                if (
                    typeof withdrawAmount === "string"                    &&  
                    isNumber(withdrawAmount)                              &&
                    (await stateDB.get(client.address)) >= withdrawAmount
                ) {
                    await withdraw(BigInt(withdrawAmount), l1Bridge);
                } else {
                    throwError(null);
                }
                
                break;

            case "send_transaction":

                if (await transactionHandler(
                    req.body.params.tx,
                    client.sequencerURL,
                    req.body.params.sig,
                    stateDB,
                    sigDB,
                    addressManager,
                    client.chainInfo.transactionPool
                )) {
                    respond(null);
                } else {
                    throwError("Failed to process transaction.", null);
                }

                break;
            
            case "get_client_address":

                respond(client.address);

                break;
            
            case "get_batch_sigs":

                if ((await batchDB.keys().all()).includes(req.body.params.batchIndex)) {
                    const batch = (await batchDB.get(batchIndex));

                    const sigs = [];

                    for (const tx in batch) {
                        sigs.push(await sigDB.get(tx));
                    }

                    respond(sigs);
                } else {
                    throwError("Failed to find batch.", null);
                }

                break;
                

            default:
                throwError("Invalid method.", 404);
        }
    });

    fastify.listen(PORT, (err, address) => {
        if (err) {
            console.log("LOG :: Error at RPC server: Fastify: ", err);
            process.exit(1);
        }

        console.log(`LOG :: RPC server running on PORT ${PORT}`);
    });
}

module.exports = rpc;
