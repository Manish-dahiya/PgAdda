import connectToDatabase from "@/lib/dbConnect";
import reviews from "@/models/review.model";
import properties from "@/models/property.model";
import users from "@/models/user.model";
import { NextResponse } from "next/server";

// POST /api/review
export async function POST(req) {
    await connectToDatabase();
    try {
        const { reviewerId, propertyId, text, rating } = await req.json();

        // ── Basic validation ──────────────────────────────────────────────────
        if (!reviewerId || !propertyId || !text || !rating) {
            return NextResponse.json(
                { success: false, response: "All fields are required" },
                { status: 400 }
            );
        }

        if (rating < 1 || rating > 5) {
            return NextResponse.json(
                { success: false, response: "Rating must be between 1 and 5" },
                { status: 400 }
            );
        }

        // ── Prevent duplicate reviews (one user → one review per property) ────
        const alreadyReviewed = await reviews.findOne({
            reviewer: reviewerId,
            property: propertyId,
        });

        if (alreadyReviewed) {
            return NextResponse.json(
                { success: false, response: "You have already reviewed this property" },
                { status: 409 }
            );
        }

        // ── Create the review document ────────────────────────────────────────
        const newReview = await reviews.create({
            reviewer: reviewerId,
            property: propertyId,
            text,
            rating,
        });

        // ── Push review id into both property and user (run in parallel) ──────
        await Promise.all([
            properties.findByIdAndUpdate(propertyId, {
                $push: { reviews: newReview._id },
            }),
            users.findByIdAndUpdate(reviewerId, {
                $push: { reviews: newReview._id },
            }),
        ]);

        // ── Return the review populated with reviewer info ────────────────────
        const populated = await newReview.populate("reviewer", "username avatar");

        return NextResponse.json(
            { success: true, response: populated },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            { success: false, response: error.message },
            { status: 500 }
        );
    }
}