import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.init";


const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        photoURL: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const validatePassword = (password) => {
        return /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!validatePassword(formData.password)) {
            setError("Password must include one uppercase, one lowercase letter, and be at least 6 characters.");
            return;
        }

        try {
            // 1. Create user in Firebase
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );
            const user = userCredential.user;

            // 2. Update Firebase profile
            await updateProfile(user, {
                displayName: formData.name,
                photoURL: formData.photoURL,
            });

            // 3. Save to DB & get JWT
            await processUserAndToken(user);

            setSuccessMessage("Successfully registered!");
            setFormData({ name: "", email: "", photoURL: "", password: "" });

            await auth.signOut(); 

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (err) {
            console.error("Register error:", err);
            setError("Registration failed. Please try again.");
        }
    };

    const processUserAndToken = async (user) => {
        const userData = {
            uid: user.uid,
            displayName: user.displayName || "Anonymous",
            email: user.email,
            photoURL: user.photoURL || "",
            role: "user",
        };

        try {
            // Save user to DB only
            await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });


        } catch (err) {
            console.error("DB error:", err);
            setError("Account created but server error occurred.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white p-6">
            <div className="bg-white text-black p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {successMessage && (
                    <p className="text-green-500 text-sm text-center">{successMessage}</p>
                )}
                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        value={formData.name}
                        className="w-full p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={formData.email}
                        className="w-full p-2 border rounded"
                        required
                        autoComplete="email"
                    />
                    <input
                        type="text"
                        name="photoURL"
                        placeholder="Photo URL (optional)"
                        onChange={handleChange}
                        value={formData.photoURL}
                        className="w-full p-2 border rounded"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            value={formData.password}
                            className="w-full p-2 border rounded"
                            required
                            autoComplete="new-password"
                        />
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
