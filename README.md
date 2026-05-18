# CLAUDE.md — AI Instructions for This Project

## Stack

- React 18 + Vite 7 + TypeScript (strict mode)
- Feature-Sliced Design (FSD) 2.1 architecture
- MUI v5 (Material UI) with Emotion — default theme, no customization
- Zustand for client state management
- TanStack Query (React Query v5) for server state
- Axios for HTTP requests
- CSS Modules + SASS (global vars/mixins auto-injected by Vite)
- React Router v7 (`createBrowserRouter`)

## FSD Architecture

### Layer Order (top = highest, cannot import from layers above)

```
app        — orchestration: providers, router, global config
pages      — full-page components (route targets)
widgets    — composite UI blocks combining features/entities
features   — user-facing actions and interactions with UI
entities   — domain models, stores, and API for a business entity
shared     — reusable infrastructure: api, ui, lib, types, constants
```

### Import Rule

A layer may only import from layers **below** it:
- `app` → app and all layers
- `pages` → pages, widgets, features, entities, shared
- `widgets` → widgets, features, entities, shared
- `features` → features, entities, shared
- `entities` → entities, shared
- `shared` → shared, nothing from project layers above

### Relaxation: Cross-Slice Imports Within Entities

**Cross-slice imports within a layer are allowed** in this project.
`entities/todos` may import `entities/auth` (e.g., to get the current user).
This is enforced in `eslint-plugin-boundaries` config.

### Public API Rule

Always import from a slice's `index.ts`, never from internal paths:
```ts
// CORRECT
import { useAuthStore } from '@entities/auth';
// WRONG
import { useAuthStore } from '@entities/auth/model/authStore';
```

## Path Aliases

```
@app/*       → src/app/*
@pages/*     → src/pages/*
@widgets/*   → src/widgets/*
@features/*  → src/features/*
@entities/*  → src/entities/*
@shared/*    → src/shared/*
```

## Where Things Go

### Axios Services

- **Base instance**: `src/shared/api/instance.ts` — single axios instance, request/response interceptors, token and logout registries
- **Entity API**: `src/entities/{name}/api/{name}Api.ts` — CRUD operations for one entity

```ts
// src/entities/posts/api/postsApi.ts
import { apiInstance } from '@shared/api';

export const postsApi = {
  getAll: () => apiInstance.get<Post[]>('/posts').then(r => r.data),
  getById: (id: number) => apiInstance.get<Post>(`/posts/${id}`).then(r => r.data),
  create: (dto: CreatePostDto) => apiInstance.post<Post>('/posts', dto).then(r => r.data),
  update: (id: number, dto: UpdatePostDto) =>
    apiInstance.put<Post>(`/posts/${id}`, dto).then(r => r.data),
  delete: (id: number) => apiInstance.delete(`/posts/${id}`).then(r => r.data),
};
```

### React Query Hooks

- **Queries** (read): `src/entities/{name}/queries.ts`
- **Mutations** (write): `src/features/{name}/api/use{Action}.ts`
- Always use a **query key factory**:

```ts
// src/entities/posts/queries.ts
export const postKeys = {
  all: ['posts'] as const,
  list: () => [...postKeys.all, 'list'] as const,
  detail: (id: number) => [...postKeys.all, id] as const,
};

export const usePosts = () =>
  useQuery({ queryKey: postKeys.list(), queryFn: postsApi.getAll });

export const usePost = (id: number) =>
  useQuery({ queryKey: postKeys.detail(id), queryFn: () => postsApi.getById(id) });
```

```ts
// src/features/createPost/api/useCreatePost.ts
export const useCreatePost = () =>
  useMutation({
    mutationFn: postsApi.create,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: postKeys.list() }),
  });
```

### Zustand Stores

- **Entity stores**: `src/entities/{name}/model/{name}Store.ts` — server-synced domain data, auth state
- **Feature stores**: `src/features/{name}/model/{name}Store.ts` — transient UI state (wizard step, draft form)
- **App-level stores**: `src/app/model/` — rare, only for truly global UI state

Selectors must be pure functions exported alongside the store:
```ts
export const selectUser = (s: AuthState) => s.user;
export const selectIsAuthenticated = (s: AuthState) => s.isAuthenticated;
```

Accessing stores outside React components: `useMyStore.getState()`.

### Shared Types

- `src/shared/types/` — domain-independent interfaces: Pagination, ApiResponse, etc.
- Entity-specific types live inside the entity: `src/entities/auth/model/types.ts`

### Shared UI Components

- `src/shared/ui/{ComponentName}/` — reusable, no business logic awareness
- May use MUI, CSS Modules, or both
- Must not import from entities/features/widgets/pages

## Auth Architecture

- **Types** (`User`, `AuthTokens`, `LoginCredentials`): `src/entities/auth/model/types.ts`
- **Zustand store** (user, accessToken, isAuthenticated): `src/entities/auth/model/authStore.ts`
- **Auth API service** (login, logout, getMe): `src/entities/auth/api/authApi.ts`
- **Token sync to axios**: `entities/auth` store calls `setApiToken()` from `shared/api` on login/logout
- **Logout on 402**: `app/providers/AuthProvider` registers logout callback via `setLogoutCallback()`
- **Route guard**: `app/router/ProtectedRoute` redirects to `/login` if not authenticated
- **Other entities** can import `User` type and auth selectors from `@entities/auth`

## Slice File Structure Pattern

```
entities/posts/
  api/         ← axios service functions
  model/       ← zustand store + selectors + types
  ui/          ← entity-specific display components (optional)
  lib/         ← entity-specific utilities (optional)
  queries.ts   ← react-query hooks (optional)
  index.ts     ← PUBLIC API — the only entry point for other layers
```

## CSS / Styling Conventions

- Use CSS Modules (`.module.scss`) for all component styles
- SASS variables/mixins are globally available in all `.scss` files — use them directly, no `@use` needed
- MUI components: use `sx` prop for one-off overrides, `theme` for reusable design tokens
- Global utility classes are in `src/shared/styles/global.scss` — use sparingly

## Do Not

- Do NOT create a new axios instance — use only `src/shared/api/instance.ts`
- Do NOT import zustand stores into `shared/` layer files
- Do NOT inline react-query keys — always use a key factory
- Do NOT put business logic in `shared/` (shared has no domain knowledge)
- Do NOT import from a slice's internal path — always go through `index.ts`
