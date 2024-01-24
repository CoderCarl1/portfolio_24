import React from "react"
import joinClasses from "~/functions/joinClasses";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Section({ children, className = "", ...props }: SectionProps) {
  return (
    <section className={joinClasses('section flow:32', className)} {...props}>
      {children}
    </section>
  )
}