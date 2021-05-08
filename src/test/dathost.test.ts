import { describe, beforeEach, it } from 'mocha'
import { assert } from 'chai'

import Dathost from '../index'

describe('dathost', () => {
    let dathost: Dathost

    beforeEach(() => {
        dathost = new Dathost('', '')
    })

    it('Get account info', async () => {
        assert(await dathost.account() instanceof Object)
    })
})
