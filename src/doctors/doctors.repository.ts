import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DoctorDo } from 'src/_schemas/doctor.do';
import { UpdateDoctorDto } from '../dto/update-doctor.dto';

export class DoctorsRepository {
  constructor(
    @InjectModel('Doctor')
    private doctorModel: Model<DoctorDo>,
  ) {}

  async createOne(doctor): Promise<any> {
    const result = await this.doctorModel.create(doctor);
    return result;
  }

  async findOne(email: string): Promise<any> {
    const result = await this.doctorModel.findOne({ email: email });
    return result;
  }

  async findOneById(id: string): Promise<any> {
    const result = await this.doctorModel.findOne({ _id: id });
    return result;
  }

  async updateOne(doctor_id: string, updateDoctorDto: UpdateDoctorDto): Promise<any> {
    const result = await this.doctorModel.findByIdAndUpdate(doctor_id, updateDoctorDto, { new: true });
    return result;
  }

  async removeOne(doctor_id: string): Promise<any> {
    const result = await this.doctorModel.findByIdAndDelete(doctor_id);
    return result;
  }

  async updateAppointment(doctor_id: string, appointment_id: string): Promise<any> {
    const result = await this.doctorModel.updateOne(
      { _id: doctor_id },
      { $push: { appointments_accepted: appointment_id } },
    );
    return result;
  }
}