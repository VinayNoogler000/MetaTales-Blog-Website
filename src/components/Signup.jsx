import React, { useState } from "react";
import {Logo, Input, Button} from "./index";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import authService from "../appwrite/auth";
import {login as storeLogin} from "../store/authSlice"
import { useDispatch } from "react-redux";

export default function Signup() {
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();

    const signup = async (data) => {
        setErr("");
        try{
            const session = await authService.createAccount(data);
            if (session) {
                const userData = await authService.getCurrUser();
                if (userData) dispatch(storeLogin(userData));
                navigate('/');
            }
        }
        catch(err) {
            setErr(err.message);
        }
    }

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
            </div>
            
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            
            <p className="mt-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                    Sign in
                </Link>
            </p>

            {err && <p className="text-red-600 mt-8 text-center">{err}</p>}

            <form onSubmit={handleSubmit(signup)}>
                <div className="space-y-5">
                    <Input label="Name: " type="text" placeholder="Enter Your full name" {...register("name", { required: true })} />

                    <Input label="Email: " type="email" placeholder="Enter Your email address" {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address", 
                        }
                    })} />
                    
                    <Input label="Password: " type="password" placeholder="Enter Your password" {...register("password", { required: true })} />

                    <Button type="submit" className="w-full">Create Account</Button>
                </div>
            </form>
        </div>
    );
}