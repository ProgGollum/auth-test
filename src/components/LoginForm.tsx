'use client'
import React, {FC, useContext, useState} from 'react';
import {useAuth} from "@/Context/AuthContext";
import {register} from "node:module";


const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const store = useAuth();

    return (
        <div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            <button onClick={() => store.login(email, password)}>Login</button>
            <button onClick={() => store.register(email, password)}>Registration</button>
        </div>
    );
};

export default LoginForm;