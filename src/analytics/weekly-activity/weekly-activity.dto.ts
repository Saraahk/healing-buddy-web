export class CreateWeeklyActivityDto {
  week_start_date: string;
  day_of_week: string;
  patients_active: number;
  doctors_active: number;
  healing_buddies_active: number;
  family_members_active: number;
}
