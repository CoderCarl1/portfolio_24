import Sendgrid from "@sendgrid/mail";

async function sendEmail(formData: FormData) {
  try {

    const { name, email, message } = Object.fromEntries(formData);

    Sendgrid.setApiKey(process?.env.SENDGRID_API_KEY || "");

    const mailOptions: any = {
      to: process.env.CONTACT_FORM_EMAIL,
      from: process.env.CONTACT_FORM_EMAIL,
      subject: "Email from Coder Carl Portfolio",
      text: `${name} sent email from ${email} : ${message}`,
      html: `
    <b>email</b> : ${email} \n
    <b>name</b> : ${name} \n
    <b>message</b> : \n
    <pre>${message}</pre>`
    };

    const response = await Sendgrid.send(mailOptions);
    const statusCode = response[ 0 ].statusCode;

    if (!statusCode || statusCode !== 202) {
      throw new Error('failed to email');
    }

    return { status: 'success' };
  } catch (err) {
    console.log("error happened", err)
    return { status: 'fail' }
  }

}

export default sendEmail