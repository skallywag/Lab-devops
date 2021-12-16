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


const app = express()
app.use(express.json())
let cars = []

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
    rollbar.info('you got served!')
})

app.post('/api/cars', (req, res) => {
    let {coolCar} = req.body
    console.log(coolCar);
    coolCar = coolCar.toLowerCase()
    if(coolCar === 'mustang'){
        cars.push(coolCar)
        rollbar.info('nice ride!')
    }else{
        rollbar.info('please enter a cool car')
    }
    res.status(200).send(cars)
})
console.log(cars);


app.get('')

const port = process.env.PORT || 4545
console.log(port);

app.use(rollbar.errorHandler())
app.listen(port, () => console.log(`Are we there yet? ${port}`))




