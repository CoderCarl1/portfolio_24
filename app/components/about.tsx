import { Section } from "@components";
import libraries_image_500 from '~/images/libraries_500.png';
import libraries_image_250x400 from '~/images/libraries_250x400.png';
import { Link } from "@remix-run/react";


export default function About() {

  return (
    <Section id="about">
      <h2 className="[ fs:800 bold ]">About <Link className="[ anchor-hash ]" to="/about">#</Link></h2>
      <p className="[ fs:500 ]">I am a Full stack developer with a love 💗 of <span className="[ fun-underline ]">web development</span>, <span className="[ fun-underline ]">Accessibility</span>, and just <span className="[ fun-underline ]">making things fun to use</span>.</p>

      <div className="[ even-columns-row ]">
        <div className="[ section__child ][ flow:16 ]">
          <h3 className="[ decoration:underline fs:500 bold ]">Professional Information</h3>
          <p>For the last year and a half, I have been Working across the Back and Front ends with: </p>
          <ul>
            <li>
              AWS Lambda (Node.js), DynamoDB, SQS, MySQL
            </li>
            <li>
              Ember.js, HTML and CSS/SASS
            </li>
          </ul>
          <p>Previously roles required work with Shopify, and wordpress</p>
        </div>
        <div className="[ section__child ][ flow:16 ]">
          <h3 className="[ decoration:underline fs:500 bold ]">Personal <i>(out of worktime)</i> learning</h3>
          <p>My life goals always include self improvement and learning about things that I love such as:</p>
          <ul>
            <li>Improving my understanding of best practices for accessibility through the use of WCAG, A11y, and discord forums</li>
            <li>Prisma, React, Remix Run applications</li>
            <li>Sourdough</li>
          </ul>
        </div>
      </div>

      <div className="[ even-columns-row ]">
        <div className="[ section__child ][ flow:16 ]">
          <h3 className="[ decoration:underline fs:500 bold ]">Things that I do stuff with:</h3>
          <ul>
            <li>Languages: JavaScript, Typescript, HTML, CSS, SCSS</li>
            <li>Databases: Prisma, Mysql, MongoDB, PostgreSQL</li>
            <li>Frameworks/Libraries: Express, React, Node, Remix Run</li>
            <li>Developer Tools: Accessibility / Aria, Git, Figma, AWS S3, Linux, TDD</li>
            <li>Testing: Jest, Cypress, Mocha, Storybook</li>
          </ul>
        </div>
        <picture className="[ about__image__random ][ margin-x:auto ]">
          <source media="(max-width: 500px)" srcSet={libraries_image_500} />
          <source media="(max-width: 980px)" srcSet={libraries_image_250x400} />
          <source media="(min-width: 981px)" srcSet={libraries_image_500} />
          <img src={libraries_image_500} alt="" />
        </picture>
        {/* <img
          src={libraries_image_250x400}
          srcSet={`${libraries_image_250x400} 250w, ${libraries_image_500} 500w`}
          sizes="(max-width: 500px) 250px,
          500px"
          className="[ about__image__random ]"
          alt=""
        /> */}
      </div>
    </Section>
  )
}