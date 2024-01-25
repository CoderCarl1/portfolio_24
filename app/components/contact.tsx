import { Section } from "@components";
import { Form, useNavigation } from "@remix-run/react";

export default function Contact() {
  const navigation = useNavigation();

  const isSubmitting =
  navigation.formAction === "/?index";

  return (
    <Section id="contact" className="[ container-medium ]">
      <h2 id="contact_header">Contact Carl Davidson</h2>

      <Form action="/?index" method="post">
        <fieldset disabled={isSubmitting} className="[ contact__form ]">
          <legend className="[ contact__form--legend ][ fs:600 ]">Contact Me</legend>

          <div className="[ even-columns-row gap:16 ]">
            <div className="[ input-wrapper floating ]">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="[ input ]"
              />
              <label>Name</label>
              
            </div>
            <div className="[ input-wrapper floating ]">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="[ input ]"
              />
              <label>Email</label>
              {/* <p className="visually-hidden invalid-field" id="emailHint">Please enter a valid email address</p> */}
            </div>
          </div>

          <textarea name="message" id="message" cols={30} rows={10} placeholder="your message..."></textarea>
          {/* <div aria-live="assertive" id="formResult" className="formResult"></div> */}
          <button className="[ button ][ text:center ]" type="submit">Send</button>
        </fieldset>

      </Form>
    </Section>
  )
}