import Home from '~/pages/Home'
import {ActionFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

// Contact Form Submission
export async function action({request}: ActionFunctionArgs){

  const body = await request.formData();
  const values = Object.fromEntries(body);
  // TODO: set up email
  console.log("formData ", values)
    return redirect(`/#contact`);
}

export default Home;