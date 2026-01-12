import { NextResponse } from "next/server";
import pool from "@/lib/db";

// This endpoint initializes the database with sample data
// It should only be called once during setup
export async function GET() {
    try {
        const client = await pool.connect();

        try {
            // Create tables
            await client.query(`
        -- Drop tables if they exist (for clean reset)
        DROP TABLE IF EXISTS transactions CASCADE;
        DROP TABLE IF EXISTS admin_secrets CASCADE;
        DROP TABLE IF EXISTS users CASCADE;

        -- Table users with passwords in plain text (intentionally vulnerable)
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            email VARCHAR(100),
            wallet_balance DECIMAL(18,2) DEFAULT 0,
            is_admin BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT NOW()
        );

        -- Table transactions (sensitive data)
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            crypto_symbol VARCHAR(10),
            amount DECIMAL(18,8),
            tx_type VARCHAR(10),
            secret_key VARCHAR(64),
            created_at TIMESTAMP DEFAULT NOW()
        );

        -- Table admin_secrets (ultimate target)
        CREATE TABLE admin_secrets (
            id SERIAL PRIMARY KEY,
            secret_name VARCHAR(100),
            secret_value TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        );
      `);

            // Insert sample data
            await client.query(`
        -- Sample users with plain-text passwords (vulnerable by design)
        INSERT INTO users (username, password, email, wallet_balance, is_admin) VALUES
        ('alice', 'password123', 'alice@crypto.com', 15420.50, FALSE),
        ('bob', 'bitcoin2024', 'bob@crypto.com', 8750.25, FALSE),
        ('charlie', 'ethereum_fan', 'charlie@crypto.com', 42000.00, FALSE),
        ('diana', 'solana_moon', 'diana@crypto.com', 5500.75, FALSE),
        ('admin', 'SuperSecretAdmin!2024', 'admin@cryptovault.io', 999999.99, TRUE);

        -- Sample transactions
        INSERT INTO transactions (user_id, crypto_symbol, amount, tx_type, secret_key) VALUES
        (1, 'BTC', 0.5, 'buy', 'sk_live_alice_btc_secret_key_123'),
        (1, 'ETH', 2.5, 'buy', 'sk_live_alice_eth_secret_key_456'),
        (2, 'BTC', 0.25, 'sell', 'sk_live_bob_btc_secret_key_789'),
        (3, 'SOL', 100, 'buy', 'sk_live_charlie_sol_secret_key_abc'),
        (4, 'ETH', 1.0, 'buy', 'sk_live_diana_eth_secret_key_def');

        -- Admin secrets (the ultimate prize!)
        INSERT INTO admin_secrets (secret_name, secret_value) VALUES
        ('master_key', 'FLAG{SQL_INJECTION_MASTER_2024}'),
        ('backup_codes', 'BACKUP-XYZ-789-ULTRA-SECRET'),
        ('admin_wallet', '0xDEADBEEF1234567890ABCDEF'),
        ('api_secret', 'sk_prod_cryptovault_super_secret_api_key');
      `);

            return NextResponse.json({
                success: true,
                message: "Database initialized successfully!",
                tables_created: ["users", "transactions", "admin_secrets"],
                sample_users: ["alice", "bob", "charlie", "diana", "admin"]
            });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error("Database initialization error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to initialize database",
                error: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}
