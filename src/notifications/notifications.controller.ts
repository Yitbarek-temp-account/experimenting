import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    const user = createNotificationDto.user;
    const doctor = createNotificationDto.doctor;
    const date = createNotificationDto.date;
    return await this.notificationsService.createNotification(createNotificationDto, user, doctor, date);
  }

  @Delete(':id')
  async removeNotification(@Param('id') id: string) {
    return await this.notificationsService.removeNotification(id);
  }
}