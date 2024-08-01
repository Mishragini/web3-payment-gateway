import Web3 from 'web3';
import axios from 'axios';
import { contractABI } from './abi';

const providerUrl = 'wss://sepolia.infura.io/ws/v3/ad5901471e624d9184d2fb17c51540a2'
const contractAddress = '0x97a8692ba9b8246Ff3913693EbE779BAA616eF31';
const webhookUrl = "https://your-dummy-fetch-url";

const web3 = new Web3(new Web3.providers.WebsocketProvider(providerUrl));
const contract = new web3.eth.Contract(contractABI, contractAddress);

contract.events.PaymentReceived({
    fromBlock: 0
})
    .on('data', async function (event) {
        console.log(`Adding user ${event.returnValues.email} to the course`);
        // axios.post(webhookUrl, {
        //     email: event.returnValues.email,
        // });

    })
