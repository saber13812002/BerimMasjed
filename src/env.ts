export const ENV = {
  name: "Development",
  api: {
    //baseUrl: 'http://localhost/Documents/bachehayemasjed/masjedcloob.ir/public_html/',
    baseUrl: 'https://masjedcloob.ir/',
  },
  pods: {
    baseUrl: 'http://qavami.com/ideas',
    quotes_url: '/wp-json/wp/v2/posts',
  },
  wp_api: {
    //baseUrl: 'http://localhost/Documents/bachehayemasjed/masjedcloob.ir/public_html/',
    baseUrl: 'https://masjedcloob.ir/blog',
    posts_url: '/wp-json/wp/v2/posts',
  },
  otp_api: {
    baseUrl: 'http://ecupservice.ffiri.ir',
    otp1_url: '/api/v1/otp1/',
    otp11_url: '/api/v1/otp11/',
    otp2_url: '/api/v1/otp2/',
    otp22_url: '/api/v1/otp22/',
  },
  wp_zeinabian_api: {
    baseUrl: 'https://zeinabian.ir',
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
    //serverUrl: "https://masjedcloob.ir/blog",
    //serverUrl: "http://ennings.com",
    serverUrl: "http://qavami.com/ideas",
    //serverUrl: "https://berimbasket.ir",
    jwtToken: "/wp-json/jwt-auth/v1/token",
    validate: "/validate",
    login: "/login",
    register: "/register"
  },
  googleMap: {
    apikey: "dsgasdfasdfsdf"
  },
  clientId: "",
  redirectUri: "",
  logError: true
};
