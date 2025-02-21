import { Inngest } from "inngest";
import { connect } from "mongoose";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:'clerk/users.created'
    },
    async ({event}) =>{
        const {id, first_name, last_name, email_addresses, image_url
        } = event.data
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image_url: image_url
        }
        await connectDB()
        await User.create(userData)
    }
)

// update the user data in the mongo db

export const syncUserUpdation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },{
        event:'clerk/user.updated'
    },
    async({event})=>{
        const userData={
            _id:id,
            email:email_addresses[0].email_address,
            name: first_name + ' ' + last_name,
            image_url: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

//delete the user from datavbase

export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },{
        event:'clerk/user.deleted'
    },
    async({event})=>{
        const {id} = event.data
        await connectDB()
        await User.findByIdAndDelete(id)
    }
)