import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { csvData, subject, body, senderEmail, senderPassword, resume } = await req.json();

    if (!csvData || !senderEmail || !senderPassword) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    });

    const results = [];

    for (const row of csvData) {
      const { email, name, company, role } = row;
      
      const hrName = name || 'Hiring Manager';
      const companyName = company || 'your company';
      
      const dynamicSubject = `Application for ${role} Role - Immediate Joiner`;
      const dynamicBody = body
        .replace(/{hr_name}/g, hrName)
        .replace(/{company_name}/g, companyName)
        .replace(/{role}/g, role);

      const mailOptions: any = {
        from: senderEmail,
        to: email,
        subject: dynamicSubject,
        html: dynamicBody.replace(/\n/g, '<br>'),
      };

      if (resume && resume.content) {
        mailOptions.attachments = [
          {
            filename: resume.filename,
            content: resume.content,
            encoding: 'base64'
          }
        ];
      }

      try {
        await transporter.sendMail(mailOptions);
        results.push({ email, status: 'sent' });
      } catch (err: any) {
        results.push({ email, status: 'failed', error: err.message });
      }
    }

    return NextResponse.json({ results });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
