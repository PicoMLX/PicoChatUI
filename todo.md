# TODO: Complete Supabase Removal

## Overview
This document lists all files that still need to be updated to complete the removal of Supabase dependency and replace it with the new localhost-based system.

## Database Files to Update

### Core Database Operations
- [ ] `db/assistants.ts` - Assistant CRUD operations
- [ ] `db/files.ts` - File management operations
- [ ] `db/tools.ts` - Tool CRUD operations
- [ ] `db/models.ts` - Model management operations
- [ ] `db/presets.ts` - Preset CRUD operations
- [ ] `db/prompts.ts` - Prompt CRUD operations
- [ ] `db/workspaces.ts` - Workspace management operations
- [ ] `db/chats.ts` - Chat CRUD operations
- [ ] `db/messages.ts` - Message CRUD operations
- [ ] `db/collections.ts` - Collection CRUD operations
- [ ] `db/folders.ts` - Folder CRUD operations

### Relationship Tables
- [ ] `db/assistant-tools.ts` - Assistant-tool relationships
- [ ] `db/assistant-files.ts` - Assistant-file relationships
- [ ] `db/assistant-collections.ts` - Assistant-collection relationships
- [ ] `db/collection-files.ts` - Collection-file relationships
- [ ] `db/message-file-items.ts` - Message-file relationships

### Storage Operations
- [ ] `db/storage/workspace-images.ts` - Workspace image storage
- [ ] `db/storage/message-images.ts` - Message image storage
- [ ] `db/storage/profile-images.ts` - Profile image storage
- [ ] `db/storage/assistant-images.ts` - Assistant image storage

### Limits and Configuration
- [ ] `db/limits.ts` - Usage limits management
- [ ] `db/index.ts` - Database initialization and utilities

## API Routes to Create

### Database API Endpoints
- [ ] `app/api/db/assistants/route.ts` - Assistant CRUD API
- [ ] `app/api/db/files/route.ts` - File management API
- [ ] `app/api/db/tools/route.ts` - Tool CRUD API
- [ ] `app/api/db/models/route.ts` - Model management API
- [ ] `app/api/db/presets/route.ts` - Preset CRUD API
- [ ] `app/api/db/prompts/route.ts` - Prompt CRUD API
- [ ] `app/api/db/workspaces/route.ts` - Workspace API
- [ ] `app/api/db/chats/route.ts` - Chat CRUD API
- [ ] `app/api/db/messages/route.ts` - Message CRUD API
- [ ] `app/api/db/collections/route.ts` - Collection CRUD API
- [ ] `app/api/db/folders/route.ts` - Folder CRUD API
- [ ] `app/api/db/assistant-tools/route.ts` - Assistant-tool relationships API
- [ ] `app/api/db/assistant-files/route.ts` - Assistant-file relationships API
- [ ] `app/api/db/assistant-collections/route.ts` - Assistant-collection relationships API
- [ ] `app/api/db/collection-files/route.ts` - Collection-file relationships API
- [ ] `app/api/db/message-file-items/route.ts` - Message-file relationships API

### Storage API Endpoints
- [ ] `app/api/storage/upload/route.ts` - File upload API
- [ ] `app/api/storage/remove/route.ts` - File deletion API
- [ ] `app/api/storage/signed-url/route.ts` - Signed URL generation API

## Components to Update

### Authentication Components
- [ ] `components/utility/change-password.tsx` - Update to use new auth client
- [ ] `components/utility/profile-settings.tsx` - Update profile management
- [ ] `components/utility/global-state.tsx` - Update state management

### Chat Components
- [ ] `components/chat/chat-hooks/use-chat-handler.tsx` - Update chat operations
- [ ] `components/chat/chat-hooks/use-chat-history.tsx` - Update history management
- [ ] `components/chat/chat-hooks/use-prompt-and-command.tsx` - Update prompt handling

### Sidebar Components
- [ ] `components/sidebar/items/assistants/assistant-item.tsx` - Update assistant operations
- [ ] `components/sidebar/items/chat/chat-item.tsx` - Update chat operations
- [ ] `components/sidebar/items/files/file-item.tsx` - Update file operations
- [ ] `components/sidebar/items/folders/folder-item.tsx` - Update folder operations
- [ ] `components/sidebar/items/presets/preset-item.tsx` - Update preset operations
- [ ] `components/sidebar/items/prompts/prompt-item.tsx` - Update prompt operations
- [ ] `components/sidebar/items/tools/tool-item.tsx` - Update tool operations

## Type Definitions to Update

### Remove Supabase Types
- [ ] Remove `@/supabase/types` imports from all files
- [ ] Update type definitions to use generic types instead of Supabase-specific types
- [ ] Update `TablesInsert`, `TablesUpdate`, `Tables` type references

### Update Import Statements
- [ ] Replace `import { supabase } from "@/lib/supabase/browser-client"` with `import { dbClient } from "@/lib/db/client"`
- [ ] Replace `import { createClient } from "@/lib/supabase/server"` with appropriate server-side calls
- [ ] Update all database operation calls to use the new client

## Configuration Updates

### Environment Variables
- [ ] Update `.env.local.example` to remove Supabase variables
- [ ] Add new API URL configuration
- [ ] Update deployment documentation

### Package.json Scripts
- [ ] Remove Supabase-related scripts (already done)
- [ ] Update development scripts to reflect new setup

## Testing and Validation

### Authentication Testing
- [ ] Test login functionality
- [ ] Test signup functionality
- [ ] Test session management
- [ ] Test logout functionality

### Database Testing
- [ ] Test CRUD operations for all entities
- [ ] Test file upload and storage
- [ ] Test relationship management
- [ ] Test error handling

### Integration Testing
- [ ] Test chat functionality with new database
- [ ] Test file processing with new storage
- [ ] Test user profile management
- [ ] Test workspace management

## Backend Implementation

### Database Backend
- [ ] Implement actual database backend (currently using mock data)
- [ ] Set up proper session management
- [ ] Implement proper error handling
- [ ] Add data validation

### Storage Backend
- [ ] Implement file storage system
- [ ] Add file type validation
- [ ] Implement file size limits
- [ ] Add security measures

## Documentation Updates

### Code Documentation
- [ ] Update inline comments to reflect new architecture
- [ ] Add JSDoc comments for new functions
- [ ] Update API documentation

### User Documentation
- [ ] Update setup instructions
- [ ] Update deployment guide
- [ ] Update troubleshooting guide

## Priority Order

### High Priority (Core Functionality)
1. Update all database files in `db/` directory
2. Create essential API endpoints
3. Update authentication components
4. Test basic functionality

### Medium Priority (Features)
1. Update chat and sidebar components
2. Implement storage functionality
3. Update type definitions
4. Add error handling

### Low Priority (Polish)
1. Update documentation
2. Add comprehensive testing
3. Optimize performance
4. Add advanced features

## Notes

- The new system uses localhost API endpoints instead of direct database calls
- Authentication is now cookie-based instead of JWT tokens
- File storage is handled through API endpoints instead of direct Supabase storage
- All database operations should be implemented as REST API endpoints
- The current implementation uses mock data - real backend implementation is needed 