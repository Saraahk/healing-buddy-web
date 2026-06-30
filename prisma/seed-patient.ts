import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Find Leen Ahmed's doctor record
  const doctorUser = await prisma.user.findFirst({
    where: { role: 'Doctor' },
    include: { doctor: true },
  });

  if (!doctorUser?.doctor) {
    console.log('No doctor found in DB!');
    return;
  }

  const doctorId = doctorUser.doctor.id;
  console.log(`Using doctor: ${doctorUser.full_name} (${doctorId})`);

  // Create a patient user
  const hash = await bcrypt.hash('patient123', 10);
  const patientUser = await prisma.user.create({
    data: {
      email: 'test.patient@healing.com',
      password_hash: hash,
      full_name: 'Ahmad Al-Rashidi',
      phone: '0501234567',
      role: 'Patient',
      account_status: 'Active',
      is_verified: true,
    },
  });

  // Create the patient record
  const patient = await prisma.patient.create({
    data: {
      user_id: patientUser.id,
      date_of_birth: new Date('1990-05-15'),
      gender: 'Male',
      primary_condition: 'Anxiety',
      severity: 'Moderate',
      diagnosed_year: 2023,
      joined_date: new Date(),
      onboarding_completed: true,
    },
  });

  // Assign patient to the doctor
  await prisma.doctorPatientAssignment.create({
    data: {
      doctor_id: doctorId,
      patient_id: patient.id,
      assigned_since: new Date(),
      is_primary: true,
      patient_status: 'Active',
    },
  });

  console.log('Done! Patient "Ahmad Al-Rashidi" assigned to Dr.' + doctorUser.full_name);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
