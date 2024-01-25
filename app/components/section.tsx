import React from "react"
import joinClasses from "~/functions/joinClasses";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Section({ children, className = "", ...props }: SectionProps) {
  const additionalClasses = className ? `[ ${className} ]` : '';
  return (
    <section className={joinClasses('[ section flow:32 ]', additionalClasses)} {...props}>
      {children}
    </section>
  )
}