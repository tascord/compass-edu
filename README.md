Compass-edu
=========

An unofficial api for [Compass](https://compass.education) using [puppeteer!](https://github.com/puppeteer/puppeteer)

## Installation

  `npm install compass-edu`

## Usage

(Read The Docs)[https://tascord.gitbook.io/compass-edu/]

```
    var Compass = require('@tascord/compass');

    var user = new Compass('school_prefix');
  
    user.on('initialized', async () => { user.login({username: 'username', password: 'password'});
```

## Examples
Examples can be located in [/examples/](https://github.com/tascord/compass-edu/tree/master/exmaples).
The current examples are:
  * [Basic Class Fetcher](https://github.com/tascord/compass-edu/blob/master/exmaples/getClasses.js)

## Contributing

Please feel free to contribute, either by Creating A Fork, [Submitting A Feature Request](https://github.com/tascord/compass-edu/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=) or [Submitting A Bug Report](https://github.com/tascord/compass-edu/issues/new?assignees=&labels=bug&template=bug_report.md&title=).
