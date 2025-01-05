import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { SchedulerRegistry, CronJob } from '@nestjs/schedule';
import * as fs from 'fs';

@Injectable()
export class NotificationsService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async createNotification(createNotificationDto: CreateNotificationDto, user: string, doctor: string, date: any) {
    const { appointment, user, doctor, message } = createNotificationDto;

    const date24h = new Date();
    date24h.setDate(date24h.getDate() + 1);
    const date2h = new Date();
    date2h.setHours(date2h.getHours() + 2);

    const job2h = new CronJob(date2h, () => {
      this.addMessageToLogFile(appointment, user, doctor, message, '2h');
    });
    const job24h = new CronJob(date24h, () => {
      this.addMessageToLogFile(appointment, user, doctor, message, '24h');
    });

    this.schedulerRegistry.addCronJob(`${Date.now()} - 2h - ${user} - ${appointment}`, job2h);
    job2h.start();
    console.log('Job will run at ' + date2h);

    this.schedulerRegistry.addCronJob(`${Date.now()} - 24h - ${user} - ${appointment}`, job24h);
    job24h.start();
    console.log('Job will run at ' + date24h);

    return 'Notification was added';
  }

  async addMessageToLogFile(appointment, user, doctor, message, type) {
    const logMessage = `${Date.now()} - ${type} reminder for ${user} about appointment with ${doctor}: ${message}\n`;

    const writeStream = fs.createWriteStream('notifications.log', { flags: 'a' });
    writeStream.write(logMessage, 'utf-8');
    writeStream.on('finish', () => {
      console.log('Wrote all data to file notifications.log');
    });
    writeStream.end();
  }

  async removeNotification(id: string) {
    this.schedulerRegistry.deleteCronJob(id);
    return { message: 'Notification removed successfully' };
  }
}