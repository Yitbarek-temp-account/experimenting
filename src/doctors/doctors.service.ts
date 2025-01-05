import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorsRepository } from './doctors.repository';
import { CreateDoctorDto } from '../dto/create-doctor.dto';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';

@Injectable()
export class DoctorsService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async createDoctor(createDoctorDto: CreateDoctorDto): Promise<any> {
    const doctor = await this.doctorsRepository.createOne(createDoctorDto);
    return doctor;
  }

  async findDoctorByEmail(email: string): Promise<any> {
    const doctor = await this.doctorsRepository.findOne(email);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async findDoctorById(doctor_id: string): Promise<any> {
    const doctor = await this.doctorsRepository.findOneById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    return doctor;
  }

  async updateDoctor(doctor_id: string, updateDoctorDto: UpdateDoctorDto): Promise<any> {
    const doctor = await this.findDoctorById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const updatedDoctor = await this.doctorsRepository.updateOne(doctor_id, updateDoctorDto);
    return updatedDoctor;
  }

  async removeDoctor(doctor_id: string): Promise<any> {
    const doctor = await this.findDoctorById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    await this.doctorsRepository.removeOne(doctor_id);
    return { message: 'Doctor removed successfully' };
  }

  async updateAppointment(doctor_id: string, appointment_id: string): Promise<any> {
    const doctor = await this.findDoctorById(doctor_id);
    if (!doctor) {
      throw new NotFoundException('Doctor not found');
    }
    const updatedDoctor = await this.doctorsRepository.updateAppointment(doctor._id, appointment_id);
    return updatedDoctor;
  }
}