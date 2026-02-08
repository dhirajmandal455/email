import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js"
import { mailtrapClient, sender } from "./mailTrap.js"

export const sendVerificationEmail = async (email,verificationToken)=>{

    try {
        const response = await mailtrapClient.send({
            from:sender,
            to:[
                {email:email}
            ],
            subject:"verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE(verificationToken),
            category:"Email verification",

        })
        console.log("Email sent successfully",response)
    } catch (error) {
     console.log("Error sending verification code",error)   
     throw new Error (`Error sending verification email:${error}`)
    }

}