import React from "react"

type SectionProps = {
  children: React.ReactNode;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;

export default function Section({ children, ...props }: SectionProps) {
  return (
    <section {...props}>
      {children}
    </section>
  )
}