import { z } from "zod"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import * as AuthService from "@/api/AuthService"

const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match"
})

const RegisterPage = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const result = registerSchema.safeParse(form)
        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {}
            result.error.errors.forEach((err) => {
                if (err.path.length) {
                    fieldErrors[err.path[0] as string] = err.message
                }
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})

        try {
            const response = await AuthService.register({
                username: form.username,
                email: form.email,
                password: form.password
            })

            navigate("/login")
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 422) {
                    setErrors({
                        email: error.response.data.message || "Email or username already taken"
                    })
                    return
                }
                alert(error.response.data.message || "Registration failed")
            } else {
                console.error(error)
                alert("Network error or server not responding")
            }
        }

    }

    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-b from-[#090909] to-[#232323] font-ethos">
            <img className="max-w-2xl" src="/logo.png" alt="" />
            <form onSubmit={handleRegister} className="flex flex-col w-full max-w-xl text-white">
                <label className="font-ethos">Username</label>
                <Input name="username" value={form.username} onChange={handleChange} className="mb-1 p-6 w-full rounded-full bg-white text-black" placeholder="Your Username" />
                {errors.username && <span className="text-red-400 text-sm mb-2">{errors.username}</span>}

                <label className="font-ethos">Email</label>
                <Input name="email" value={form.email} onChange={handleChange} className="mb-1 p-6 w-full rounded-full bg-white text-black" placeholder="Your Email" />
                {errors.email && <span className="text-red-400 text-sm mb-2">{errors.email}</span>}

                <label className="font-ethos">Password</label>
                <Input type="password" name="password" value={form.password} onChange={handleChange} className="mb-1 p-6 w-full rounded-full bg-white text-black" placeholder="Create Password" />
                {errors.password && <span className="text-red-400 text-sm mb-2">{errors.password}</span>}

                <label className="font-ethos">Confirm Password</label>
                <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} className="mb-1 p-6 w-full rounded-full bg-white text-black" placeholder="Confirm Password" />
                {errors.confirmPassword && <span className="text-red-400 text-sm mb-4">{errors.confirmPassword}</span>}

                <div className="flex justify-end mb-8">
                    <Button type="submit" className="px-8 py-4 bg-white text-black font-black rounded-full">Register</Button>
                </div>

                <div className="flex justify-end">
                    <Link className="font-ethos text-sm" to="/login">Already have an account?</Link>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
