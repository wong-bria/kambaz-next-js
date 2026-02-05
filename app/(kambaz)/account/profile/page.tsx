import Link from "next/link"; 
import { FormControl } from "react-bootstrap";

export default function Profile() { 
  return ( 
    <div id="wd-profile-screen"> 
      <h3>Profile</h3> 
      <FormControl id="wd-username" placeholder="username" className="mb-2" defaultValue="alice" />
      <FormControl id="wd-password" placeholder="password" className="mb-2" defaultValue="123" type="password" />
      <FormControl id="wd-firstname" placeholder="First Name" className="mb-2" defaultValue="Alice" />
      <FormControl id="wd-lastname" placeholder="Last Name" className="mb-2" defaultValue="Wonderland" />
      <FormControl id="wd-dob" className="mb-2" type="date" title="Enter Date of birth" />
      <FormControl id="wd-email" className="mb-2" type="email" title="Enter Email" defaultValue="alice@wonderland.com" />
      <FormControl id="wd-role" placeholder="User" className="mb-2" defaultValue="User" />
      <Link href="/account/signin" className="btn btn-danger w-100 mb-2">
        Sign out
     </Link>
    </div> 
);}