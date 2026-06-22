'use client'

import { api } from "@/lib/axios";
import Link from "next/link";
import React, { useState } from "react";
import { showToast } from "../components/toast/Toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const router = useRouter()

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    try {
      const res = await api.post('admin/register', {
            username,
            password,
        })
        showToast(res.data.message, 'success')
        router.push('/')
    } catch (error: any) {
        showToast(error.response.data.message, 'danger')
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div
        className="card border-0 shadow"
        style={{ width: "100%", maxWidth: "400px", borderRadius: "12px" }}
      >
        <div className="card-body p-4 p-md-5">
          <div className="d-flex align-items-center justify-content-center flex-column">
            <h5 className="fw-bold mb-1">Register</h5>
            <p className="text-muted small mb-4">Silahkan Daftar Terlebih Dahulu</p>
          </div>

          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-semibold">Username</label>
              <input
                type="text"
                name="username"
                className="form-control form-control-sm py-2"
                placeholder="Masukkan Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                className="form-control form-control-sm py-2"
                placeholder="Masukkan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-muted small mt-4 mb-0">
            Sudah punya akun?
          </p>
          <Link href={'/'}>
            <button
              type="button"
              className="btn w-100 py-2 text-white fw-semibold"
              style={{ background: "#1e2a3a", borderRadius: "8px" }}
            >
              Masuk
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
