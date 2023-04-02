const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 5000;

app.get('/',(req, res)=>{
    res.send('Show My code it is nunning')
})


app.use(cors());
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://BDland71:149JFFYsLBfrJYAc@cluster0.uk5kj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
            const databseCollection = client.db('IBBL-Student');
            const allStudenCollection = databseCollection.collection('allStuden');
            const allStuPaymentCollection = databseCollection.collection('allStuPayment');


            app.post('/students', async (req, res) =>{
                const student = req.body;
                // const student = {name: habib, email: 'habib@gmail.com'}
                const result = await allStudenCollection.insertOne(student);
                student.id = result.insertedId;
                res.send(result)
            });

            app.get('/students',async (req, res)=>{
                const allStudents = allStudenCollection.find({});
                const studentsArry = await allStudents.toArray();
                
                res.send(studentsArry)
            });
            

            // Student Payment data 
            app.post('/stuPayment',async (req, res)=>{
                const stuPadymentDetails = req.body;
                const stuPayment = await allStuPaymentCollection.insertOne(stuPadymentDetails);

                res.send(stuPayment)
            })

            app.get('/stuPayment',async (req, res)=>{
                const stuPayments = allStuPaymentCollection.find({});
                const stuPaymentArray = await stuPayments.toArray();
                res.send(stuPaymentArray);
            })


    }
    finally{

    }
}

run().catch(err=>(console.log(err)))





app.listen(port,()=>{
    console.log(`Yeah it is running ${port}`);
})
