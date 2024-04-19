import { stringify } from "query-string";
import { DataProvider, Identifier, fetchUtils } from "react-admin";

type EndpointParams = {
  apiUrl: string;
  resource: string;
  resourceId?: Identifier;
  method?: "get" | "post" | "patch" | "delete";
};

const getRestEndpoint = (apiUrl: string, resource: string, resourceId?: Identifier) => {
  const id = resourceId ? `/${resourceId}` : '';

  return `${apiUrl}/${resource}${id}`;
}

const getMockEndpoint = (apiUrl: string, resource: string, method: string, resourceId?: Identifier) => {
  const id = resourceId ? '/id' : '';

  return `${apiUrl}/${resource}${id}/${method}/index.json`;
}

const getEndpoint = ({
  apiUrl,
  resource,
  resourceId,
  method,
}: EndpointParams) => {
  return process.env.MOCK_DATA === "true"
    ? getMockEndpoint(apiUrl, resource, method || 'get', resourceId)
    : getRestEndpoint(apiUrl, resource, resourceId);
};

export default (
  apiUrl: string,
  httpClient = fetchUtils.fetchJson
): DataProvider => ({
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: field + "," + order,
      page: page - 1,
      size: perPage,
      ...params.filter,
    };
    const endpoint = getEndpoint({ apiUrl, resource });
    const url = `${endpoint}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      if (json.content !== undefined && json.totalElements !== undefined) {
        // Page
        return {
          data: json.content,
          total: json.totalElements,
        };
      } else if (Array.isArray(json)) {
        // List
        return {
          data: json,
          total: json.length,
        };
      } else {
        throw new Error("Unsupported getList() response: " + Object.keys(json));
      }
    });
  },

  getOne: (resource, params) => {
    const endpoint = getEndpoint({ apiUrl, resource, resourceId: params.id });
    return httpClient(`${endpoint}`).then(({ json }) => ({
      data: json,
    }));
  },

  getMany: (resource, params) => {
    const ids = params.ids.join(",");
    const endpoint = getEndpoint({ apiUrl, resource });
    const url = `${endpoint}/by-ids?ids=${ids}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const query = {
      sort: field + "," + order,
      page: page - 1,
      size: perPage,
      ...params.filter,
      [params.target]: params.id,
    };
    
    const endpoint = getEndpoint({ apiUrl, resource });
    const url = `${endpoint}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => {
      if (json.content !== undefined && json.totalElements !== undefined) {
        // Page
        return {
          data: json.content,
          total: json.totalElements,
        };
      } else if (Array.isArray(json)) {
        // List
        return {
          data: json,
          total: json.length,
        };
      } else {
        throw new Error("Unsupported getList() response: " + Object.keys(json));
      }
    });
  },

  update: (resource, params) => {
    const endpoint = getEndpoint({ apiUrl, resource, resourceId: params.id,  method: 'patch' });
    return httpClient(`${endpoint}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  updateMany: (resource, params) => {
    const idsValue = params.ids.join(",");
    const endpoint = getEndpoint({ apiUrl, resource, method: 'patch' });
    return httpClient(`${endpoint}?ids=${idsValue}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params) => {
    const endpoint = getEndpoint({ apiUrl, resource, method: 'post' });
    return httpClient(`${endpoint}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  delete: (resource, params) => {
    const endpoint = getEndpoint({ apiUrl, resource, resourceId: params.id, method: 'delete' });
    return httpClient(`${endpoint}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "text/plain",
      }),
    }).then(({ json }) => ({ data: json }))
  },

  deleteMany: (resource, params) => {
    const idsValue = params.ids.join(",");
    const endpoint = getEndpoint({ apiUrl, resource, method: 'delete' });
    return httpClient(`${endpoint}?ids=${idsValue}`, {
      method: "DELETE",
    }).then(({ json }) => ({ data: json }));
  },
});
