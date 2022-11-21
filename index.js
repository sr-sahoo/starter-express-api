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

app.get('/register', getRegisteredList)