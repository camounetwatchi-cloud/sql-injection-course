import { NextRequest, NextResponse } from "next/server";
import { vulnerableQuery } from "@/lib/db";

export async function POST(request: NextRequest) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { success: false, message: "Username and password are required" },
                { status: 400 }
            );
        }

        // ⚠️ VULNERABLE CODE - DO NOT USE IN PRODUCTION!
        // This query is intentionally vulnerable to SQL Injection for educational purposes
        // The user input is directly concatenated into the SQL query without sanitization
        const query = `SELECT id, username, email, wallet_balance, is_admin, created_at FROM users WHERE username = '${username}' AND password = '${password}'`;

        console.log("[VULNERABLE] Executing query:", query);

        const users = await vulnerableQuery(query);

        if (users && users.length > 0) {
            return NextResponse.json({
                success: true,
                message: "Authentication successful",
                user: users[0],
                // For educational purposes, show the executed query
                _debug: {
                    executedQuery: query,
                    warning: "This endpoint is intentionally vulnerable to SQL Injection!"
                }
            });
        } else {
            return NextResponse.json({
                success: false,
                message: "Invalid username or password",
                _debug: {
                    executedQuery: query,
                    hint: "Try using SQL injection to bypass authentication"
                }
            });
        }
    } catch (error) {
        console.error("[VULNERABLE] Query error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Database error",
                error: error instanceof Error ? error.message : "Unknown error",
                hint: "SQL syntax error? Your injection might need adjustment."
            },
            { status: 500 }
        );
    }
}
