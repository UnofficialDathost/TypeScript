import { describe, beforeEach, it } from 'mocha'
import { assert } from 'chai'

import Dathost from '../index'
import Server from '../server'
import ServerSettings from '../settings/server'
import { IServer } from '../interfaces/server'


const generatePassword = (): string => {
    return Math.random().toString(24).substr(2, 16)
}


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

    describe('CS: GO server', () => {
        let server: [IServer, Server]

        it('Create server', async () => {
            server = await dathost.createServer(new ServerSettings({
                name: 'TS CS: GO Server',
                location: 'sydney'
            }).csgo({
                slots: 5,
                gameToken: '',
                tickrate: 128,
                rconPassword: generatePassword()
            }))

            assert(server[0] instanceof Object)
            assert(server[1] instanceof Server)
        })

        it('Get server details', async () => {
            assert(await server[1].get() instanceof Object)
        })

        it('Get server metrics', async () => {
            assert(await server[1].metrics() instanceof Object)
        })

        it('Update server', async () => {
            await server[1].update(new ServerSettings({
                name: 'TS CS: GO Server update'
            }))
        })

        it('Start server', async () => {
            await server[1].start()
        })

        it('Stop server', async () => {
            await server[1].stop()
        })

        it('Reset server', async () => {
            await server[1].reset()
        })

        it('Regenerate ftp password', async () => {
            await server[1].regenerateFtpPassword()
        })

        it('Sync files', async () => {
            await server[1].syncFiles()
        })

        it('Console retrieve', async () => {
            await server[1].consoleRetrieve()
        })

        it('Console send', async () => {
            await server[1].consoleSend('https://github.com/UnofficialDathost/TypeScript')
        })

        it('Delete server', async () => {
            await server[1].delete()
        })
    })

    describe('TF2 Server', () => {
        let server: [IServer, Server]

        it('Create server', async () => {
            server = await dathost.createServer(new ServerSettings({
                name: 'TS TF2 Server',
                location: 'sydney'
            }).tf2({
                slots: 5,
                rconPassword: generatePassword()
            }))
        })

        it('Get server details', async () => {
            assert(await server[1].get() instanceof Object)
        })

        it('Get server metrics', async () => {
            assert(await server[1].metrics() instanceof Object)
        })
    
        it('Start server', async () => {
            await server[1].start(true)
        })

        it('Update server', async () => {
            await server[1].update(new ServerSettings({
                name: 'TS TF2 Server update'
            }))
        })

        it('Stop server', async () => {
            await server[1].stop()
        })

        it('Reset server', async () => {
            await server[1].reset()
        })

        it('Regenerate ftp password', async () => {
            await server[1].regenerateFtpPassword()
        })

        it('Sync files', async () => {
            await server[1].syncFiles()
        })

        it('Console retrieve', async () => {
            await server[1].consoleRetrieve(300)
        })

        it('Console send', async () => {
            await server[1].consoleSend('https://github.com/UnofficialDathost/TypeScript')
        })


        it('Delete server', async () => {
            await server[1].delete()
        })
    })

    describe('Valheim server', () => {
        let server: [IServer, Server]

        it('Create server', async () => {
            server = await dathost.createServer(new ServerSettings({
                name: 'TS Valheim server',
                location: 'sydney'
            }).valheim({
                password: generatePassword(),
                worldName: 'dathost ts',
                plus: false,
                admins: ['[U:1:116962485]', 'STEAM_0:1:186064092',
                         '76561198017567105', 76561198214871321]
            }))
        })

        it('Get server details', async () => {
            assert(await server[1].get() instanceof Object)
        })

        it('Get server metrics', async () => {
            assert(await server[1].metrics() instanceof Object)
        })

        it('Update server', async () => {
            await server[1].update(new ServerSettings({
                name: 'TS Valheim Server update'
            }))
        })

        it('Start server', async () => {
            await server[1].start(false)
        })

        it('Stop server', async () => {
            await server[1].stop()
        })

        it('Reset server', async () => {
            await server[1].reset()
        })

        it('Regenerate ftp password', async () => {
            await server[1].regenerateFtpPassword()
        })

        it('Sync files', async () => {
            await server[1].syncFiles()
        })

        it('Console retrieve', async () => {
            await server[1].consoleRetrieve()
        })

        it('Console send', async () => {
            await server[1].consoleSend('https://github.com/UnofficialDathost/TypeScript')
        })

        it('Delete server', async () => {
            await server[1].delete()
        })
    })

    describe('Teamspeak server', () => {
        let server: [IServer, Server]

        it('Create server', async () => {
            server = await dathost.createServer(new ServerSettings({
                name: 'TS Teamspeak server',
                location: 'sydney'
            }).teamspeak({slots: 5}))
        })

        it('Get server details', async () => {
            assert(await server[1].get() instanceof Object)
        })

        it('Get server metrics', async () => {
            assert(await server[1].metrics() instanceof Object)
        })

        it('Update server', async () => {
            await server[1].update(new ServerSettings({
                name: 'TS Teamspeak Server update'
            }))
        })

        it('Start server', async () => {
            await server[1].start()
        })

        it('Stop server', async () => {
            await server[1].stop()
        })

        it('Reset server', async () => {
            await server[1].reset()
        })

        it('Regenerate ftp password', async () => {
            await server[1].regenerateFtpPassword()
        })

        it('Sync files', async () => {
            await server[1].syncFiles()
        })

        it('Console retrieve', async () => {
            await server[1].consoleRetrieve()
        })

        it('Console send', async () => {
            await server[1].consoleSend('https://github.com/UnofficialDathost/TypeScript')
        })

        it('Delete server', async () => {
            await server[1].delete()
        })
    })
})
