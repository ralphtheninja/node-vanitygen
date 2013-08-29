#node-vanitygen

This is a quick hack to wrap [vanitygen](https://github.com/samr7/vanitygen) into node. Currently assumes you have a the vanitygen binary in the same directory. Yeah it sucks but I don't care about that right now. Later on it would be cool if the vanitygen source code could be bundled and built on the correct architecture.

##Usage

Call vanitygen with an array of prefixes. Note that some prefixes are invalid, for example bitcoin addresses starting with `'1l'`. The reason in this case I believe is because the number `'1'` is very close to the letter `'l'`.

```js
var vanitygen = require('vanitygen')
vanitygen(['1LMS', '1LMP'], function (err, result) {
	console.log(JSON.stringify(results))
})
```

It returns an array of keys that match your custom prefix. Note that the longer the prefixes the longer time it takes for vanitygen to find a correct hash. You'll have to experiment with how long you want/need them to be.

```js
{
  keys: [
    {
      pattern: '1LMP',
      address: { 
        public: '1LMPxWETHHvebKJGnhc8dZoZ853KTwok2j',
        private: '5J2unf7zBu14CzEtPkkKcJF....'
      }
    },
    {
      pattern: '1LMS',
      address: { 
        public: '1LMSTv2GUxJqdLDot1xUzkQUrLtF8Ub3qq',
        private:'5KWf8Qh3zLoXEmJLFx5C1PmQQ5....'
      }
    }
  ],
  time: 409
}
```

##License

MIT