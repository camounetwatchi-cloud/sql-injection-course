"use client";
import { useState } from "react";
import Link from "next/link";

interface SearchResult {
    username?: string;
    email?: string;
    secret_name?: string;
    secret_value?: string;
    [key: string]: unknown;
}

export default function SearchPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [queryPreview, setQueryPreview] = useState("");

    const updateQueryPreview = (term: string) => {
        const query = `SELECT username, email FROM users WHERE username LIKE '%${term}%'`;
        setQueryPreview(query);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        updateQueryPreview(e.target.value);
    };

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
            const data = await response.json();

            if (data.success) {
                setResults(data.results);
            } else {
                setError(data.message || "Search failed");
                setResults([]);
            }
        } catch {
            setError("Connection error");
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h1 style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                marginBottom: "0.5rem"
            }}>
                🔍 Search Users
            </h1>
            <p style={{ color: "#a1a1aa", marginBottom: "2rem" }}>
                Find other CryptoVault members and view their public profiles
            </p>

            {/* Hint Box */}
            <div className="card" style={{
                marginBottom: "2rem",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)"
            }}>
                <h3 style={{ color: "#ef4444", marginBottom: "0.5rem" }}>🎯 Challenge Mode</h3>
                <p style={{ color: "#a1a1aa", fontSize: "0.9rem" }}>
                    This search is <strong>vulnerable to UNION-based SQL Injection</strong>.
                    The query returns 2 columns. Can you extract data from other tables?
                </p>
                <p style={{ color: "#6b7280", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                    💡 Hint: There&apos;s a table called <code style={{ color: "#a855f7" }}>admin_secrets</code> with columns
                    <code style={{ color: "#a855f7" }}> secret_name</code> and <code style={{ color: "#a855f7" }}>secret_value</code>
                </p>
                <Link href="/course#exercise-3" style={{ color: "#00ff88" }}>
                    → View Exercise 3 for UNION Attack tutorial
                </Link>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="card" style={{ marginBottom: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="input-cyber"
                        placeholder="Search for a username..."
                        style={{ flex: 1 }}
                    />
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? "Searching..." : "Search"}
                    </button>
                </div>
            </form>

            {/* Live SQL Query Preview */}
            <div className="terminal" style={{ marginBottom: "2rem" }}>
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
                    <span className="syntax-keyword">SELECT</span> username, email <span className="syntax-keyword">FROM</span> users{"\n"}
                    <span className="syntax-keyword">WHERE</span> username <span className="syntax-keyword">LIKE</span> <span className="syntax-string">&apos;%{searchTerm}%&apos;</span>
                </pre>
                {searchTerm.toLowerCase().includes("union") && (
                    <div style={{
                        marginTop: "1rem",
                        padding: "0.5rem",
                        background: "rgba(0, 255, 136, 0.2)",
                        borderRadius: "6px",
                        color: "#00ff88"
                    }}>
                        🎯 UNION keyword detected - attempting data extraction!
                    </div>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="error-message" style={{ marginBottom: "1.5rem" }}>
                    <h3>❌ Error</h3>
                    <p>{error}</p>
                </div>
            )}

            {/* Results Display */}
            {results.length > 0 && (
                <div className="card">
                    <h3 style={{ marginBottom: "1rem" }}>
                        📊 Results ({results.length} found)
                    </h3>
                    <div style={{ overflowX: "auto" }}>
                        <table style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            fontSize: "0.9rem"
                        }}>
                            <thead>
                                <tr style={{ borderBottom: "1px solid rgba(100, 100, 120, 0.3)" }}>
                                    {Object.keys(results[0]).map((key) => (
                                        <th
                                            key={key}
                                            style={{
                                                padding: "0.75rem",
                                                textAlign: "left",
                                                color: "#a855f7"
                                            }}
                                        >
                                            {key}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {results.map((result, i) => (
                                    <tr
                                        key={i}
                                        style={{
                                            borderBottom: "1px solid rgba(100, 100, 120, 0.1)",
                                            background: result.secret_value ? "rgba(0, 255, 136, 0.1)" : "transparent"
                                        }}
                                    >
                                        {Object.values(result).map((value, j) => (
                                            <td
                                                key={j}
                                                style={{
                                                    padding: "0.75rem",
                                                    color: String(value).includes("FLAG{") ? "#00ff88" : "#e4e4e7"
                                                }}
                                            >
                                                {String(value).includes("FLAG{") ? (
                                                    <strong>🏆 {String(value)}</strong>
                                                ) : (
                                                    String(value)
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Flag detection */}
                    {results.some(r => String(r.secret_value || r.email || "").includes("FLAG{")) && (
                        <div className="flag-celebration" style={{ marginTop: "1.5rem" }}>
                            <h2 style={{ color: "#00ff88", marginBottom: "0.5rem" }}>
                                🎉 CONGRATULATIONS!
                            </h2>
                            <p>You successfully performed a UNION-based SQL Injection attack!</p>
                            <p style={{ marginTop: "1rem" }}>
                                <Link href="/course#module-6" className="btn-primary">
                                    Complete the Challenge →
                                </Link>
                            </p>
                        </div>
                    )}
                </div>
            )}

            {results.length === 0 && !error && searchTerm && !loading && (
                <div className="card" style={{ textAlign: "center", color: "#6b7280" }}>
                    No users found matching &quot;{searchTerm}&quot;
                </div>
            )}

            {/* UNION Attack Reference */}
            <div className="card" style={{ marginTop: "2rem" }}>
                <h3 style={{ marginBottom: "1rem" }}>📋 UNION Attack Payloads</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {[
                        { payload: "' UNION SELECT username, password FROM users--", desc: "Extract passwords" },
                        { payload: "' UNION SELECT secret_name, secret_value FROM admin_secrets--", desc: "Get secrets" },
                        { payload: "' UNION SELECT table_name, column_name FROM information_schema.columns--", desc: "Schema enumeration" }
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                padding: "0.75rem",
                                background: "rgba(10, 10, 15, 0.5)",
                                borderRadius: "6px"
                            }}
                        >
                            <code style={{ color: "#00ff88", display: "block", marginBottom: "0.25rem" }}>
                                {item.payload}
                            </code>
                            <span style={{ color: "#6b7280", fontSize: "0.85rem" }}>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
