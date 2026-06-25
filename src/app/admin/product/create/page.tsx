'use client'
import { api } from "@/lib/axios"
import React, { useEffect, useState } from "react"
import { showToast } from "@/app/components/toast/Toast"
import { useRouter } from "next/navigation"

export default function CreateProductPage () {

    const router = useRouter()
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState<File | null>(null)

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('type', type)
            formData.append('price', price.toString())

            if (!image) {
                showToast('Please Select Image', 'danger')
                return
            }

            formData.append('image', image)

            const res = await api.post('product/create', formData)
            showToast(res.data.message, 'success')
            router.push('/admin/product')
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        const fileSelected = e.target.files ? e.target.files[0] : null
        setImage(fileSelected)
    }

    return (
        <div>
            <h4>Input Product</h4>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Name</label>
                            <input 
                                type="text" 
                                name="name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Type</label>
                            <input 
                            type="text"
                            name="type"
                            className="form-control" 
                            onChange={(e) => setType(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Price</label>
                            <input 
                            type="number"
                            name="price"
                            className="form-control" 
                            onChange={(e) => setPrice(Number(e.target.value))}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Image</label>
                            <input 
                            type="file"
                            name="image"
                            className="form-control" 
                            onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}