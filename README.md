<div align="center">
	<br/>
	<img src="./assets/logo.png"/>
	<br/>
</div>

## Inspiration

As we know, Evmos is the enviroment that has top-notch technology with high scability, leveraging interoperablity of the Cosmos network with Ethereum-based applications and assets. Taking avantages of the infrastructure of Evmos, we want to empower the strength of Evmos to the next level by creating our Optimistic rollup, whose name is: Bullet network!


## What is Bullet Network?

In the most abstract form, Bullet Network is a layer 2 network built on top of Evmos used for fast and cheap payments. That means it inherits all of Evmos's security and decentralization, while still being performant and scalable. Furthermore, we chose to make Bullet Network an optimistic rollup, which is a battle-tested and powerful technology for scaling up.


## Special technology of the Bullet Network - an Optimistic rollup

As a layer 2 network, Bullet Network functions by moving state data off-chain, but still keeps some data on-chain to inherit security from the layer 1 and keep generality, something that only rollups like Bullet Network can achieve in comparison to state channels and plasma chains.

Transactions in Bullet Network are highly compressed, weighing around 84 bytes per transaction. Periodically, they are packed into a `batch`, which are then stored on-chain along with a root from those transactions and a state root generated from the new state. Users will then transist state based on the transactions stored on-chain. To highly optimize the process, the batch is stored in `calldata`, which is much cheaper than storing in `storage`.

To prevent faulty batches from being submitted, Bullet Network utilizes a fraud proof system. Basically, when a bad batch is sent to the layer 1, special participants of the network called `validators` will then submit a fraud proof to revert the fraudulent state, punish the submitter and get some rewards for himself. A fraud proof would contain the old state of which authenticity is achieved by checking against the previous state root, then the contract would perform a state-replay and get the root of the new state. If the state root generated is not equal to the state root that was submitted before, then the batch is fraudulent.

But there would also be a limit for how batches can be submitted, if anyone can submit a batch, then the state will break casually, thus, we need another kind of participant to submit a batch which is called "sequencer". Sequencers will be the one to take the transactions and pack it in a batch which is later submitted on the L1.


## How efficient is Bullet Network?

Being an optimistic rollup, a Bullet Network's transaction only costs about 3000 gas, while a normal transaction would cost 21000, so that is a **seven-time** improvement in gas efficiency.


## How we built it

Conceptually, we first spent a hard time doing research, thinking of the possibilities, and then finally ended up with a simplified implementation of Bullet.

Technologically, thanks to Evmos's support for the EVM runtime environment, we can build Bullet's contracts using Solidity - a language that we are familiar with. In addition, we also used Javascript/Node.js to build the client and the RPC server for Bullet.


## Challenges we ran into

Layer 2s and rollups specifically are still fairly new technologies in the space which are still being developed and improved by top-notch researchers and engineers day-by-day, so it is already really hard for a small team of two people like us to bring out the best possible result, but we also had done the project in just four days.


## Accomplishments that we're proud of

Again, scaling in blockchain is not at all an easy task, and the complexity of rollups is even bigger. We are fascinated and proud because after all the hard work, we finally got an efficient, seven-time-cheaper-fee layer 2 network.


## What we learned

Through this hackathon, our team has learnt how to properly manage our time and workflow, as well as knowing how to work as a team.

In addition, we get to understand more about the Evmos ecosystem and the Cosmos ecosystem, and figured out ways to utilize it for our project.


## How we utilized the Evmos and Cosmos ecosystem

As mentioned above, with Evmos's EVM runtime environment, our smart contracts can be written using Solidity which we prefer most, so it helped our development experience fun and enjoyable.

But that's not all, being an already decentralized, fast, and efficient network, Evmos helps push Bullet Network's potential even further, which we believe is the greatest value we have gained building Bullet Network.


## Impacts on Evmos and Cosmos ecosystem

* Because Bullet Network is an optimistic rollup built on top of Evmos, it will help bring scalablity, speed and lower gas fee for Evmos while still maintaining its security and decentralization.
* Bullet Network runs on Evmos which leverages interoperability of Evmos with other chains in the Cosmos ecosystem, thus, further extends the capability of Cosmos in general. 
* In the future, hopefully we can integrate a contract runtime environment into Bullet to bring truly decentralized, secure, scalable dapps to Evmos and Cosmos.


## What's next for Bullet Network

We are looking forward to build contract runtime environment into Bullet, while further improve and optimize the network, so from that, we can bring cheap, efficient, scalable transfers not just on our network, but also on Evmos, leveraging performant transactions with high security and decentralization.


## Addresses to all of our necessary contracts:

* AddressManager (handle compressed L2 addresses): `0x1dd8c26e83C851b0A40dEFAe2e3dF879Bf00cD1d`
* BondManager (handle bonds from sequencers and validators): `0xD69A36a2629F10678c369E2c8B10688774B96BFb`
* TransactionChain (transaction chain for rollup): `0xA32c37Ecf4eEDB2912F1eba30c40eF672e2fa12b`
* L1Bridge (bridge between layer 1 and layer 2): `0x84E8F38A76B9E06f642d3D375520a7E2B31Cd5A4`
* StateCommitments (state commitment recorder): `0x1AdA1d74a363Ec16f9221473D7f601D04a1420ac`
* Prover (fraud proof prover protocol): `0xc8d9abE3B6e6418d804ce4B97274b93299DF4a37`
* BatchChallenge (fraud proof challenger protocol): `0xC2c3309E48ad6029f84ef820d9Ee6523bF813276`
