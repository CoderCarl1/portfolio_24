import Sendgrid from "@sendgrid/mail";

async function sendEmail(formData: FormData) {
  try {
    const { name, email, message } = Object.fromEntries(formData);

    const formDataErrors = {
      name: name ? null : "Name is required",
      email: email ? null : "Email is required",
      message: message ? null : "A message is required",
    };

    const hasErrors = Object.values(formDataErrors).some(
      (errorMessage) => errorMessage
    );
    if (hasErrors) {
      return { formStatus: 'failed', errors: formDataErrors }
    }

    Sendgrid.setApiKey(process?.env.SENDGRID_API_KEY || "");

    const mailOptions: any = {
      to: process.env.CONTACT_FORM_EMAIL,
      cc: email,
      from: process.env.CONTACT_FORM_EMAIL,
      subject: "Email from Coder Carl Portfolio",
      text: `${name} sent email from ${email} : ${message}`,
      html: `
      <div style="outline: 2px solid #333; outline-offset: -2em; min-width: 18rem; padding: 2.5rem;">
      <div style="background-color: #bebebe; color: white;">
        <b>email:</b> ${email} <br />
        <b>name:</b> ${name}  <br />
        <b>message:
      </div>
      <pre style="display: block; padding: 0 0.25em; margin-top: 1rem; outline: 1px solid #bebebe;">
        ${message}
      </pre>
      <p style=" margin-top: 1rem; font-style: italic; font-size: 0.8rem; color: #bebebe; background-color: #f5f5f5; padding: 0.5rem 0.75rem; border-radius: 4px;">
        reply to this message at: <a href='mailto:carl.davidson@hotmail.com' style="color: rgb(50, 37, 116); text-decoration: none;">carl.davidson@hotmail.com</a>
      </p>
    </div>
    `
    };

    const response = await Sendgrid.send(mailOptions);
    const statusCode = response[ 0 ].statusCode;

    if (!statusCode || statusCode !== 202) {
      throw new Error('failed to email');
    }

    return { formStatus: 'success' };
  } catch (err) {
    console.log("error happened", err)
    return { formStatus: 'fail' }
  }

}

export default sendEmail