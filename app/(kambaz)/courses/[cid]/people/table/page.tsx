"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import * as client from "../../../client"; // courses client
import PeopleTable from "../table";

export default function PeoplePage() {
  const { cid } = useParams();   // get course ID from URL
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}