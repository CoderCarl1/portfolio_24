
import { Section } from "@components";
import { Link } from "@remix-run/react";
import React, { useEffect, useRef } from "react";


export default function Projects() {
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (projectsRef.current === null) return;

    const tabs = [ ...projectsRef.current.querySelectorAll('[role="tab"]') ] as HTMLElement[];
    const tabList: HTMLDivElement | null = projectsRef.current.querySelector('[role="tablist"]');
    if (!tabList || !tabs.length) return;

    let tabFocus = 0;

    tabList.addEventListener("keydown", handleKeyPress);

    function handleKeyPress(e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        tabs[ tabFocus ].setAttribute("tabindex", "-1");
        if (e.key === "ArrowRight") {
          tabFocus++;
          if (tabFocus >= tabs.length) {
            tabFocus = 0;
          }
        } else if (e.key === "ArrowLeft") {
          tabFocus--;
          if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
          }
        }

        tabs[ tabFocus ].setAttribute("tabindex", "0");
        tabs[ tabFocus ].focus();
      }
    }
  }, [])

  function changeTabs(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.currentTarget;
    const parent = target.parentNode;
    const grandparent = parent?.parentNode;
    if (!parent || !grandparent) return;

    [ ...parent
      .querySelectorAll('[aria-selected="true"]') ]
      .forEach((t) => t.setAttribute("aria-selected", "false"));

    target.setAttribute("aria-selected", "true");

    [ ...grandparent
      .querySelectorAll('[role="tabpanel"]') ]
      .forEach((p) => p.setAttribute("hidden", "true"));

    grandparent?.parentNode
      ?.querySelector(`#${target.getAttribute("aria-controls")}`)
      ?.removeAttribute("hidden");
  }

  return (
    <Section id="projects" className="[ container-medium ]">
      <h2 className="[ fs:800 bold ]">Projects <Link className="[ anchor-hash ]" to="/projects">#</Link></h2>
      <div className="[ projects__wrapper ]" ref={projectsRef}>
        <div role="tablist" aria-label="Project Tabs">
          <button onClick={changeTabs} role="tab" tabIndex={0} aria-selected="false" aria-controls="tabpanel-1" id="tab-1" className="[ project__selector ][ button ]">project1</button>
          <button onClick={changeTabs} role="tab" tabIndex={-1} aria-selected="false" aria-controls="tabpanel-2" id="tab-2" className="[ project__selector ][ button ]">project2</button>
          <button onClick={changeTabs} role="tab" tabIndex={-1} aria-selected="false" aria-controls="tabpanel-3" id="tab-3" className="[ project__selector ][ button ]">This Portfolio</button>
        </div>
        <div className="[ project__content ]">
          <div id="tabpanel-1" className="[ flow:16 ]" role="tabpanel" tabIndex={0} aria-labelledby="tab-1">
            <p className="[ bold fs:500 ]">Current: A Rostering app for gardening businesses</p>

            <p>code: <a target="_blank" href="https://github.com/CoderCarl1/roster/blob/main/README.md" rel="noopener noreferrer">github repo</a></p>

          </div>
          <div id="tabpanel-2" className="[ flow:16 ]" role="tabpanel" tabIndex={0} aria-labelledby="tab-2" hidden>
            <p className="[ bold fs:500 ]">Accessible React Date + Calendar dropdown Element</p>
            <p>code: <a target="_blank" href="https://github.com/CoderCarl1/portfolio_24" rel="noopener noreferrer">github repo</a></p>

          </div>
          <div id="tabpanel-3" className="[ flow:16 ]" role="tabpanel" tabIndex={0} aria-labelledby="tab-3" hidden>
            <p className="[ bold fs:500 ]">This Portfolio</p>
            <p>code: <a target="_blank" href="https://github.com/CoderCarl1/portfolio_24" rel="noopener noreferrer">github repo</a></p>
            <p></p>
          </div>
        </div>
      </div>
    </Section>
  )
}