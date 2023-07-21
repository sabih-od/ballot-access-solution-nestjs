import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string, subject: string, message: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      subject,
      text: message,
      from: process.env.MAIL_FROM_ADDRESS,
    });
  }
}