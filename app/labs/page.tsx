import Link from "next/link";
export default function labs() {
  return (
    <div id="wd-labs">
      <h1>Labs</h1>
      <p>Name: Brian Wong Section: 2</p>
      <p>Name: Annie Wong Section: 2</p>
      <ul>
        <li>
          <Link href="/labs/lab1" id="wd-lab1-link">
            Lab 1: HTML Examples{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab2" id="wd-lab2-link">
            Lab 2: CSS Basics{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab3" id="wd-lab3-link">
            Lab 3: JavaScript Fundamentals{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab4" id="wd-lab4-link">
            Lab 4: Maintaining State in React Apps{" "}
          </Link>
        </li>
        <li>
          <Link href="/labs/lab5" id="wd-lab5-link">
            Lab 5: Implementing RESTful Web APIs with Express.js{" "}
          </Link>
        </li>
        <li>
          <Link href="/" id="wd-kambaz-link">
            {" "}
            Kambaz
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/wong-bria/kambaz-next-js"
            id="wd-github"
          >
            GitHub Repo
          </Link>
        </li>
        <li>
          <Link
            href="https://github.com/wong-bria/kambaz-node-server-app"
            id="wd-node-repo"
          >
            Node Repo
          </Link>
        </li>
        <li>
          <Link
            href="https://kambaz-node-server-app-6jqg.onrender.com"
            id="wd-server"
          >
            Server on Render
          </Link>
        </li>
      </ul>
    </div>
  );
}
