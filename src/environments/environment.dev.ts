export const environment = {
  name: 'development',
  port: 8000,
  // base_url: 'http://4.224.92.30:8080/',
  base_url: 'http://localhost:8000/',
  production: false,
  // authMfeUrl: 'http://4.224.104.252:8081/remoteEntry.js',
  authMfeUrl: 'http://localhost:8000/authapp/remoteEntry.js',
  authRemoteName: 'authapp',
  authExpModule: './authApp',
  reactLandingUrl: 'http://4.188.109.166:8086/remoteEntry.js',
  reactRemoteName: 'landing',
  reactExpModule: './landing',
  // styleguideUrl: 'http://4.187.144.99:8082/remoteEntry.js',
  styleguideUrl: 'http://localhost:8000/styleguide/remoteEntry.js',
  styleguideRemoteName: 'styleguide',
  styleguideExpoModule: './styleguide',
  assistantParcelUrl: 'http://20.235.192.190:8087/remoteEntry.js',
  assistantParcelRemoteName: 'assistantParcel',
  assistantParcelExpoModule: './assistantParcel',
  userProfileUrl: 'http://localhost:8000/profile/remoteEntry.js',
  userProfileRemoteName: 'user_profile',
  userProfileExpoModule: './user_profile',
};
