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

  test('Get account', () => {
    return dathost.account().then(data => {
      expect(data).toBeInstanceOf(Object)
    })
  })

  test('Get domains', () => {
    return dathost.domains().next().then(data => {
      expect(typeof data.value).toBe('string')
    })
  })

  test('Get servers', () => {
     return dathost.createServer(new ServerSettings({
      name: 'Generic Server',
      location: 'sydney'
    }).csgo({
      slots: 5,
      gameToken: '',
      tickrate: 128,
      rconPassword: generatePassword()
    })).then((serverData) => {
      return dathost.servers().next().then(data => {
        expect(data.value[0]).toBeInstanceOf(Object)
        expect(data.value[1]).toBeInstanceOf(Server)

        return serverData[1].delete()
      })
    })
  })

  describe('CS: GO Server', () => {
    let server: [IServer, Server]

    beforeAll(() => {
      return dathost.createServer(new ServerSettings({
        name: 'TS CS: GO Server',
        location: 'sydney'
      }).csgo({
        slots: 5,
        gameToken: '',
        tickrate: 128,
        rconPassword: generatePassword()
      })).then(data => {
        server = data
        return data[1].start()
      })
    })

    afterAll(() => {
      return server[1].delete()
    })

    test('Server Objects', () => {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    })

    test('Get console auth', () => {
      return server[1].consoleAuth().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server', () => {
      return server[1].get().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server metrics', () => {
      return server[1].metrics().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Update server', () => {
      return expect(
        server[1].update(new ServerSettings({
          name: 'TS CS: GO Server update'
        }))
      ).resolves.not.toThrow()
    })

    test('Start server', () => {
      return expect(server[1].start()).resolves.not.toThrow()
    })

    test('Stop server', () => {
      return expect(server[1].stop()).resolves.not.toThrow()
    })

    test('Reset server', () => {
      return expect(server[1].reset()).resolves.not.toThrow()
    })

    test('Regenerate ftp password', () => {
      return expect(server[1].regenerateFtpPassword()).resolves.not.toThrow()
    })

    test('Sync server', () => {
      return expect(server[1].syncFiles()).resolves.not.toThrow()
    })

    test('Console retrieve', () => {
      return server[1].consoleRetrieve().then(data => {
        expect(Array.isArray(data)).toBe(true)
      })
    })

    test('Console send', () => {
      return expect(
        server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      ).resolves.not.toThrow()
    })

    test('Duplicate Server', () => {
      return server[1].duplicate().then(data => {
        expect(data[0]).toBeInstanceOf(Object)
        expect(data[1]).toBeInstanceOf(Server)

        return expect(data[1].delete()).resolves.not.toThrow()
      })
    })

    test('List backups on server', () => {
      return server[1].backups().next().then(data => {
        if (typeof data.value !== 'undefined') {
          expect(data.value[0]).toBeInstanceOf(Object)
          expect(data.value[1]).toBeInstanceOf(Backup)

          return expect(data.value[1].restore()).resolves.not.toThrow()
        }
      })
    })

    test('List files on server', () => {
      return server[1].files().next().then(data => {
        expect(data.value[0]).toBeInstanceOf(Object)
        expect(data.value[1]).toBeInstanceOf(File)
      })
    })

    test('Create match', () => {
      return server[1].createMatch(new MatchSettings({
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
      )).then(data => {
        expect(data[0]).toBeInstanceOf(Object)
        expect(data[1]).toBeInstanceOf(Match)

        return data[1].get().then(data => {
          expect(data).toBeInstanceOf(Object)
        })
      })
    })
  })

  describe('TF2 Server', () => {
    let server: [IServer, Server]
    beforeAll(() => {
      return dathost.createServer(new ServerSettings({
        name: 'TS TF2 Server',
        location: 'sydney'
      }).tf2({
        slots: 5,
        rconPassword: generatePassword()
      })).then(data => {
        server = data
        return data[1].start()
      })
    })

    afterAll(() => {
      return server[1].delete()
    })

    test('Server Objects', () => {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    })

    test('Get console auth', () => {
      return server[1].consoleAuth().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server', () => {
      return server[1].get().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server metrics', () => {
      return server[1].metrics().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Start server', () => {
      return expect(server[1].start()).resolves.not.toThrow()
    })

    test('Stop server', () => {
      return expect(server[1].stop()).resolves.not.toThrow()
    })

    test('Reset server', () => {
      return expect(server[1].reset()).resolves.not.toThrow()
    })

    test('Regenerate ftp password', () => {
      return expect(server[1].regenerateFtpPassword()).resolves.not.toThrow()
    })

    test('Sync server', () => {
      return expect(server[1].syncFiles()).resolves.not.toThrow()
    })

    test('Console retrieve', () => {
      return server[1].consoleRetrieve().then(data => {
        expect(Array.isArray(data)).toBe(true)
      })
    })

    test('Console send', () => {
      return expect(
        server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      ).resolves.not.toThrow()
    })

    test('Duplicate Server', () => {
      return server[1].duplicate().then(data => {
        expect(data[0]).toBeInstanceOf(Object)
        expect(data[1]).toBeInstanceOf(Server)

        return expect(data[1].delete()).resolves.not.toThrow()
      })
    })

    test('List backups on server', () => {
      return server[1].backups().next().then(data => {
        if (typeof data.value !== 'undefined') {
          expect(data.value[0]).toBeInstanceOf(Object)
          expect(data.value[1]).toBeInstanceOf(Backup)

          return expect(data.value[1].restore()).resolves.not.toThrow()
        }
      })
    })

    test('List files on server', () => {
      return server[1].files().next().then(data => {
        expect(data.value[0]).toBeInstanceOf(Object)
        expect(data.value[1]).toBeInstanceOf(File)
      })
    })
  })

  describe('Valheim server', () => {
    let server: [IServer, Server]
    beforeAll(() => {
      return dathost.createServer(new ServerSettings({
        name: 'TS Valheim server',
        location: 'sydney'
      }).valheim({
        password: generatePassword(),
        worldName: 'dathost ts',
        plus: false,
        admins: ['[U:1:116962485]', 'STEAM_0:1:186064092',
                  '76561198017567105', 76561198214871321]
      })).then(data => {
        server = data
        return data[1].start()
      })
    })

    afterAll(() => {
      return server[1].delete()
    })

    test('Server Objects', () => {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    })

    test('Get console auth', () => {
      return server[1].consoleAuth().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server', () => {
      return server[1].get().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server metrics', () => {
      return server[1].metrics().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Start server', () => {
      return expect(server[1].start()).resolves.not.toThrow()
    })

    test('Stop server', () => {
      return expect(server[1].stop()).resolves.not.toThrow()
    })

    test('Reset server', () => {
      return expect(server[1].reset()).resolves.not.toThrow()
    })

    test('Regenerate ftp password', () => {
      return expect(server[1].regenerateFtpPassword()).resolves.not.toThrow()
    })

    test('Sync server', () => {
      return expect(server[1].syncFiles()).resolves.not.toThrow()
    })

    test('Console retrieve', () => {
      return server[1].consoleRetrieve().then(data => {
        expect(Array.isArray(data)).toBe(true)
      })
    })

    test('Console send', () => {
      return expect(
        server[1].consoleSend('say https://github.com/UnofficialDathost/TypeScript')
      ).resolves.not.toThrow()
    })

    test('Duplicate Server', () => {
      return server[1].duplicate().then(data => {
        expect(data[0]).toBeInstanceOf(Object)
        expect(data[1]).toBeInstanceOf(Server)

        return expect(data[1].delete()).resolves.not.toThrow()
      })
    })

    test('List backups on server', () => {
      return server[1].backups().next().then(data => {
        if (typeof data.value !== 'undefined') {
          expect(data.value[0]).toBeInstanceOf(Object)
          expect(data.value[1]).toBeInstanceOf(Backup)

          return expect(data.value[1].restore()).resolves.not.toThrow()
        }
      })
    })

    test('List files on server', () => {
      return server[1].files().next().then(data => {
        expect(data.value[0]).toBeInstanceOf(Object)
        expect(data.value[1]).toBeInstanceOf(File)
      })
    })
  })

  describe('Teamspeak server', () => {
    let server: [IServer, Server]
    beforeAll(() => {
      return dathost.createServer(new ServerSettings({
        name: 'TS Teamspeak server',
        location: 'sydney'
      }).teamspeak({ slots: 5 })).then(data => {
        server = data
        return data[1].start()
      })
    })

    afterAll(() => {
      return server[1].delete()
    })

    test('Server Objects', () => {
      expect(server[0]).toBeInstanceOf(Object)
      expect(server[1]).toBeInstanceOf(Server)
    })

    test('Get console auth', () => {
      return server[1].consoleAuth().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server', () => {
      return server[1].get().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Get server metrics', () => {
      return server[1].metrics().then(data => {
        expect(data).toBeInstanceOf(Object)
      })
    })

    test('Start server', () => {
      return expect(server[1].start()).resolves.not.toThrow()
    })

    test('Stop server', () => {
      return expect(server[1].stop()).resolves.not.toThrow()
    })

    test('Reset server', () => {
      return expect(server[1].reset()).resolves.not.toThrow()
    })

    test('Regenerate ftp password', () => {
      return expect(server[1].regenerateFtpPassword()).resolves.not.toThrow()
    })

    test('Duplicate Server', () => {
      return server[1].duplicate().then(data => {
        expect(data[0]).toBeInstanceOf(Object)
        expect(data[1]).toBeInstanceOf(Server)

        return expect(data[1].delete()).resolves.not.toThrow()
      })
    })

    test('List backups on server', () => {
      return server[1].backups().next().then(data => {
        if (typeof data.value !== 'undefined') {
          expect(data.value[0]).toBeInstanceOf(Object)
          expect(data.value[1]).toBeInstanceOf(Backup)

          return expect(data.value[1].restore()).resolves.not.toThrow()
        }
      })
    })
  })
})
