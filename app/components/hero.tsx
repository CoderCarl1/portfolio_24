import { Link } from '@remix-run/react';
import hero_image_720x720 from '~/images/heroImage_720x720.webp';
import hero_image_400x400 from '~/images/heroImage_400x400.webp';

import Blob from '~/images/blob';
export default function Hero() {

  return (
    <div className="[ hero ][ container-medium flow even-columns-row ][ align:center ]">
      
      <div className='[ hero__text ][ text:left fs:800 flow:16 ]'>
        <p>Hi 👋! <span className="text:left">I'm Carl a front-end focused web developer.</span></p>
        <Link to="#contact" className="[ button secondary ][ fs:500 ]">Contact Me</Link>
      </div>
      
      <div
        className='[ hero__image ][ margin-x:auto ]'
      >
        <picture 
          className="[ hero__image--photo ]"
        >
          <source media="(max-width: 999px)" srcSet={hero_image_400x400}/>
          <source media="(min-width: 1000px)" srcSet={hero_image_720x720}/>

        <img
          src={hero_image_720x720}
          alt="Carl Davidson smiling with a coloured background"
        />
        </picture>
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
