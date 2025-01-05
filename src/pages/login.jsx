import React, { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3333/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login: email, password: password }),
            });

            if (!response.ok) {
                throw new Error("Невірний логін або пароль");
            }

            const data = await response.json();
            localStorage.setItem("token", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            alert("Логін успішний!");
        } catch (error) {
            console.error(error);
            alert(error.message || "Щось пішло не так");
        }
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin}>
                <h2>Логін</h2>
                <input
                    type="text"
                    placeholder="Login"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Увійти</button>
            </form>
        </div>
    );
}
