 module.exports = ((client) => {

        var fs = require('fs')
        const file = './utils/.private/timestarted.json'
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) throw err
            var arrayOfObjects = JSON.parse(data)
            let toadd = Math.floor(Math.random() * 1 + 1);
            let oldxp = arrayOfObjects.count[arrayOfObjects.count.length - 1]
            let newcount = oldxp + toadd;
            arrayOfObjects.count.push(newcount)

            fs.writeFile(file, JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                if (err) throw err
            })
        })
    
})