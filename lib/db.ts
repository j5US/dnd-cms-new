import { Pool } from 'pg';

// Create a singleton connection pool
let pool: Pool | null = null;

export function getPool(): Pool {
    if (!pool) {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            max: 20, // Maximum number of connections in the pool
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        });

        // Handle pool errors
        pool.on('error', (err) => {
            console.error('Unexpected error on idle client', err);
        });
    }

    return pool;
}

/**
 * Execute a query with parameters
 */
export async function query<T = any>(
    text: string,
    params?: any[]
): Promise<T[]> {
    const pool = getPool();
    const result = await pool.query(text, params);
    return result.rows as T[];
}

/**
 * Execute a query and return a single row
 */
export async function queryOne<T = any>(
    text: string,
    params?: any[]
): Promise<T | null> {
    const rows = await query<T>(text, params);
    return rows.length > 0 ? rows[0] : null;
}

/**
 * Close the database connection pool
 * (Usually called when shutting down the application)
 */
export async function closePool(): Promise<void> {
    if (pool) {
        await pool.end();
        pool = null;
    }
}
