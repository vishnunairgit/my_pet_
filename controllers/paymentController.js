const PETS_SCHEMA= require("../Models/petSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const orders = async (req, res) => {
  //   console.log("inside paymet controler");

  const petData = await PETS_SCHEMA.findOne({_id:req.body.petId});
  console.log(petData, "----------PET_SCHEMA---------");
  // console.log(petData,'----------petData---------');

  if (petData?.petAdoptedBy) {

    res.status(400).json({message:'pet alreday booked'})
  }else{
    try {
      const instance = new Razorpay({
        key_id: "rzp_test_PDgtn0gQI671ND",
        key_secret: "dBLE9nMEQVUXa9rtVlqob6SO",
      });

      const options = {
        amount: petData.petPrice*100,
        // amount:petData.petPrice*100, // amount in smallest currency unit
        currency: "INR",
        receipt: petData._id,
      };

      console.log(options,'-------options-=====');

      const order = await instance.orders.create(options);

      if (!order) return res.status(500).send("Some error occured");

      res.json(order);
    } catch (error) {
      res.status(501).send(error);
    }

  }


   
};

// payment success router

const paymentSuccess = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      petId,
    } = req.body;

    const shasum = crypto.createHmac("sha256", "dBLE9nMEQVUXa9rtVlqob6SO");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    await PETS_SCHEMA.updateOne({
        
      _id: petId
    }, {
        $set: {
          petAdoptedBy: req.userId
        },
        $push: {
            paymentOrders: {
                userId: req.userId,
                razorpayPaymentId,
                timeStamb: new Date()
            }
        }
        
    });
    // console.log(PETS_SCHEMA, "-----updated date PETS_SCHEMA---------");

    const updatedPetData = await PETS_SCHEMA.findOne({
        id: petId
    });

    // console.log(updatedPetData, '-----updated data---------');


    try {
    } catch (error) {}

    initiateEmail(petId, razorpayPaymentId);

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};


// node maileyer---------------------------------


const initiateEmail = async (id, razorpayOrderId) => {
    try {
        const petData = await PETS_SCHEMA.findOne({ _id: id }).populate( "petAdoptedBy");
        // console.log(petData,'-----------node mailyer---------');

        // Check if petData is truthy before destructure
        if (petData) {
            const { petAdoptedBy } = petData;
            
            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {
                    user: "infovishnunair@gmail.com",
                    pass: "zdah oepq hlyi uhct",
                },
            });

            // async..await is not allowed in global scope, must use a wrapper
            async function main() {
                const info = await transporter.sendMail({
                    from: "infovishnuac@gmail.com",
                    to: petAdoptedBy.email,
                    subject: "Booking Confirmed ✔",
                    text: "Thanks for the booking",
                    html: `<b>Hello ${petAdoptedBy.firstName} ${petAdoptedBy.lastName}</b> <p> you adopted ${petData.petName} for the price of ${petData.petPrice}`,
                });

                console.log("Message sent: %s", info.messageId);
            }

            main().catch(console.error);
        } else {
            console.error("petData is null.");
        }
    } catch (error) {
        console.error("Error sending email:", error);
    }
};



module.exports = { orders, paymentSuccess };
