import { describe, expect, beforeAll, afterAll, test } from '@jest/globals'

import Dathost from '../index'
import Server from '../server'
import ServerSettings from '../settings/server'
import { IServer } from '../interfaces/server'
import Backup from '../server/backup'
import File from '../server/file'
import MatchSettings from '../settings/match'
import Match from '../match'


const generatePassword = (): string => {
  return Math.random().toString(24).substr(2, 16)
}

describe('Dathost Tests', () => {
  let dathost: Dathost

  beforeAll(() => {
    dathost = new Dathost(
      process.env.npm_package_config_datHostEmail || '',
      process.env.npm_package_config_datHostPass || ''
    )
  })

  test('Get account info', async () => {
    expect(await dathost.account()).toBeInstanceOf(Object)
  })

  test('Get domains', async () => {
    for await (const domain of dathost.domains()) {
      expect(typeof domain).toBe('string')
    }
  })

  test('Get servers', async () => {
    for await (const server of dathost.servers()) {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    }
  })

  describe('CS: GO server', () => {
    let server: [IServer, Server]

    beforeAll(async () => {
      server = await dathost.createServer(new ServerSettings({
        name: 'TS CS: GO Server',
        location: 'sydney'
      }).csgo({
        slots: 5,
        gameToken: '',
        tickrate: 128,
        rconPassword: generatePassword()
      }))
      await server[1].start()
    })

    afterAll(async () => {
      await server[1].delete()
    })

    test('Server return', async () => {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    })

    test('Get console auth', async () => {
      expect(await server[1].consoleAuth()).toBeInstanceOf(Object)
    })

    test('Get server details', async () => {
      expect(await server[1].get()).toBeInstanceOf(Object)
    })

    test('Get server metrics', async () => {
      expect(await server[1].metrics()).toBeInstanceOf(Object)
    })

    test('Update server', async () => {
      expect(async () => {
        await server[1].update(new ServerSettings({
          name: 'TS CS: GO Server update'
        }))
      }
      ).not.toThrow()
    })

    test('Start server', async () => {
      expect(async () => {
        await server[1].start()
      }).not.toThrow()
    })

    test('Stop server', async () => {
      expect(async () => {
        await server[1].stop()
      }).not.toThrow()
    })

    test('Reset server', async () => {
      expect(async () => {
        await server[1].reset()
      }).not.toThrow()
    })

    test('Regenerate ftp password', async () => {
      expect(async () => {
        await server[1].regenerateFtpPassword()
      }).not.toThrow()
    })

    test('Sync files', async () => {
      expect(async () => {
        await server[1].syncFiles()
      }).not.toThrow()
    })

    test('Console retrieve', async () => {
      expect(async () => {
        await server[1].consoleRetrieve()
      }).not.toThrow()
    })

    test('Console send', async () => {
      expect(async () => {
        await server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      }).not.toThrow()
    })

    test('Duplicate server', async () => {
      const serverDup: [IServer, Server] = await server[1].duplicate()
      expect(serverDup[0]).toBeInstanceOf(Object)
      expect(serverDup[1]).toBeInstanceOf(Server)
      expect(async () => {
        await serverDup[1].delete()
      }).not.toThrow()
    })

    test('List backups on servers', async () => {
      for await (const backup of server[1].backups()) {
        
        expect(backup[0]).toBeInstanceOf(Object)
        expect(backup[1]).toBeInstanceOf(Backup)
        expect(async () => {
          await backup[1].restore()
        }).not.toThrow()
      }
    })

    test('List files on server', async () => {
      for await (const file of server[1].files()) {
        expect(file[0]).toBeInstanceOf(Object)
        expect(file[1]).toBeInstanceOf(File)
      }
    })

    test('Create match', async () => {
      const matchServer = await dathost.createServer(new ServerSettings({
        name: 'TS CS:GO Match',
        location: 'sydney'
      }).csgo({
        slots: 5,
        gameToken: '',
        tickrate: 128,
        rconPassword: generatePassword()
      }))

      const match = await matchServer[1].createMatch(new MatchSettings({
          connectionTime: 300,
          knifeRound: false,
          waitForSpectators: false,
          warmupTime: 15
      }).team_1(
          [
              "[U:1:116962485]",
              76561198017567105,
              "STEAM_0:1:186064092",
              "76561198214871321"
          ]
      ).team_2(
          [
              "[U:1:320762620]",
              "STEAM_1:1:83437164",
              76561198214871324,
              "76561198214871323"
          ]
      ))

      expect(match[0]).toBeInstanceOf(Object)
      expect(match[1]).toBeInstanceOf(Match)

      expect(await match[1].get()).toBeInstanceOf(Object)
    })
  })

  describe('TF2 Server', () => {
    let server: [IServer, Server]

    beforeAll(async () => {
      server = await dathost.createServer(new ServerSettings({
        name: 'TS TF2 Server',
        location: 'sydney'
      }).tf2({
        slots: 5,
        rconPassword: generatePassword()
      }))
    })

    afterAll(async () => {
      await server[1].delete()
    })

    test('Get server details', async () => {
      expect(await server[1].get()).toBeInstanceOf(Object)
    })

    test('Get server metrics', async () => {
      expect(await server[1].metrics()).toBeInstanceOf(Object)
    })

    test('Start server', async () => {
      expect(async () => {
        await server[1].start(true)
      }).not.toThrow()
    })

    test('Update server', async () => {
      expect(async () => {
        await server[1].update(new ServerSettings({
          name: 'TS TF2 Server update'
        }))
      }
      ).not.toThrow()
    })

    test('Stop server', async () => {
      expect(async () => {
        await server[1].stop()
      }).not.toThrow()
    })

    test('Reset server', async () => {
      expect(async () => {
        await server[1].reset()
      }).not.toThrow()
    })

    test('Regenerate ftp password', async () => {
      expect(async () => {
        await server[1].regenerateFtpPassword()
      }).not.toThrow()
    })

    test('Sync files', async () => {
      expect(async () => {
        await server[1].syncFiles()
      }).not.toThrow()
    })

    test('Console retrieve', async () => {
      expect(async () => {
        await server[1].consoleRetrieve(300)
      }).not.toThrow()
    })

    test('Console send', async () => {
      expect(async () => {
        await server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      }).not.toThrow()
    })

    test('List files on server', async () => {
      for await (const file of server[1].files({ hideDefaultFiles: true, deletedFiles: true, fileSizes: true })) {
        expect(file[0]).toBeInstanceOf(Object)
        expect(file[1]).toBeInstanceOf(File)
      }
    })
  })

  describe('Valheim server', () => {
    let server: [IServer, Server]

    afterAll(async () => {
      await server[1].delete()
    })

    beforeAll(async () => {
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
      await server[1].start()
    })

    test('Get server details', async () => {
      expect(await server[1].get()).toBeInstanceOf(Object)
    })

    test('Get server metrics', async () => {
      expect(await server[1].metrics()).toBeInstanceOf(Object)
    })

    test('Update server', async () => {
      expect(async () => {
        await server[1].update(new ServerSettings({
          name: 'TS Valheim Server update'
        }))
      }
      ).not.toThrow()
    })

    test('Start server', async () => {
      expect(async () => {
        await server[1].start(false)
      }).not.toThrow()
    })

    test('Stop server', async () => {
      expect(async () => {
        await server[1].stop()
      }).not.toThrow()
    })

    test('Reset server', async () => {

      expect(async () => {
        await server[1].reset()
      }).not.toThrow()
    })

    test('Regenerate ftp password', async () => {
      expect(async () => {
        await server[1].regenerateFtpPassword()
      }).not.toThrow()
    })

    test('Sync files', async () => {
      
      expect(async () => {
        await server[1].syncFiles()
      }).not.toThrow()
    })

    test('Console retrieve', async () => {
      expect(async () => {
        await server[1].consoleRetrieve()
      }).not.toThrow()
    })

    test('Console send', async () => {
      
      expect(async () => {
        await server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      }).not.toThrow()
    })
  })

  describe('Teamspeak server', () => {
    let server: [IServer, Server]

    beforeAll(async () => {
      server = await dathost.createServer(new ServerSettings({
        name: 'TS Teamspeak server',
        location: 'sydney'
      }).teamspeak({ slots: 5 }))
      await server[1].start()
    })

    afterAll(async () => {
      await server[1].delete()
    })

    test('Get server details', async () => {
      expect(await server[1].get()).toBeInstanceOf(Object)
    })

    test('Get server metrics', async () => {
      expect(await server[1].metrics()).toBeInstanceOf(Object)
    })

    test('Update server', async () => {
      expect(async () => {
        await server[1].update(new ServerSettings({
          name: 'TS Teamspeak Server update'
        }))
      }
      ).not.toThrow()
    })

    test('Start server', async () => {
      expect(async () => {
        await server[1].start()
      }).not.toThrow()
    })

    test('Stop server', async () => {
      expect(async () => {
        await server[1].stop()
      }).not.toThrow()
    })

    test('Reset server', async () => {
      expect(async () => {
        await server[1].reset()
      }).not.toThrow()
    })

    test('Regenerate ftp password', async () => {
      expect(async () => {
        await server[1].regenerateFtpPassword()
      }).not.toThrow()
    })

    test('Sync files', async () => {
      expect(async () => {
        await server[1].syncFiles()
      }).not.toThrow()
    })
  })
})
