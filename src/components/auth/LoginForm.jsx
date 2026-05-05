import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from '../../services/api';

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.login(email, password);
      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "Login failed");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <h1
        className="mb-8 font-sans text-xl font-bold leading-tight tracking-normal text-foreground"
      >
        Welcome back
      </h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="email" className="block font-sans text-sm font-medium leading-5 tracking-normal text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full max-w-xl h-[42px] rounded-lg border border-gray-300 bg-background pl-[10px] pr-1 py-[3px] text-sm text-foreground placeholder:text-muted-foreground placeholder:text-sm placeholder:leading-5 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block font-sans text-sm font-medium leading-5 tracking-normal text-foreground">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••••"
            className="w-full max-w-xl h-[42px] rounded-lg border border-gray-300 bg-background pl-[10px] pr-1 py-[3px] text-sm text-foreground placeholder:text-muted-foreground placeholder:text-sm placeholder:leading-5 placeholder:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
          />
        </div>

        <label className="flex items-center gap-2 font-sans text-sm font-medium leading-none tracking-normal text-muted-foreground select-none cursor-pointer align-middle">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded-[4px] border-[0.5px] border-gray-300 bg-gray-50 text-primary focus:ring-2 focus:ring-ring"
          />
          Remember me
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-xl h-10 gap-2 rounded-lg bg-primary px-5 py-2.5 font-sans text-sm font-medium leading-5 tracking-normal text-primary-foreground hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

