//config settings for the app

if (process.env.NODE_ENV === 'production') {
  /** Production env **/
  module.exports = {
    //google app
    "GOOGLE_APP_ID": process.env.GOOGLE_APP_ID,
    "GOOGLE_APP_SECRET": process.env.GOOGLE_APP_SECRET,
    "GOOGLE_APP_CALLBACK_URL": process.env.GOOGLE_APP_CALLBACK_URL,

    //session key for signing session cookies
    "SESSION_SECRET": process.env.SESSION_SECRET,

    //mongo connection url
    "MONGODB_URL": process.env.MONGODB_URL,
    // "MONGODB_URL": process.env.CUSTOMCONNSTR_MONGOLAB_URI,

    //azure sengrid cloud email delivery service
    "SENDGRID_USERNAME": process.env.SENDGRID_USERNAME,
    "SENDGRID_PASSWORD": process.env.SENDGRID_PASSWORD,

    //website root path - example: http://taskbunny.azurewebsites.net
    "SITE_ROOT": process.env.SITE_ROOT
  };

} else {

  /** Development env **/
  try {
    var googleApp = require('../secrets/google.json');
    module.exports = {
      "GOOGLE_APP_ID": googleApp.id,
      "GOOGLE_APP_SECRET": googleApp.secret,
      "GOOGLE_APP_CALLBACK_URL": googleApp.url,

      "SESSION_SECRET": "w34587230598dflskjf",
      "MONGODB_URL": "mongodb://localhost/taskbunny"
    };
  } catch(e) {
    console.error("== Warning == missing 'secrets/google.json' > see README");
    process.exit();
  }

}
