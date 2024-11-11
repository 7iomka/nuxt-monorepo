import pluralize from 'pluralize';
import camelCase from 'camelcase';

// Type for HTTP methods
export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

// Type for creating the method with path parameter logic
type MethodAlias = (
  moduleName: string,
  hasPathInserts?: boolean,
  param?: string,
) => string;

// Utility to capitalize the first letter of a string
const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Define the methodAliases map with specific logic for each HTTP method
const methodAliases: Record<HttpMethod, MethodAlias> = {
  get: (moduleName, hasPathInserts, param) => {
    const baseName = hasPathInserts
      ? `get${capitalize(pluralize.singular(moduleName))}By${capitalize(param || '')}`
      : `get${capitalize(pluralize(moduleName))}`;
    return camelCase(baseName);
  },
  post: (moduleName, hasPathInserts, param) => {
    const baseName = hasPathInserts
      ? `create${capitalize(pluralize.singular(moduleName))}By${capitalize(param || '')}`
      : `create${capitalize(pluralize(moduleName))}`;
    return camelCase(baseName);
  },
  put: (moduleName) =>
    camelCase(`update${capitalize(pluralize.singular(moduleName))}`),
  patch: (moduleName) =>
    camelCase(`patch${capitalize(pluralize.singular(moduleName))}`),
  delete: (moduleName, hasPathInserts, param) => {
    const baseName = hasPathInserts
      ? `delete${capitalize(pluralize.singular(moduleName))}By${capitalize(param || '')}`
      : `delete${capitalize(pluralize(moduleName))}`;
    return camelCase(baseName);
  },
};

// Main function to create a custom operation ID based on HTTP method, route, and module name
export const createCustomOperationId = (
  method: HttpMethod,
  route: string,
  moduleName: string,
): string => {
  const hasPathInserts = /\{(\w+)\}/g.test(route); // Check if the route contains path parameters
  const param = route.match(/\{(\w+)\}/)?.[1]; // Extract the path parameter if available

  // Use methodAliases to generate the operation ID
  return methodAliases[method](moduleName, hasPathInserts, param);
};

// console.log(createCustomOperationId('get', '/users/{id}', 'users')); // getUserById
// console.log(createCustomOperationId('post', '/users', 'users')); // createUsers
// console.log(createCustomOperationId('put', '/users/{id}', 'users')); // updateUser
// console.log(createCustomOperationId('patch', '/users/{id}', 'users')); // patchteUser
// console.log(createCustomOperationId('delete', '/users/{id}', 'users')); // deleteUserById
// console.log(createCustomOperationId('get', '/users', 'users')); // getUsers
// console.log(createCustomOperationId('post', '/users/many', 'users')); // createUsers
