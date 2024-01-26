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


export default Home;