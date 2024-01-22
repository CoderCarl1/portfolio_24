import hero_image from '~/images/HeroImage.png';

export default function Hero(){

  return (
    <div className="hero">
      <p>Hero Text</p>
      <img src={hero_image} alt="Carl Davidson smiling with an orange background" className='hero__image'/>
      {/* TODO: put aside here that contains blogs links */}
    </div>
  )
}