const glob = require('globby')
const path = require('path')
const util = require('util')

const baseInterfaceMethods = [
    'onApiInit',
    'onApiAdded'
]

test('Should not contain files besides the base calendar', async () => {
    const files = await glob([__dirname + '/*.js'])
    let pass = true
    pass = path.parse(files[0]).base === 'base-calendar.js' && files.length === 1
    expect(pass).toBeTruthy()
})

test('Service platforms should contain interface methods:\n\t- ' + baseInterfaceMethods.join('\n\t- '), async () => {
    const files = await glob([__dirname + '/platforms/*.js'])
    let pass = true

    for (const file of files) {
        const service = require(file).default
        const _service = new service({})
        
        for (const method of baseInterfaceMethods) {
            if (typeof _service[method] !== 'function'){
                pass = false
                console.error(files, 'doesnt have method:', method)
            }
        }
    }
    expect(pass).toBeTruthy()
})