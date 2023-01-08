<div align="center">
	<br/>
	<img src="./assets/logo.png"/>
	<br/>
</div>

## What is Bullet Network?

Bullet Network is a layer 2 network built on top of BSC used for fast and cheap payments. That means it inherits all of BSC's security and decentralization, while still being performant and scalable. Furthermore, we chose to make Bullet Network an optimistic rollup, which is a battle-tested and powerful technology for scaling up.


## The unique technology of Bullet Network

Bullet Network has decentralized sequencers, which is more secure and decentralized than in other rollups. We already have a "decentralized sequencers mechanism", while other rollup projects are still relying on a centralized group of sequencers to function, which is not secure and might be endangered if the centralized sequencer suddenly goes offline, or is taken over by malicious actors holding funds for hostage. 

Being censorship-resistant, Bullet Network is more gas-efficient and scalable than other rollups. By having decentralized sequencers, transactions on our network are always censorship-resistant, while other rollups have to rely on complex approaches to prevent censorship such as manual forced withdraws to layer 1 or transacting directly through layer 1, which makes the gas fee higher than the layer 1’s fee and lose the purpose of having rollup in the first place.


## An example of gas efficiency in Bullet Network

According to our tests, a Bullet Network's transaction only costs about 3000 gas, while a normal transaction would cost 21000, so that is a seven-time improvement in gas efficiency.


## Technology explained

As a layer 2 network, Bullet Network functions by moving state data off-chain but still keeps some data on-chain to inherit security from layer 1 and keep generality, something that only rollups like Bullet Network can achieve in comparison to state channels and plasma chains.

Transactions in Bullet Network are highly compressed, weighing around 84 bytes per transaction. Periodically, they are packed into a batch, which is then stored on-chain along with a root from those transactions and a state root generated from the new state. Users will then transit state based on the transactions stored on-chain. To highly optimize the process, the batch is stored in calldata, which is much cheaper than storing in storage. Batches can be submitted by a class of nodes called "sequencers".

To prevent faulty batches from being submitted, Bullet Network utilizes a fraud proof system. Basically, when a bad batch is sent to the layer 1, special participants of the network called validators will then submit a fraud proof to revert the fraudulent state, punish the submitter and get some rewards for himself. A fraud proof would contain the old state of which authenticity is achieved by checking against the previous state root, then the contract would perform a state-replay and get the root of the new state. If the state root generated is not equal to the state root that was submitted before, then the batch is fraudulent.

With our decentralized sequencer system, anyone can become a sequencer, process transactions, and submit batches in Bullet Network. This brings great censorship-resistance, security and scalability.



## Impacts on the BSC ecosystem

Because Bullet Network is an optimistic rollup built on top of BSC, it helps bring scalable and cheaper transactions for BSC while still maintaining its security and decentralization. 

Bullet helps the blockchain industry scale along with BSC and acts as a great optimistic counterpart of zkBNB - a new zk rollup for BSC.

In the future, hopefully, we can integrate a contract runtime environment into Bullet to bring truly decentralized, secure, scalable dapps.

## What's next for Bullet Network

We are looking forward to further improving and optimizing Bullet Network, so from that, we can bring cheap, efficient, scalable transfers not just on our network, but also on BSC, leveraging performant transactions with high security and decentralization.

