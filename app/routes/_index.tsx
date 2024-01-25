import Home from '~/pages/Home'
import {ActionFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
import sendEmail from '~/[server]/email.server';

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Contact Form Submission
export async function action({request}: ActionFunctionArgs){
  const formData = await request.formData();
  await sendEmail(formData);
  return redirect(`/#contact`);
}

export default Home;