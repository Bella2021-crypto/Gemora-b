
import pg from 'pg'; const { Pool } = pg;
const connectionString="postgresql://neondb_owner:npg_kBgFTL4Ki3vw@ep-red-boat-a21jcyh7-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";
export const pool=new Pool({connectionString});
export async function query(text,params){ const client=await pool.connect(); try{ return await client.query(text,params);} finally{ client.release(); } }
