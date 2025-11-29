import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, recipientEmail } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message || !recipientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email using Resend
    let data;
    try {
      data = await resend.emails.send({
        from: 'Contact Form <onboarding@resend.dev>', // Update with your verified domain
        to: [recipientEmail],
        subject: `New message from ${firstName} ${lastName}`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact Form</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', sans-serif; background-color: #f8fafc; line-height: 1.6;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 40px 20px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                  New Contact Message
                </h1>
              </div>

              <!-- Content -->
              <div style="padding: 40px 20px;">
                <div style="max-width: 700px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
                  
                  <!-- Sender Info -->
                  <div style="padding: 32px 32px 0;">
                    <div style="margin-bottom: 24px;">
                      <div style="font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; font-weight: 600;">
                        From
                      </div>
                      <div style="font-size: 20px; color: #111827; font-weight: 600; margin-bottom: 4px;">
                        ${firstName} ${lastName}
                      </div>
                      <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 15px;">
                        ${email}
                      </a>
                      ${phone ? `
                      <div style="margin-top: 8px;">
                        <a href="tel:${phone}" style="color: #6b7280; text-decoration: none; font-size: 15px;">
                          ${phone}
                        </a>
                      </div>
                      ` : ''}
                    </div>

                    <!-- Divider -->
                    <div style="height: 1px; background: #e5e7eb; margin: 0 0 24px 0;"></div>
                  </div>

                  <!-- Message -->
                  <div style="padding: 0 32px 32px;">
                    <div style="font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; font-weight: 600;">
                      Message
                    </div>
                    <div style="color: #374151; font-size: 16px; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word; overflow-wrap: break-word; max-width: 100%;">
${message}
                    </div>
                  </div>

                </div>
              </div>

              <!-- Footer -->
              <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 13px;">
                <p style="margin: 0;">Sent from your contact form</p>
              </div>

            </body>
          </html>
        `,
        replyTo: email, // Allow direct reply to the sender
      });
    } catch (emailError) {
      console.error('Resend API error:', emailError);
      
      // Return error if email sending fails (e.g., no internet, API issues)
      return NextResponse.json(
        { 
          error: 'Failed to send email. Please check your connection and try again.',
          details: emailError.message 
        },
        { status: 500 }
      );
    }

    // Check if Resend returned an error in the response
    if (data.error) {
      console.error('Resend returned error:', data.error);
      return NextResponse.json(
        { error: 'Failed to send email', details: data.error },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}