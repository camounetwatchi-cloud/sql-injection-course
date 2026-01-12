"use client";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [result, setResult] = useState<{ success: boolean; message: string; user?: unknown } | null>(null);
    const [loading, setLoading] = useState(false);
    const [queryPreview, setQueryPreview] = useState("");

    // Live SQL query preview (for educational purposes)
    const updateQueryPreview = (user: string, pass: string) => {
        const query = `SELECT * FROM users WHERE username = '${user}' AND password = '${pass}'`;
        setQueryPreview(query);
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
        updateQueryPreview(e.target.value, password);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        updateQueryPreview(username, e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            setResult(data);
        } catch {
            setResult({ success: false, message: "Connection error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h1 style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "0.5rem"
            }}>
                🔐 Sign In to CryptoVault
            </h1>
            <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
                Access your portfolio and manage your investments
            </p>

            {/* Hint Box */}
            <div className="card" style={{
                marginBottom: "2rem",
                background: "rgba(168, 85, 247, 0.1)",
                border: "1px solid rgba(168, 85, 247, 0.3)"
            }}>
                <h3 style={{ color: "#a855f7", marginBottom: "0.5rem" }}>🎓 Learning Mode Active</h3>
                <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
                    This login form is <strong>vulnerable to SQL Injection</strong>.
                    The query preview below shows exactly what SQL is being executed.
                    Can you bypass authentication?
                </p>
                <Link href="/course#exercise-1" style={{ color: "#00ff88" }}>
                    → View Exercise 1 for hints
                </Link>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="card">
                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        className="input-cyber"
                        placeholder="Enter your username"
                    />
                </div>

                <div style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}>
                        Password
                    </label>
                    <input
                        type="text" // Text instead of password for demo visibility
                        value={password}
                        onChange={handlePasswordChange}
                        className="input-cyber"
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: "100%" }}
                    disabled={loading}
                >
                    {loading ? "Authenticating..." : "Sign In →"}
                </button>
            </form>

            {/* Live SQL Query Preview */}
            <div className="terminal" style={{ marginTop: "2rem" }}>
                <div className="terminal-header">
                    <div className="terminal-dot red"></div>
                    <div className="terminal-dot yellow"></div>
                    <div className="terminal-dot green"></div>
                    <span style={{ marginLeft: "1rem", color: "#6b7280" }}>SQL Query Preview</span>
                </div>
                <pre style={{
                    margin: 0,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-all",
                    fontSize: "0.9rem"
                }}>
                    <span className="syntax-keyword">SELECT</span> * <span className="syntax-keyword">FROM</span> users{"\n"}
                    <span className="syntax-keyword">WHERE</span> username = <span className="syntax-string">&apos;{username}&apos;</span>{"\n"}
                    <span className="syntax-keyword">AND</span> password = <span className="syntax-string">&apos;{password}&apos;</span>
                </pre>
                {queryPreview.includes("'--") || queryPreview.includes("' OR ") ? (
                    <div style={{
                        marginTop: "1rem",
                        padding: "0.5rem",
                        background: "rgba(239, 68, 68, 0.2)",
                        borderRadius: "6px",
                        color: "#ef4444"
                    }}>
                        ⚠️ Potential injection detected!
                    </div>
                ) : null}
            </div>

            {/* Result Display */}
            {result && (
                <div
                    className={result.success ? "success-message" : "error-message"}
                    style={{ marginTop: "1.5rem" }}
                >
                    {result.success ? (
                        <>
                            <h3 style={{ marginBottom: "0.5rem" }}>✅ Authentication Successful!</h3>
                            <pre style={{
                                background: "rgba(0,0,0,0.3)",
                                padding: "1rem",
                                borderRadius: "8px",
                                fontSize: "0.85rem",
                                overflow: "auto"
                            }}>
                                {JSON.stringify(result.user, null, 2)}
                            </pre>
                            {result.user && typeof result.user === 'object' && 'is_admin' in result.user && result.user.is_admin && (
                                <div style={{
                                    marginTop: "1rem",
                                    padding: "1rem",
                                    background: "linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(168, 85, 247, 0.2))",
                                    borderRadius: "8px"
                                }}>
                                    🎉 <strong>You logged in as ADMIN!</strong> Excellent SQL Injection work!
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <h3>❌ Authentication Failed</h3>
                            <p>{result.message}</p>
                        </>
                    )}
                </div>
            )}

            {/* Common Payloads Reference */}
            <div className="card" style={{ marginTop: "2rem" }}>
                <h3 style={{ marginBottom: "1rem" }}>📋 Common SQL Injection Payloads</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                        { payload: "admin'--", desc: "Comment out password check" },
                        { payload: "' OR '1'='1", desc: "Always true condition" },
                        { payload: "' OR '1'='1'--", desc: "Always true + comment" },
                        { payload: "admin' OR '1'='1", desc: "Target specific user" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: "0.5rem",
                                background: "rgba(10, 10, 15, 0.5)",
                                borderRadius: "6px"
                            }}
                        >
                            <code style={{ color: "#00ff88" }}>{item.payload}</code>
                            <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
