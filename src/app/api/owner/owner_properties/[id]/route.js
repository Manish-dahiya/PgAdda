import connectToDatabase from "@/lib/dbConnect";
import properties from "@/models/property.model";
import users from "@/models/user.model"
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})



export async function DELETE(request, { params }) {
    try {
    await connectToDatabase();
    
        const { id } = params
        const { ownerId } = await request.json()

        const property = await properties.findById(id)
        if (!property) {
            return NextResponse.json({ success: false, response: "Property not found" })
        }

        // Remove property id from user's properties array
        await users.findByIdAndUpdate(ownerId, {
            $pull: { properties: id }
        })

        // Delete the property document
        await properties.findByIdAndDelete(id)

        return NextResponse.json({ success: true, deletedId: id })

    } catch (err) {
        return NextResponse.json({ success: false, response: err.message })
    }


  }
  
  export async function PUT(request, { params }) {
    try {
            await connectToDatabase();        

        const { id } = params
        const formData = await request.formData()

        const existing = await properties.findById(id)
        if (!existing) {
            return NextResponse.json({ success: false, response: "Property not found" })
        }

        // Parse all text fields
        const updatedFields = {
            propertyName:      formData.get("propertyName"),
            propertyDesc:      formData.get("propertyDesc"),
            propertyRent:      Number(formData.get("propertyRent")),
            propertyType:      formData.get("propertyType"),
            bedrooms:          Number(formData.get("bedrooms")),
            bathrooms:         Number(formData.get("bathrooms")),
            furnishedType:     formData.get("furnishedType"),
            kitchen:           formData.get("kitchen") === "true",
            hall:              formData.get("hall") === "true",
            balcony:           formData.get("balcony") === "true",
            parking:           formData.get("parking") === "true",
            laundary:          formData.get("laundary") === "true",
            extraRequirements: formData.get("extraRequirements"),
            status:            formData.get("status"),
            location: { latitude: formData.get("latitude"), longitude: formData.get("longitude") }
        }

        // Handle images — only replace if new ones were uploaded
        const newImages = formData.getAll("images")
        const hasNewImages = newImages.length > 0 && newImages[0].size > 0

        if (hasNewImages) {
            // Delete old images from Cloudinary
            for (const img of existing.images) {
                if (img.publicId) {
                    await cloudinary.uploader.destroy(img.publicId)
                }
            }

            // Upload new images to Cloudinary
            const uploadedImages = await Promise.all(
                newImages.map(async (file) => {
                    const buffer = Buffer.from(await file.arrayBuffer())
                    return new Promise((resolve, reject) => {
                        cloudinary.uploader.upload_stream(
                            { folder: "pg-listings" },
                            (err, result) => {
                                if (err) reject(err)
                                else resolve({ url: result.secure_url, publicId: result.public_id })
                            }
                        ).end(buffer)
                    })
                })
            )
            updatedFields.images = uploadedImages
        }
        // if no new images → updatedFields.images is untouched → old images stay

        const updated = await properties.findByIdAndUpdate(id, updatedFields, { new: true })

        return NextResponse.json({ success: true, response: updated })

    } catch (err) {
        return NextResponse.json({ success: false, response: err.message })
    }
}
  