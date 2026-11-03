SkillForge AI — Low-Level Design (LLD)
Document version: 1.0
Project: SkillForge AI
Document type: Low-Level Design
Status: Draft — align names, fields, and validation with the final source code
1. Purpose
This document describes the implementation-level design of SkillForge AI: folder organization, route definitions, controller responsibilities, data models, authentication logic, request/response examples, and error handling.
2. Backend folder organization
The known backend organization is:
server/
├── controllers/
│   ├── skillController.js
│   └── jobController.js
├── middleware/
│   └── auth.middleware.js
├── models/
│   ├── User.js              # confirm actual filename
│   └── Skill.js             # confirm actual filename
├── routes/
│   ├── skillRoutes.js       # confirm actual filename
│   └── jobRoutes.js
├── .env
├── package.json
└── server.js
The frontend organization should be copied from the actual client/src directory rather than guessed.
3. Module responsibilities
Module	Responsibility
server.js	Configure Express, middleware, routes, and server startup
routes/	Define endpoint paths and attach middleware/controllers
controllers/skillController.js	Read, create, and delete skills
controllers/jobController.js	Search jobs using external provider
middleware/auth.middleware.js	Verify JWT and attach authenticated user
models/	Define Mongoose schemas and database models
client/src/	Render UI and communicate with backend


4. API route design
Example route configuration. Adjust imports and filenames to match the repository.
// routes/skillRoutes.js
import express from "express";
import {
  getSkills,
  createSkill,
  deleteSkill
} from "../controllers/skillController.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getSkills);
router.post("/", protect, createSkill);
router.delete("/:id", protect, deleteSkill);

export default router;
Example application registration:
// server.js
import skillRoutes from "./routes/skillRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";

app.use("/api/skills", skillRoutes);
app.use("/api/jobs", jobRoutes);
The protect import name must match the actual export from the middleware file. If the middleware uses a named export, use a named import.
5. Skill data model
A conceptual Skill schema:
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      trim: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;
Important: This is a reference design based on the known skill ownership pattern. Use the exact fields, model name, collection behavior, and validation rules from the project's actual model file.
Field descriptions
Field	Type	Purpose
_id	ObjectId	Unique MongoDB document identifier
name	String	Skill name
category	String	Optional skill category
user	ObjectId reference	Owner of the skill
createdAt	Date	Creation timestamp when timestamps are enabled
updatedAt	Date	Last update timestamp when timestamps are enabled


6. User model
The User model should contain the fields required by the actual registration and login implementation. A typical design may contain:
Field	Typical type	Purpose
_id	ObjectId	Unique user identifier
name	String	User's display name
email	String	Login identifier; often unique
password	String	Password hash, never plain text
createdAt / updatedAt	Date	Timestamps, if enabled


Do not copy this table as an exact schema until you have checked User.js or the equivalent model.
7. Skill controller design
7.1 getSkills
Purpose: Return skills belonging to the authenticated user.

Core database operation:
const skills = await Skill.find({
  user: req.user._id
});
Steps:
1. Authentication middleware verifies the token.
2. Middleware attaches the user to req.user.
3. Controller queries the Skill collection using the authenticated user's ID.
4. Controller returns the matching skills.
Example response:
{
  "success": true,
  "skills": [
    {
      "_id": "SKILL_ID",
      "name": "JavaScript",
      "category": "Programming",
      "user": "USER_ID"
    }
  ]
}
The response shape is illustrative; use the actual response returned by the controller.
7.2 createSkill
Purpose: Create a skill owned by the authenticated user.

Core database operation:
const skill = await Skill.create({
  ...req.body,
  user: req.user._id
});
Steps:
1. Verify authentication.
2. Validate required fields.
3. Take the owner ID from req.user._id.
4. Create the skill document.
5. Return 201 Created.
Security note: Set user after spreading req.body, as shown, so a client-supplied user value cannot override the authenticated user's ID.

Example request:
POST /api/skills
Authorization: Bearer <JWT>
Content-Type: application/json
{
  "name": "JavaScript",
  "category": "Programming"
}
Illustrative success response:
{
  "message": "Skill created successfully",
  "skill": {
    "_id": "SKILL_ID",
    "name": "JavaScript",
    "category": "Programming",
    "user": "USER_ID"
  }
}
7.3 deleteSkill
Purpose: Delete a skill only when it belongs to the authenticated user.

Core database operation:
const skill = await Skill.findOneAndDelete({
  _id: req.params.id,
  user: req.user._id
});
Steps:
1. Read the skill ID from req.params.id.
2. Read the authenticated user ID from req.user._id.
3. Search for a document matching both values.
4. If no matching document exists, return 404 Not Found.
5. Otherwise, return a success response.
Illustrative success response:
{
  "message": "Skill deleted successfully"
}
Security note: Searching only by _id is insufficient. A user could attempt to delete another user's record by changing the ID in the URL. Including the owner ID prevents this object-level authorization failure.
8. Authentication middleware design
8.1 JWT creation
The project context indicates a JWT payload containing the user's ID and an expiry of seven days:
const token = jwt.sign(
  { id: user._id.toString() },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
- Payload: identifies the user.
- Secret: signs the token; must remain on the server.
- Expiry: token is no longer accepted after the configured period.
8.2 JWT verification
The middleware should:
1. Read the Authorization header.
2. Extract the Bearer token.
3. Verify it with jwt.verify(token, process.env.JWT_SECRET).
4. Use the decoded ID to find the user if the application requires a fresh user lookup.
5. Attach the authenticated user to req.user.
6. Continue to the protected controller.
Illustrative middleware pattern:
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Not authorized, token missing"
    });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({
      message: "Server authentication configuration error"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User no longer exists"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired"
      });
    }

    if (
      error.name === "JsonWebTokenError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        message: "Invalid token"
      });
    }

    return res.status(500).json({
      message: "Authentication error"
    });
  }
};

export default protect;
This is a reference implementation, not a claim that the current middleware is identical. Match the import path, model name, export style, and error responses to the repository.
8.3 JWT error types
Error name	Meaning	Typical response
TokenExpiredError	Token has expired	401
JsonWebTokenError	Invalid or malformed token/signature	401
NotBeforeError	Token is not active yet	401
Other unexpected error	Unexpected server-side failure	500, with server-side logging


9. Job search design
9.1 Responsibilities
The job controller:
1. Reads search parameters from the request.
2. Validates or normalizes the parameters.
3. Sends a request to the configured external job API.
4. Checks whether the provider returned a successful response.
5. Extracts and returns job data in the format expected by the frontend.
6. Handles network errors and provider failures.
9.2 Example endpoint
GET /api/jobs?search=frontend
The exact query parameter name must match jobController.js and jobRoutes.js.
9.3 Error handling
- Invalid search parameters: 400 Bad Request.
- Provider returns an unusable response: 502 Bad Gateway, if that is the chosen mapping.
- Unexpected backend error: 500 Internal Server Error.
Do not expose provider credentials or internal stack traces to the client.
10. HTTP status-code conventions
Status	Meaning	Example
200	OK	Skills retrieved or skill deleted
201	Created	Skill created
400	Bad Request	Required skill name missing
401	Unauthorized	Token missing, invalid, or expired
403	Forbidden	Authenticated user lacks permission
404	Not Found	No matching owned skill
500	Internal Server Error	Unexpected backend failure
502	Bad Gateway	External job provider returned an unusable response


11. Environment variables
Example .env.example (use placeholders only):
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=replace_with_a_long_random_secret
Add other variables only if the current implementation uses them. Never commit the real .env file or actual secret values.
12. Validation and security checks
- Validate required fields on the backend.
- Trim user-entered text where appropriate.
- Check that route IDs are valid MongoDB ObjectIds before querying, if required.
- Ensure a skill is associated with the authenticated user.
- Never use a client-provided owner ID for authorization.
- Exclude password hashes from returned user objects.
- Do not log tokens, passwords, or secret values.
- Use HTTPS in production.
- Apply rate limiting and other production protections if configured.
13. Testing plan
Authentication tests
- Register with valid data.
- Reject invalid or missing registration data.
- Log in with correct credentials.
- Reject incorrect credentials with 401.
- Reject requests without a token.
- Reject malformed and expired tokens.
Skill tests
- Retrieve skills for the authenticated user.
- Confirm one user's skills are not returned to another user.
- Create a skill and confirm its owner is the authenticated user.
- Reject invalid skill input.
- Delete an owned skill.
- Confirm a user cannot delete another user's skill.
- Return 404 when the requested skill does not exist or is not owned by the requester.
Job-search tests
- Return results for a valid search when the provider is available.
- Handle an empty or invalid search query.
- Handle provider non-success responses.
- Handle network timeout or connection failure.
- Ensure the frontend receives a predictable JSON error.
Suggested tools
Use the testing tools actually present in the repository. Postman can be used for manual endpoint testing. If automated tests are added, document the test framework and commands.
14. Traceability: requirements to implementation
Requirement	Likely implementation area
Register/login	Auth routes, auth controller, User model
Protect routes	middleware/auth.middleware.js
View skills	skillRoutes.js, getSkills
Create skills	skillRoutes.js, createSkill
Delete skills	skillRoutes.js, deleteSkill
Search jobs	jobRoutes.js, jobController.js
Persist data	Mongoose models and MongoDB
Display results	React pages/components/services


Confirm exact paths and function names from the current code.
15. Implementation details to fill in before final submission
Complete this checklist using your actual code:
- [ ] Confirm exact User model filename and fields.
- [ ] Confirm exact Skill model filename and fields.
- [ ] Confirm exact route paths and HTTP methods.
- [ ] Confirm middleware export name and import style.
- [ ] Confirm the job provider URL and query parameters.
- [ ] Confirm actual response JSON shapes.
- [ ] Confirm whether frontend stores JWT in memory, local storage, session storage, or a cookie.
- [ ] Confirm actual validation rules.
- [ ] Confirm whether automated tests exist and list their commands.
- [ ] Remove any feature from the “implemented” section if it is not working in the application.
16. Short viva explanation
What is LLD?
LLD explains the internal implementation of the application, such as database schemas, API routes, controller functions, middleware, and validation.

Why do we use req.user._id?
It identifies the authenticated user. We use it in database queries so users can access only their own skill records.

Why do we check both skill ID and user ID when deleting?
The skill ID identifies the record, and the user ID verifies ownership. Both conditions prevent one user from deleting another user's skill.

What is the role of middleware?
Middleware runs between the incoming request and controller. Our authentication middleware verifies the JWT and attaches the authenticated user to the request.