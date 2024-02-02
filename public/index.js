const CONTACT_FORM = document.getElementById("contact__form");

const enableForm = () => CONTACT_FORM?.removeAttribute("disabled");
const disableForm = () => CONTACT_FORM?.setAttribute("disabled", "true");
const toggleDataHidden = (element, boolean = null) => {
  if (boolean !== null) {
    element.dataset.hidden = `${boolean}`;
    return;
  }
  const newValue = element.dataset.hidden === "true" ? "false" : "true"
  element.dataset.hidden = newValue;
}
const toggleHamburgerMenu = () => {
  const button = document.querySelector('.hamburger__button');
  const menu = document.getElementById("menu-list");
  const expanded = button.getAttribute("aria-expanded") === "true" || false;
  button.setAttribute("aria-expanded", !expanded);

  menu.dataset.open = !expanded;
}
/**
 * Form stuff
 */

function setSubmitted() {
  CONTACT_FORM.reset();
  enableForm();
  const target = document.querySelector('.success');
  toggleDataHidden(target);

  const timer = setTimeout(() => {
    if (target) {
      toggleDataHidden(target);
    }
  }, 2500)

  window.addEventListener('beforeunload', () => {
    clearTimeout(timer);
  });
}
function validateFormInput(args) {
  let hasErrors = false;

  for (const [ key, value ] of Object.entries(args)) {
    const fieldValue = value.trim();
    if (fieldValue === "") {
      hasErrors = true;
      const errorMessageId = `${key}_error`;
      const errorMessageElement = document.getElementById(errorMessageId);

      if (errorMessageElement) {
        toggleDataHidden(errorMessageElement);
        errorMessageElement.innerHTML = `${key} is required`;
      }
    }
  }
  return hasErrors;
}
function setErrorHappened() {
  disableForm();
  // TODO: add reset
}
function handleSubmit(event) {
  event.preventDefault();
  disableForm();
  const formData = new FormData(event.target);
  const { name, email, message } = Object.fromEntries(formData);

  const hasErrors = validateFormInput({ name: name, email: email, message: message });
  if (!hasErrors) {
    console.log("submitted")
    fetch("/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, message: message }),
    })
      .then(() => setSubmitted())
      .catch((error) => {
        console.log("something went wrong", error)
        setErrorHappened();
      });
  }
}
function handleInputChange(event) {
  const inputName = event.target.name;
  const errorMessageId = `${inputName}_error`;
  const errorMessageElement = document.getElementById(errorMessageId);
  if (errorMessageElement) {
    toggleDataHidden(errorMessageElement, true);
    errorMessageElement.innerHTML = '';
  }
}

/**
 * Tab list functions
 */

const PROJECTS = document.getElementById('projectsRef');
const TABS = [ ...PROJECTS.querySelectorAll('[role="tab"]') ];
let FOCUSED = false;
let TABFOCUS = 0;

function handleKeyPress(event) {
  event.preventDefault();
  const key = event.key;
  const targetId = TABS[ TABFOCUS ].getAttribute("aria-controls");
  const target = document.getElementById(targetId);
  switch (true) {
    case (key === "ArrowRight" || key === "ArrowLeft"):
      if (!FOCUSED) {
        moveFocus(key);
        focusElement(TABS[ TABFOCUS ]);
        changeTabs(TABS[ TABFOCUS ]);
        break;
      }
    case (key === "Tab" || key === "Enter"):
      FOCUSED = true;
      const targetId = TABS[ TABFOCUS ].getAttribute("aria-controls");
      const target = document.getElementById(targetId);
      const elementsArray = [
        ...(target.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )) ];

      if (elementsArray.length) {
        elementsArray[ 0 ].focus();
      }
      document.addEventListener('keydown', trapFocus);
      break;
    case key === "Escape":
      cleanupFocusEventListener();
      break;
  }

}
function cleanupFocusEventListener(){
  FOCUSED = false;
  document.removeEventListener('keydown', trapFocus);
  focusElement(TABS[ TABFOCUS ]);
}
function moveFocus(key) {
  TABS[ TABFOCUS ].setAttribute("tabindex", "-1");

  if (key === "ArrowRight") {
    TABFOCUS++;
    if (TABFOCUS >= TABS.length) {
      TABFOCUS = 0;
    }
  } else if (key === "ArrowLeft") {
    TABFOCUS--;
    if (TABFOCUS < 0) {
      TABFOCUS = TABS.length - 1;
    }
  }
}
function trapFocus(event) {
  event.preventDefault();
  if (event.key === 'Escape') {
    cleanupFocusEventListener();
    return;
  }
  const targetId = TABS[ TABFOCUS ].getAttribute("aria-controls");
  const target = document.getElementById(targetId);
  const elementsArray = [
    ...(target.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )) ];

  if (elementsArray.length) {
    const currentIndex = elementsArray.indexOf(document.activeElement);
    const lastIndex = elementsArray.length - 1;
    if (event.shiftKey && currentIndex === 0) {
      elementsArray[ lastIndex ].focus();
    } else if (!event.shiftKey && currentIndex === lastIndex) {
      elementsArray[ 0 ].focus();
    }
  }
}
function focusElement(target) {
  target.setAttribute("tabindex", "0");
  target.focus();
}
function changeTabs(target) {
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
function init() {
  const tabList = PROJECTS.querySelector('[role="tablist"]');
  if (tabList && TABS.length) {
    TABFOCUS = 0;

    document.addEventListener("click", function (event) {
      if (FOCUSED && !tabList.contains(event.target)) {
        FOCUSED = false;
      }
    })
    tabList.addEventListener("keydown", handleKeyPress);
    [ ...tabList
      .querySelectorAll('[role="tab"]') ]
      .forEach(button => button.addEventListener('click', (event) => changeTabs(event.target)));
  };


  CONTACT_FORM.addEventListener("submit", handleSubmit);

  [ 'name', 'email', 'message' ].forEach(inputName => {
    const target = CONTACT_FORM.querySelector(`.contact__form--${inputName}`)
    if (target) {
      target.addEventListener('change', handleInputChange);
    }
  })

  const menuButton = document.querySelector('.hamburger__button');
  const menuLinks = [...document.getElementById('menu-list').querySelectorAll('a')];

  menuButton.addEventListener('click', toggleHamburgerMenu);
  menuLinks.forEach(link => link.addEventListener('click', toggleHamburgerMenu))
}

init();