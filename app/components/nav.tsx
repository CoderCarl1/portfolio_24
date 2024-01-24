import { Link } from "@remix-run/react";
import logo from '~/images/CD_Dev_Logo_200x200.png';



export default function Nav() {

  return (
    <header className="[ header ][ flex justify:between align:center ]">
      <Link className="[ logo ][ flex ]" to="/">
        <img src={logo} alt="Home" className='[ logo__image ]'/>
        <h1 className="[ logo__heading ][ fs-300 ]">Coder Carl</h1>
      </Link>
      <nav className="[ nav ][ even-columns basis:40 ]">
        <Link className="[ button ][ fs-500 ]" to="#about">About</Link>
        <Link className="[ button ][ fs-500 ]" to="#projects">Projects</Link>
        <Link className="[ button ][ fs-500 ]" to="#contact">Contact</Link>
      </nav>
    </header>
  )
}