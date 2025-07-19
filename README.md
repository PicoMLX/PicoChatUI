# Chatbot UI

An open source AI chat application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🤖 Chat with multiple AI providers (OpenAI, Anthropic, Google, Azure, etc.)
- 🎨 Clean and responsive UI
- 🔒 Authentication system (localhost-based)
- 💾 Local data storage
- 🌐 Multi-language support
- 📱 Progressive Web App (PWA)
- 🎯 File upload and processing
- 🔧 Customizable settings

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/mckaywrigley/chatbot-ui.git
```

### 2. Install Dependencies

Open a terminal in the root directory of your local Chatbot UI repository and run:

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Fill in your environment variables in the `.env.local` file:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/pico/v1

# Ollama
NEXT_PUBLIC_OLLAMA_URL=http://localhost:11434

# API Keys (Optional: Entering an API key here overrides the API keys globally for all users.)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GEMINI_API_KEY=
MISTRAL_API_KEY=
GROQ_API_KEY=
PERPLEXITY_API_KEY=
OPENROUTER_API_KEY=

# OpenAI API Information
NEXT_PUBLIC_OPENAI_ORGANIZATION_ID=

# Azure API Information
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_GPT_35_TURBO_NAME=
AZURE_GPT_45_VISION_NAME=
AZURE_GPT_45_TURBO_NAME=
AZURE_EMBEDDINGS_NAME=

# General Configuration (Optional)
EMAIL_DOMAIN_WHITELIST=
EMAIL_WHITELIST=

# File size limit for uploads in bytes
NEXT_PUBLIC_USER_FILE_SIZE_LIMIT=10485760
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Authentication

This application uses a localhost-based authentication system. The authentication endpoints are:

- `POST /pico/v1/auth/login` - User login
- `POST /pico/v1/auth/signup` - User registration  
- `POST /pico/v1/auth/logout` - User logout
- `GET /pico/v1/auth/session` - Get current session

## Database

The application uses a localhost-based database system. All database operations are handled through API endpoints at `/api/db/*`.

## Deployment

### Vercel

1. Fork this repository
2. Create a new project on Vercel
3. Import your forked repository
4. Add your environment variables
5. Deploy

### Docker

```bash
docker build -t chatbot-ui .
docker run -p 3000:3000 chatbot-ui
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
