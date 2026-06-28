'use client'
import { showToast } from "@/app/components/toast/Toast"
import { ICustomer } from "@/app/customer/page"
import { api } from "@/lib/axios"
import React, { useEffect, useState } from "react"

export default function CreateTransactionPage () {

    const [amount, setAmount] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('')
    const [customerID, setCustomerID] = useState('')
    const [customers, setCustomers] = useState<ICustomer[]>([])

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

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const res = await api.post('transaction/create', {
                amount,
                paymentMethod,
                customerID
            })
            showToast(res.data.message, 'success')
        } catch (error: any) {
            showToast(error.response.data.message, 'danger')
        }
    }

    return (
        <div>
            <h4>Input Transaction</h4>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label small fw-semibold">Amount</label>
                    <input 
                    type="text"
                    name="amount"
                    className="form-control form-control-sm py-2"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold">paymentMethod</label>
                    <input 
                    type="text"
                    name="paymentMethod"
                    className="form-control form-control-sm py-2"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)} 
                    />
                </div>
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
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </div>
    )
}