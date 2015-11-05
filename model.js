Entries = new Mongo.Collection('entries');

const sizeOptions = {
  type: 'number',
  default: -1,
};

NameValuePair = Astro.Class({
  name: 'NameValuePair',
  fields: {
    name: {
      type: 'string',
      default: '',
      optional: true,
    },
    value: {
      type: 'string',
      default: '',
      optional: true,
    },
  },
});

EntryMessage = Astro.Class({
  name: 'EntryMessage',
  fields: {
    messageType: {
      type: 'string',
      optional: true,
    },
    text: {
      type: 'string',
      optional: true,
    },
    createdAt: {
      type: 'date',
      optional: true,
    },
  },
});

CookieParam = Astro.Class({
  name: 'CookieParam',
  fields: {
    name: {
      type: 'string',
      optional: true,
    },
    value: {
      type: 'string',
      optional: true,
    },
    path: {
      type: 'string',
      optional: true,
    },
    domain: {
      type: 'string',
      optional: true,
    },
    expires: {
      type: 'date',
      optional: true,
    },
    httpOnly: {
      type: 'boolean',
      optional: true,
    },
    secure: {
      type: 'boolean',
      optional: true,
    },
  },
});

PostDataParam = Astro.Class({
  name: 'PostDataParam',
  fields: {
    name: {
      type: 'string',
      default: '',
      optional: true,
    },
    value: {
      type: 'string',
      default: '',
      optional: true,
    },
    fileName: {
      type: 'string',
      optional: true,
    },
    contentType: {
      type: 'string',
      optional: true,
    },
  },
});

EntryRequest = Astro.Class({
  name: 'EntryRequest',
  fields: {
    messages: {
      type: 'array',
      default() {
        return [];
      },
      nested: 'EntryMessage',
    },

    valid: {
      type: 'number',
      default: 2,
    },

    method: {
      type: 'string',
      default: 'get',
    },

    url: {
      type: 'string',
      default: '',
    },

    httpVersion: {
      type: 'string',
      optional: true,
    },

    pathParams: {
      type: 'array',
      nested: 'NameValuePair',
      default() {
        return [];
      },
    },

    headers: {
      type: 'array',
      nested: 'NameValuePair',
      default() {
        return [];
      },
    },

    queryString: {
      type: 'array',
      nested: 'NameValuePair',
      default() {
        return [];
      },
    },

    cookies: {
      type: 'array',
      nested: 'CookieParam',
      default() {
        return [];
      },
    },

    postData: {
      type: 'object',
      default() {
        return {};
      },
      nested: {
        name: 'RequestPostData',
        fields: {
          mimeType: {
            type: 'string',
          },
          params: {
            type: 'array',
            nested: 'PostDataParam',
            default() {
              return [];
            },
          },
          text: {
            type: 'string',
            default: '',
          },
          stored: {
            type: 'boolean',
            default: true,
          },
        },
      },
    },

    authentication: {
      type: 'object',
      default() {
        return {};
      },
      nested: {
        name: 'RequestAuthentication',
        fields: {
          authType: {
            type: 'string',
            default: 'none',
          },
          params: {
            type: 'array',
            default() {
              return [];
            },
            nested: 'NameValuePair',
          },
        },
      },
    },

    headersSize: sizeOptions,
    bodySize: sizeOptions,
  },
});

EntryResponse = Astro.Class({
  name: 'EntryResponse',
  fields: {
    messages: {
      type: 'array',
      default() {
        return [];
      },
      nested: 'EntryMessage',
    },

    valid: {
      type: 'number',
      default: 2,
    },

    status: {
      type: 'number',
    },

    statusText: {
      type: 'string',
    },

    httpVersion: {
      type: 'string',
      optional: true,
    },

    headers: {
      type: 'array',
      nested: 'NameValuePair',
      default() {
        return [];
      },
    },

    cookies: {
      type: 'array',
      nested: 'CookieParam',
      default() {
        return [];
      },
    },

    content: {
      type: 'object',
      optional: true,
      nested: {
        name: 'ResponseContent',
        fields: {
          mimeType: {
            type: 'string',
            optional: true,
          },
          text: {
            type: 'string',
            default: '',
          },
          compression: {
            type: 'number',
          },
          size: {
            type: 'number',
          },
          stored: {
            type: 'boolean',
            default: true,
          },
        },
      },
    },

    redirectURL: {
      type: 'string',
      optional: true,
    },

    headersSize: sizeOptions,
    bodySize: sizeOptions,
  },
});

Entry = Astro.Class({
  name: 'Entry',
  collection: Entries,
  transform: null,
  fields: {
    startedDateTime: {
      type: 'date',
      optional: true,
    },

    time: {
      type: 'number',
      optional: true,
    },

    clientIPAddress: {
      type: 'string',
      optional: true,
    },
    serverIPAddress: {
      type: 'string',
      optional: true,
    },
    connection: {
      type: 'string',
      optional: true,
    },

    // flags
    local: {
      type: 'boolean',
      default: true,
    },
    hijacked: {
      type: 'boolean',
      default: false,
    },
    mocked: {
      type: 'boolean',
      default: false,
    },

    status: {
      type: 'string',
      default: 'sending',
    },

    request: {
      type: 'object',
      nested: 'EntryRequest',
      default() {
        return {};
      },
    },

    response: {
      type: 'object',
      nested: 'EntryResponse',
      optional: true,
    },

    owner: {
      type: 'string',
      optional: true,
    },

    environment: {
      type: 'string',
    },

    endpoint: {
      type: 'string',
      optional: true,
    },
  },

  methods: {},

  behaviors: {
    timestamp: {
      hasCreatedField: true,
      createdFieldName: 'createdAt',
      hasUpdatedField: true,
      updatedFieldName: 'updatedAt'
    }
  },

  events: {},
});
