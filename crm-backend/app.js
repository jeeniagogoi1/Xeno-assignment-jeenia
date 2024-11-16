const express = require('express')
const morgan = require('morgan')
const connectDB = require("./config/db")
const auth = require("./middlewares/auth")
const leadRoutes = require('./routes/lead');
const orderRoutes = require('./routes/order');
const audienceRoutes = require('./routes/audience');
const campaignRoutes = require('./routes/campaign');
const authRoutes = require("./routes/auth")
const { initKafka } = require('./config/kafka');


const app = express()

app.use(express.json())
app.use(morgan("tiny"))
app.use(require('cors')())

const initializeKafka = async () => {
    await initKafka()
    require('./consumers/leadConsumer');
    require('./consumers/orderConsumer');
    require('./consumers/campaignConsumer');
}
initializeKafka()

app.use("/",authRoutes)
app.use('/leads',leadRoutes);
app.use('/orders', orderRoutes);
app.use('/audience', audienceRoutes);
app.use('/campaigns', campaignRoutes);


const PORT = process.env.PORT || 4000
app.listen(PORT,async ()=>{
    try{
        await connectDB()
        console.log(`server listening on port : ${PORT}.`)
    }catch(error){
        console.log(error)
    }  
})

