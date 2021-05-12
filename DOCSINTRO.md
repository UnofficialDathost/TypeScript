## Welcome to the Unofficial Dathost JS/TS wrapper Documentation

### Starting point

Look over the index documentation.

### Example

```ts
import Dathost from 'dathost'

const dathost = new Dathost('email', 'password')

// Get account
const account = await dathost.account()
console.log(account.id, account.email, account.credits)
```
