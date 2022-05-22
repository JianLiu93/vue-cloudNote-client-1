const fs = require('fs')
const path = require('path')

const mockBaseURL = 'http://localhost:8000'
const realBaseURL = 'https://note-server.hunger-valley.com'

exports.config = function config({ isDev } = {isDev: true}) {
	let fileText = `
	module.exports = {
		baseURL: '${isDev ? mockBaseURL : realBaseURL}'
	}`
	fs.writeFileSync(path.join(__dirname, '../src/helpers/config-baseURL.js'), fileText)
}
