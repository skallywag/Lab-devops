const express = require('express')

const path = require('path')

const Rollber = require('rollbar')
// include and initialize the rollbar library with your access token
let Rollbar = require("rollbar");
let rollbar = new Rollbar({
  accessToken: 'de5b962a636a4185986611949234857a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('you got served!')
})

let cars = []
app.post('/api/cars', (req, res) => {
    let {car} = req.body
    car = car.toLowerCase()
    if(car === 'mustang'){
        cars.push(car)
        rollbar.info('nice ride!')
    }else{
        rollbar.info('please enter a cool car')
    }
    res.status(200).send(cars)
})

const port = process.env.PORT || 4545
console.log(port);

app.listen(port, () => console.log(`Are we there yet? ${port}`))