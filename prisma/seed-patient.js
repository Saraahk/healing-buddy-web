"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma = new client_1.PrismaClient();
async function main() {
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
//# sourceMappingURL=seed-patient.js.map