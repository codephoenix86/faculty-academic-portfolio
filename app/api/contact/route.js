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

    const fullName = `${firstName} ${lastName}`;

    // Send email using Resend
    let data;
    try {
      data = await resend.emails.send({
        from: 'Contact Form <contact@profjksamriya.in>', // Update with your verified domain
        to: [recipientEmail],
        subject: `New message from ${fullName}`,
        html: `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Contact Form Email</title>
    <style>
      @media only screen and (max-width: 600px) {
        .mobile-padding {
          padding: 20px 15px !important;
        }
        .mobile-padding-card {
          padding: 24px 18px !important;
        }
        .mobile-stack {
          display: block !important;
          width: 100% !important;
          padding-right: 0 !important;
          padding-bottom: 16px !important;
        }
        .mobile-text {
          font-size: 14px !important;
        }
        .mobile-title {
          font-size: 24px !important;
        }
        .mobile-name {
          font-size: 20px !important;
        }
        .mobile-button {
          padding: 14px 32px !important;
          font-size: 15px !important;
        }
        .mobile-badge {
          padding: 8px 18px !important;
          font-size: 11px !important;
        }
        .mobile-icon {
          width: 36px !important;
          height: 36px !important;
        }
        .mobile-icon-img {
          width: 18px !important;
          height: 18px !important;
        }
      }
    </style>
    <!--[if mso]>
    <style type="text/css">
      body, table, td {font-family: Arial, Helvetica, sans-serif !important;}
    </style>
    <![endif]-->
  </head>
  <body style="margin: 0; padding: 0; background-color: #f0f0f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
    
    <!-- Wrapper Table for Email Clients -->
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); min-height: 100vh;">
      <tr>
        <td style="padding: 40px 20px;">
          
          <!-- Main Container - Responsive max-width -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 900px; margin: 0 auto;">
            <tr>
              <td>
                
                <!-- White Card -->
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                  
                  <!-- Decorative Top Bar -->
                  <tr>
                    <td style="height: 6px; background: linear-gradient(90deg, #667eea 0%, #764ba2 50%, #f093fb 100%);"></td>
                  </tr>
                  
                  <!-- Header Section -->
                  <tr>
                    <td class="mobile-padding" style="padding: 50px 50px 40px;">
                      <!-- Badge -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td class="mobile-badge" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 12px 28px; border-radius: 50px; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                            <span class="mobile-text" style="color: #ffffff; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">New Message</span>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Title -->
                      <h1 class="mobile-title" style="margin: 24px 0 10px; color: #1a202c; font-size: 38px; font-weight: 500; letter-spacing: -1px; line-height: 1.2;">
                        Contact Form Submission
                      </h1>
                      <p class="mobile-text" style="margin: 0; color: #718096; font-size: 17px; line-height: 1.5;">
                        Someone has reached out to you
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Contact Card -->
                  <tr>
                    <td class="mobile-padding" style="padding: 0 50px 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: linear-gradient(135deg, #f6f8fb 0%, #e9ecf3 100%); border-radius: 16px; border: 2px solid #e2e8f0;">
                        <tr>
                          <td class="mobile-padding-card" style="padding: 36px 36px 24px;">
                            
                            <!-- Name -->
                            <h2 class="mobile-name" style="margin: 0 0 24px; color: #1a202c; font-size: 30px; font-weight: 700; line-height: 1.2;">
                              ${fullName}
                            </h2>
                            
                            <!-- Contact Info Row - Desktop side by side, mobile stacked -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <!-- Email -->
                                <td class="mobile-stack" style="vertical-align: top; width: 50%; padding-right: 20px;">
                                  <a href="mailto:${email}" class="mobile-text" style="color: #667eea; text-decoration: none; font-size: 16px; font-weight: 600; word-break: break-word; display: block;">
                                    ${email}
                                  </a>
                                </td>
                                
                                <!-- Phone -->
                                ${phone ? `
                                <td class="mobile-stack" style="vertical-align: top; width: 50%;">
                                  <a href="tel:${phone}" class="mobile-text" style="color: #4a5568; text-decoration: none; font-size: 16px; font-weight: 600; display: block;">
                                    ${phone}
                                  </a>
                                </td>
                                ` : '<td></td>'}
                              </tr>
                            </table>
                            
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Message Section -->
                  <tr>
                    <td class="mobile-padding" style="padding: 0 50px 40px;">
                      <!-- Label -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-bottom: 18px;">
                        <tr>
                          <td style="background: #667eea; color: #ffffff; padding: 7px 18px; border-radius: 6px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                            Message Content
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message Box -->
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 12px;">
                        <tr>
                          <td style="padding: 32px 28px;">
                            <div class="mobile-text" style="color: #2d3748; font-size: 17px; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word;">${message}</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Action Button -->
                  <tr>
                    <td class="mobile-padding" style="padding: 0 50px 50px; text-align: center; background: linear-gradient(135deg, #f6f8fb 0%, #e9ecf3 100%); border-top: 2px solid #e2e8f0;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin: 36px auto 0;">
                        <tr>
                          <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50px; box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);">
                            <a href="mailto:${email}" style="display: inline-block; color: #ffffff; text-decoration: none; padding: 18px 56px; font-weight: 700; font-size: 17px;">
                              <span class="mobile-text" style="color: #ffffff; font-weight: 700; font-size: 17px;">Reply to Message</span>
                            </a>
                          </td>
                        </tr>
                      </table>
                      <p class="mobile-text" style="margin: 18px 0 0; color: #718096; font-size: 14px;">
                        Click to open your email client and reply directly
                      </p>
                    </td>
                  </tr>
                  
                </table>
                
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="text-align: center; padding: 36px 20px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="background: rgba(255, 255, 255, 0.15); border-radius: 12px; padding: 22px;">
                  <tr>
                    <td style="text-align: center;">
                      <p style="margin: 0; color: #ffffff; font-size: 15px; font-weight: 600; margin-bottom: 8px;">Sent via Contact Form</p>
                      <p style="margin: 0; color: #ffffff; font-size: 14px; opacity: 0.9;">
                        <a href="https://profjksamriya.in" style="color: #ffffff; text-decoration: none; font-weight: 600;">profjksamriya.in</a> • ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
          </table>
          
        </td>
      </tr>
    </table>

  </body>
</html>`,
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