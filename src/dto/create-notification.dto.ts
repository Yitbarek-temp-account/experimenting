import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty()
  @IsString()
  user: string;

  @ApiProperty()
  @IsString()
  doctor: string;

  @ApiProperty()
  @IsString()
  appointment: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  read: boolean;
  date: any;
}