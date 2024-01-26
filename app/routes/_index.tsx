import Home from '~/pages/Home'
import {ActionFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
import sendEmail from '~/[server]/email.server';
import DEVLOGO from '~/images/CD_Dev_Logo_200x200.png';

export const meta: MetaFunction = () => {
  return [
    { title: "Coder Carl's Portfolio" },
    { name: "description", content: "A personal blog / portfolio for Coder Carl." },
    {name: "og:title", content: "Coder Carl's Portfolio"},
    {name: "og:url", content: "https://www.codercarl.dev"},
    {name: "og:description", content: "A personal blog / portfolio for Coder Carl."},
    {name: "og:image", content: DEVLOGO},
    {name: "og:type", content: "website"},
    {name: "og:locale", content: "en-AU"},

  ];
};

// Contact Form Submission
export async function action({request}: ActionFunctionArgs){
  const formData = await request.formData();
  const {status} = await sendEmail(formData);
  // add errors as params to redirect if missing
  // name, email, message 
  return redirect(`/#contact`);
}

export default Home;