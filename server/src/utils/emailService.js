import nodemailer from 'nodemailer';

/**
 * Creates and caches the Nodemailer transporter if SMTP environment variables are present.
 */
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST || process.env.EMAIL_HOST;
  const port = process.env.SMTP_PORT || process.env.EMAIL_PORT || 587;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: {
        user,
        pass,
      },
    });
  }

  return transporter;
}

/**
 * Send trip invitation email
 */
export async function sendTripInvitationEmail({
  to,
  inviterName,
  tripTitle,
  destination,
  inviteUrl,
  role = 'editor',
  expiresAt,
}) {
  const mailTransporter = getTransporter();
  const from = process.env.EMAIL_FROM || '"TripTally" <invites@triptally.app>';

  const subject = `${inviterName} invited you to join "${tripTitle}" on TripTally`;
  const formattedExpiry = expiresAt ? new Date(expiresAt).toLocaleDateString() : '7 days';

  const textContent = `
Hello,

${inviterName} has invited you to collaborate on the upcoming trip to ${destination}: "${tripTitle}" as an ${role}.

Accept your invitation here:
${inviteUrl}

This invitation link expires on ${formattedExpiry}.

Happy Travels,
The TripTally Team
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1E293B; margin: 0; padding: 20px; }
    .card { max-width: 540px; margin: 0 auto; background: #FFFFFF; border-radius: 16px; border: 1px solid #E2E8F0; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
    .header { background: #1B4332; padding: 32px 24px; text-align: center; color: #FFFFFF; }
    .header h1 { margin: 0; font-size: 24px; letter-spacing: -0.5px; }
    .content { padding: 32px 24px; }
    .btn { display: inline-block; background-color: #1B4332; color: #FFFFFF !important; font-weight: 600; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none; margin: 20px 0; }
    .footer { padding: 16px 24px; background: #F8FAFC; text-align: center; font-size: 12px; color: #64748B; border-top: 1px solid #E2E8F0; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>TripTally</h1>
    </div>
    <div class="content">
      <h2>You're Invited to Travel!</h2>
      <p><strong>${inviterName}</strong> has invited you to collaborate on <strong>${tripTitle}</strong> (${destination}) as a <strong>${role}</strong>.</p>
      <p>Join the board to organize daily itineraries, vote on stays, and tally shared expenses effortlessly.</p>
      <div style="text-align: center;">
        <a href="${inviteUrl}" class="btn">Accept Invitation</a>
      </div>
      <p style="font-size: 12px; color: #64748B;">This invitation expires on ${formattedExpiry}. If you did not expect this invitation, you can safely ignore this email.</p>
    </div>
    <div class="footer">
      Sent with ❤️ by TripTally • Collaborative Group Travel Planning
    </div>
  </div>
</body>
</html>
  `.trim();

  if (mailTransporter) {
    try {
      const info = await mailTransporter.sendMail({
        from,
        to,
        subject,
        text: textContent,
        html: htmlContent,
      });
      return { success: true, messageId: info.messageId, provider: 'smtp' };
    } catch (err) {
      console.error('[EmailService] Failed to send email via SMTP:', err.message);
      // Fallback to local log
    }
  }

  // Local development fallback
  console.log(`\n================== [TripTally Dev Email Dispatch] ==================`);
  console.log(`📬 To: ${to}`);
  console.log(`📋 Subject: ${subject}`);
  console.log(`🔗 Invite Link: ${inviteUrl}`);
  console.log(`⏳ Expiration: ${formattedExpiry}`);
  console.log(`====================================================================\n`);

  return { success: true, provider: 'development', inviteUrl };
}

export default {
  sendTripInvitationEmail,
};
