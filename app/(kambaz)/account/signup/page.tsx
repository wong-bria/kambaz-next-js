"use client";

import Link from "next/link"; 
import { redirect } from "next/navigation";
import { setCurrentUser } from "../reducer"; 
import { useDispatch } from "react-redux"; 
import { useState } from "react"; 
import { FormControl, Button } from "react-bootstrap";
import * as client from "../client";

export default function Signup() { 
  const [user, setUser] = useState<any>({}); 
  const dispatch = useDispatch(); 
  const signup = async () => { 
    const currentUser = await client.signup(user); 
    dispatch(setCurrentUser(currentUser)); 
    redirect("/profile"); 
  };
  return ( 
    <div id="wd-signup-screen"> 
     <h3>Sign up</h3>
     <FormControl value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} 
                  placeholder="username" className="wd-username mb-2" />
     <FormControl value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="password" className="wd-password mb-2" type="password" />
     <button onClick={signup} className="wd-signup-btn btn btn-primary mb-2 w-100"> Sign up </button><br /> 
     <Link id="wd-signin-link" href="/account/signin">Sign in</Link>
   </div> 
);} 