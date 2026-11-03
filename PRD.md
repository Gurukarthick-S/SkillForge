SkillForge AI — Product Requirements Document (PRD)
Document version: 1.0
Project: SkillForge AI
Document type: Product Requirements Document
Status: Draft — validate against the final implemented application
1. Product overview
SkillForge AI is a web application intended to help students, job seekers, and working professionals understand the skills relevant to their career goals. The product brings together a user's skill profile, information about skill demand, and relevant job opportunities.

The intended experience is:
1. A user creates an account and signs in.
2. The user adds and manages skills in their profile.
3. The application can present information about skill demand, outdated skills, and emerging skills when a reliable data source and analysis method are connected.
4. The user can search for relevant job opportunities.
Important implementation note: User authentication, skill management, and job-search integration are described in this document as project capabilities. Skill-demand analysis, outdated-skill detection, and emerging-skill recommendations should be treated as planned capabilities unless they are already implemented and backed by a defined data source and analysis logic.
2. Problem statement
Students and job seekers may not know which skills are relevant to their target roles. They may find it difficult to distinguish commonly requested skills from skills that are declining in relevance, and they may not know which skills to learn next. Job information is also spread across different websites.

SkillForge AI aims to provide a single place to manage skills and explore job opportunities, with the longer-term goal of providing useful skill-trend insights.
3. Product vision
Make career skill planning easier by helping users connect the skills they have with the skills employers request.
4. Goals and objectives
4.1 Product goals
- Allow users to create and manage a personal skill profile.
- Protect each user's private skill data.
- Allow users to discover relevant job opportunities.
- Provide a foundation for skill-demand and skill-trend analysis.
- Present information in a clear and understandable interface.
4.2 Success measures
The project can be evaluated using measures such as:
- Users can register and log in successfully.
- Authenticated users can create, view, and delete their own skills.
- A user cannot access another user's private skill records.
- Job search returns useful results or a clear error when the external provider is unavailable.
- API errors are returned with appropriate HTTP status codes.
- The interface works on common desktop and mobile screen sizes.
Actual numerical targets should be added after the project has real usage data.
5. Target users
User type	Need
Students	Understand skills that may help with future job roles
Job seekers	Compare their skills with skills requested in job listings
Working professionals	Review and update their skill profiles
Career changers	Explore skills associated with a different role


6. User stories
- As a new user, I want to register so that I can create my own account.
- As a registered user, I want to log in so that I can access my account.
- As a user, I want to add a skill so that my profile reflects my abilities.
- As a user, I want to view my saved skills so that I can review my profile.
- As a user, I want to delete a skill that is no longer relevant to my profile.
- As a user, I want to search job listings so that I can explore opportunities.
- As a user, I want skill-trend information so that I can make more informed learning decisions. (Planned unless implemented.)
7. Functional requirements
FR-01: User registration
- The system shall allow a new user to submit the required registration details.
- The backend shall validate the submitted details.
- Passwords shall be stored securely as password hashes, not as plain text.
- The system shall return a suitable success or error response.
FR-02: User login
- The system shall allow a registered user to log in using valid credentials.
- The backend shall verify the password against the stored password hash.
- On successful login, the backend shall issue a JWT.
- The JWT shall be signed using a server-side secret stored in an environment variable.
- Invalid credentials shall not grant access.
FR-03: Authentication and authorization
- Protected endpoints shall require a valid authentication token.
- Authentication middleware shall verify the JWT.
- The middleware shall make the authenticated user's identity available to downstream controllers through req.user.
- User-owned records shall be queried using the authenticated user's ID.
- The backend shall not trust a user ID supplied by the client as proof of ownership.
FR-04: Create a skill
- An authenticated user shall be able to submit skill information.
- The backend shall associate the new skill with req.user._id.
- The API shall return 201 Created when creation succeeds.
- Invalid input shall return an appropriate client-error response.
FR-05: View skills
- An authenticated user shall be able to retrieve their saved skills.
- The backend shall return only records belonging to the authenticated user.
FR-06: Delete a skill
- An authenticated user shall be able to delete a skill they own.
- The backend shall match both the requested skill ID and authenticated user ID.
- If no owned record matches, the API shall return 404 Not Found.
FR-07: Job search
- The application shall provide a way to search job opportunities.
- The backend shall request job information from the configured external job provider.
- The backend shall handle provider errors and return a clear response to the frontend.
- If the provider is unavailable or returns an unusable response, the backend may return 502 Bad Gateway according to the implemented error mapping.
FR-08: Skill trend analysis (planned unless implemented)
- The system may compare skills against a defined, dated dataset of job listings or another documented source.
- It may classify skills as in-demand, declining, or emerging only when the classification method and evidence are defined.
- The UI should show the source and date range of the data.
- The system should not present unsupported predictions as facts.
8. Non-functional requirements
Security
- Store secrets in environment variables.
- Never expose JWT_SECRET to the frontend.
- Hash passwords using a suitable password-hashing library.
- Validate and sanitize user input.
- Protect user-owned records with ownership checks.
- Avoid returning passwords, password hashes, or sensitive tokens in API responses.
Performance
- Use efficient database queries.
- Avoid unnecessary repeated external API calls.
- Consider pagination and caching if the data volume or request rate requires them.
- Set reasonable timeouts for external service calls.
Reliability
- Handle database and external API errors.
- Return consistent JSON responses.
- Log useful server-side diagnostic information without logging passwords or secrets.
Usability
- Use clear labels and error messages.
- Provide loading, empty, success, and error states.
- Support common desktop and mobile screen sizes.
Maintainability
- Separate routes, controllers, middleware, models, and configuration.
- Use consistent naming and error-handling conventions.
- Document environment variables and setup steps.
9. Scope
9.1 In scope
- User registration and login.
- JWT-based protected routes.
- User-specific skill creation, retrieval, and deletion.
- Job search through an external provider.
- React-based user interface.
- MongoDB persistence through Mongoose.
- API testing and project documentation.
9.2 Planned / verify before claiming as complete
- Automated skill-demand scoring.
- Detection of outdated skills.
- Emerging-skill recommendations.
- Personalized learning roadmaps.
- AI-generated career advice.
- Admin analytics or dashboards.
9.3 Out of scope for the initial version
- Guaranteeing employment or job placement.
- Guaranteeing that a skill will remain in demand.
- Treating external job listings as a complete representation of the job market.
- Making career decisions on behalf of users.
10. Assumptions and dependencies
- Users have an internet connection.
- The application has access to a MongoDB database.
- The backend has the required environment variables configured.
- Job search depends on the availability, terms, and response format of the selected external job provider.
- Skill-trend analysis depends on a trustworthy dataset and a documented analysis method.
11. Constraints and risks
Risk	Impact	Mitigation
External job API unavailable	Job search may fail	Handle errors, set timeouts, show a useful message
Job data is incomplete or old	Misleading results	Display source/date and avoid unsupported claims
JWT secret exposed	Authentication compromise	Keep secret in server environment; rotate if exposed
Missing ownership checks	Users may access other users' data	Filter every user-owned query by authenticated user ID
Database unavailable	Core features may fail	Handle connection errors and report service failure
Skill trend data is biased	Poor recommendations	Document source, sample size, and time period


12. Acceptance criteria
The initial release is acceptable when:
- A user can register and log in with valid credentials.
- Invalid credentials are rejected.
- Protected endpoints reject missing or invalid tokens.
- A user can create and retrieve their own skills.
- A user cannot retrieve another user's skills.
- A user cannot delete another user's skill by changing the URL ID.
- Job search returns results when the external provider is available.
- Job search returns a controlled error when the provider fails.
- Setup instructions allow another developer to run the project.
13. Open decisions
Record the final decisions here before submission:
- Exact registration fields: [confirm from User model]
- Exact skill fields: [confirm from Skill model]
- Exact job provider and API parameters: [confirm from jobController.js]
- Whether skill trend analysis is implemented: Partial
- Whether update-skill functionality exists: No
- Deployment URL and hosting provider: Not deployed
14. Glossary
- JWT: JSON Web Token, used to represent authenticated identity.
- API: Application Programming Interface.
- CRUD: Create, Read, Update, Delete.
- MERN: MongoDB, Express, React, Node.js.
- Functional requirement: A behavior the system must provide.
- Non-functional requirement: A quality or constraint such as security or performance.