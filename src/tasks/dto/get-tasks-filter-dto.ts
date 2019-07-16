import { TaskStatus } from '../../model/task.model';

export class GetTasksFilterDTO {
    status: TaskStatus;
    search: string;
}
