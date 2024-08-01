import { useState } from "react"
import Web3, { Contract, ContractAbi } from "web3"

export const CourseRegistration = ({
    web3,
    courseFee,
    courseContact
}: {
    web3: Web3 | null,
    courseFee: string,
    courseContact: Contract<ContractAbi> | null
}) => {
    const [email, setEmail] = useState('');
    const payForCourse = async () => {
        if (!web3 || !courseContact) return;

        const accounts = await web3.eth.getAccounts();
        courseContact.methods.payForCourse(email).send({ from: accounts[0], value: web3.utils.toWei(courseFee, 'ether') })
            .on('transactionHash', hash => {
                console.log('Transaction hash:', hash);
            })
            .on('receipt', receipt => {
                console.log('Transaction successful:', receipt);
            })
            .on('error', error => {
                console.error('Error:', error);
            });
    }

    return (
        <div>
            gm
            Buy Course
            <br />
            <h1>Course Registration</h1>
            <p>Course Fee: {courseFee} ETH</p>
            <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={payForCourse}>Pay for Course</button>
        </div>
    )
}