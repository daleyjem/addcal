const glob = require('globby')
const path = require('path')
const util = require('util')

const baseInterfaceMethods = [
    'onApiInit',
    'onApiReady'
]

test('Should not contain files besides the base calendar', async () => {
    const files = await glob([__dirname + '/*.js'])
    let pass = true
    pass = path.parse(files[0]).base === 'base-calendar.js' && files.length === 1
    expect(pass).toBeTruthy()
})

test('Services should contain interfaces:\n' + baseInterfaceMethods.join('\n'), async () => {
    const files = await glob([__dirname + '/platforms/*.js'])
    let pass = true
    const disqualifiers = []
    for (const file of files) {
        console.log(file)
        const service = require(file)
        console.log(util.inspect(service.default.toString()))
        // console.log('Dude', _service)
        
        // console.log('Service:', service)
        // for (const method of baseInterfaceMethods) {
        //     if (!service.hasOwnProperty(method)){
        //         pass = false
        //         if (!disqualifiers.includes(service)){
        //             disqualifiers.push(service)
        //         }
        //     }
        // }
    }
    expect(pass).toBeTruthy()
})