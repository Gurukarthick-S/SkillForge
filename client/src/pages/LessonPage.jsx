
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const lessonData = {
  javascript: {
    title: "JavaScript Basics",
    description: "Learn the fundamentals of programming with JavaScript.",
    lessons: [
      {
        title: "Introduction to JavaScript",
        duration: "10 min",
        content: [
          {
            heading: "What is JavaScript?",
            text: "JavaScript is a programming language that makes websites interactive. HTML provides structure, CSS adds styling, and JavaScript adds behavior.",
          },
          {
            heading: "Where is JavaScript used?",
            text: "JavaScript can handle button clicks, validate forms, update page content, fetch data from APIs, and build applications using React and Node.js.",
          },
        ],
        example: `console.log("Hello, World!");`,
      },
      {
        title: "Variables and Data Types",
        duration: "15 min",
        content: [
          {
            heading: "What is a variable?",
            text: "A variable stores a value that your program can use later. JavaScript provides let and const for declaring variables.",
          },
          {
            heading: "Common data types",
            text: "Common types include strings for text, numbers for numeric values, booleans for true or false, undefined for unassigned values, and objects for grouped data.",
          },
        ],
        example: `let name = "Alex";\nconst age = 20;\nlet isStudent = true;\n\nconsole.log(name);\nconsole.log(age);\nconsole.log(isStudent);`,
      },
      {
        title: "Operators and Conditions",
        duration: "15 min",
        content: [
          {
            heading: "Operators",
            text: "Operators perform actions on values. Arithmetic operators include +, -, * and /. Comparison operators include ===, !==, > and <.",
          },
          {
            heading: "Conditional statements",
            text: "An if statement runs code when a condition is true. An else block handles the alternative case.",
          },
        ],
        example: `const age = 20;\n\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}`,
      },
      {
        title: "Loops",
        duration: "15 min",
        content: [
          {
            heading: "Why use loops?",
            text: "Loops repeat a block of code and help you avoid writing the same instructions multiple times.",
          },
          {
            heading: "The for loop",
            text: "A for loop typically contains initialization, a condition, and an update. It repeats until the condition becomes false.",
          },
        ],
        example: `for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}`,
      },
      {
        title: "Functions",
        duration: "15 min",
        content: [
          {
            heading: "What is a function?",
            text: "A function is a reusable block of code that performs a task. It can accept parameters and return a result.",
          },
          {
            heading: "Calling a function",
            text: "Defining a function does not automatically execute it. You call it by writing its name followed by parentheses.",
          },
        ],
        example: `function add(a, b) {\n  return a + b;\n}\n\nconst result = add(3, 4);\nconsole.log(result);`,
      },
    ],
  },

  html: {
    title: "HTML Fundamentals",
    description: "Learn how to structure web pages using HTML.",
    lessons: [
      {
        title: "Introduction to HTML",
        duration: "10 min",
        content: [
          {
            heading: "What is HTML?",
            text: "HTML stands for HyperText Markup Language. It defines the structure and meaning of content on a web page using elements and tags.",
          },
          {
            heading: "Basic HTML document",
            text: "A standard HTML document contains a doctype declaration, an html element, a head section for metadata, and a body section for visible content.",
          },
        ],
        example: `<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n  <p>My first web page.</p>\n</body>\n</html>`,
      },
      {
        title: "HTML Document Structure",
        duration: "15 min",
        content: [
          {
            heading: "Understanding the structure",
            text: "The head element contains metadata and the document title. The body contains the content displayed on the page.",
          },
        ],
        example: `<body>\n  <header>My Website</header>\n  <main>\n    <h1>Welcome</h1>\n    <p>Page content goes here.</p>\n  </main>\n  <footer>Copyright 2026</footer>\n</body>`,
      },
      {
        title: "Headings and Paragraphs",
        duration: "10 min",
        content: [
          {
            heading: "Headings",
            text: "HTML provides six heading levels, from h1 to h6. Use them to organize content into a meaningful hierarchy.",
          },
          {
            heading: "Paragraphs",
            text: "The p element represents a paragraph of text. Use headings and paragraphs to make content easier to read.",
          },
        ],
        example: `<h1>Main Heading</h1>\n<h2>Section Heading</h2>\n<p>This is a paragraph.</p>`,
      },
      {
        title: "Links and Images",
        duration: "15 min",
        content: [
          {
            heading: "Links",
            text: "The a element creates a hyperlink. Its href attribute specifies the destination.",
          },
          {
            heading: "Images",
            text: "The img element displays an image. Always provide meaningful alt text when the image conveys information.",
          },
        ],
        example: `<a href="https://example.com">Visit Example</a>\n\n<img src="photo.jpg" alt="A mountain landscape">`,
      },
      {
        title: "Lists and Tables",
        duration: "15 min",
        content: [
          {
            heading: "Lists",
            text: "Use ul for an unordered list and ol for an ordered list. Each list item is represented by li.",
          },
          {
            heading: "Tables",
            text: "Use table, tr, th and td to represent tabular information. Tables should be used for data, not page layout.",
          },
        ],
        example: `<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Alex</td><td>20</td></tr>\n</table>`,
      },
      {
        title: "Forms and Input Elements",
        duration: "20 min",
        content: [
          {
            heading: "HTML forms",
            text: "Forms collect information from users. Input elements can collect text, email addresses, passwords, and other types of data.",
          },
          {
            heading: "Labels and accessibility",
            text: "Use a label associated with each input so users can understand what information is required.",
          },
        ],
        example: `<form>\n  <label for="email">Email:</label>\n  <input id="email" type="email" required>\n  <button type="submit">Submit</button>\n</form>`,
      },
    ],
  },

  css: {
    title: "CSS Fundamentals",
    description: "Learn to style web pages with CSS.",
    lessons: [
      {
        title: "Introduction to CSS",
        duration: "10 min",
        content: [
          {
            heading: "What is CSS?",
            text: "CSS stands for Cascading Style Sheets. It controls how HTML elements look, including colors, spacing, fonts and layout.",
          },
          {
            heading: "Ways to add CSS",
            text: "CSS can be written in an external stylesheet, inside a style element, or in an element's style attribute. External stylesheets are usually easier to maintain.",
          },
        ],
        example: `/* styles.css */\nbody {\n  font-family: Arial, sans-serif;\n  background: #f8fafc;\n}\n\nh1 {\n  color: #047857;\n}`,
      },
      {
        title: "Selectors and Properties",
        duration: "15 min",
        content: [
          {
            heading: "CSS selectors",
            text: "Selectors identify which HTML elements should receive styles. Common selectors include element, class and ID selectors.",
          },
        ],
        example: `p {\n  color: #475569;\n}\n\n.card {\n  padding: 16px;\n}\n\n#main-title {\n  font-size: 28px;\n}`,
      },
      {
        title: "Colors and Typography",
        duration: "15 min",
        content: [
          {
            heading: "Colors",
            text: "CSS supports named colors, hexadecimal values, RGB and HSL. Choose readable text and background combinations.",
          },
          {
            heading: "Typography",
            text: "Font family, size, weight and line height help create a clear visual hierarchy.",
          },
        ],
        example: `body {\n  color: #1e293b;\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}\n\nh1 {\n  font-size: 2rem;\n  font-weight: 700;\n}`,
      },
      {
        title: "Box Model",
        duration: "15 min",
        content: [
          {
            heading: "The four parts",
            text: "The CSS box model consists of content, padding, border and margin. Padding adds space inside the border; margin adds space outside it.",
          },
        ],
        example: `.card {\n  width: 300px;\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  margin: 16px;\n  box-sizing: border-box;\n}`,
      },
      {
        title: "Flexbox",
        duration: "20 min",
        content: [
          {
            heading: "Flexible layouts",
            text: "Flexbox arranges elements along a row or column. It is useful for navigation bars, aligned buttons and one-dimensional layouts.",
          },
        ],
        example: `.container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}`,
      },
      {
        title: "CSS Grid",
        duration: "20 min",
        content: [
          {
            heading: "Grid layouts",
            text: "CSS Grid is useful for two-dimensional layouts with rows and columns, such as dashboards and card grids.",
          },
        ],
        example: `.grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}`,
      },
      {
        title: "Responsive Design",
        duration: "20 min",
        content: [
          {
            heading: "Responsive websites",
            text: "Responsive design helps websites adapt to different screen sizes using flexible layouts, fluid sizing and media queries.",
          },
        ],
        example: `.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}`,
      },
      {
        title: "CSS Best Practices",
        duration: "15 min",
        content: [
          {
            heading: "Maintainable CSS",
            text: "Use clear class names, avoid unnecessary duplication, organize styles logically, and test your layouts at different screen sizes.",
          },
        ],
        example: `.button {\n  padding: 10px 16px;\n  border: 0;\n  border-radius: 8px;\n  cursor: pointer;\n}\n\n.button-primary {\n  background: #059669;\n  color: white;\n}`,
      },
    ],
  },

  react: {
    title: "React.js",
    description: "Build dynamic user interfaces with React.",
    lessons: [
      {
        title: "Introduction to React",
        duration: "15 min",
        content: [
          {
            heading: "What is React?",
            text: "React is a JavaScript library for building user interfaces from reusable components.",
          },
        ],
        example: `function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default Welcome;`,
      },
      {
        title: "Components and JSX",
        duration: "15 min",
        content: [
          {
            heading: "Components",
            text: "A component is a reusable piece of interface. JSX lets you describe UI using a syntax similar to HTML inside JavaScript.",
          },
        ],
        example: `function Greeting() {\n  const name = "Alex";\n  return <p>Hello, {name}!</p>;\n}`,
      },
      {
        title: "Props",
        duration: "15 min",
        content: [
          {
            heading: "Passing data",
            text: "Props allow a parent component to pass data to a child component. Treat props as read-only.",
          },
        ],
        example: `function Welcome({ name }) {\n  return <h1>Welcome, {name}!</h1>;\n}\n\n<Welcome name="Alex" />`,
      },
      {
        title: "State with useState",
        duration: "20 min",
        content: [
          {
            heading: "Component state",
            text: "The useState hook lets a component remember information and update its UI when that information changes.",
          },
        ],
        example: `import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}`,
      },
      {
        title: "Handling Events",
        duration: "15 min",
        content: [
          {
            heading: "Responding to actions",
            text: "React event handlers let you respond to actions such as clicks and form submissions.",
          },
        ],
        example: `function Button() {\n  function handleClick() {\n    alert("Button clicked!");\n  }\n\n  return <button onClick={handleClick}>Click me</button>;\n}`,
      },
      {
        title: "Rendering Lists",
        duration: "15 min",
        content: [
          {
            heading: "Rendering arrays",
            text: "Use map() to render an array of items. Give each rendered item a stable key.",
          },
        ],
        example: `const skills = ["HTML", "CSS", "React"];\n\nfunction SkillList() {\n  return (\n    <ul>\n      {skills.map((skill) => (\n        <li key={skill}>{skill}</li>\n      ))}\n    </ul>\n  );\n}`,
      },
      {
        title: "useEffect",
        duration: "20 min",
        content: [
          {
            heading: "Synchronizing with external systems",
            text: "useEffect is used for effects such as fetching data or subscribing to external systems. Include the appropriate dependencies and clean up subscriptions when needed.",
          },
        ],
        example: `import { useEffect } from "react";\n\nuseEffect(() => {\n  document.title = "My App";\n}, []);`,
      },
      {
        title: "Forms in React",
        duration: "20 min",
        content: [
          {
            heading: "Handling form input",
            text: "Controlled inputs use React state as their value. Updating state keeps the displayed input synchronized with your component.",
          },
        ],
        example: `const [name, setName] = useState("");\n\nreturn (\n  <input\n    value={name}\n    onChange={(event) => setName(event.target.value)}\n  />\n);`,
      },
      {
        title: "React Router",
        duration: "20 min",
        content: [
          {
            heading: "Navigation in React",
            text: "React Router lets a React application display different pages based on the current URL without requiring a full page reload for every navigation.",
          },
        ],
        example: `import { Link } from "react-router-dom";\n\nfunction Navigation() {\n  return <Link to="/dashboard">Dashboard</Link>;\n}`,
      },
      {
        title: "API Integration",
        duration: "25 min",
        content: [
          {
            heading: "Fetching data",
            text: "A frontend can request data from a backend API using fetch or a library such as Axios. Handle loading states and errors.",
          },
        ],
        example: `async function loadJobs() {\n  const response = await fetch("/api/jobs");\n  if (!response.ok) {\n    throw new Error("Failed to load jobs");\n  }\n  return response.json();\n}`,
      },
      {
        title: "Reusable Components",
        duration: "20 min",
        content: [
          {
            heading: "Reuse and composition",
            text: "Split interfaces into components with clear responsibilities. Use props to customize reusable components.",
          },
        ],
        example: `function Card({ title, children }) {\n  return (\n    <section className="card">\n      <h2>{title}</h2>\n      {children}\n    </section>\n  );\n}`,
      },
      {
        title: "Building a React Project",
        duration: "30 min",
        content: [
          {
            heading: "Put the concepts together",
            text: "Build a small application using components, state, forms, routing and API calls. Test empty states and error states before deploying.",
          },
        ],
        example: `// Example project structure\nsrc/\n  components/\n  pages/\n  App.jsx\n  main.jsx`,
      },
    ],
  },

  responsive: {
    title: "Responsive Design & Deployment",
    description: "Make websites work across devices and deploy them online.",
    lessons: [
      {
        title: "Mobile-First Design",
        duration: "15 min",
        content: [
          {
            heading: "Start with small screens",
            text: "Design the core experience for smaller screens first, then enhance the layout for larger screens.",
          },
        ],
        example: `.container {\n  padding: 16px;\n}\n\n@media (min-width: 768px) {\n  .container {\n    padding: 32px;\n  }\n}`,
      },
      {
        title: "Media Queries",
        duration: "15 min",
        content: [
          {
            heading: "Adapt to screen sizes",
            text: "Media queries apply CSS only when conditions such as viewport width are met.",
          },
        ],
        example: `@media (max-width: 600px) {\n  .sidebar {\n    display: none;\n  }\n}`,
      },
      {
        title: "Responsive Images",
        duration: "10 min",
        content: [
          {
            heading: "Flexible images",
            text: "Images should scale within their containers to prevent overflow on narrow screens.",
          },
        ],
        example: `img {\n  max-width: 100%;\n  height: auto;\n}`,
      },
      {
        title: "Accessibility Basics",
        duration: "20 min",
        content: [
          {
            heading: "Accessible interfaces",
            text: "Use semantic elements, meaningful labels, keyboard-accessible controls and sufficient color contrast.",
          },
        ],
        example: `<button type="button" aria-label="Open menu">\n  Menu\n</button>`,
      },
      {
        title: "Website Optimization",
        duration: "20 min",
        content: [
          {
            heading: "Improve performance",
            text: "Optimize image sizes, remove unused code, and measure page performance before making changes.",
          },
        ],
        example: `// Load a non-critical image lazily\n<img src="/image.webp" alt="Example" loading="lazy" />`,
      },
      {
        title: "Git and GitHub",
        duration: "20 min",
        content: [
          {
            heading: "Version control",
            text: "Git tracks changes in your project. GitHub hosts repositories and supports collaboration.",
          },
        ],
        example: `git init\ngit add .\ngit commit -m "Initial commit"`,
      },
      {
        title: "Deploying a Website",
        duration: "20 min",
        content: [
          {
            heading: "Publish your site",
            text: "A deployment platform builds and serves your application. Configure environment variables and test the production URL.",
          },
        ],
        example: `npm run build\n# Deploy the generated dist folder`,
      },
      {
        title: "Final Portfolio Project",
        duration: "30 min",
        content: [
          {
            heading: "Build a portfolio",
            text: "Create a responsive portfolio with an introduction, projects, skills and contact information. Test it on mobile and desktop.",
          },
        ],
        example: `// Suggested portfolio sections\n// 1. About\n// 2. Skills\n// 3. Projects\n// 4. Contact`,
      },
    ],
  },

  node: {
    title: "Node.js Fundamentals",
    description: "Learn server-side JavaScript with Node.js.",
    lessons: [
      {
        title: "Introduction to Node.js",
        duration: "10 min",
        content: [
          {
            heading: "What is Node.js?",
            text: "Node.js is a runtime that allows JavaScript to run outside the browser, including on servers.",
          },
        ],
        example: `console.log("Hello from Node.js!");\n// Run with: node app.js`,
      },
      {
        title: "Modules and npm",
        duration: "15 min",
        content: [
          {
            heading: "Modules",
            text: "Modules help split code into reusable files. npm manages JavaScript project packages.",
          },
        ],
        example: `// CommonJS example\nconst path = require("path");\nconsole.log(path.basename("/app/index.js"));`,
      },
      {
        title: "File System",
        duration: "15 min",
        content: [
          {
            heading: "Working with files",
            text: "Node.js provides APIs for reading and writing files. Prefer asynchronous methods for normal application work.",
          },
        ],
        example: `import { readFile } from "node:fs/promises";\n\nconst text = await readFile("notes.txt", "utf8");\nconsole.log(text);`,
      },
      {
        title: "Environment Variables",
        duration: "10 min",
        content: [
          {
            heading: "Configuration",
            text: "Environment variables store configuration outside your source code. Never commit secret values to a public repository.",
          },
        ],
        example: `import "dotenv/config";\n\nconst port = process.env.PORT || 5000;\nconsole.log(port);`,
      },
      {
        title: "Asynchronous Programming",
        duration: "20 min",
        content: [
          {
            heading: "Promises and async/await",
            text: "Asynchronous code lets Node.js handle operations such as network and file access without blocking on every operation.",
          },
        ],
        example: `async function main() {\n  const result = await Promise.resolve("Done");\n  console.log(result);\n}\n\nmain();`,
      },
      {
        title: "Building a Node.js Server",
        duration: "20 min",
        content: [
          {
            heading: "HTTP server",
            text: "A server listens for requests and sends responses. Frameworks such as Express simplify this work.",
          },
        ],
        example: `import { createServer } from "node:http";\n\ncreateServer((req, res) => {\n  res.end("Hello!");\n}).listen(5000);`,
      },
      {
        title: "Error Handling",
        duration: "15 min",
        content: [
          {
            heading: "Handle failures",
            text: "Use try/catch for awaited operations and return useful errors without exposing secrets or internal details.",
          },
        ],
        example: `try {\n  const result = await doWork();\n  console.log(result);\n} catch (error) {\n  console.error("Operation failed");\n}`,
      },
      {
        title: "Node.js Project",
        duration: "30 min",
        content: [
          {
            heading: "Build a small service",
            text: "Combine modules, configuration, asynchronous operations and error handling into a small server-side application.",
          },
        ],
        example: `// Suggested files\n// server.js\n// routes/\n// controllers/\n// utils/`,
      },
    ],
  },

  express: {
    title: "Express.js & REST APIs",
    description: "Create backend routes and RESTful APIs.",
    lessons: [
      {
        title: "Introduction to Express",
        duration: "10 min",
        content: [
          {
            heading: "What is Express?",
            text: "Express is a Node.js web framework that simplifies routing, middleware and HTTP responses.",
          },
        ],
        example: `import express from "express";\nconst app = express();\napp.get("/", (req, res) => res.send("Hello"));\napp.listen(5000);`,
      },
      {
        title: "Creating a Server",
        duration: "15 min",
        content: [
          {
            heading: "Start an Express server",
            text: "Create an Express app, configure middleware and listen on a port to accept requests.",
          },
        ],
        example: `import express from "express";\nconst app = express();\napp.use(express.json());\napp.listen(5000, () => console.log("Server ready"));`,
      },
      {
        title: "Routes and HTTP Methods",
        duration: "15 min",
        content: [
          {
            heading: "HTTP methods",
            text: "GET retrieves data, POST creates data, PUT or PATCH updates data, and DELETE removes data.",
          },
        ],
        example: `app.get("/api/items", getItems);\napp.post("/api/items", createItem);\napp.patch("/api/items/:id", updateItem);\napp.delete("/api/items/:id", deleteItem);`,
      },
      {
        title: "Request and Response",
        duration: "15 min",
        content: [
          {
            heading: "Handling requests",
            text: "Express exposes route parameters through req.params, query parameters through req.query and parsed JSON bodies through req.body when JSON middleware is configured.",
          },
        ],
        example: `app.get("/api/users/:id", (req, res) => {\n  res.json({ userId: req.params.id });\n});`,
      },
      {
        title: "Middleware",
        duration: "20 min",
        content: [
          {
            heading: "What is middleware?",
            text: "Middleware runs during the request-response cycle. It can inspect requests, authenticate users, log activity or pass control to the next handler.",
          },
        ],
        example: `app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});`,
      },
      {
        title: "REST API Design",
        duration: "20 min",
        content: [
          {
            heading: "Resource-based URLs",
            text: "Use clear resource names, appropriate HTTP methods and consistent status codes. Keep API responses predictable.",
          },
        ],
        example: `GET    /api/jobs\nGET    /api/jobs/:id\nPOST   /api/jobs\nPATCH  /api/jobs/:id\nDELETE /api/jobs/:id`,
      },
      {
        title: "Validation and Error Handling",
        duration: "20 min",
        content: [
          {
            heading: "Validate incoming data",
            text: "Check required fields, data types and allowed values before saving user input. Return an appropriate 4xx response for invalid requests.",
          },
        ],
        example: `if (!req.body.title) {\n  return res.status(400).json({\n    message: "Title is required",\n  });\n}`,
      },
      {
        title: "API Testing",
        duration: "20 min",
        content: [
          {
            heading: "Test your endpoints",
            text: "Use tools such as Postman to test success cases, invalid inputs, missing resources and server errors.",
          },
        ],
        example: `// Test with Postman\n// GET http://localhost:5000/api/jobs`,
      },
      {
        title: "Controllers and Routes",
        duration: "20 min",
        content: [
          {
            heading: "Separate responsibilities",
            text: "Routes define endpoint paths, while controllers contain the logic that handles requests. This separation improves maintainability.",
          },
        ],
        example: `// routes/jobRoutes.js\nrouter.get("/", getJobs);\n\n// controllers/jobController.js\nexport async function getJobs(req, res) {\n  res.json({ jobs: [] });\n}`,
      },
      {
        title: "Building a REST API",
        duration: "30 min",
        content: [
          {
            heading: "Put the pieces together",
            text: "Build an API with routes, controllers, validation, database operations, error handling and tests.",
          },
        ],
        example: `// Typical request flow:\n// Client -> Route -> Middleware\n// -> Controller -> Database -> Response`,
      },
    ],
  },

  mongodb: {
    title: "MongoDB & Mongoose",
    description: "Store, query and manage application data.",
    lessons: [
      {
        title: "Introduction to MongoDB",
        duration: "10 min",
        content: [
          {
            heading: "What is MongoDB?",
            text: "MongoDB is a document-oriented database that stores records in BSON documents organized into collections.",
          },
        ],
        example: `{\n  "name": "Alex",\n  "role": "Developer",\n  "skills": ["React", "Node.js"]\n}`,
      },
      {
        title: "Documents and Collections",
        duration: "15 min",
        content: [
          {
            heading: "Database structure",
            text: "A database contains collections, and each collection contains documents. Documents can contain nested objects and arrays.",
          },
        ],
        example: `// Collection: users\n{\n  name: "Alex",\n  email: "alex@example.com"\n}`,
      },
      {
        title: "CRUD Operations",
        duration: "20 min",
        content: [
          {
            heading: "Create, read, update, delete",
            text: "CRUD operations create documents, retrieve them, update their values and delete them when appropriate.",
          },
        ],
        example: `db.users.insertOne({ name: "Alex" });\ndb.users.find({ name: "Alex" });\ndb.users.updateOne(\n  { name: "Alex" },\n  { $set: { role: "Developer" } }\n);`,
      },
      {
        title: "Queries and Filters",
        duration: "15 min",
        content: [
          {
            heading: "Find matching documents",
            text: "Filters specify which documents match a query. Comparison operators can filter numeric and other field values.",
          },
        ],
        example: `db.jobs.find({ location: "Remote" });\ndb.jobs.find({ salaryMin: { $gte: 50000 } });`,
      },
      {
        title: "Mongoose Models",
        duration: "15 min",
        content: [
          {
            heading: "What is Mongoose?",
            text: "Mongoose is an ODM for Node.js that provides schemas, models, validation and convenient database operations.",
          },
        ],
        example: `import mongoose from "mongoose";\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n});\n\nconst User = mongoose.model("User", userSchema);`,
      },
      {
        title: "Schemas and Validation",
        duration: "15 min",
        content: [
          {
            heading: "Define valid data",
            text: "Schemas describe document fields and can enforce requirements such as required values, types and allowed enum values.",
          },
        ],
        example: `const skillSchema = new mongoose.Schema({\n  skillName: { type: String, required: true },\n  percentage: { type: Number, min: 0, max: 100 },\n});`,
      },
      {
        title: "Relationships",
        duration: "20 min",
        content: [
          {
            heading: "Referencing documents",
            text: "Related documents can reference one another using ObjectId fields. Choose references or embedded data based on how the data is accessed.",
          },
        ],
        example: `const jobSchema = new mongoose.Schema({\n  title: String,\n  createdBy: {\n    type: mongoose.Schema.Types.ObjectId,\n    ref: "User",\n  },\n});`,
      },
      {
        title: "Connecting MongoDB to Express",
        duration: "20 min",
        content: [
          {
            heading: "Connect your backend",
            text: "Store the database connection string in an environment variable and connect before handling requests that depend on the database.",
          },
        ],
        example: `import mongoose from "mongoose";\n\nawait mongoose.connect(process.env.MONGO_URI);\nconsole.log("MongoDB connected");`,
      },
    ],
  },

  authentication: {
    title: "Authentication & Deployment",
    description: "Secure your application and deploy it.",
    lessons: [
      {
        title: "Authentication Fundamentals",
        duration: "15 min",
        content: [
          {
            heading: "Authentication and authorization",
            text: "Authentication verifies who a user is. Authorization determines what that user is allowed to access.",
          },
        ],
        example: `// Example request header\nAuthorization: Bearer <access-token>`,
      },
      {
        title: "Password Hashing",
        duration: "15 min",
        content: [
          {
            heading: "Store passwords safely",
            text: "Never store plaintext passwords. Use a suitable password hashing algorithm such as bcrypt or Argon2.",
          },
        ],
        example: `const hash = await bcrypt.hash(password, 10);\nconst valid = await bcrypt.compare(password, hash);`,
      },
      {
        title: "Login and Registration APIs",
        duration: "20 min",
        content: [
          {
            heading: "Account flows",
            text: "Registration validates user details and securely stores a password hash. Login verifies the supplied password and establishes an authenticated session or token.",
          },
        ],
        example: `// Typical endpoints\nPOST /api/users/register\nPOST /api/users/login`,
      },
      {
        title: "JSON Web Tokens",
        duration: "20 min",
        content: [
          {
            heading: "Token-based authentication",
            text: "JWTs carry signed claims. Verify tokens on the server and avoid placing sensitive secrets in their payload.",
          },
        ],
        example: `const token = jwt.sign(\n  { userId: user._id },\n  process.env.JWT_SECRET,\n  { expiresIn: "1h" }\n);`,
      },
      {
        title: "Authorization",
        duration: "20 min",
        content: [
          {
            heading: "Protect resources",
            text: "Check the authenticated user's identity and permissions before allowing access to protected routes or other users' data.",
          },
        ],
        example: `// Example protected endpoint\nrouter.get("/profile", authMiddleware, getProfile);`,
      },
      {
        title: "Environment Variables",
        duration: "10 min",
        content: [
          {
            heading: "Keep configuration separate",
            text: "Use environment variables for database URIs, token secrets and deployment configuration. Do not commit real secrets.",
          },
        ],
        example: `PORT=5000\nMONGO_URI=your_database_uri\nJWT_SECRET=your_secret`,
      },
      {
        title: "Security Best Practices",
        duration: "20 min",
        content: [
          {
            heading: "Build safer APIs",
            text: "Validate input, apply authorization checks, configure CORS carefully, use HTTPS in production and avoid exposing internal error details.",
          },
        ],
        example: `// Allow only your trusted frontend origin\napp.use(cors({\n  origin: process.env.CLIENT_URL,\n  credentials: true,\n}));`,
      },
      {
        title: "Deploying a Backend",
        duration: "20 min",
        content: [
          {
            heading: "Production deployment",
            text: "Configure the production environment, database access, start command and health endpoint. Verify the deployed API before connecting the frontend.",
          },
        ],
        example: `// Example start script\n"scripts": {\n  "start": "node server.js"\n}`,
      },
    ],
  },

  "fullstack_html": {
    title: "HTML & CSS",
    description: "Create structured, styled and responsive web pages.",
    lessons: [
      {
        title: "HTML Document Structure",
        duration: "15 min",
        content: [
          {
            heading: "Build the structure",
            text: "HTML elements organize page content. A clear document structure helps browsers, search engines and assistive technologies understand the page.",
          },
        ],
        example: `<!DOCTYPE html>\n<html lang="en">\n<head><title>Portfolio</title></head>\n<body><main><h1>My Portfolio</h1></main></body>\n</html>`,
      },
      {
        title: "Semantic HTML",
        duration: "15 min",
        content: [
          {
            heading: "Meaningful elements",
            text: "Use elements such as header, nav, main, article and footer to communicate the purpose of different parts of a page.",
          },
        ],
        example: `<header>Site title</header>\n<nav>Navigation</nav>\n<main><article>Content</article></main>\n<footer>Contact details</footer>`,
      },
      {
        title: "CSS Selectors",
        duration: "15 min",
        content: [
          {
            heading: "Target elements",
            text: "CSS selectors choose which elements receive styling. Classes are useful for reusable styles.",
          },
        ],
        example: `.card { padding: 16px; }\nh1 { color: #047857; }`,
      },
      {
        title: "Box Model",
        duration: "15 min",
        content: [
          {
            heading: "Spacing and dimensions",
            text: "Understand content, padding, borders and margins to control element size and spacing.",
          },
        ],
        example: `.card {\n  box-sizing: border-box;\n  padding: 20px;\n  border: 1px solid #ddd;\n}`,
      },
      {
        title: "Flexbox",
        duration: "20 min",
        content: [
          {
            heading: "Align interface elements",
            text: "Flexbox helps align and distribute items along a row or column.",
          },
        ],
        example: `.nav {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}`,
      },
      {
        title: "CSS Grid",
        duration: "20 min",
        content: [
          {
            heading: "Create columns and rows",
            text: "Grid is useful for page layouts and card collections that need rows and columns.",
          },
        ],
        example: `.cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}`,
      },
      {
        title: "Responsive Layouts",
        duration: "20 min",
        content: [
          {
            heading: "Support different devices",
            text: "Use flexible sizing and media queries so layouts adapt to mobile, tablet and desktop screens.",
          },
        ],
        example: `.cards { grid-template-columns: 1fr; }\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}`,
      },
      {
        title: "Portfolio Page",
        duration: "30 min",
        content: [
          {
            heading: "Build a portfolio",
            text: "Combine semantic HTML and responsive CSS to create a personal portfolio with projects, skills and contact information.",
          },
        ],
        example: `<main>\n  <section><h1>About Me</h1></section>\n  <section><h2>Projects</h2></section>\n  <section><h2>Contact</h2></section>\n</main>`,
      },
    ],
  },

  "fullstack_javascript": {
    title: "JavaScript",
    description: "Learn programming fundamentals for web development.",
    lessons: [
      {
        title: "Variables and Data Types",
        duration: "15 min",
        content: [
          {
            heading: "Store and describe values",
            text: "Variables store values. JavaScript values include strings, numbers, booleans, undefined, null and objects.",
          },
        ],
        example: `const name = "Alex";\nlet age = 20;\nconst isStudent = true;`,
      },
      {
        title: "Operators and Conditions",
        duration: "15 min",
        content: [
          {
            heading: "Make decisions",
            text: "Operators calculate values and compare data. Conditional statements choose which code should run.",
          },
        ],
        example: `if (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}`,
      },
      {
        title: "Loops",
        duration: "15 min",
        content: [
          {
            heading: "Repeat instructions",
            text: "Loops repeat work while a condition is satisfied or while items remain in a collection.",
          },
        ],
        example: `for (let i = 0; i < 3; i++) {\n  console.log(i);\n}`,
      },
      {
        title: "Functions",
        duration: "15 min",
        content: [
          {
            heading: "Reusable logic",
            text: "Functions group instructions, accept parameters and can return results.",
          },
        ],
        example: `function square(number) {\n  return number * number;\n}\nconsole.log(square(4));`,
      },
      {
        title: "Arrays and Objects",
        duration: "20 min",
        content: [
          {
            heading: "Organize data",
            text: "Arrays store ordered collections. Objects store related information using key-value properties.",
          },
        ],
        example: `const skills = ["HTML", "CSS"];\nconst user = { name: "Alex", age: 20 };`,
      },
      {
        title: "DOM Manipulation",
        duration: "20 min",
        content: [
          {
            heading: "Update the page",
            text: "The DOM represents a web page as objects that JavaScript can inspect and update.",
          },
        ],
        example: `document.querySelector("h1").textContent = "Welcome";`,
      },
      {
        title: "Events",
        duration: "15 min",
        content: [
          {
            heading: "Respond to user actions",
            text: "Event listeners run a function when an event such as a click occurs.",
          },
        ],
        example: `document.querySelector("button")\n  .addEventListener("click", () => {\n    console.log("Clicked");\n  });`,
      },
      {
        title: "Async JavaScript",
        duration: "20 min",
        content: [
          {
            heading: "Handle asynchronous work",
            text: "Promises and async/await help manage operations such as API requests.",
          },
        ],
        example: `async function getData() {\n  const response = await fetch("/api/jobs");\n  return response.json();\n}`,
      },
    ],
  },

  "fullstack_react": {
    title: "React.js",
    description: "Build reusable frontend components.",
    lessons: [
      {
        title: "Components and JSX",
        duration: "15 min",
        content: [
          {
            heading: "Build reusable UI",
            text: "React components represent reusable parts of an interface. JSX describes the elements they render.",
          },
        ],
        example: `function Header() {\n  return <h1>SkillForge</h1>;\n}`,
      },
      {
        title: "Props",
        duration: "15 min",
        content: [
          {
            heading: "Pass information",
            text: "Props allow components to receive data from their parents.",
          },
        ],
        example: `function Greeting({ name }) {\n  return <p>Hello, {name}</p>;\n}`,
      },
      {
        title: "State and Hooks",
        duration: "20 min",
        content: [
          {
            heading: "Manage changing data",
            text: "useState stores component state. When state changes, React updates the relevant interface.",
          },
        ],
        example: `const [count, setCount] = useState(0);`,
      },
      {
        title: "Forms and Events",
        duration: "20 min",
        content: [
          {
            heading: "Build interactive forms",
            text: "Use event handlers and controlled inputs to collect and validate user data.",
          },
        ],
        example: `<input value={name} onChange={(e) => setName(e.target.value)} />`,
      },
      {
        title: "React Router",
        duration: "20 min",
        content: [
          {
            heading: "Create multiple pages",
            text: "React Router maps URLs to page components and provides navigation between them.",
          },
        ],
        example: `<Route path="/jobs" element={<Jobs />} />`,
      },
      {
        title: "Fetching API Data",
        duration: "25 min",
        content: [
          {
            heading: "Connect to a backend",
            text: "Request data from backend endpoints and render loading, success and error states.",
          },
        ],
        example: `const response = await fetch("/api/jobs");\nconst data = await response.json();`,
      },
      {
        title: "Error and Loading States",
        duration: "15 min",
        content: [
          {
            heading: "Improve user feedback",
            text: "Show clear feedback while data is loading or when a request fails.",
          },
        ],
        example: `{loading ? <p>Loading...</p> : <JobList jobs={jobs} />}`,
      },
      {
        title: "Building a React App",
        duration: "30 min",
        content: [
          {
            heading: "Create a complete interface",
            text: "Combine routing, components, state and API requests into a working frontend.",
          },
        ],
        example: `// App.jsx\nfunction App() {\n  return <main><h1>My App</h1></main>;\n}`,
      },
    ],
  },

  "fullstack_node": {
    title: "Node.js & Express",
    description: "Create APIs for your full-stack application.",
    lessons: [
      {
        title: "Node.js Fundamentals",
        duration: "15 min",
        content: [
          {
            heading: "JavaScript on the server",
            text: "Node.js provides a runtime for building servers and backend tools using JavaScript.",
          },
        ],
        example: `console.log("Backend running");`,
      },
      {
        title: "Express Server",
        duration: "15 min",
        content: [
          {
            heading: "Create the server",
            text: "Express provides a concise way to define routes and middleware for HTTP requests.",
          },
        ],
        example: `const app = express();\napp.get("/", (req, res) => res.send("OK"));`,
      },
      {
        title: "REST API Routes",
        duration: "20 min",
        content: [
          {
            heading: "Organize endpoints",
            text: "Use meaningful paths and HTTP methods to represent operations on resources.",
          },
        ],
        example: `app.get("/api/skills", getSkills);\napp.post("/api/skills", createSkill);`,
      },
      {
        title: "Middleware",
        duration: "20 min",
        content: [
          {
            heading: "Process requests",
            text: "Middleware can parse request bodies, log requests, authenticate users and handle errors.",
          },
        ],
        example: `app.use(express.json());`,
      },
      {
        title: "Controllers",
        duration: "20 min",
        content: [
          {
            heading: "Keep code organized",
            text: "Controllers contain request-handling logic while route files connect paths to controller functions.",
          },
        ],
        example: `export function getSkills(req, res) {\n  res.json({ skills: [] });\n}`,
      },
      {
        title: "Validation",
        duration: "15 min",
        content: [
          {
            heading: "Validate user input",
            text: "Validate required fields and acceptable values before performing database operations.",
          },
        ],
        example: `if (!req.body.skillName) {\n  return res.status(400).json({ message: "Skill name required" });\n}`,
      },
      {
        title: "Error Handling",
        duration: "15 min",
        content: [
          {
            heading: "Handle failures consistently",
            text: "Return meaningful status codes and avoid sending internal stack traces to clients.",
          },
        ],
        example: `try {\n  const result = await operation();\n  res.json(result);\n} catch {\n  res.status(500).json({ message: "Server error" });\n}`,
      },
      {
        title: "API Testing",
        duration: "20 min",
        content: [
          {
            heading: "Verify the backend",
            text: "Test endpoints with successful data, invalid inputs, missing resources and unauthorized requests.",
          },
        ],
        example: `// Example endpoint\nGET http://localhost:5000/api/skills`,
      },
    ],
  },

  "fullstack_mongodb": {
    title: "MongoDB & Full Stack Project",
    description: "Connect your frontend, backend and database.",
    lessons: [
      {
        title: "MongoDB Fundamentals",
        duration: "15 min",
        content: [
          {
            heading: "Store application data",
            text: "MongoDB stores records as documents inside collections. It is often used with Node.js applications.",
          },
        ],
        example: `{\n  "skillName": "React",\n  "level": "Beginner"\n}`,
      },
      {
        title: "Mongoose Models",
        duration: "20 min",
        content: [
          {
            heading: "Define document structure",
            text: "Mongoose schemas define fields and validation rules. Models provide methods for working with collections.",
          },
        ],
        example: `const schema = new mongoose.Schema({\n  skillName: { type: String, required: true }\n});`,
      },
      {
        title: "Connecting React to APIs",
        duration: "20 min",
        content: [
          {
            heading: "Send requests from React",
            text: "The frontend calls backend endpoints to read or update data. Configure the API base URL for development and production.",
          },
        ],
        example: `const response = await fetch("http://localhost:5000/api/skills");`,
      },
      {
        title: "CRUD Integration",
        duration: "25 min",
        content: [
          {
            heading: "Complete data operations",
            text: "Connect forms and lists to create, retrieve, update and delete records through the backend API.",
          },
        ],
        example: `await fetch("/api/skills", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ skillName: "React" })\n});`,
      },
      {
        title: "Authentication",
        duration: "25 min",
        content: [
          {
            heading: "Protect user data",
            text: "Authenticate requests and ensure users can access only resources they are authorized to use.",
          },
        ],
        example: `fetch("/api/profile", {\n  headers: { Authorization: \`Bearer \${token}\` }\n});`,
      },
      {
        title: "Application Testing",
        duration: "20 min",
        content: [
          {
            heading: "Test end-to-end behavior",
            text: "Check that forms, APIs and database operations work together and display useful error messages.",
          },
        ],
        example: `// Test: create record -> fetch record -> update -> delete`,
      },
      {
        title: "Deployment",
        duration: "25 min",
        content: [
          {
            heading: "Deploy the application",
            text: "Configure frontend and backend hosting, environment variables, database network access and production API URLs.",
          },
        ],
        example: `// Example production configuration\nVITE_API_URL=https://your-api.example.com`,
      },
      {
        title: "Final MERN Project",
        duration: "30 min",
        content: [
          {
            heading: "Build a full-stack project",
            text: "Create an application with a React frontend, Express API, MongoDB database, validation and a clear user experience.",
          },
        ],
        example: `// MERN stack\n// MongoDB -> Express -> React -> Node.js`,
      },
    ],
  },
};

export default function LessonPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const path = params.get("path") || "frontend";
  const moduleId = params.get("lesson") || "html";
  const module = lessonData[moduleId];

  const [selectedIndex, setSelectedIndex] = useState(0);

  function selectLesson(index) {
    setSelectedIndex(index);
  }

  if (!module) {
    return (
      <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
        <button
          onClick={() => navigate(`/dashboard/learning-plan?path=${path}`)}
          className="mb-6 text-emerald-700 hover:underline"
        >
          ← Back to learning roadmap
        </button>

        <h1 className="text-xl font-bold">Content coming soon</h1>
        <p className="mt-2 text-slate-500">
          Learning content for this module has not been added yet.
        </p>
      </main>
    );
  }

  const current = module.lessons[selectedIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white px-5 py-4 sm:px-10">
        <div className="mx-auto max-w-6xl">
          <button
            onClick={() =>
              navigate(`/dashboard/learning-plan?path=${path}`)
            }
            className="text-sm font-medium text-emerald-700 hover:underline"
          >
            ← Back to learning roadmap
          </button>

          <h1 className="mt-3 text-xl font-bold">{module.title}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {module.description}
          </p>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-5 py-6 lg:grid-cols-[280px_1fr] sm:px-10">
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-4">
          <h2 className="mb-3 font-semibold">Module lessons</h2>

          <div className="space-y-2">
            {module.lessons.map((lesson, index) => (
              <button
                key={lesson.title}
                type="button"
                onClick={() => selectLesson(index)}
                className={`w-full rounded-lg p-3 text-left text-sm transition ${
                  selectedIndex === index
                    ? "bg-emerald-50 font-semibold text-emerald-800"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <span className="mr-2">{index + 1}.</span>
                {lesson.title}
              </button>
            ))}
          </div>
        </aside>

        <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              LESSON {selectedIndex + 1} OF {module.lessons.length}
            </span>

            <span className="text-sm text-slate-500">
              ◷ {current.duration}
            </span>
          </div>

          <h2 className="mt-3 text-2xl font-bold">{current.title}</h2>

          {current.content.map((section) => (
            <section key={section.heading} className="mt-7">
              <h3 className="text-lg font-semibold">{section.heading}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                {section.text}
              </p>
            </section>
          ))}

          <section className="mt-8">
            <h3 className="mb-3 text-lg font-semibold">Code example</h3>

            <pre className="overflow-x-auto rounded-xl bg-slate-950 p-5 text-sm leading-6 text-emerald-300">
              <code>{current.example}</code>
            </pre>
          </section>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
            <button
              type="button"
              disabled={selectedIndex === 0}
              onClick={() => selectLesson(selectedIndex - 1)}
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← Previous
            </button>

            <button
              type="button"
              disabled={selectedIndex === module.lessons.length - 1}
              onClick={() => selectLesson(selectedIndex + 1)}
              className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next lesson →
            </button>
          </div>
        </article>
      </main>
    </div>
  );
}
