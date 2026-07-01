'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { ICustomer } from "@/app/customer/page"
import Link from "next/link"
import { showToast } from "@/app/components/toast/Toast"

export interface ITransaction {
    id: number
    amount: string
    paymentMethod: string
    transactionDate: string
    customerID: number
    customer: ICustomer
}

export default function TransactionPage () {

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

    const deleteData = async (id: number) => {
            const isAgree = confirm('Are your sure?')
    
            if (isAgree) {
                try {
                    const res = await api.delete(`transaction/delete/${id}`)
                    showToast(res.data.message, 'success')
                    getData()
                } catch (error: any) {
                    showToast(error.response.data.message, 'danger')
                }
            }
        }

    return (
        <div>
            <h4>Data Transaction</h4>
            <Link href={'/admin/transaction/create'}>
                <button type="button" className="btn btn-primary">Tambah Transaction</button>
            </Link>
            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Payment Method</td>
                        <td>Transaction Date</td>
                        <td>Action</td>
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
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => deleteData(transaction.id)} type="button" className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}