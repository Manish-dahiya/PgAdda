import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";
import users from "@/models/user.model";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


export async function GET(req,{params}){
    await connectToDatabase();
    const ownerId=await params.id
    console.log("ownerID is:",ownerId)
    try {
      const ownersAllProperties= await properties.find({owner: ownerId});
      // console.log(ownersAllProperties)
     return NextResponse.json({response:ownersAllProperties,success:true})
    } catch (error) {
      console.log(error)    
      return NextResponse.json({response:"some error occured",success:false})
    }
  }

  
// PUT  /api/user/[id]  — update profile (avatar, email, contact, bio)
export async function PUT(request, { params }) {
    try {
        await connectToDatabase();
        const { id } =await  params;
        console.log("ye ayi h bhai yr",id);
 
        const existing = await users.findById(id);
        if (!existing) {
            return NextResponse.json({ success: false, response: "User not found" }, { status: 404 });
        }
 
        const formData = await request.formData();
 
        // ── Text fields (only update if the client actually sent a value) ──────
        const updatedFields = {};
 
        const email   = formData.get("email");
        const contact = formData.get("contact");
        const bio     = formData.get("bio");
 
        if (email)   updatedFields.email   = email;
        if (contact) updatedFields.contact = contact;
        if (bio)     updatedFields.bio     = bio;
 
        // ── Avatar via Cloudinary ─────────────────────────────────────────────
        const avatarFile = formData.get("avatar"); // will be null if not uploaded
 
        const hasNewAvatar = avatarFile && avatarFile.size > 0;
 
        if (hasNewAvatar) {
            // Delete the old avatar from Cloudinary if one exists
            if (existing.avatar?.publicId) {
                await cloudinary.uploader.destroy(existing.avatar.publicId);
            }
 
            // Upload the new avatar
            const buffer = Buffer.from(await avatarFile.arrayBuffer());
 
            const uploadResult = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "pg-avatars", transformation: [{ width: 400, height: 400, crop: "fill" }] },
                    (err, result) => {
                        if (err) reject(err);
                        else resolve(result);
                    }
                ).end(buffer);
            });
 
            updatedFields.avatar = {
                url:       uploadResult.secure_url,
                publicId:  uploadResult.public_id,
            };
        }
 
        const updatedUser = await users
            .findByIdAndUpdate(id, updatedFields, { new: true })
            .select("-password");
 
        console.log("ye he h jadd",updatedUser)
        return NextResponse.json({ success: true, data: updatedUser });
        
    } catch (err) {
        console.log("error occured ",err)
        return NextResponse.json({ success: false, response: err.message }, { status: 500 });
    }
}
  