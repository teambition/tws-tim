'use strict'

const xor = require('buffer-xor')
const utils = require('./utils')

class Room {
  static create (payload) {
    return this.request.post({
      uri: '/v1/rooms',
      body: payload
    })
  }

  static checksum (members) {
    let checksum = members.reduce((cs, member) => {
      return xor(cs, Buffer.from(member, 'hex'))
    }, Buffer.from('000000000000000000000000', 'hex'))

    return checksum.toString('hex')
  }

  constructor (_resourceId) {
    this._resourceId = _resourceId
  }

  getMembers () {
    return this.request.get({
      uri: `/v1/resources/${this._resourceId}/members`
    })
  }

  replaceMembers (members, options = {}) {
    let payload = {
      action: 'replace',
      members: members
    }

    if (utils.isBoolean(options.forceAdd)) {
      payload.forceAdd = options.forceAdd
    }
    if (utils.isBoolean(options.hardDeleteChildren)) {
      payload.hardDeleteChildren = options.hardDeleteChildren
    }
    if (utils.isString(options.resourceType)) {
      payload.resourceType = options.resourceType
    }

    return this.request.put({
      uri: `/v1/resources/${this._resourceId}/members`,
      body: payload
    })
  }

  addMembers (members, options = {}) {
    let payload = {
      action: 'append',
      members: members
    }

    if (utils.isBoolean(options.forceAdd)) {
      payload.forceAdd = options.forceAdd
    }
    if (utils.isBoolean(options.hardDeleteChildren)) {
      payload.hardDeleteChildren = options.hardDeleteChildren
    }
    if (utils.isString(options.resourceType)) {
      payload.resourceType = options.resourceType
    }

    return this.request.put({
      uri: `/v1/resources/${this._resourceId}/members`,
      body: payload
    })
  }

  deleteMembers (members, options = {}) {
    let payload = {
      action: 'delete',
      members: members
    }

    if (utils.isBoolean(options.forceAdd)) {
      payload.forceAdd = options.forceAdd
    }
    if (utils.isBoolean(options.hardDeleteChildren)) {
      payload.hardDeleteChildren = options.hardDeleteChildren
    }
    if (utils.isString(options.resourceType)) {
      payload.resourceType = options.resourceType
    }

    return this.request.put({
      uri: `/v1/resources/${this._resourceId}/members`,
      body: payload
    })
  }
}

module.exports = Room
