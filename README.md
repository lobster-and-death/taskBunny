# Task Bunny

> TaskBunny is a web application that connects people who have tasks to be done, with people willing to help them get them done.

## Team

  - __Product Owner__: Bryan
  - __Scrum Master__: Mokhtar
  - __Development Team Members__: David, Bryan, Mokhtar

## Demo

> http://taskbunny.azurewebsites.net

## Table of Contents

1. [Requirements](#requirements)
1. [Development](#development)
1. [Deployment](#deployment)
1. [Team](#team)
1. [Contributing](#contributing)

## Project User Experience

Creating A Task
![Creating a Task](https://i.imgur.com/4METJ5N.gif=300x300)

Tasks Dashboard View
![Tasks Dashboard View](https://i.imgur.com/BstQnrH.gif=300x300)


## Requirements

- Node 0.10.x
- Mongod
- SendGrid (for email notifications)

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```
### Running locally

Configure [OAuth settings](#configuration) then

Run the grunt default task

> grunt

Visit http://localhost:8000/ in your browser


### Roadmap

View the project roadmap [here](https://github.com/chainsugar/chainsugar/issues)


## Contributing

See [LAYOUT.md](doc/LAYOUT.md) and [CONTRIBUTING.md](doc/CONTRIBUTING.md) for contribution guidelines.


## Configuration

TaskBunny uses passport.js with Google+ for sign-in

Follow these instructions to setup and app:

Create a project at https://console.developers.google.com
* Under APIs and auth
  * Credentials
    1. create a new client ID for a 'Web Application'
    2. you will have to provide a callback URL under Redirect URIs, make sure it is identical in your `google.json`
    3. for development http://localhost:8000/auth/google/callback/
    4. in production http://www.yourdomain.com/auth/google/callback/
  * APIs
    1. Under Social APIs enable the Google+ API. [(See passport-google-oauth Issue)](https://github.com/jaredhanson/passport-google-oauth/issues/72)

make a note of the client ID and Client secret.

On your development machine save them in a json file in the secrets folder at the root of the project
directory.

    secrets/google.json

It should look something like this:

```json
{
  "id": "226227493412-qv8bcmn987243mnoqhitu6sj3298msaz8g.apps.googleusercontent.com",
  "secret": "Ie_60237lfsln55ry9FAwZ-o",
  "url": "http://localhost:8000/auth/google/callback/"
}
```

## Deployment

When running the server in production make sure to set NODE_ENV environment variable to 'production'.

Your deployment script should run `grunt build` task. For Azure deployments this is handled by `deploy.sh` included in the project.


In production set the values of the following environment variables accordingly

    GOOGLE_APP_ID
    GOOGLE_APP_SECRET
    GOOGLE_APP_CALLBACK_URL

See the [server/config.js](server/config.js) for additional configuration environment variables to set.
