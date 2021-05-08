import { describe, beforeEach, it } from 'mocha'
import { assert } from 'chai'

import Dathost from '../index'

describe('dathost', () => {
    let dathost: Dathost

    beforeEach(() => {
        dathost = new Dathost(
            process.env.npm_package_config_datHostEmail,
            process.env.npm_package_config_datHostPass
        )
    })

    it('Get account info', async () => {
        assert(await dathost.account() instanceof Object)
    })
})
