import { Section } from "@components";
import { Form, Link, useNavigation } from "@remix-run/react";
import { useEffect } from "react";
import joinClasses from "~/functions/joinClasses";

type contactProps = {
  errors: Record<string, string | null>,
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  success: boolean | null
}


export default function Contact({ errors, handleInputChange, success }: contactProps) {
  const navigation = useNavigation();
  const isSubmitting =
    navigation.formAction === "/?index";

  useEffect(() => {
    if (!errors || success === null) return;
    const invalidFields = Object.entries(errors)
    .filter(([_, errorMessage]) => errorMessage)
    .map(([fieldName, _]) => fieldName);

    if (invalidFields.length === 0) return;

    const firstInvalidField = document.querySelector(`#${invalidFields[0]}`) as HTMLElement;
    firstInvalidField?.focus();

  }, [success])

  return (
    <Section id="contact" className="[ container-medium ]">
      <h2 id="contact_header" className="[ fs:800 bold ]">Contact Carl Davidson <Link className="[ anchor-hash ]" to="/contact">#</Link></h2>

      <Form action="/?index" method="post" id="contact__form">
        <fieldset disabled={isSubmitting} className="[ contact__form ][ flow:16 ]">
          <legend className="[ contact__form--legend ][ fs:600 ]">Contact Me</legend>
          <div className="[ even-columns ]">
            <p className="[ fs-300 italic ]">All fields are required</p>
            <span aria-live="assertive" className={joinClasses('[ success', success ? "shown" : "", " ][ bold ]")}>{success ? 'Success!' : ""}</span>
          </div>
          <div className="[ even-columns-row gap:16 ]">
            <div className="[ input-wrapper floating ]">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoCapitalize="words"
                className={joinClasses("[ contact__form--name input ]", errors?.name ? "[ error ]" : "")}
                aria-required="true"
                aria-invalid={errors?.name ? "true" : "false"}
                aria-describedby="name_label name_error"
                autoComplete="true"
                onChange={handleInputChange}
              />
              <label id="name_label" htmlFor="name">Name</label>
              <span id="name_error" className={joinClasses("[ error_message ]", errors?.name ? "[ shown ]": "")}>{"  "}{errors?.name ? errors.name : ""}</span>
            </div>
            <div className="[ input-wrapper floating ]">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email@example.com"
                className={joinClasses("[ contact__form--email input ]", errors?.email ? "[ error ]" : "")}
                aria-required="true"
                aria-describedby="email_label email_error"
                autoComplete="true"
                aria-invalid={errors?.email ? "true" : "false"}
                onChange={handleInputChange}
              />
              <label id="email_label" htmlFor="email">Email</label>
              <span id="email_error" className={joinClasses("[ error_message ]", errors?.email ? "[ shown ]": "")}>{"  "}{errors?.email ? errors.email : ""}</span>
            </div>
          </div>

          <textarea
            className={joinClasses("[ contact__form--message ]", errors?.message ? "[ error ]" : "")}
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="your message..."
            aria-required="true"
            aria-invalid={errors?.message ? "true" : "false"}
            aria-describedby="message_error"
            autoCorrect="on"
            autoCapitalize="sentences"
            onChange={handleInputChange}
          />
          <span id="message_error" 
          className={joinClasses("[ error_message ][ block ]", errors?.message ? "[ shown ]": "")}>{"  "}{errors?.message ? errors.message : ""}</span>
          <button className="[ button ][ text:center ]" type="submit">Send</button>
          <div className="[ visually-hidden ]" aria-live="assertive">
            {errors?.name ? <p>{errors.name}</p> : "" }
            {errors?.email ? <p>{errors.email}</p> : "" }
            {errors?.message ? <p>{errors.message}</p> : "" }
          </div>
        </fieldset>

      </Form>
    </Section>
  )
}