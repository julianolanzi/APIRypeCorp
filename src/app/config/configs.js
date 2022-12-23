const dotenv = require('dotenv');

module.exports = {
    DATABASE: process.env.DATABASE,
    SECRET: process.env.SECRET,

    containerConnectionString: 'TBD',
    SALT_KEY: 'f5b99242-6504-4ca3-90f2-05e78e5761ef',
    TEMPLATE_ID: 'd-d091cde78aca4507bd31aaad3cf77efd',
    APP: 'http://localhost:3000',
    registerEmailId: 'd-8871a7a9e7184ab1b3538c24f4fa1d0d',
    resertPassword: 'd-4a0d0004a7b749568f3be0368462aefc',
    application: 'http://localhost:3000',

    SENDGRID:{
        SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    },

    FIREBASE: {
        bucketname: process.env.BUCKENAME,
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSiPb45Snuf4fp\nXbA2KhXx3mXaWZ1wfPbC0jQjYx0LaEKgH/EFX833lnuGY5lu9JP+KXeIQxjQaO+w\nnapuK2/HH6YLADtNUgxOcEE4xZB/QJAjc/q2ehJL17ZL9znx16wLiF1wCq0aZAiz\nfJM1sQt0iPQQTKYWBi/hvfeYqkJPB27FVoEn+LqwdxwJTrm2tMmrWKdg0sUwDd97\nvNNacBHcNaXFlgpanv9SHdAp+83jb5y2bDIgZwPq7DDe8QuvXxgPKyeQ8L5DalsA\nPdYxglFphLz93R74iqeHU5e7O/IVbxaGsm/XxtAfDzZN4V8pGkl0i6KPiphNuOz3\nmmhtv7vvAgMBAAECggEAW/pBZ5B6hrsJjg8Dtk4hozblqYSAL04w4gFCjPk2ja7B\neMIroozt505Dbf1iYWKRqzbDhXDGzPojSTZAaHwqi8RMXr79qXSAct5A6EQLskRr\nFEoNjJ39E0xM1JhQJNNz0uAC7jmD0aVFVeDFUW4lEobolZxe7P1L+uPq4TP03yAV\nzzoNvXKp2A+mh3ayA0GEOxtCxCu+Y5ElK7hMc9ccNwmyzxYy9z+vj5mKSNIWJnqS\nC4UABqtV6JzoAX330RjQ6KIXsZwgss4z5z6L9GoAqqtx3L0BR4FjwQE3XkYMB2M7\nZpeJd79gPZUYD1eq6reONW9AZmoCnteDdo3ZYmlcbQKBgQDo3jN8FwtMKYDTRPsC\n+7EXFtAc1/KfKjNoFxyT8raxju2VkM2r/sQamkD7ZmSEYyB5Pp02E7PERrcqi/oJ\n+AEtDeMudmxOh7OVJ/h6KaHUyIa5E8FuZWMqWNCdFvqaZA1FL0dMbNk0UH7aPP23\nI0rm39KQdUputILvcXVegueekwKBgQDnctb+OLwMAIkdp+fHwUguzb5kAxoJrS3A\nZQvl8DKVJcRCCZQn7gGum6SucFYMQyiFcwiVWFExuG8MLVBPBFBLx9IMkjy1FzuF\nXsqwXCzICG+89uQLRRG5SjPq6gUMoKxSexcJcOJnyGsWQzjD65ccHYzszYbo0Pr+\nWbewOvWqtQKBgEiCwDdYmZz6o3Gl3h98rhUJdn40xAjJxD4aTDzJbBf38IUNFO4E\no53BAJEHvi73CuqWE6/+DJEGkAyAj7hA8GTOGTqjh3Agk0vTqWyowAqY8lJ5E1dD\n3NAX3cW8nQYsN3Gemi3zCuNeWVGtgjdflvgzI8b1rtqv/MGAa9KlImhfAoGARaZP\ngI1+OXZnzN7cZ0aI/Fy58MrmKQdOf1lpLTcNYcjNuLm9Ng7vvqXj9wKjQmlrZk1p\nxdegB4BjGp0AT+cSatulIFdZoX1uUgJmqI/0gfXX+lup4KJWZRYpbYYjItuvP9r+\n4b5ww56Sa06rZHofLTzPTevDr4hEIArLtmLnzwkCgYBqMNnRgrsI7wQx2Doc86CX\nTG6neSRB82f7Skr+4Cmcoh7xEEuN6d4mKmQgjGepuFwgCR1LG8F5ka3RCjx+G3Ai\npx0iAo1Ol6B93hk//5jUSqrTxhxQ8/M8ET7e+fe0GJQkb+f+VTxLKLRgXapZKc7A\n72EI1oaUXzaTMcmul05MQg==\n-----END PRIVATE KEY-----\n",
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
    },
}