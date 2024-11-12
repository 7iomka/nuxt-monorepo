import path from 'node:path';
import { generateApi } from 'swagger-typescript-api';
import { config } from 'dotenv';
import prettier from 'prettier';
import camelCase from 'camelcase';
import { createCustomOperationId, type HttpMethod } from './api-codegen.lib';

config({ path: path.resolve(process.cwd(), '.env') });

const prettierOptions = await prettier.resolveConfig(
  path.resolve(process.cwd(), '../../.prettierrc'),
);

const fileName = 'api.gen.ts';
const outputDir = path.resolve(process.cwd(), './src/shared/api/internal');
const openApiJsonUrl = `${process.env.API_BASE}/openapi.json`;

await generateApi({
  name: fileName,
  apiClassName: 'ApiClient',
  output: outputDir,
  url: openApiJsonUrl,
  unwrapResponseData: true,
  generateClient: true,
  prettier: prettierOptions || {},
  extractRequestParams: false,
  extractRequestBody: false,
  extractEnums: true,
  defaultResponseType: 'void',
  // singleHttpClient: true,
  // cleanOutput: false,
  hooks: {
    onCreateRoute: (routeData) => {
      if (routeData.raw.route.includes('openapi.json')) {
        return false;
      }
      return routeData;
    },
    onFormatRouteName: (routeInfo) => {
      const operationId = routeInfo.operationId;
      const method = routeInfo.method as HttpMethod;
      const route = routeInfo.route;
      const moduleName = routeInfo.moduleName;

      if (operationId) return camelCase(operationId);
      if (route === '/') return camelCase(`${method.toLowerCase()}Root`);

      return createCustomOperationId(method, route, moduleName);
    },
  },

  // defaultResponseAsSuccess: false,
  // generateRouteTypes: true,
  // generateResponses: true,
  // toJS: false,
  // extractResponseError: false,
  // defaultResponseType: 'void',
  // enumNamesAsValues: false,
  // moduleNameFirstTag: false,
  // generateUnionEnums: false,
  // typePrefix: '',
  // typeSuffix: '',
  // enumKeyPrefix: '',
  // enumKeySuffix: '',
  // addReadonly: false,
  // sortTypes: true,
  // sortRoutes: true,
  // extractingOptions: {
  //   requestBodySuffix: ['Payload', 'Body', 'Input'],
  //   requestParamsSuffix: ['Params'],
  //   responseBodySuffix: ['Data', 'Result', 'Output'],
  //   responseErrorSuffix: [
  //     'Error',
  //     'Fail',
  //     'Fails',
  //     'ErrorData',
  //     'HttpError',
  //     'BadResponse',
  //   ],
  // },
  // extraTemplates: [],
  // fixInvalidTypeNamePrefix: 'Type',
  // fixInvalidEnumKeyPrefix: 'Value',
});
