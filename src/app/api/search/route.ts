import { NextRequest, NextResponse } from "next/server";
import { vulnerableQuery } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const searchTerm = searchParams.get("q") || "";

        if (!searchTerm) {
            return NextResponse.json({
                success: true,
                results: [],
                message: "Enter a search term"
            });
        }

        // ⚠️ VULNERABLE CODE - DO NOT USE IN PRODUCTION!
        // This query is intentionally vulnerable to UNION-based SQL Injection
        // The search term is directly interpolated without parameterization
        const query = `SELECT username, email FROM users WHERE username LIKE '%${searchTerm}%'`;

        console.log("[VULNERABLE] Executing search query:", query);

        const results = await vulnerableQuery(query);

        return NextResponse.json({
            success: true,
            results: results || [],
            count: results?.length || 0,
            _debug: {
                executedQuery: query,
                warning: "This endpoint is vulnerable to UNION-based SQL Injection!",
                hint: "The query returns 2 columns. Try: ' UNION SELECT secret_name, secret_value FROM admin_secrets--"
            }
        });
    } catch (error) {
        console.error("[VULNERABLE] Search query error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Search failed",
                error: error instanceof Error ? error.message : "Unknown error",
                hint: "SQL syntax error? Check your UNION clause - column count must match (2 columns)."
            },
            { status: 500 }
        );
    }
}
