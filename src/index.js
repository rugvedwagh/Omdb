const express = require("express")
const path = require("path")
const app = express()
const LogInCollection = require("./mongo")
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'hbs')

const templatePath = path.join(__dirname, '../templates')
const publicPath = path.join(__dirname, '../public')

app.set('views', templatePath)
app.use(express.static(publicPath))

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {

    const check = await LogInCollection.findOne({ name: req.body.name })

    if (check) {
        res.render("error")
        cred = {
            "Name": req.body.name,
            "Password": req.body.password
        }
        console.log(cred)
    }
    else {
        var mydat = new LogInCollection(req.body)
        mydat.save().then(item=>{
            // res.status(201).render("home", { naming: `Welcome ${req.body.name} ` })
            res.status(201).render("login")
        }).catch(e=>{
            res.send("Error : ",e)
        })
        //******** */
        // const data = {
        //     name: req.body.name,
        //     password: req.body.password
        // }
        // await LogInCollection.insertMany([data])
        // res.status(201).render("home", { naming: `Welcome ${req.body.password}, ` })
        //******** */
    }
})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `Welcome ${req.body.name} ` })
        }

        else {
            res.render("error")
        }
    }

    catch (e) {
        console.log("Message : " + e)
        cred= {
            "Name": req.body.name,
            "Password": req.body.password
        }
        console.log(cred)
        res.send("Wrong Credentials!")
    }

})

app.listen(PORT, () => {
    console.log("\nListening at Port : " + PORT)
})