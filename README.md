# Frontend Coursework Archive

This repository contains frontend laboratory work and homework completed during Code Academy training. Existing exercises are preserved as independent projects and organized by task type and topic.

## Repository structure

```text
.
├── Labs
│   ├── Bootstrap
│   └── HTML
├── Homework
│   ├── Bootstrap
│   ├── CSS
│   ├── DOM
│   ├── HTML
│   └── JavaScript
├── .gitignore
└── README.md
```

Folders whose original names contained `Lab` are under `Labs`. All other exercises are under `Homework`.

## Status legend

| Status | Meaning |
|---|---|
| Working | No known issue was found during source and local-reference inspection. |
| Incomplete | The original exercise has a known missing part. |
| Unchecked | The exercise has not yet received a browser-level review. |
| Duplicate example | The exercise repeats material that also appears in a larger example. |

The status is an archive note, not a full cross-browser certification.

## Labs

| Project | Previous folder | Focus | Status |
|---|---|---|---|
| [Freelancer Portfolio](Labs/Bootstrap/FreelancerPortfolio/) | `HTMLTaskLab002` | Bootstrap layout, portfolio sections, scroll navigation | Working |
| [Informational Pages](Labs/HTML/InformationalPages/) | `HTMLTaskLab` | Standalone pages about Albert Einstein, Apple, and FC Barcelona | Working |

## Homework

### HTML and CSS

| Project | Previous folder | Focus | Status |
|---|---|---|---|
| [Basic Pages](Homework/HTML/BasicPages/) | `HTMLTask001` | HTML structure, registration form, CV page | Working |
| [Typography Practice](Homework/CSS/TypographyPractice/) | `HTMLTask002` | Fonts and basic styling | Working |
| [Multi-Page Layouts](Homework/CSS/MultiPageLayouts/) | `HTMLTask003` | Cards, grids, delivery layout, wedding invitation | Working |
| [Positioning Practice](Homework/CSS/PositioningPractice/) | `HTMLTask004` | CSS positioning | Working |
| [CV and Hotel Layouts](Homework/CSS/CvAndHotelLayouts/) | `HTMLTask005` | CV and hotel landing-page layouts | Working |
| [Portfolio and Clinic Layouts](Homework/Bootstrap/PortfolioAndClinicLayouts/) | `HTMLTask006` | Bootstrap portfolio and clinic pages | Incomplete |

The portfolio page links to `resume.html` and `projects.html`, but those two pages were not present in the original repository.

### JavaScript and browser APIs

| Project | Previous folder | Focus | Status |
|---|---|---|---|
| [JavaScript Fundamentals](Homework/JavaScript/Fundamentals/) | `HTMLTask007` | Conditions, loops, arrays, prime-number exercise | Duplicate example |
| [Algorithm Exercises](Homework/JavaScript/AlgorithmExercises/) | `HTMLTask008` | Functions, arrays, reduction, classes, string exercises | Working |
| [HTTP Request Examples](Homework/JavaScript/HttpRequestExamples/) | `HTMLTask012` | Fetch, Axios, and jQuery AJAX | Working |
| [List, Sidebar, and Basket](Homework/DOM/ListSidebarAndBasket/) | `HTMLTask009` | DOM creation, sidebar interaction, Local Storage basket | Working |
| [Basic Calculator](Homework/DOM/BasicCalculator/) | `HTMLTask010` | Input handling and arithmetic operations | Working |
| [Drag and Drop Boxes](Homework/DOM/DragAndDropBoxes/) | `HTMLTask011` | Drag-and-drop events and validation | Working |

### Coverage additions

These small exercises restore topics that appear in the mentor's frontend labs but were absent from this repository.

| Project | Focus | Status |
|---|---|---|
| [Form Validation](Homework/DOM/FormValidation/) | Email, password rules, matching confirmation | Working |
| [Live Search](Homework/DOM/LiveSearch/) | Input events, filtering, highlighted matches | Working |
| [Quiz With Timer](Homework/DOM/QuizWithTimer/) | Radio inputs, scoring, countdown, restart | Working |
| [Stopwatch](Homework/DOM/Stopwatch/) | Start, pause, reset, elapsed time, lap records | Working |

## Mentor repository comparison

Frontend topics were compared with [novruzov9/PA201Lab](https://github.com/novruzov9/PA201Lab), focusing on its beginner frontend labs and excluding its backend projects.

| Mentor area | Coverage in this repository |
|---|---|
| Lab 10: HTML content, links, media, tables, and standalone pages | Covered by Basic Pages and Informational Pages |
| Lab 11: Bootstrap Freelancer-style page | Covered by Freelancer Portfolio |
| Lab 12: form validation | Added as Form Validation |
| Lab 12: live search | Added as Live Search |
| Lab 12: quiz and countdown | Added as Quiz With Timer |
| Lab 12: timer controls and laps | Added as Stopwatch |

The mentor repository also contains larger API-integrated and React/TypeScript applications. Those are intentionally deferred because they are separate, longer project work rather than quick archive organization.

## Validation performed

- Checked 29 HTML files for local `href` and `src` references.
- Checked the syntax of 13 JavaScript files without executing application behavior.
- Confirmed that generated dependency and build directories are not stored in the repository.
- Did not run package installation or a project-wide build because these exercises do not use a package manifest.
- Did not perform full visual or cross-browser testing.

Several projects load fonts, images, Bootstrap, SweetAlert, Axios, jQuery, or API data from external services and therefore require an internet connection.

## Running an exercise

Open an HTML file directly in a modern browser. A local static server can also be used, but no package installation is required.

Examples:

- `Labs/Bootstrap/FreelancerPortfolio/index.html`
- `Homework/DOM/BasicCalculator/index.html`
- `Homework/DOM/FormValidation/index.html`

## GitHub Pages

GitHub Pages can host this repository because the projects are static. The best time to enable it is after this organization branch is merged, because the final URLs depend on the new folder names.

A useful deployment should first add a small root `index.html` catalog linking to every exercise, then publish the `main` branch root through GitHub Pages. That deployment and browser review are kept as a separate step so archive organization stays independent from hosting work.

## Deferred larger work

- Recover or rebuild the missing portfolio `resume.html` and `projects.html` pages.
- Add a root visual catalog and test every link before enabling GitHub Pages.
- Perform full desktop/mobile browser and responsive-layout review.
- Recreate the mentor repository's larger API-integrated frontend application, if it belongs in this archive.
- Add React/TypeScript/Vite coursework as a separate section, if the original local work is available.
