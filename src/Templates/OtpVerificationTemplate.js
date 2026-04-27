export  const otpVerificationTemplate = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        width: 100%;
        padding: 20px 0;
        background-color: #f4f6f8;
      }
      .email-box {
        max-width: 500px;
        margin: auto;
        background: #ffffff;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
      }
      .header {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: white;
        text-align: center;
        padding: 20px;
      }
      .header h1 {
        margin: 0;
        font-size: 22px;
      }
      .content {
        padding: 30px 20px;
        text-align: center;
        color: #333;
      }
      .content p {
        font-size: 14px;
        line-height: 1.6;
        margin: 10px 0;
      }
      .otp-box {
        margin: 25px 0;
        padding: 15px;
        font-size: 28px;
        letter-spacing: 6px;
        font-weight: bold;
        color: #4f46e5;
        background: #f1f5ff;
        border-radius: 8px;
        display: inline-block;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #888;
        padding: 15px;
        border-top: 1px solid #eee;
      }
      .footer a {
        color: #4f46e5;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
<div class="header"> 
    <h1>Email Verification</h1>
 </div> 
 <div class="content"> 
    <p>Hello,</p> <p>Use the following OTP to verify your email address. This OTP is valid for a limited time.</p> <!-- 🔥 OTP PLACEHOLDER --> <div class="otp-box"> {OTP}

    </div> <p>If you didn't request this, you can safely ignore this email.</p> </div>

     <div class="footer">
         <p>© 2026 Your Company. All rights reserved.</p> <p><a href="#">Support</a></p> </div> 
    </div>

  </body>
</html>
`;

