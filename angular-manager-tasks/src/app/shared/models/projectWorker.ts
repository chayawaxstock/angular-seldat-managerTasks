import { User } from "./user";
import { HourForDepartment } from "./hourForDepartment";
import { PresentDay } from "./pressentDay";
import { Project } from "./project";

export class ProjectWorker {
    projectId: number;
    userId:number;
    projectName: string;
    hoursForProject: number;
    project: Project;
    userWithoutPassword:User;
    sumHoursDone:number;



}
