import Link from "next/link"; 
export default function Signup() { 
  return ( 
    <div id="wd-signup-screen"> 
      <h3>Sign up</h3> 
      <input defaultValue="username" placeholder="username" className="wd-username" /><br/> 
      <input defaultValue="password" placeholder="password" type="password" className="wd-password" /><br/> 
      <input defaultValue="verify password" placeholder="verify password" 
             type="password" className="wd-password-verify" /><br/> 
      <Link  href="profile" > Sign up </Link><br /> 
      <Link  href="signin" > Sign in </Link> 
    </div> 
);} 