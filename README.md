Compass
=========

An unofficial api for (Compass)[https://compass.education] using (puppeteer!)[https://github.com/puppeteer/puppeteer]

## Installation

  `npm install @tascord/compass`

## Usage

    var Compass = require('@tascord/compass');

    var user = new Compass('school_prefix');
  
    user.on('initialized', async () => { user.login({username: 'username', password: 'password'});

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
