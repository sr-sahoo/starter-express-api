import express from 'express'
import pkg from 'pg'
import cors from 'cors'

const { Client } = pkg
const client = new Client({
    connectionString: 'postgres://mbenjfew:hRq7_SRn90Um0GVDn4poRR8QtqVpjnMT@mouse.db.elephantsql.com/mbenjfew',
    ssl: {
        rejectUnauthorized: false
    }
})

client.connect()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.listen(2000, console.log('App is running on 2000'))



const getRegisteredList = async(req, res) => {
    try {
        const list = await client.query('select * from register')
        res.status(200).send({
            message: 'Sucess',
            data: list.rows
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            message: 'Error while getting list'
        })
    }
}

const addRegister = async(req,res) => {
    try {
        const { gName, email, pNo, sName, age, loc, ct } = req.body
        console.log(`
        INSERT INTO register (guardian_name, email, phone_number, student_name, age, location, class_type)
        VALUES ('${gName}', '${email}', '${pNo}', '${sName}, '${age}', '${loc}', '${ct}')`)
        const add = await client.query(`
        INSERT INTO register (guardian_name, email, phone_number, student_name, age, location, class_type)
        VALUES ('${gName}', '${email}', '${pNo}', '${sName}', '${age}', '${loc}', '${ct}')`)
        console.log(add)
        res.status(200).send({
            status: 200,
            message: 'Success'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 500,
            message: 'Error while getting list'
        })
    }
}
app.get('/register', getRegisteredList)
app.post('/add-register', addRegister)