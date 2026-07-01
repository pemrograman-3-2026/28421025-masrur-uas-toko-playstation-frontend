'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { showToast } from "@/app/components/toast/Toast";

export interface IProduct {
    id: number
    name: string 
    type: string 
    price: string 
    image: string
}

export default function ProductPage () {

    const [products, setProducts] = useState<IProduct[]>([])
    
    const getData = async () => {
        try {
            const res = await api.get('product/getALL')
            setProducts(res.data as IProduct[])
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
                const res = await api.delete(`product/delete/${id}`)
                showToast(res.data.message, 'success')
                getData()
            } catch (error: any) {
                showToast(error.response.data.message, 'danger')
            }
        }
    }

    return (
        <div>
            <h4>Data Product</h4>
            <Link href={'/admin/product/create'}>
                <button type="button" className="btn btn-primary">Tambah Product</button>
            </Link>

            <table className="table mt-4 table-hover">
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Type</td>
                        <td>Price</td>
                        <td>Image</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.type}</td>
                                <td>{product.price}</td>
                                <td>
                                    <Image width={100} height={100} src={`${baseURL}/image/${product.image}`} alt="" unoptimized/>
                                </td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button onClick={() => deleteData(product.id)} type="button" className="btn btn-danger">Delete</button>
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