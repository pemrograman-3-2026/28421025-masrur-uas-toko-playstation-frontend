'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { ICustomer } from "@/app/customer/page"

export interface ITransaction {
    id: number
    amount: string
    paymentMethod: string
    transactionDate: string
    customerID: number
    customer: ICustomer
}

export default function TransactionCustomerPage () {

    const [transactions, setTransactions] = useState<ITransaction[]>([])

    const getData = async () => {
        try {
            const res = await api.get('transaction/getALL')
            setTransactions(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Payment Method</td>
                        <td>Transaction Date</td>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => {
                        return (
                            <tr key={transaction.id}>
                                <td>{transaction.customer.username}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.paymentMethod}</td>
                                <td>{transaction.transactionDate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}