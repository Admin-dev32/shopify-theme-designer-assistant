# square-permissions

Source: https://developer.squareup.com/reference/square/oauth-api
Downloaded: 2026-06-30T20:41:15.836Z

---

OAuth API - Square API Reference 
 <- Square API
 Square API
 API version 2026-05-20 All versions ->
 OAuth
 Allow your application to gain programmatic access to Square seller accounts.
 Applications use the OAuth API to obtain access tokens that allow them to call Square APIs on behalf of Square sellers. Applications can request scoped permissions to limit their access to only the resources they need. The OAuth flow for obtaining an OAuth access token has three stages:
 Authorization - Your application directs the seller to the Square authorization page using an authorization URL that specifies your requested permissions. The seller signs in to Square and reviews the permissions.
 Callback - After approving the permissions, Square redirects the seller back to your application&#x27;s registered redirect URL with an authorization code appended as a query parameter.
 Token request - Your application calls the ObtainToken
 endpoint with the authorization code, your application ID, and other information. Square returns an access token and refresh token.
 For more information, see the following guides:
 OAuth 
 Square Webhooks Overview 
 Endpoints
 
 Webhooks
 
 API version 2026-05-20 All versions ->
 Authorize
 GET /oauth2 /authorize As part of a URL sent to a seller to authorize permissions for 
the developer, Authorize displays an authorization page and a 
list of requested permissions.
 Revoke token
 POST /oauth2 /revoke Revokes an access token generated with the OAuth flow.
 Obtain token
 POST /oauth2 /token Returns an OAuth access token and refresh token using the authorization_code
or refresh_token grant type.
 Retrieve token status
 POST /oauth2 /token /status Returns information about an OAuth access token or an application’s personal access token.
