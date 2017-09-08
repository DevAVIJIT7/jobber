export class Job {
    job_key: string;
    status: number;
    proposed_start_at: Date;
    proposed_end_at: Date;
    actual_start_at: number;	
    actual_end_at: number;
    start_location: string;
	end_location: string;
	start_location_latitude: number;
	start_location_longitude: number;
	end_location_latitude: number;
	end_location_longitude: number;
}