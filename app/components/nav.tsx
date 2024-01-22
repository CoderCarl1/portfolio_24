import { Link } from "@remix-run/react";



export default function Nav() {

  return (
    <header>
      <nav>
        <Link to="#about">About</Link>
        <Link to="#contact">Contact</Link>
        <Link to="#projects">Projects</Link>
      </nav>
    </header>
  )
}