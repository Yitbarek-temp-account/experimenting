import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  async createDoctor(@Body() createDoctorDto: CreateDoctorDto) {
    return await this.doctorsService.createDoctor(createDoctorDto);
  }

  @Get(':id')
  async findDoctorById(@Param('id') id: string) {
    return await this.doctorsService.findDoctorById(id);
  }

  @Patch(':id')
  async updateDoctor(
    @Param('id') id: string,
    @Body() updateDoctorDto: UpdateDoctorDto,
  ) {
    return await this.doctorsService.updateDoctor(id, updateDoctorDto);
  }

  @Delete(':id')
  async removeDoctor(@Param('id') id: string) {
    return await this.doctorsService.removeDoctor(id);
  }
}