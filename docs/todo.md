# TODO: Convert to Swift Server Architecture

## Overview
Convert the Next.js frontend to call the Swift server at `/pico/v1/*` endpoints instead of using local `/api/*` routes. The Swift server will serve both the static frontend and provide all API endpoints.

## Phase 1: Frontend API Conversion

### Step 1: Rollback to Working State
- [ ] Restore Next.js API routes (rollback from mock approach)
- [ ] Ensure build works with original `/api/*` endpoints

### Step 2: Update API Endpoints
Replace all `/api/` calls with `/pico/v1/` calls:

#### Authentication Endpoints
- [ ] `/api/auth/login` → `/pico/v1/auth/login`
- [ ] `/api/auth/logout` → `/pico/v1/auth/logout`
- [ ] `/api/auth/signup` → `/pico/v1/auth/signup`
- [ ] `/api/auth/session` → `/pico/v1/auth/session`

#### Chat Endpoints
- [ ] `/api/chat/custom` → `/pico/v1/chat/custom`
- [ ] `/api/chat/azure` → `/pico/v1/chat/azure`
- [ ] `/api/chat/google` → `/pico/v1/chat/google`
- [ ] `/api/chat/anthropic` → `/pico/v1/chat/anthropic`
- [ ] `/api/chat/mistral` → `/pico/v1/chat/mistral`
- [ ] `/api/chat/groq` → `/pico/v1/chat/groq`
- [ ] `/api/chat/perplexity` → `/pico/v1/chat/perplexity`

#### Database Entity Endpoints (Supabase Auto-Generated REST API)
These are handled through Supabase's auto-generated REST API, not custom Next.js routes:

**Core Entities:**
- [ ] `/api/db/assistants` → `/pico/v1/db/assistants` (GET, POST, PUT, DELETE)
- [ ] `/api/db/chats` → `/pico/v1/db/chats` (GET, POST, PUT, DELETE)
- [ ] `/api/db/collections` → `/pico/v1/db/collections` (GET, POST, PUT, DELETE)
- [ ] `/api/db/files` → `/pico/v1/db/files` (GET, POST, PUT, DELETE)
- [ ] `/api/db/folders` → `/pico/v1/db/folders` (GET, POST, PUT, DELETE)
- [ ] `/api/db/models` → `/pico/v1/db/models` (GET, POST, PUT, DELETE)
- [ ] `/api/db/presets` → `/pico/v1/db/presets` (GET, POST, PUT, DELETE)
- [ ] `/api/db/prompts` → `/pico/v1/db/prompts` (GET, POST, PUT, DELETE)
- [ ] `/api/db/tools` → `/pico/v1/db/tools` (GET, POST, PUT, DELETE)
- [ ] `/api/db/workspaces` → `/pico/v1/db/workspaces` (GET, POST, PUT, DELETE)
- [ ] `/api/db/messages` → `/pico/v1/db/messages` (GET, POST, PUT, DELETE)
- [ ] `/api/db/profiles` → `/pico/v1/db/profiles` (GET, POST, PUT, DELETE)

**Relationship Tables:**
- [ ] `/api/db/assistant-tools` → `/pico/v1/db/assistant-tools` (GET, POST, PUT, DELETE)
- [ ] `/api/db/assistant-files` → `/pico/v1/db/assistant-files` (GET, POST, PUT, DELETE)
- [ ] `/api/db/assistant-collections` → `/pico/v1/db/assistant-collections` (GET, POST, PUT, DELETE)
- [ ] `/api/db/collection-files` → `/pico/v1/db/collection-files` (GET, POST, PUT, DELETE)
- [ ] `/api/db/message-file-items` → `/pico/v1/db/message-file-items` (GET, POST, PUT, DELETE)
- [ ] `/api/db/chat-files` → `/pico/v1/db/chat-files` (GET, POST, PUT, DELETE)

**Storage Operations:**
- [ ] `/api/storage/upload` → `/pico/v1/storage/upload` (POST)
- [ ] `/api/storage/remove` → `/pico/v1/storage/remove` (DELETE)
- [ ] `/api/storage/signed-url` → `/pico/v1/storage/signed-url` (POST)

#### File Processing Endpoints
- [ ] `/api/retrieval/process` → `/pico/v1/retrieval/process`
- [ ] `/api/retrieval/process/docx` → `/pico/v1/retrieval/process/docx`
- [ ] `/api/retrieval/retrieve` → `/pico/v1/retrieval/retrieve`

#### Utility Endpoints
- [ ] `/api/command` → `/pico/v1/command`
- [ ] `/api/keys` → `/pico/v1/keys`
- [ ] `/api/username/available` → `/pico/v1/username/available`
- [ ] `/api/username/get` → `/pico/v1/username/get`

### Step 3: Environment Configuration
Map environment variables from Next.js to Swift server:

**Database Configuration:**
- [ ] `DATABASE_URL` → Swift database connection string
- [ ] `SUPABASE_URL` → Remove (no longer needed)
- [ ] `SUPABASE_ANON_KEY` → Remove (no longer needed)
- [ ] `SUPABASE_SERVICE_ROLE_KEY` → Remove (no longer needed)

**API Keys:**
- [ ] `OPENAI_API_KEY` → Swift environment variable
- [ ] `ANTHROPIC_API_KEY` → Swift environment variable
- [ ] `GOOGLE_GEMINI_API_KEY` → Swift environment variable
- [ ] `MISTRAL_API_KEY` → Swift environment variable
- [ ] `GROQ_API_KEY` → Swift environment variable
- [ ] `PERPLEXITY_API_KEY` → Swift environment variable
- [ ] `AZURE_OPENAI_API_KEY` → Swift environment variable

**Ollama Configuration:**
- [ ] `NEXT_PUBLIC_OLLAMA_URL` → Swift Ollama server URL

**Application Configuration:**
- [ ] `NEXT_PUBLIC_API_URL` → Remove (frontend will use relative URLs)
- [ ] `NEXT_PUBLIC_OPENAI_ORGANIZATION_ID` → Swift environment variable
- [ ] `NEXT_PUBLIC_USER_FILE_SIZE_LIMIT` → Swift file size limit

### Step 4: Remove Server-Side Code
- [ ] Remove all `/app/api/` route files
- [ ] Remove server-side database files
- [ ] Remove Supabase dependencies
- [ ] Configure Next.js for static export only

### Step 5: Test Frontend
- [ ] Verify all API calls work with `/pico/v1/` endpoints
- [ ] Test static build and export
- [ ] Verify no server-side dependencies remain

### Step 6: Prepare Swift Server
- [ ] Verify that and potentially fix build script is executed in Package.swift
- [ ] Make sure the static export is either copied or saved directly in `Sources/PicoChatUI/build`

## Phase 2: Swift Server Implementation

### Step 1: Basic Server Setup
- [ ] Set up Hummingbird 2.0 server
- [ ] Configure static file serving from `out/` directory
- [ ] Set up basic routing structure
- [ ] Configure environment variables

### Step 2: Authentication Endpoints
- [ ] Implement `/pico/v1/auth/login` (POST)
- [ ] Implement `/pico/v1/auth/logout` (POST)
- [ ] Implement `/pico/v1/auth/signup` (POST)
- [ ] Implement `/pico/v1/auth/session` (GET)

### Step 3: Chat Endpoints
- [ ] Implement `/pico/v1/chat/custom` (POST)
- [ ] Implement `/pico/v1/chat/azure` (POST)
- [ ] Implement `/pico/v1/chat/google` (POST)
- [ ] Implement `/pico/v1/chat/anthropic` (POST)
- [ ] Implement `/pico/v1/chat/mistral` (POST)
- [ ] Implement `/pico/v1/chat/groq` (POST)
- [ ] Implement `/pico/v1/chat/perplexity` (POST)

### Step 4: Database Entity Endpoints
Implement CRUD operations for all entities with Supabase-compatible API:

**Core Entities:**
- [ ] `/pico/v1/db/assistants` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/chats` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/collections` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/files` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/folders` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/models` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/presets` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/prompts` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/tools` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/workspaces` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/messages` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/profiles` (GET, POST, PUT, DELETE)

**Relationship Tables:**
- [ ] `/pico/v1/db/assistant-tools` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/assistant-files` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/assistant-collections` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/collection-files` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/message-file-items` (GET, POST, PUT, DELETE)
- [ ] `/pico/v1/db/chat-files` (GET, POST, PUT, DELETE)

### Step 5: Storage Endpoints
- [ ] Implement `/pico/v1/storage/upload` (POST)
- [ ] Implement `/pico/v1/storage/remove` (DELETE)
- [ ] Implement `/pico/v1/storage/signed-url` (POST)

### Step 6: File Processing Endpoints
- [ ] Implement `/pico/v1/retrieval/process` (POST)
- [ ] Implement `/pico/v1/retrieval/process/docx` (POST)
- [ ] Implement `/pico/v1/retrieval/retrieve` (POST)

### Step 7: Utility Endpoints
- [ ] Implement `/pico/v1/command` (POST)
- [ ] Implement `/pico/v1/keys` (GET, POST)
- [ ] Implement `/pico/v1/username/available` (GET)
- [ ] Implement `/pico/v1/username/get` (GET)

## Phase 3: Integration and Testing

### Step 1: Database Integration
- [ ] Set up database schema in Swift
- [ ] Implement data models
- [ ] Add database migrations
- [ ] Test all CRUD operations

### Step 2: File Storage
- [ ] Implement file upload handling
- [ ] Set up local file storage
- [ ] Implement file processing
- [ ] Add file type validation

### Step 3: Authentication
- [ ] Implement session management
- [ ] Add user authentication
- [ ] Implement password hashing
- [ ] Add security measures

### Step 4: Testing
- [ ] Test all endpoints with frontend
- [ ] Test file upload and processing
- [ ] Test chat functionality
- [ ] Test user management

## Notes

- All API calls will be to `/pico/v1/*` endpoints
- Swift server will serve static files from the exported Next.js build
- No need for CORS since same origin
- Focus on 1:1 conversion from Next.js API routes to Swift endpoints
- Start with frontend conversion, then implement Swift server step by step
- Database entities use Supabase-compatible REST API patterns
- Environment variables need to be mapped from Next.js to Swift configuration 