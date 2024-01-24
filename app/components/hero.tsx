import { Link } from '@remix-run/react';
import hero_image from '~/images/HeroImage.png';
import Blob from '~/images/blob';
export default function Hero() {

  return (
    <div className="[ hero ][ container-medium flow even-columns-row ][ align:center ]">
      
      <div className='[ hero__text ][ text-left fs-800 flow:16 ]'>
        <p>Hi 👋! <span className="text-left">I'm Carl a front-end focused web developer.</span></p>
        <Link to="#contact" className="[ button ][ fs-500 ]">Contact Me</Link>
      </div>
      
      <div
        className='[ hero__image ][ margin-x:auto ]'
      >
        <img
          src={hero_image}
          className="[ hero__image--photo ]"
          alt="Carl Davidson smiling with a coloured background"
        />
        <div
          className="[ hero__image--blobs ]"
        >
          <Blob />
          <Blob />
          <Blob />
        </div>
      </div>
    </div>
  )
}
