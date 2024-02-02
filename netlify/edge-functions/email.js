import client from "@sendgrid/mail";

async function sendEmail({ name, email, message }) {
  try {

    const SENDGRID_API_KEY = Netlify.env.get("SENDGRID_API_KEY");
    const CONTACT_FORM_EMAIL = Netlify.env.get("CONTACT_FORM_EMAIL");
    
    const formDataErrors = {
      name: name ? null : "Name is required",
      email: email ? null : "Email is required",
      message: message ? null : "A message is required",
    };

    const hasErrors = Object.values(formDataErrors).some(
      (errorMessage) => errorMessage
    );
    if (hasErrors) {
      return {    
        statusCode: 200,
        body: JSON.stringify({
          formStatus: "Failed sending email",
          errors: formDataErrors
        })
      };
    }

    client.setApiKey(SENDGRID_API_KEY || "");

    const mailOptions = {
      to: CONTACT_FORM_EMAIL,
      cc: email,
      from: CONTACT_FORM_EMAIL,
      subject: "Email from Coder Carl",
      text: `${name} sent email from ${email} : ${message}`,
      html: `
      <style>
        a:hover {
          color: #a4afff !important;
        }
      </style>
      <div style="outline: 2px solid #333; outline-offset: -1px; min-width: 18rem; padding: 1em;">
      <div style="background-color: white; color: black;">
        <b>Sender Email:</b> ${email} <br aria-hidden="true" />
        <b>From:</b> ${name}  <br aria-hidden="true" />
      </div>
      <p style="display: block; padding: 0.5em 0; margin-top: 1rem;">
        ${message}
      </p>
      <p style=" margin-top: 1rem; font-style: italic; font-size: 0.8rem; color: #bebebe; padding: 0.5rem 0; border-radius: 4px;">
        This is a copy of a message sent from <a style="color: #4b62ff;" href="https://codercarl.dev/">codercarl.dev</a>
        <br aria-hidden="true" />
        Reply to this message at: <a href='mailto:carl.davidson@hotmail.com' style="color: #4b62ff;">carl.davidson@hotmail.com</a>
      </p>
    </div>
    `
    };

    const response = await client.send(mailOptions);
    const statusCode = response[ 0 ].statusCode;

    if (!statusCode || statusCode !== 202) {
      throw new Error();
    }


    return {
      statusCode: 200,
      body: JSON.stringify({
        formStatus: 'success'
      })
    };

  } catch (err) {
    return {    
      statusCode: 500,
      body: JSON.stringify({
        formStatus: "Failed sending email"
      })
    };
  }

}



export default async (request, context) => {
  const {name, email, message} = await request.json();
  
  context.log("received contact submission", `name: ${name} - email: ${email} \n ${message} `);


  const clientResponse = await sendEmail({name, email, message});
  context.log("client response => ", clientResponse.statusCode);
  return new Response(clientResponse);
}