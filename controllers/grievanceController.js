const grievances=require('../models/grievanceSchema')
const nodemailer = require('nodemailer');
const { login } = require('./userController');
const { GoogleGenerativeAI } = require("@google/generative-ai");
// const { ChatClient } = require('@google/generative-ai');
// const { google } = require('googleapis');
exports.grievance=async(req,res)=>{
    console.log("inside grievance funtion");
    const {name,email,phone,location,category,description,urgency} =req.body
    // console.log(username,email,password);
    try{
            const newgrievance=new grievances({
                name,email,phone,location,category,description,urgency
            })
            await newgrievance.save()
             // Setup email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user:  process.env.admin_email, 
                pass: process.env.admin_email_password,
            }
        });

        // Email content
        const mailOptions = {
            from: `${email}`,
            to: 'arunjose352@gmail.com', // Replace with the admin's email
            subject: `New Grievance Submitted by ${name}`,
            html: `
                <h3>New Grievance Details</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Location:</strong> ${location}</p>
                <p><strong>Category:</strong> ${category}</p>
                <p><strong>Description:</strong> ${description}</p>
                <p><strong>Urgency:</strong> ${urgency}</p>
            `
        };

        // Send the email
        await transporter.sendMail(mailOptions);

            res.status(200).json(newgrievance)
        }
    catch(err){
        res.status(401).json(err)
    }  
}




// -------------------------------------------chat


const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

exports.chat = async (req, res) => {
    console.log("Inside chat function");

    const { message } = req.body; // Get the message from the frontend
    // console.log("Received message:", message);
try {
    // Replace `model.generateContent` with your actual API call logic for Gemini API
    const response = await model.generateContent(message);
    console.log("Generated response");
    // Extract the response from candidates
    const botReply =response.response.candidates[0]?.content?.parts[0]?.text.trim() || "I'm sorry, I couldn't generate a reply.";
    console.log("API reply:", botReply)
    // Return the API-generated answer to the frontend
    return res.json( botReply );
    ;
} catch (error) {
    console.error("Error calling Gemini API:", error.message);
    // Handle API downtime gracefully
    const fallbackReply = "I'm sorry, the chatbot service is currently unavailable. Please try again later.";
    return res.status(503).json( fallbackReply );
}
    
};
