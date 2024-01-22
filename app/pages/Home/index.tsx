import {About, Contact, Hero, Nav, Projects, SkipLink} from "@components";


export default function Home(){
  return (
    <>
      <SkipLink  />
      <Nav />
      <Hero />
      <h1>Coder Carl</h1>
      <main id="main">

      <About />
      <Projects />
      <Contact />
      </main>
    </>
  );
}