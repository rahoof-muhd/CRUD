

import userModel from "../model/crud.schema.js"


export async function create(req, res) {
    try {
        let { userId,name,phone,email,description} = req.body;
        if (!(userId && name && phone && email && description)) {
            return res.status(400).json({
                msg: "Input fields cannot be empty!"
            })
        }
        
        let username = await userModel.findOne({name})
        if(username){
            return res.status(400).json({
                msg: "Name alredy exists"
            })
        }
        let usid = await userModel.findOne({userId})
        if(usid){
            return res.status(400).json({
                msg: "UserId alredy exists"
            })
        }
        let phones = await userModel.findOne({phone})
        if(phones){
            return res.status(400).json({
                msg: "Phone alredy exists"
            })
        }
        let emails= await userModel.findOne({email})
        if(emails){
            return res.status(400).json({
                msg: "Email alredy exists"
            })
        }
        await userModel.create({
            userId,
            name,
            phone,
            email,
            description
        });
        return res.status(201).json({
            msg: "Added"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}


export async  function read(req,res) {
    try {
        let result = await userModel.find();
        res.json(result)
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error occured!"
        })
    }
}

export async function remove(req, res) {
    try {
        const userId = req.params.userId;
        const deletedEmployee = await userModel.findOneAndDelete({ userId: userId });
        if (!deletedEmployee) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        return res.status(200).json({ msg: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


export async function update(req, res) {
    try {
        const userId = req.params.userId;
        const { name, phone, email, description } = req.body;

        // Check if the user exists
        const existingUser = await userModel.findOne({ userId: userId });
        if (!existingUser) {
            return res.status(404).json({ msg: "Employee not found" });
        }

        // Update user information
        existingUser.name = name;
        existingUser.phone = phone;
        existingUser.email = email;
        existingUser.description = description;

        // Save the updated user
        await existingUser.save();

        return res.status(200).json({ msg: "Employee updated successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}