# Fastify Schema Naming Conventions

This documentation outlines the naming conventions for schemas used in Fastify APIs, focusing on request validation and response structure. The conventions are designed to ensure clarity, consistency, and easy maintainability across different endpoints.

## Naming Convention for Schemas

The names of the schemas are structured in a way that reflects the operation type, usage context, and any relevant parameters.

Formula: **[`Action`]** + **[`ModuleName`]** + _[`RelationSuffix?`]_ + **[`CONTEXT`]** + _`Schema`_

The convention follows these rules:

- _[`ACTION`]_ **Action-based naming**: The first part of the schema name should reflect the HTTP action or operation, i.e., `get`, `create`, `update`, `patch`, `delete`.
- _[`ModuleName`]_ **Module or resource name**: This part of the schema name should reflect the resource being manipulated, such as `User`, `Product`, etc.
- _[`RelationSuffix`]_ **Relation with parameters or other entities**: If applicable, include a suffix that corresponds to the path parameters (e.g., `ById` for routes like `/users/{id}`).
- _[`CONTEXT`]_ **Usage context**: Each schema name should include the part of the request it is validating (e.g., `Query`, `Body`, `Response`).
- _[`Schema`]_ **`Schema` suffix**: All schema names should end with `Schema` to clearly indicate they are validation schemas.

## Naming for Specific Contexts

### 1. **Body Schemas**

| **Part of Name**  | **Possible Variants**                 |
| ----------------- | ------------------------------------- |
| **Action**        | `create`, `update`, `patch`, `delete` |
| **ModuleName**    | `User`, `Product`, `Order`, etc.      |
| **Context**       | `Body`                                |
| **Schema Suffix** | Always `Schema`                       |

### Examples

- `CreateUserBodySchema`: Validates the request body for creating a user.
- `UpdateUserBodySchema`: Validates the request body for updating a user.
- `CreateUserByIdBodySchema`: Validates the request body for creating a user by ID (with `RelationSuffix`).
- `UpdateProductBodySchema`: Validates the request body for updating a product.

---

### 2. **Query String Schemas**

| **Part of Name**  | **Possible Variants**               |
| ----------------- | ----------------------------------- |
| **Action**        | `get`, `create`, `update`, `delete` |
| **ModuleName**    | `User`, `Product`, `Order`, etc.    |
| **Context**       | `Query`                             |
| **Schema Suffix** | Always `Schema`                     |

### Examples

- `GetUserQuerySchema`: Validates query parameters for retrieving users.
- `CreateUserQuerySchema`: Validates query parameters for creating users in a batch.
- `GetUserByIdQuerySchema`: Validates query parameters for retrieving a user by ID (with `RelationSuffix`).
- `UpdateProductQuerySchema`: Validates query parameters for updating a product.

---

### 3. **Path Parameters Schemas**

| **Part of Name**   | **Possible Variants**               |
| ------------------ | ----------------------------------- |
| **Action**         | `get`, `create`, `update`, `delete` |
| **ModuleName**     | `User`, `Product`, `Order`, etc.    |
| **RelationSuffix** | `ById`, `ByName`, (optional)        |
| **Context**        | `Params`                            |
| **Schema Suffix**  | Always `Schema`                     |

### Examples

- `GetUserByIdParamsSchema`: Validates path parameters for retrieving a user by ID.
- `DeleteUserByIdParamsSchema`: Validates path parameters for deleting a user by ID.
- `GetProductByNameParamsSchema`: Validates path parameters for retrieving a product by name (with `RelationSuffix`).
- `UpdateUserParamsSchema`: Validates path parameters for updating a user (without `RelationSuffix`).

---

### 4. **Response Schemas (OPTIONAL)**

| **Part of Name**  | **Possible Variants**                        |
| ----------------- | -------------------------------------------- |
| **Action**        | `get`, `create`, `update`, `patch`, `delete` |
| **ModuleName**    | `User`, `Product`, `Order`, etc.             |
| **Context**       | `Response`                                   |
| **Schema Suffix** | Always `Schema`                              |

### Examples

- `GetUserResponseSchema`: Defines the response structure for retrieving a user.
- `CreateUserResponseSchema`: Defines the response structure for creating a user.
- `DeleteUserResponseSchema`: Defines the response structure for deleting a user.
- `GetProductResponseSchema`: Defines the response structure for retrieving a product.

---

## Complete Example

```typescript
// CreateUserBodySchema - Request schema for creating a new user
const CreateUserBodySchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

// GetUserByIdParamsSchema - Path parameter schema for retrieving a user by ID
const GetUserByIdParamsSchema = z.object({
  id: z.string().uuid(),
});

// GetUserResponseSchema - Response schema for retrieving a user
const GetUserResponseSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
});
```
