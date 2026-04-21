const NAV_GROUPS = [
  {
    title: "About",
    links: [
      { href: "index.html", label: "Home" },
      { href: "about-gcek.html", label: "About GCEK" },
      { href: "principal-message.html", label: "Principal's Message" },
      { href: "contact-directory.html", label: "Contact Directory" },
    ],
  },
  {
    title: "Academics",
    links: [
      { href: "academics-programmes.html", label: "Programmes" },
      { href: "academics-resources.html", label: "Academic Resources" },
      { href: "academics-governance.html", label: "Governance & Quality" },
      { href: "admissions.html", label: "Admissions" },
      { href: "academic-calendar.html", label: "Academic Calendar" },
    ],
  },
  {
    title: "Departments",
    links: [
      { href: "departments-overview.html", label: "Departments Overview" },
      { href: "department-civil.html", label: "Civil Engineering" },
      { href: "department-cse.html", label: "Computer Science & Engineering" },
      { href: "department-mechanical.html", label: "Mechanical Engineering" },
      { href: "department-eee.html", label: "Electrical & Electronics Engineering" },
      { href: "department-ece.html", label: "Electronics & Communication Engineering" },
      { href: "department-asm.html", label: "Applied Science & Mathematics" },
    ],
  },
  {
    title: "Campus Life",
    links: [
      { href: "campus-login.html", label: "Campus Login" },
      { href: "library-portal.html", label: "Library Portal" },
      { href: "hostel-information.html", label: "Hostel Information" },
      { href: "scholarship-notices.html", label: "Scholarship Notices" },
      { href: "alumni.html", label: "Alumni" },
    ],
  },
  {
    title: "Administration",
    links: [
      { href: "iqac.html", label: "IQAC" },
      { href: "mandatory-disclosure.html", label: "Mandatory Disclosure" },
      { href: "internal-committees.html", label: "Internal Committees" },
      { href: "meeting-minutes.html", label: "Meeting Minutes" },
      { href: "service-rules.html", label: "Service Rules" },
      { href: "forms-circulars.html", label: "Forms & Circulars" },
      { href: "aicte-grievance.html", label: "AICTE Grievance" },
    ],
  },
  {
    title: "Opportunities",
    links: [
      { href: "placement-cell.html", label: "Placement Cell" },
      { href: "tenders.html", label: "Tender Notices" },
      { href: "exam-forms.html", label: "Exam Forms" },
    ],
  },
];

const FOOTER_GROUPS = [
  {
    title: "Institution",
    links: [
      { href: "about-gcek.html", label: "About" },
      { href: "principal-message.html", label: "Principal" },
      { href: "contact-directory.html", label: "Contact" },
    ],
  },
  {
    title: "Academics",
    links: [
      { href: "academics-programmes.html", label: "Programmes" },
      { href: "academics-resources.html", label: "Resources" },
      { href: "admissions.html", label: "Admissions" },
      { href: "academic-calendar.html", label: "Calendar" },
    ],
  },
  {
    title: "Governance",
    links: [
      { href: "iqac.html", label: "IQAC" },
      { href: "mandatory-disclosure.html", label: "Disclosure" },
      { href: "meeting-minutes.html", label: "Minutes" },
      { href: "aicte-grievance.html", label: "Grievance" },
    ],
  },
  {
    title: "Student Links",
    links: [
      { href: "library-portal.html", label: "Library" },
      { href: "hostel-information.html", label: "Hostel" },
      { href: "scholarship-notices.html", label: "Scholarships" },
      { href: "placement-cell.html", label: "Placement" },
    ],
  },
];

const currentPage = (() => {
  const value = window.location.pathname.split("/").pop();
  return value || "index.html";
})();

const buildDropdownNav = () => {
  const nav = document.createElement("nav");
  nav.className = "main-nav dropdown-nav";
  nav.setAttribute("aria-label", "Primary");

  NAV_GROUPS.forEach((group) => {
    const details = document.createElement("details");
    details.className = "nav-group";

    const isActiveGroup = group.links.some((link) => link.href === currentPage);
    if (isActiveGroup) {
      details.open = true;
    }

    const summary = document.createElement("summary");
    summary.textContent = group.title;
    details.appendChild(summary);

    const menu = document.createElement("div");
    menu.className = "nav-menu";

    group.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href === currentPage) {
        anchor.classList.add("is-active");
      }
      menu.appendChild(anchor);
    });

    details.appendChild(menu);
    nav.appendChild(details);
  });

  return nav;
};

const buildFooter = () => {
  const footer = document.createElement("footer");
  footer.className = "footer site-footer";

  const identity = document.createElement("div");
  identity.className = "footer-identity";
  identity.innerHTML = `
    <h3>Government College of Engineering, Kannur</h3>
    <p>Mangattuparamba, Parassinikadavu P.O., Kannur, Kerala 670563</p>
    <p>Prototype navigation/footer system for the redesigned site.</p>
  `;
  footer.appendChild(identity);

  const columns = document.createElement("div");
  columns.className = "footer-columns";

  FOOTER_GROUPS.forEach((group) => {
    const column = document.createElement("div");
    column.className = "footer-column";
    column.innerHTML = `<h4>${group.title}</h4>`;

    group.links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (link.href === currentPage) {
        anchor.classList.add("is-active");
      }
      column.appendChild(anchor);
    });

    columns.appendChild(column);
  });

  footer.appendChild(columns);

  const note = document.createElement("p");
  note.className = "footer-note";
  note.textContent = "All pages now share one dropdown navigation and one common footer. Replace placeholder content before publishing.";
  footer.appendChild(note);

  return footer;
};

const mountSharedChrome = () => {
  const shell = document.querySelector(".site-shell");
  const topbar = shell?.querySelector(".topbar");
  if (!shell || !topbar) {
    return;
  }

  const existingNav = shell.querySelector(".main-nav");
  const nextNav = buildDropdownNav();
  if (existingNav) {
    existingNav.replaceWith(nextNav);
  } else {
    topbar.insertAdjacentElement("afterend", nextNav);
  }

  const existingFooter = shell.querySelector(".footer");
  const nextFooter = buildFooter();
  if (existingFooter) {
    nextFooter.id = existingFooter.id || "";
    existingFooter.replaceWith(nextFooter);
  } else {
    shell.appendChild(nextFooter);
  }
};

const closeOtherMenus = (activeGroup) => {
  document.querySelectorAll(".nav-group").forEach((group) => {
    if (group !== activeGroup) {
      group.open = false;
    }
  });
};

const initSharedChrome = () => {
  mountSharedChrome();

  document.querySelectorAll(".nav-group").forEach((group) => {
    group.addEventListener("toggle", () => {
      if (group.open) {
        closeOtherMenus(group);
      }
    });
  });

  document.addEventListener("click", (event) => {
    const insideNav = event.target.closest(".dropdown-nav");
    if (!insideNav) {
      closeOtherMenus(null);
    }
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSharedChrome);
} else {
  initSharedChrome();
}
