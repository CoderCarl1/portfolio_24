import {About, Contact, Hero, Nav, Projects, SkipLink} from "@components";


export default function Home(){
  return (
    <>
      <SkipLink  />
      <Nav />
      <Hero />
      <main id="main">
      <About />
      <Projects />
      <Contact />
      </main>
    </>
  );
}