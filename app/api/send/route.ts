import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "E-Mail-Service nicht konfiguriert." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Ungültige E-Mail-Adresse." },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "J. Studio <noreply@j-studio.de>",
      to: ["hallo@j-studio.de"],
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #111111;">
          <h2 style="font-size: 24px; font-weight: 800; margin-bottom: 24px; color: #111111;">
            Neue Kontaktanfrage
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e8e4de; font-size: 13px; color: #777777; width: 80px;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e8e4de; font-size: 14px; color: #111111;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e8e4de; font-size: 13px; color: #777777;">E-Mail</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e8e4de; font-size: 14px; color: #111111;">${email}</td>
            </tr>
          </table>
          <div style="background: #f8f7f4; border-radius: 12px; padding: 16px;">
            <p style="font-size: 13px; color: #777777; margin: 0 0 8px 0;">Nachricht</p>
            <p style="font-size: 14px; color: #111111; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "E-Mail konnte nicht gesendet werden." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API send error:", err);
    return NextResponse.json(
      { error: "Interner Serverfehler." },
      { status: 500 }
    );
  }
}
