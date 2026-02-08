import mongoose from "mongoose"

export const dbConnect = async () => {
    try {
       await mongoose.connect(process.env.DBURL)
        console.log("Connected")
    } catch (error) {
        process.exit(1)
        console.log(error)
    }
}