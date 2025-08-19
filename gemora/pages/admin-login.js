
import { useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
const ADMIN_EMAIL="bellarosennaji@gmail.com";
const ADMIN_PASSWORD="GemoraAdmin!2025";
export default function AdminLogin(){
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const router=useRouter();
  const submit=e=>{e.preventDefault(); setError(""); if(email===ADMIN_EMAIL&&password===ADMIN_PASSWORD){ localStorage.setItem('gemora_admin','ok'); router.push('/admin'); } else { setError("Invalid credentials. Please try again."); } };
  return (<Layout title="Admin Login">
    <div className="form card-panel">
      <h2 className="form-title">Gemora Admin</h2>
      <img src="/gemora-logo.svg" alt="Gemora" style={{height:40,margin:'0 auto 8px',display:'block'}} className="logo-shimmer" />
      <form onSubmit={submit}>
        <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input className="input" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div style={{color:'#ff6b6b'}}>{error}</div>}
        <button className="btn mt-3" type="submit">Login</button>
      </form>
      <p className="center mt-3" style={{color:'#aaa'}}>Use your admin credentials.</p>
    </div>
  </Layout>);
}
