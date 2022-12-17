export class sessionInput {
    sessionid: number;
    begintime: string;
    endtime: string;
    capacity: number;
    enrolled: number
    notes: string;
  }

export class approvedSessionInput{
    sessionid: number;
    begintime: string;
    endtime: string;
    capacity: number;
    approved_cnt: number;
    notes: string;
}