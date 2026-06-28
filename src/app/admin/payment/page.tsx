'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { ICustomer } from "@/app/customer/page"
import { IProduct } from "../product/page"
import { ITransaction } from "../transaction/page"
import Link from "next/link"

export interface IPayment {
    id: number
    status: string
    customerID: number
    productID: number
    transactionID: number
    customer: ICustomer
    product: IProduct
    transaction: ITransaction
}

export default function PaymentPage () {

    const [payments, setPayments] = useState<IPayment[]>([])

    const getData = async () => {
        try {
            const res = await api.get('payment/getALL')
            setPayments(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <h4>Data Payment</h4>
            <Link href={'/admin/payment/create'}>
                <button type="button" className="btn btn-primary">Tambah Payment</button>
            </Link>
            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>Status</td>
                        <td>Customer Name</td>
                        <td>Product</td>
                        <td>Price</td>
                        <td>Payment Method</td>
                    </tr>
                </thead>

                <tbody>
                    {payments.map(payment => {
                        return (
                            <tr key={payment.id}>
                                <td>{payment.status}</td>
                                <td>{payment.customer.username}</td>
                                <td>{payment.product.name}</td>
                                <td>{payment.product.price}</td>
                                <td>{payment.transaction.paymentMethod}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}