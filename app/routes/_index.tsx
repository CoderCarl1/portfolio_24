import { ActionFunctionArgs, redirect, type MetaFunction } from "@remix-run/node";
import sendEmail from '~/[server]/email.server';
import DEVLOGO from '~/images/CD_Dev_Logo_200x200.png';
import { About, Contact, Hero, Nav, Projects, SkipLink } from "@components";
import NotFound from "~/components/notFound";
import { useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";


export const meta: MetaFunction = () => {
  return [
    { title: "Coder Carl's Portfolio" },
    { name: "description", content: "A personal blog / portfolio for Coder Carl." },
    { name: "keywords", content: "Carl Davidson, Coder Carl, developer, react, accessibility, a11y, html, scss, css, " },
    { name: "og:title", content: "Coder Carl's Portfolio" },
    { name: "og:url", content: "https://www.codercarl.dev" },
    { name: "og:description", content: "A personal blog / portfolio for Coder Carl." },
    { name: "og:image", content: DEVLOGO },
    { name: "og:type", content: "website" },
    { name: "og:locale", content: "en-AU" },

  ];
};

export const statusValues = ["success", "fail"] as const;
export type statusValueTypes = typeof statusValues[number]

// Contact Form Submission
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const { formStatus, errors } = await sendEmail(formData);
  return {errors, formStatus};  
}



export default function Home() {
  const formResult = useActionData<typeof action>();
  const [formErrors, setFormErrors] = useState<Record<string, string | null>>({...formResult?.errors})
  const [success, setSuccess] = useState<boolean | null>(null);
  
  useEffect(() => {
    if (formResult) {
      setFormErrors(formResult.errors ?? {});
      setSuccess(formResult.formStatus === 'success');
    }
  }, [formResult]);

  useEffect(() => {
    if (success) {
      const form = document.getElementById('contact__form') as HTMLFormElement;
      form?.reset();
      const timer = setTimeout(() => {
        setSuccess(null); 
      }, 2500); 
      return () => clearTimeout(timer);
    }
  }, [success]);


  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    const fieldName = e.currentTarget.name;
    if (formErrors[fieldName]){
      setFormErrors(prev =>  ({ ...prev, [fieldName]: null }))
    }
    setSuccess(null);
  }

  return (
    <>
      <SkipLink />
      <Nav />
      <Hero />
      <main id="main">
        <About />
        <Projects />
        <Contact errors={formErrors} handleInputChange={handleInputChange} success={success} />
      </main>
    </>
  );
}


export function ErrorBoundary() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main">
        <NotFound />
      </main>
    </>
  );
}