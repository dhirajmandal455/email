
export const VERIFICATION_EMAIL_TEMPLATE = (verificationCode)=>`

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Verify Your Email</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">

        <!-- Main Card -->
        <table width="520" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background:#4caf50;padding:18px;border-radius:6px 6px 0 0;">
              <h2 style="margin:0;color:#ffffff;font-size:20px;">
                Verify Your Email
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;color:#374151;font-size:14px;line-height:1.6;">
              <p style="margin-top:0;">Hello,</p>

              <p>
                Thank you for signing up! Your verification code is:
              </p>

              <!-- OTP -->
              <div
                style="
                  text-align:center;
                  font-size:28px;
                  font-weight:bold;
                  color:#4caf50;
                  letter-spacing:4px;
                  margin:20px 0;
                "
              >
                ${verificationCode}
              </div>

              <p>
                Enter this code on the verification page to complete your
                registration.
              </p>

              <p style="font-size:13px;color:#6b7280;">
                This code will expire in <strong>15 minutes</strong> for security
                reasons.
              </p>

              <p style="font-size:13px;color:#6b7280;">
                If you didn’t create an account with us, please ignore this email.
              </p>

              <p style="margin-bottom:0;">
                Best regards,<br />
                <strong>lionspritff.com</strong>
              </p>
            </td>
          </tr>

        </table>

        <!-- Footer -->
        <table width="520" cellpadding="0" cellspacing="0" style="margin-top:12px;">
          <tr>
            <td align="center" style="font-size:11px;color:#9ca3af;">
              This is an automated message, please do not reply to this email.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;

export const RESET_PASSWORD_EMAIL_TEMPLATE = (resetUrl) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:40px 0;">

        <!-- Main Card -->
        <table width="520" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:6px;border:1px solid #e5e7eb;">

          <!-- Header -->
          <tr>
            <td align="center"
              style="background:#4CAF50;padding:18px;border-radius:6px 6px 0 0;">
              <h2 style="margin:0;color:#ffffff;font-size:20px;">
                Reset Your Password
              </h2>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;color:#374151;font-size:14px;line-height:1.6;">
              <p>Hello,</p>

              <p>
                We received a request to reset your password. Click the button
                below to set a new password.
              </p>

              <!-- Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}"
                      style="
                        background:#4CAF50;
                        color:#ffffff;
                        text-decoration:none;
                        padding:12px 28px;
                        border-radius:4px;
                        display:inline-block;
                        font-size:15px;
                        font-weight:bold;
                      ">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <p style="font-size:13px;color:#6b7280;">
                This link will expire in <strong>15 minutes</strong>.
              </p>

              <p style="font-size:13px;color:#6b7280;">
                If you didn’t request this, you can safely ignore this email.
              </p>

              <p>
                Best regards,<br />
                <strong>lionspritff.com</strong>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="520" cellpadding="0" cellspacing="0" style="margin-top:12px;">
          <tr>
            <td align="center" style="font-size:11px;color:#9ca3af;">
              This is an automated message. Please do not reply.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;


export const PASSWORD_RESET_SUCCESS_TEMPLATE = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset Successful</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:Arial, Helvetica, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <!-- Main Card -->
        <table width="520" cellpadding="0" cellspacing="0" role="presentation"
          style="background-color:#ffffff;border-radius:8px;border:1px solid #e5e7eb;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td align="center" style="background-color:#22c55e;padding:20px;">
              <h2 style="margin:0;color:#ffffff;font-size:22px;font-weight:600;">
                Password Reset Successful
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:32px;color:#374151;font-size:14px;line-height:1.7;">
              <p style="margin-top:0;">Hello,</p>

              <p>
                Your password has been <strong>successfully reset</strong>.
                You can now sign in using your new password.
              </p>

              <!-- Success Icon -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:24px 0;">
                <tr>
                  <td align="center" style="font-size:48px;">
                    ✅
                  </td>
                </tr>
              </table>

              <p style="font-size:13px;color:#6b7280;">
                If you did not perform this action, please secure your account
                immediately by resetting your password again or contacting support.
              </p>

              <p style="margin-bottom:0;">
                Best regards,<br />
                <strong>lionspritff.com</strong>
              </p>
            </td>
          </tr>
        </table>

        <!-- Footer -->
        <table width="520" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:14px;">
          <tr>
            <td align="center" style="font-size:11px;color:#9ca3af;">
              This is an automated message. Please do not reply.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

