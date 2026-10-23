
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardSidebar from "../components/layout/DashboardSidebar";

const roadmaps = {
  frontend: {
    title: "Frontend Development",
    description: "Learn to build beautiful, responsive web interfaces.",
    modules: [
      {
        id: "html",
        title: "HTML Fundamentals",
        duration: "2 hours",
        description: "Learn the structure of web pages.",
        lessons: [
          {
            title: "Introduction to HTML",
            content:
              "HTML stands for HyperText Markup Language. It defines the structure and meaning of content on a webpage.",
            example:
              '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <title>My Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n  <p>My first webpage.</p>\n</body>\n</html>',
          },
          {
            title: "HTML Document Structure",
            content:
              "An HTML document contains a head section for metadata and a body section for visible content. The browser interprets the document structure to display the page.",
            example:
              "<header>Website Header</header>\n<main>\n  <h1>Welcome</h1>\n  <p>Page content goes here.</p>\n</main>\n<footer>Website Footer</footer>",
          },
          {
            title: "Headings and Paragraphs",
            content:
              "HTML provides six heading levels, from h1 to h6. Use headings to organize information and paragraph elements to display blocks of text.",
            example:
              "<h1>Main Heading</h1>\n<h2>Section Heading</h2>\n<p>This is a paragraph.</p>",
          },
          {
            title: "Links and Images",
            content:
              "The anchor element creates links using href. The img element displays images. Use descriptive alt text to make informative images accessible.",
            example:
              '<a href="https://example.com">Visit Example</a>\n\n<img src="photo.jpg" alt="Mountain landscape">',
          },
          {
            title: "Lists and Tables",
            content:
              "Use ul for unordered lists, ol for ordered lists, and li for list items. Tables organize data into rows and columns.",
            example:
              "<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n</ul>\n\n<table>\n  <tr><th>Name</th><th>Age</th></tr>\n  <tr><td>Alex</td><td>20</td></tr>\n</table>",
          },
          {
            title: "Forms and Input Elements",
            content:
              "Forms collect information from users. Inputs can collect text, email addresses, passwords, and other values. Labels help users understand each field.",
            example:
              '<form>\n  <label for="email">Email:</label>\n  <input id="email" type="email" required>\n  <button type="submit">Submit</button>\n</form>',
          },
          {
            title: "Semantic HTML",
            content:
              "Semantic elements describe the meaning of content. Elements such as header, nav, main, article, and footer help improve accessibility and structure.",
            example:
              "<header>My Website</header>\n<nav>Navigation</nav>\n<main>\n  <article>Article content</article>\n</main>\n<footer>Contact information</footer>",
          },
        ],
      },
      {
        id: "css",
        title: "CSS Fundamentals",
        duration: "3 hours",
        description: "Style web pages with colors, spacing, and layouts.",
        lessons: [
          {
            title: "Introduction to CSS",
            content:
              "CSS stands for Cascading Style Sheets. It controls colors, typography, spacing, and the layout of HTML elements.",
            example:
              "body {\n  font-family: Arial, sans-serif;\n  background: #f8fafc;\n}\n\nh1 {\n  color: #059669;\n}",
          },
          {
            title: "Selectors and Properties",
            content:
              "CSS selectors identify the elements you want to style. Element selectors target tags, class selectors target reusable classes, and ID selectors target a unique identifier.",
            example:
              "p { color: #475569; }\n\n.card { padding: 16px; }\n\n#title { font-size: 28px; }",
          },
          {
            title: "Colors and Typography",
            content:
              "CSS supports named colors, hexadecimal values, RGB, and HSL. Font family, size, weight, and line height help make content readable.",
            example:
              "body {\n  color: #1e293b;\n  font-family: Arial, sans-serif;\n  line-height: 1.6;\n}\n\nh1 { font-size: 2rem; }",
          },
          {
            title: "The CSS Box Model",
            content:
              "Every element has a content area, padding, border, and margin. Padding creates space inside the border, while margin creates space outside it.",
            example:
              ".card {\n  box-sizing: border-box;\n  padding: 20px;\n  border: 1px solid #cbd5e1;\n  margin: 16px;\n}",
          },
          {
            title: "Flexbox Layout",
            content:
              "Flexbox arranges elements in a row or column. It is useful for navigation bars, aligned buttons, and evenly spaced content.",
            example:
              ".container {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}",
          },
          {
            title: "CSS Grid",
            content:
              "CSS Grid is a two-dimensional layout system. It helps create dashboards, card collections, and page layouts with rows and columns.",
            example:
              ".grid {\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 16px;\n}",
          },
          {
            title: "Responsive Design",
            content:
              "Responsive design allows a website to adapt to mobile, tablet, and desktop screens using flexible sizing and media queries.",
            example:
              ".grid {\n  display: grid;\n  grid-template-columns: 1fr;\n}\n\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}",
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        duration: "5 hours",
        description: "Add logic and interactivity to your website.",
        lessons: [
          {
            title: "Variables and Data Types",
            content:
              "Variables store values for later use. JavaScript supports strings, numbers, booleans, undefined, null, and objects.",
            example:
              'const name = "Alex";\nlet age = 20;\nconst isStudent = true;\n\nconsole.log(name, age, isStudent);',
          },
          {
            title: "Operators and Conditions",
            content:
              "Operators perform calculations and comparisons. Conditional statements allow a program to make decisions based on values.",
            example:
              'const age = 20;\n\nif (age >= 18) {\n  console.log("Adult");\n} else {\n  console.log("Minor");\n}',
          },
          {
            title: "Loops",
            content:
              "Loops repeat instructions. A for loop usually has an initialization, a condition, and an update.",
            example:
              "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}",
          },
          {
            title: "Functions",
            content:
              "Functions are reusable blocks of code. They can accept parameters and return values.",
            example:
              "function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 4));",
          },
          {
            title: "Arrays and Objects",
            content:
              "Arrays store ordered collections of values. Objects group related information into key-value properties.",
            example:
              'const skills = ["HTML", "CSS", "React"];\n\nconst user = {\n  name: "Alex",\n  age: 20,\n};\n\nconsole.log(skills[0]);\nconsole.log(user.name);',
          },
          {
            title: "DOM Manipulation",
            content:
              "The Document Object Model represents a webpage as objects. JavaScript can select elements and update their content or styles.",
            example:
              'const heading = document.querySelector("h1");\nheading.textContent = "Welcome!";',
          },
          {
            title: "Asynchronous JavaScript",
            content:
              "Promises and async/await help manage operations that finish later, such as network requests and file operations.",
            example:
              'async function loadData() {\n  const response = await fetch("/api/jobs");\n  const data = await response.json();\n  console.log(data);\n}',
          },
        ],
      },
      {
        id: "react",
        title: "React.js",
        duration: "6 hours",
        description: "Build reusable, interactive frontend applications.",
        lessons: [
          {
            title: "Introduction to React",
            content:
              "React is a JavaScript library for building user interfaces. Applications are organized into reusable components.",
            example:
              'function Welcome() {\n  return <h1>Hello, React!</h1>;\n}\n\nexport default Welcome;',
          },
          {
            title: "Components and JSX",
            content:
              "Components are reusable UI building blocks. JSX allows you to describe interface elements using syntax similar to HTML inside JavaScript.",
            example:
              'function Greeting() {\n  const name = "Alex";\n  return <p>Hello, {name}!</p>;\n}',
          },
          {
            title: "Props",
            content:
              "Props pass information from a parent component to a child component. They should be treated as read-only.",
            example:
              'function Greeting({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n<Greeting name="Alex" />',
          },
          {
            title: "State with useState",
            content:
              "The useState hook stores component state. Updating state tells React to render the interface with the new value.",
            example:
              'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Count: {count}\n    </button>\n  );\n}',
          },
          {
            title: "Handling Events",
            content:
              "Event handlers let your components respond to actions such as clicks, typing, and form submissions.",
            example:
              'function ClickButton() {\n  return (\n    <button onClick={() => alert("Clicked!") }>\n      Click me\n    </button>\n  );\n}',
          },
          {
            title: "Rendering Lists",
            content:
              "Use map() to render collections of data. Each rendered item should have a stable key.",
            example:
              'const skills = ["HTML", "CSS", "React"];\n\nfunction SkillList() {\n  return (\n    <ul>\n      {skills.map((skill) => (\n        <li key={skill}>{skill}</li>\n      ))}\n    </ul>\n  );\n}',
          },
          {
            title: "Fetching API Data",
            content:
              "React applications can use fetch or Axios to request information from a backend. Handle loading states, successful responses, and errors.",
            example:
              'async function getJobs() {\n  const response = await fetch("http://localhost:5000/api/jobs");\n\n  if (!response.ok) {\n    throw new Error("Unable to load jobs");\n  }\n\n  return response.json();\n}',
          },
        ],
      },
    ],
  },

  backend: {
    title: "Backend Development",
    description: "Learn server-side development, APIs, and databases.",
    modules: [
      {
        id: "node",
        title: "Node.js Fundamentals",
        duration: "3 hours",
        description: "Run JavaScript outside the browser.",
        lessons: [
          {
            title: "Introduction to Node.js",
            content:
              "Node.js is a JavaScript runtime that allows you to build server-side applications, APIs, and developer tools.",
            example:
              'console.log("Hello from Node.js!");\n\n// Run using: node app.js',
          },
          {
            title: "Modules and npm",
            content:
              "Modules split code into reusable files. npm manages packages and dependencies in JavaScript projects.",
            example:
              'import path from "node:path";\n\nconsole.log(path.basename("/app/index.js"));',
          },
          {
            title: "Environment Variables",
            content:
              "Environment variables store configuration separately from source code. Keep database credentials and other secrets out of public repositories.",
            example:
              'import "dotenv/config";\n\nconst port = process.env.PORT || 5000;\nconsole.log(port);',
          },
          {
            title: "Asynchronous Programming",
            content:
              "Asynchronous programming allows your application to handle operations such as database queries and network requests without blocking on every operation.",
            example:
              'async function main() {\n  const result = await Promise.resolve("Done");\n  console.log(result);\n}\n\nmain();',
          },
        ],
      },
      {
        id: "express",
        title: "Express.js & REST APIs",
        duration: "4 hours",
        description: "Create server routes and APIs.",
        lessons: [
          {
            title: "Introduction to Express",
            content:
              "Express is a Node.js framework that simplifies routing, middleware, and HTTP response handling.",
            example:
              'import express from "express";\n\nconst app = express();\napp.use(express.json());\n\napp.get("/", (req, res) => {\n  res.json({ message: "Server running" });\n});\n\napp.listen(5000);',
          },
          {
            title: "Routes and HTTP Methods",
            content:
              "GET retrieves data, POST creates data, PATCH or PUT updates data, and DELETE removes data.",
            example:
              'app.get("/api/jobs", getJobs);\napp.post("/api/jobs", createJob);\napp.patch("/api/jobs/:id", updateJob);\napp.delete("/api/jobs/:id", deleteJob);',
          },
          {
            title: "Request and Response",
            content:
              "Express provides route parameters through req.params, query parameters through req.query, and parsed JSON data through req.body.",
            example:
              'app.get("/api/jobs/:id", (req, res) => {\n  res.json({ jobId: req.params.id });\n});',
          },
          {
            title: "Middleware",
            content:
              "Middleware runs during the request-response cycle. It can parse data, log requests, authenticate users, and handle errors.",
            example:
              "app.use((req, res, next) => {\n  console.log(req.method, req.url);\n  next();\n});",
          },
          {
            title: "Validation and Error Handling",
            content:
              "Validate incoming data before saving it. Return suitable HTTP status codes and clear error messages when requests fail.",
            example:
              'if (!req.body.title) {\n  return res.status(400).json({\n    message: "Title is required",\n  });\n}',
          },
        ],
      },
      {
        id: "mongodb",
        title: "MongoDB & Mongoose",
        duration: "4 hours",
        description: "Store and query application data.",
        lessons: [
          {
            title: "Introduction to MongoDB",
            content:
              "MongoDB is a document database that stores records as BSON documents organized into collections.",
            example:
              '{\n  "name": "Alex",\n  "role": "Developer",\n  "skills": ["Node.js", "MongoDB"]\n}',
          },
          {
            title: "CRUD Operations",
            content:
              "CRUD stands for Create, Read, Update, and Delete. These operations cover the basic ways applications work with stored data.",
            example:
              'db.users.insertOne({ name: "Alex" });\ndb.users.find({ name: "Alex" });\ndb.users.updateOne(\n  { name: "Alex" },\n  { $set: { role: "Developer" } }\n);',
          },
          {
            title: "Mongoose Models",
            content:
              "Mongoose is an object data modeling library for MongoDB. Schemas define document structure, and models provide database operations.",
            example:
              'import mongoose from "mongoose";\n\nconst userSchema = new mongoose.Schema({\n  name: { type: String, required: true },\n});\n\nconst User = mongoose.model("User", userSchema);',
          },
          {
            title: "Schemas and Validation",
            content:
              "Schemas define field types and validation rules, such as required fields, minimum values, and allowed enum values.",
            example:
              "const skillSchema = new mongoose.Schema({\n  skillName: { type: String, required: true },\n  percentage: { type: Number, min: 0, max: 100 },\n});",
          },
          {
            title: "Connecting MongoDB",
            content:
              "Use a database connection string stored in an environment variable. Connect your application to MongoDB before running database-dependent operations.",
            example:
              'import mongoose from "mongoose";\n\nawait mongoose.connect(process.env.MONGO_URI);\nconsole.log("MongoDB connected");',
          },
        ],
      },
      {
        id: "authentication",
        title: "Authentication & Security",
        duration: "3 hours",
        description: "Protect accounts and application resources.",
        lessons: [
          {
            title: "Authentication Fundamentals",
            content:
              "Authentication verifies a user's identity. Authorization checks what the authenticated user is allowed to do.",
            example:
              "// Registration\nPOST /api/users/register\n\n// Login\nPOST /api/users/login",
          },
          {
            title: "Password Hashing",
            content:
              "Never store passwords in plaintext. Use a suitable password hashing library such as bcrypt or Argon2.",
            example:
              "const hash = await bcrypt.hash(password, 10);\nconst valid = await bcrypt.compare(password, hash);",
          },
          {
            title: "JSON Web Tokens",
            content:
              "JWTs are signed tokens that can carry claims about a user. Verify tokens on the server and never put sensitive secrets in their payload.",
            example:
              'const token = jwt.sign(\n  { userId: user._id },\n  process.env.JWT_SECRET,\n  { expiresIn: "1h" }\n);',
          },
          {
            title: "Protecting API Routes",
            content:
              "Protected routes should verify the user's identity and permissions before returning private data or allowing changes.",
            example:
              'router.get("/profile", authMiddleware, getProfile);',
          },
        ],
      },
    ],
  },

  fullstack: {
    title: "Full Stack Development",
    description: "Build complete applications from frontend to database.",
    modules: [
      {
        id: "fullstack_html",
        title: "HTML & CSS",
        duration: "4 hours",
        description: "Structure and style responsive pages.",
        lessons: [
          {
            title: "HTML Document Structure",
            content:
              "HTML defines the structure of a page. A document contains metadata in head and visible content in body.",
            example:
              '<!DOCTYPE html>\n<html lang="en">\n<head><title>Portfolio</title></head>\n<body><main><h1>My Portfolio</h1></main></body>\n</html>',
          },
          {
            title: "Semantic HTML",
            content:
              "Semantic elements describe the purpose of content. They improve document structure and support accessibility.",
            example:
              "<header>Site title</header>\n<nav>Navigation</nav>\n<main><article>Content</article></main>\n<footer>Contact</footer>",
          },
          {
            title: "CSS Layouts",
            content:
              "Flexbox is useful for one-dimensional layouts. Grid is useful for two-dimensional layouts with rows and columns.",
            example:
              ".cards {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 16px;\n}",
          },
          {
            title: "Responsive Design",
            content:
              "Use flexible widths, responsive images, and media queries to adapt layouts to different screen sizes.",
            example:
              ".cards { grid-template-columns: 1fr; }\n\n@media (min-width: 768px) {\n  .cards { grid-template-columns: repeat(2, 1fr); }\n}",
          },
        ],
      },
      {
        id: "fullstack_javascript",
        title: "JavaScript",
        duration: "5 hours",
        description: "Learn the programming language used across the stack.",
        lessons: [
          {
            title: "Variables and Data Types",
            content:
              "JavaScript variables store values. Common data types include strings, numbers, booleans, and objects.",
            example:
              'const name = "Alex";\nlet age = 20;\nconst skills = ["HTML", "CSS"];',
          },
          {
            title: "Functions and Arrays",
            content:
              "Functions organize reusable logic. Arrays store ordered data and provide methods such as map, filter, and find.",
            example:
              "const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map((n) => n * 2);\nconsole.log(doubled);",
          },
          {
            title: "Async JavaScript",
            content:
              "Promises and async/await help handle asynchronous tasks such as API requests.",
            example:
              'async function getJobs() {\n  const response = await fetch("/api/jobs");\n  return response.json();\n}',
          },
        ],
      },
      {
        id: "fullstack_react",
        title: "React.js",
        duration: "5 hours",
        description: "Build the interactive frontend.",
        lessons: [
          {
            title: "Components and JSX",
            content:
              "React components represent reusable parts of a UI. JSX describes the interface a component should render.",
            example:
              "function Header() {\n  return <h1>SkillForge</h1>;\n}",
          },
          {
            title: "Props and State",
            content:
              "Props pass data between components. State stores information that can change and trigger an updated render.",
            example:
              'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>{count}</button>;\n}',
          },
          {
            title: "Routing and API Requests",
            content:
              "React Router maps URLs to page components. Fetch requests allow the frontend to communicate with the backend.",
            example:
              'const response = await fetch("http://localhost:5000/api/jobs");\nconst data = await response.json();',
          },
        ],
      },
      {
        id: "fullstack_node",
        title: "Node.js & Express",
        duration: "5 hours",
        description: "Build APIs and backend business logic.",
        lessons: [
          {
            title: "Node.js Fundamentals",
            content:
              "Node.js runs JavaScript outside the browser and is commonly used for backend services.",
            example:
              'import "dotenv/config";\n\nconst port = process.env.PORT || 5000;',
          },
          {
            title: "Express Routes",
            content:
              "Express routes connect HTTP methods and URL paths to functions that handle requests.",
            example:
              'app.get("/api/skills", getSkills);\napp.post("/api/skills", createSkill);',
          },
          {
            title: "Controllers and Middleware",
            content:
              "Controllers handle application logic. Middleware can validate requests, authenticate users, and manage errors.",
            example:
              "app.use(express.json());\n\nrouter.get('/', getSkills);",
          },
        ],
      },
      {
        id: "fullstack_mongodb",
        title: "MongoDB & Integration",
        duration: "5 hours",
        description: "Connect APIs to persistent database storage.",
        lessons: [
          {
            title: "MongoDB Basics",
            content:
              "MongoDB stores application data in documents and collections. It supports flexible document structures.",
            example:
              '{\n  "skillName": "React",\n  "level": "Beginner",\n  "percentage": 20\n}',
          },
          {
            title: "Mongoose Models",
            content:
              "Mongoose models provide methods for creating, finding, updating, and deleting documents using a defined schema.",
            example:
              "const Skill = mongoose.model('Skill', skillSchema);\nconst skills = await Skill.find();",
          },
          {
            title: "Connect Frontend and Backend",
            content:
              "The frontend sends HTTP requests to the backend. The backend validates the request, interacts with MongoDB, and returns a response.",
            example:
              'const response = await fetch("/api/skills", {\n  method: "GET",\n});\n\nconst data = await response.json();',
          },
        ],
      },
      {
        id: "fullstack_project",
        title: "Build a Full Stack Project",
        duration: "6 hours",
        description: "Combine frontend, backend, and database skills.",
        lessons: [
          {
            title: "Plan the Application",
            content:
              "Identify the application's users, features, data models, and API endpoints before writing code.",
            example:
              "// Plan:\n// 1. User interface\n// 2. Backend routes\n// 3. Database models\n// 4. Authentication\n// 5. Testing",
          },
          {
            title: "Implement CRUD Features",
            content:
              "Connect forms and lists to API endpoints so users can create, read, update, and delete application data.",
            example:
              "// Create -> POST\n// Read -> GET\n// Update -> PATCH or PUT\n// Delete -> DELETE",
          },
          {
            title: "Test and Deploy",
            content:
              "Test API endpoints and frontend flows, configure production environment variables, and deploy the frontend and backend.",
            example:
              "// Check before deployment:\n// - API works\n// - Database connects\n// - Environment variables are set\n// - Errors are handled",
          },
        ],
      },
    ],
  },
};

export default function LearningPlan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const path = searchParams.get("path") || "frontend";
  const roadmap = roadmaps[path];

  const [activeModuleId, setActiveModuleId] = useState("");
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedModule =
    roadmap?.modules.find((module) => module.id === activeModuleId) || null;

  const activeLesson = selectedModule
    ? selectedModule.lessons[activeLessonIndex]
    : null;

  function openModule(module) {
    setActiveModuleId(module.id);
    setActiveLessonIndex(0);
    setSidebarOpen(false);
  }

  function openLesson(index) {
    setActiveLessonIndex(index);
    setSidebarOpen(false);
  }

  function goToNextLesson() {
    if (!selectedModule) return;

    if (activeLessonIndex < selectedModule.lessons.length - 1) {
      setActiveLessonIndex((index) => index + 1);
      return;
    }

    const moduleIndex = roadmap.modules.findIndex(
      (module) => module.id === selectedModule.id
    );

    const nextModule = roadmap.modules[moduleIndex + 1];

    if (nextModule) {
      setActiveModuleId(nextModule.id);
      setActiveLessonIndex(0);
    }
  }

  function goToPreviousLesson() {
    if (!selectedModule) return;

    if (activeLessonIndex > 0) {
      setActiveLessonIndex((index) => index - 1);
      return;
    }

    const moduleIndex = roadmap.modules.findIndex(
      (module) => module.id === selectedModule.id
    );

    const previousModule = roadmap.modules[moduleIndex - 1];

    if (previousModule) {
      setActiveModuleId(previousModule.id);
      setActiveLessonIndex(previousModule.lessons.length - 1);
    }
  }

  const totalLessons = roadmap
    ? roadmap.modules.reduce(
        (total, module) => total + module.lessons.length,
        0
      )
    : 0;

  const activeLessonNumber = roadmap && selectedModule
    ? roadmap.modules
        .slice(
          0,
          roadmap.modules.findIndex(
            (module) => module.id === selectedModule.id
          )
        )
        .reduce((total, module) => total + module.lessons.length, 0) +
      activeLessonIndex +
      1
    : 0;

  if (!roadmap) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar />

        <main className="ml-64 min-w-0 flex-1 p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Learning plan not found
          </h1>

          <p className="mt-2 text-slate-500">
            Choose Frontend, Backend, or Full Stack Development.
          </p>

          <button
            onClick={() => navigate("/dashboard/choose-skill")}
            className="mt-5 rounded-lg bg-emerald-600 px-5 py-3 text-white"
          >
            Choose a skill
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <DashboardSidebar />

      <main className="ml-64 min-w-0">
        {/* Top navigation */}
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <button
                onClick={() => navigate("/dashboard/choose-skill")}
                className="mb-2 text-sm font-medium text-emerald-700 hover:underline"
              >
                ← All learning paths
              </button>

              <h1 className="truncate text-xl font-bold sm:text-2xl">
                {roadmap.title}
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                {roadmap.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSidebarOpen((open) => !open)}
              className="shrink-0 rounded-lg border border-slate-200 px-3 py-2 text-sm lg:hidden"
            >
              Lessons
            </button>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500 sm:text-sm">
            <span>
              <strong className="text-slate-800">
                {roadmap.modules.length}
              </strong>{" "}
              modules
            </span>

            <span>
              <strong className="text-slate-800">{totalLessons}</strong>{" "}
              lessons
            </span>

            <span>
              <strong className="text-slate-800">
                {roadmap.modules.reduce(
                  (total, module) =>
                    total +
                    parseInt(module.duration, 10),
                  0
                )}
                + hours
              </strong>{" "}
              estimated learning time
            </span>
          </div>
        </header>

        <div className="mx-auto max-w-7xl p-4 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            {/* Lesson sidebar */}
            <aside
              className={`${
                sidebarOpen ? "block" : "hidden"
              } h-fit rounded-2xl border border-slate-200 bg-white p-4 lg:sticky lg:top-36 lg:block`}
            >
              <h2 className="mb-1 text-base font-bold">Learning roadmap</h2>

              <p className="mb-4 text-xs text-slate-500">
                Select a module and open any lesson.
              </p>

              <div className="space-y-3">
                {roadmap.modules.map((module, moduleIndex) => {
                  const isActive = activeModuleId === module.id;

                  return (
                    <div
                      key={module.id}
                      className="overflow-hidden rounded-xl border border-slate-100"
                    >
                      <button
                        type="button"
                        onClick={() => openModule(module)}
                        className={`flex w-full items-start gap-3 p-3 text-left transition ${
                          isActive
                            ? "bg-emerald-50 text-emerald-900"
                            : "bg-white hover:bg-slate-50"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
                            isActive
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {moduleIndex + 1}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold">
                            {module.title}
                          </span>

                          <span className="mt-1 block text-xs text-slate-500">
                            {module.lessons.length} lessons · {module.duration}
                          </span>
                        </span>

                        <span className="text-slate-400">
                          {isActive ? "−" : "+"}
                        </span>
                      </button>

                      {isActive && (
                        <div className="space-y-1 border-t border-slate-100 p-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <button
                              key={lesson.title}
                              type="button"
                              onClick={() => openLesson(lessonIndex)}
                              className={`flex w-full items-start gap-2 rounded-lg px-3 py-2.5 text-left text-xs transition ${
                                activeLessonIndex === lessonIndex
                                  ? "bg-emerald-100 font-semibold text-emerald-900"
                                  : "text-slate-600 hover:bg-slate-50"
                              }`}
                            >
                              <span className="mt-0.5">
                                {activeLessonIndex === lessonIndex
                                  ? "●"
                                  : "○"}
                              </span>

                              <span>{lesson.title}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </aside>

            {/* Lesson content */}
            <section className="min-w-0">
              {!activeLesson ? (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                    YOUR LEARNING PATH
                  </span>

                  <h2 className="mt-3 text-2xl font-bold">
                    Start learning {roadmap.title}
                  </h2>

                  <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                    Select a module from the roadmap to explore its lessons.
                    Each lesson includes an explanation and a code example
                    where applicable.
                  </p>

                  <div className="mt-7 grid gap-4 sm:grid-cols-2">
                    {roadmap.modules.map((module, index) => (
                      <button
                        key={module.id}
                        type="button"
                        onClick={() => openModule(module)}
                        className="rounded-xl border border-slate-200 p-5 text-left transition hover:border-emerald-400 hover:shadow-sm"
                      >
                        <span className="text-xs font-semibold text-emerald-700">
                          MODULE {index + 1}
                        </span>

                        <h3 className="mt-2 font-bold">{module.title}</h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {module.description}
                        </p>

                        <p className="mt-4 text-xs text-slate-500">
                          {module.lessons.length} lessons · {module.duration}
                        </p>

                        <span className="mt-4 inline-block text-sm font-semibold text-emerald-700">
                          Open module →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  {/* Lesson header */}
                  <div className="border-b border-slate-100 p-5 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                        {selectedModule.title}
                      </span>

                      <span className="text-xs text-slate-500">
                        Lesson {activeLessonNumber} of {totalLessons}
                      </span>
                    </div>

                    <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
                      {activeLesson.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {activeLesson.content}
                    </p>
                  </div>

                  {/* Lesson explanation */}
                  <div className="space-y-7 p-5 sm:p-8">
                    <section>
                      <h3 className="text-lg font-bold">
                        What you need to know
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        Read the explanation carefully and understand how the
                        concept is used in real applications. Try changing
                        the example and observe how the result changes.
                      </p>
                    </section>

                    {/* Code example */}
                    <section>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h3 className="text-lg font-bold">Code example</h3>

                        <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                          Example
                        </span>
                      </div>

                      <pre className="overflow-x-auto rounded-xl bg-slate-950 p-4 text-sm leading-7 text-emerald-300 sm:p-6">
                        <code>{activeLesson.example}</code>
                      </pre>
                    </section>

                    <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                      <h3 className="font-semibold text-blue-900">
                        Learning tip
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-blue-800">
                        Type the code into your editor, run it, and experiment
                        with different values. Practicing the concept yourself
                        will help you understand it better.
                      </p>
                    </section>

                    {/* Previous and next navigation */}
                    <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-6">
                      <button
                        type="button"
                        onClick={goToPreviousLesson}
                        disabled={
                          activeLessonNumber === 1
                        }
                        className="rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Previous
                      </button>

                      <button
                        type="button"
                        onClick={goToNextLesson}
                        disabled={activeLessonNumber === totalLessons}
                        className="rounded-lg bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next lesson →
                      </button>
                    </div>
                  </div>
                </article>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
