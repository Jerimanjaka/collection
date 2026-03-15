import { NextRequest, NextResponse } from "next/server";

function getResend() {
  const { Resend } = require("resend");
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const { fullName, companyName, email, phone, country,
            productCategory, productReference, estimatedQuantity, quantityRange,
            personalizationTypes, brandingFiles, projectDescription,
            packagingRequired, shippingLocation, additionalNotes } = data;

    if (!fullName || !email || !productCategory || !estimatedQuantity) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // If Resend API key is not configured, just log and return success
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_xxxxxxxxxxxx") {
      console.log("Quote request (email not configured):", data);
      return NextResponse.json({ success: true });
    }

    const personalization = Array.isArray(personalizationTypes)
      ? personalizationTypes.join(", ")
      : "None selected";

    const resend = getResend();
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "contact@premierecollection.com";

    await resend.emails.send({
      from: "Premiere Collection <noreply@premierecollection.com>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New Quote Request — ${productCategory} — ${fullName}`,
      html: `
        <h2>New Quote Request</h2>

        <h3>1. Contact Information</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${companyName || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Country:</strong> ${country || "N/A"}</p>

        <hr />
        <h3>2. Project Information</h3>
        <p><strong>Product Category:</strong> ${productCategory}</p>
        <p><strong>Product Reference:</strong> ${productReference || "N/A"}</p>
        <p><strong>Estimated Quantity:</strong> ${estimatedQuantity}</p>
        <p><strong>Quantity Range:</strong> ${quantityRange || "N/A"}</p>

        <hr />
        <h3>3. Customization Details</h3>
        <p><strong>Personalization Types:</strong> ${personalization}</p>
        <p><strong>Branding Files:</strong> ${Array.isArray(brandingFiles) && brandingFiles.length > 0 ? brandingFiles.map((f: string) => f.replace(/^\d+_/, "")).join(", ") : "None"}</p>
        <p><strong>Project Description:</strong></p>
        <p>${projectDescription ? projectDescription.replace(/\n/g, "<br />") : "N/A"}</p>

        <hr />
        <h3>4. Additional Information</h3>
        <p><strong>Packaging Required:</strong> ${packagingRequired || "Not sure yet"}</p>
        <p><strong>Shipping Location:</strong> ${shippingLocation || "N/A"}</p>
        <p><strong>Additional Notes:</strong></p>
        <p>${additionalNotes ? additionalNotes.replace(/\n/g, "<br />") : "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Quote email error:", error);
    return NextResponse.json({ error: "Failed to send quote request" }, { status: 500 });
  }
}
