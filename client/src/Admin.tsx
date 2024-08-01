import { useEffect, useState } from "react"
import Web3, { Address, Contract, ContractAbi } from "web3"

interface Payment {
    user: Address,
    email: string,
    amount: number
}

export const Admin = ({
    web3,
    courseContact
}: {
    web3: Web3 | null,
    courseContact: Contract<ContractAbi> | null
}) => {
    const [payments, setPayments] = useState<Payment[] | []>([]);
    const init = async () => {
        const values: Payment[] | undefined = await courseContact?.methods.getAllPayments().call();
        if (values)
            setPayments(values);
    }
    useEffect(() => {
        if (web3 && courseContact) {
            init();
        }
    }, [web3, courseContact])

    return (
        <div>
            <h1>Admin</h1>
            Total {payments.length} people have bought the course!
            {payments.map(payment => (
                <div key={payment.email}>
                    <p>Email: {payment.email}</p>
                </div>
            ))}
        </div>
    )
}