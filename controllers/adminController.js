const grievances = require('../models/grievanceSchema');
const admins = require('../models/adminSchema')

exports.loginController = async (req, res) => {
    console.log("inside Login");
    const { email, password } = req.body
    console.log(email, password);
    try {
        const adminUser = await admins.findOne({ email, password })
        console.log(adminUser);
        if (adminUser) {
            // token generate
            // const token = jwt.sign({adminId:adminUser._id},process.env.JWT_PASSWORD)
            res.status(200).json({
                admin: adminUser
            })
        }

    else {
        res.status(404).json("Invalid Email / Password..")
    }
}
         catch (error) {
    res.status(401).json(error)

}
}


exports.viewAllGrievance = async (req, res) => {
    console.log("Inside viewAllGrievance");
    try {
        const allGrievance = await grievances.find()
        res.status(200).json(allGrievance)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.updateStatus = async (req, res) => {
    console.log("Inside update status Grievance");
    const { complaintId } = req.params;
    const { status } = req.body;
    // console.log(Id, status);



    try {
        console.log("Inside update status");


        const result = await grievances.findByIdAndUpdate(
            { _id: complaintId },
            { status },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Grievances not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error('Error updating Grievances status:', error);
        res.status(500).json({ message: 'Server error' });
    }

}