'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import Image from "next/image"
import { IProduct } from "../admin/product/page"

export interface ICustomer {
    id: number
    username: string
    address: string
    noTelp: string
    created_at: string
    updated_at: string
}


export default function DashboardCustomer () {

    const [products, setProducts] = useState<IProduct[]>([])

    const getData = async () => {
        try {
            const res = await api.get('product/getALL')
            setProducts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 col-sm-6 col-xs-12">
                        <div className="card">
                            <Image
                                unoptimized
                                alt=""
                                src={`${baseURL}/image/${product.image}`}
                                width={300}
                                height={200}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.type}</p>
                                <p className="card-text">{product.price}</p>
                                <div className="d-flex gap-1">
                                    <button className="btn btn-success">Beli</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}