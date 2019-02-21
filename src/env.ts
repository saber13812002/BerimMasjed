export const ENV = {
  name: "Development",
  api: {
    //baseUrl: 'http://localhost/Documents/bachehayemasjed/masjedcloob.ir/public_html/',
    baseUrl: 'https://masjedcloob.ir/',
  },
  wp_api: {
    //baseUrl: 'http://localhost/Documents/bachehayemasjed/masjedcloob.ir/public_html/',
    baseUrl: 'https://masjedcloob.ir/blog',
    posts_url : '/wp-json/wp/v2/posts',
  },
  wp_zeinabian_api: {
    baseUrl: 'https://zeinabian.ir/',
  },
    webapp: {
      baseUrl: "https://masjedcloob.ir",
      //baseUrl: "https://masjedcloob.ir",
    socialUrl: "/social",
    avatarFolder: "/upload"
  },
  service: {
    baseUrl: "https://masjedcloob.ir"
  },
  security: {
    serverUrl: "https://masjedcloob.ir/blog",
    //serverUrl: "https://berimbasket.ir",
    jwtToken: "/wp-json/jwt-auth/v1/token",
    validate: "/validate",
    login: "/login",
    register: "/register"
  },
  googleMap: {
    apikey: "dsgasdfasdfsdf"
  },
  clientId:"",
  redirectUri:"",
  logError: true
}; 