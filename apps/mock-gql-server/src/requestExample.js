/**
 * How to Use:
 *
 * 1. Run `npx nx dev @nexus-ui/mock-gql-server` from the root
 * 2. Open browser console and paste the below code
 */

fetch('http://localhost:8080/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      query GetAppointments {
        appointments {
          id
          type
          customer {
            id
            name
            username
            email
          }
          serviceAdvisor {
            id
            name
            username
            email
          }
        }
      }
    `,
    operationName: 'GetAppointments',
  }),
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`)
    }

    const result = await response.json()

    console.log(result)

    return result
  })
  .catch((error) => {
    console.error(`Fetch failed: ${error.message}`)
  })

/**
 * How to Use:
 *
 * 1. Run `npx nx dev @nexus-ui/mock-gql-server` from the root
 * 2. Open browser console and paste the below code
 */

fetch('http://localhost:8080/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `
      mutation CreateBrand($input: CreateBrandInput!) {
          createBrand(input: $input) {
              brand_id
              code
              is_active
          }
      }
    `,
    operationName: 'CreateBrand',
    variables: {
      input: {
        code: 'Mercedes',
        is_active: true,
      },
    },
  }),
})
  .then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`)
    }

    const result = await response.json()

    console.log(result)

    return result
  })
  .catch((error) => {
    console.error(`Fetch failed: ${error.message}`)
  })
