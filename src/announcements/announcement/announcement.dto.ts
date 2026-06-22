export class CreateAnnouncementDto {
  title: string;
  message: string;
  target_audience: object;
  created_by: string;
  status?: string;
}
