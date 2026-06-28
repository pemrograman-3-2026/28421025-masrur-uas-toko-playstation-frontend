'use client'
import { showToast } from "@/app/components/toast/Toast"
import { ICustomer } from "@/app/customer/page"
import { api } from "@/lib/axios"
import React, { useEffect, useState } from "react"
import { IProduct } from "../../product/page"
import { ITransaction } from "../../transaction/page"

export default function CreatePaymentPage () {

    const [customerID, setCustomerID] = useState('')
    const [customers, setCustomers] = useState<ICustomer[]>([])
    const [productID, setProductID] = useState('')
    const [products, setProducts] = useState<IProduct[]>([])
    const [transactionID, setTransactionID] = useState('')
    const [transactions, setTransactions] = useState<ITransaction[]>([])

    const getCustomer = async () => {
        try {
            const res = await api.get('customer/getALL')
            setCustomers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCustomer()
    }, [])

    const getProduct = async () => {
        try {
            const res = await api.get('product/getALL')
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    const getTransaction = async () => {
        try {
            const res = await api.get('transaction/getALL')
            setTransactions(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTransaction()
    }, [])

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('payment/create', {
                customerID,
                productID,
                transactionID
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            showToast(error.response.data.message, 'danger')
        }
    }

    return (
        <div>
            <h4>Input Payment</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                        <label className="form-label small fw-semibold">Customer</label>
                        <select 
                        name="customerID" 
                        className="form-control"
                        onChange={(e) => setCustomerID(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value={""}>Select Customer</option>
                            {customers.map(customer => {
                                return (
                                    <option 
                                        key={customer.id}
                                        value={customer.id}
                                    >
                                        {customer.username}
                                    </option>
                                )
                            })}
                        </select>
                </div>
                <div className="mb-3">
                        <label className="form-label small fw-semibold">Product</label>
                        <select 
                        name="productID" 
                        className="form-control"
                        onChange={(e) => setProductID(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value={""}>Select Product</option>
                            {products.map(product => {
                                return (
                                    <option 
                                        key={product.id}
                                        value={product.id}
                                    >
                                        {product.name}
                                    </option>
                                )
                            })}
                        </select>
                </div>
                <div className="mb-3">
                        <label className="form-label small fw-semibold">Payment Method</label>
                        <select 
                        name="transactionID" 
                        className="form-control"
                        onChange={(e) => setTransactionID(e.target.value)}
                        defaultValue={""}
                        >
                            <option disabled value={""}>Select Payment Method</option>
                            {transactions.map(transaction => {
                                return (
                                    <option 
                                        key={transaction.id}
                                        value={transaction.id}
                                    >
                                        {transaction.paymentMethod}
                                    </option>
                                )
                            })}
                        </select>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}