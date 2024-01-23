import { Link } from "@remix-run/react";
import logo from '~/images/CD_Dev_Logo_200x200.png';



export default function Nav() {

  return (
    <header className="[ header ][ flex justify-between align-center ]">
      <Link className="logo" to="/"><img src={logo} alt="Home" className='hero__image'/></Link>
      <nav className="[ nav ][ even-columns basis:40 ]">
        <Link className="[ button ]" to="#about">About</Link>
        <Link className="[ button ]" to="#projects">Projects</Link>
        <Link className="[ button ]" to="#contact">Contact</Link>
      </nav>
    </header>
  )
}