import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as AuthService from "@/api/AuthService"
import { useAuthStore } from "@/store/useAuthStore"

const LoginPage = () => {

    const [form, setForm] = useState({ emailOrUsername: "", password: "", rememberMe: false })
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const response = await AuthService.login({ username: form.emailOrUsername, email: form.emailOrUsername, password: form.password })
            const { token, user } = response
            const remember = form.rememberMe // pastikan ini boolean dari checkbox

            // Simpan ke store
            useAuthStore.getState().login(token, user, remember)

            navigate("/")
        } catch (err) {
            console.error(err)
            alert("Error logging in")
        }
    }
    return (
        <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gradient-to-b from-[#090909] to-[#232323]">
            <img className="max-w-2xl" src="/logo.png" alt="" />
            <div className="flex flex-col w-full max-w-xl text-white">
                <label className="font-ethos text-white">Email or Username</label>
                <Input className="mb-8 p-6 w-full rounded-full bg-white font-ethos border-transparent focus:border-transparent focus-visible:ring-0 font-light text-black ring-0 border-0 outline-0 focus:ring-0 focus:border-0"
                    placeholder="What do you want to play today?"
                    name="emailOrUsername"
                    value={form.emailOrUsername}
                    onChange={handleChange} />
                <label className="font-ethos text-white">Password</label>
                <Input type="password" className="mb-1 p-6 w-full rounded-full bg-white font-ethos border-transparent focus:border-transparent focus-visible:ring-0 font-light text-black ring-0 border-0 outline-0 focus:ring-0 focus:border-0"
                    placeholder="What do you want to play today?"
                    name="password"
                    value={form.password}
                    onChange={handleChange} />
                <div className="flex w-full justify-between font-ethos text-sm mb-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="remember"
                            name="rememberMe"
                                />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember Me
                        </label>
                    </div>
                    <Link to={'/login'}>Forgot Password?</Link>
                </div>
                <div className="flex w-full justify-end mb-8">
                    <Button
                        onClick={handleLogin}
                        type="submit"
                        className="px-8 py-4 bg-white hover:bg-white/80 cursor-pointer rounded-full text-black font-ethos font-black"
                    >
                        Login
                    </Button>
                </div>
                <div className="flex flex-col mx-auto w-full max-w-md gap-4">
                    <Button className="relative px-8 py-6 bg-white hover:bg-white/80 cursor-pointer rounded-full text-black font-ethos font-black">
                        <img className="absolute inset-3.5" src="/google.svg" alt="" />
                        Login with Google
                    </Button>
                    <Button className="relative px-8 py-6 bg-white hover:bg-white/80 cursor-pointer rounded-full text-black font-ethos font-black">
                        <img className="absolute inset-3.5" src="/facebook.svg" alt="" />Login with Facebook</Button>
                    <Button className="relative px-8 py-6 bg-white hover:bg-white/80 cursor-pointer rounded-full text-black font-ethos font-black">
                        <img className="absolute inset-3.5" src="/discord.svg" alt="" />Login with Discord</Button>
                    <div className="flex justify-end">
                        <Link className="font-ethos mb-4" to={'/register'}>Don't Have an Account?</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage