export function generateVerificationOtpEmailTemplate(OTP) {
  return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
            0% { background-color: #4CAF50; }
            50% { background-color: #45a049; }
            100% { background-color: #4CAF50; }
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            text-align: center;
            padding: 20px;
        }
        .email-container {
            max-width: 500px;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            margin: auto;
            animation: fadeIn 1s ease-in-out;
        }
        .header {
            color: #ffffff;
            background-color: #0077b6;
            padding: 15px;
            font-size: 22px;
            font-weight: bold;
            border-radius: 10px 10px 0 0;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            background-color: #4CAF50;
            color: #ffffff;
            display: inline-block;
            padding: 10px 20px;
            border-radius: 5px;
            animation: pulse 1.5s infinite;
            letter-spacing: 3px;
            margin: 20px 0;
        }
        .message {
            font-size: 16px;
            color: #333333;
            margin: 10px 0;
        }
        .footer {
            font-size: 14px;
            color: #555555;
            margin-top: 20px;
        }
        .library-icon {
            width: 80px;
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="Library Icon" class="library-icon">
        <div class="header">Library Management System</div>
        <p class="message">Hello,</p>
        <p class="message">Use the OTP below to verify your email and continue accessing your Library account:</p>
        <div class="otp">${OTP}</div>
        <p class="message">This OTP is valid for only 10 minutes. Do not share it with anyone.</p>
        <p class="message">If you didn’t request this, please ignore this email.</p>
        <div class="footer">
            📚 Happy Reading! <br>
            Library Management System Team
        </div>
    </div>
</body>
</html>
`;
}

export function generateForgotPasswordEmailTemplate(resetPassword) {
  return `<!DOCTYPE html>
<html>
<head>
    <title>Reset Your Password</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 400px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            padding: 15px;
            border-radius: 10px 10px 0 0;
            color: white;
            font-size: 20px;
            font-weight: bold;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            background: #28a745;
            color: white;
            padding: 10px;
            display: inline-block;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            font-size: 14px;
            margin-top: 10px;
            color: #555;
        }
        .reset-button {
            display: inline-block;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Library Management System</div>
        <p>Hello,</p>
        <p>We received a request to reset your password. 
        
        <p> click the button below to reset your password:</p>
        <a href="${resetPassword}" class="reset-button">Reset Password</a>
        <p>${resetPassword}</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <div class="footer">
            📚 Happy Reading! <br>
            <b>Library Management System Team</b>
        </div>
    </div>
</body>
</html>
`;
}
