import { describe, beforeEach, it } from 'mocha'
import { assert } from 'chai'

import Dathost from '../index'
import Server from '../server'

describe('dathost', () => {
    let dathost: Dathost

    beforeEach(() => {
        dathost = new Dathost(
            process.env.npm_package_config_datHostEmail || '',
            process.env.npm_package_config_datHostPass || ''
        )
    })

    it('Get account info', async () => {
        assert(await dathost.account() instanceof Object)
    })

    it('Get domains', async () => {
        for await (const domain of dathost.domains()) {
            assert(typeof domain === 'string')
        }
    })

    it('Get servers', async () => {
        for await (const server of dathost.servers()) {
            assert(server[0] instanceof Object)
            assert(server[1] instanceof Server)
        }
    })
})
