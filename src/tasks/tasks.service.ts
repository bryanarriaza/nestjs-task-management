import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository) private readonly taskRepository: TaskRepository,
    ) { }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} Not found!`);
        }
        return found;
    }

    async createTask(createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.taskRepository.createTask(createTaskDTO);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID: ${id} can't be delete because doesn't exist!`);
        }
    }

    /*
        private tasks: Task[] = [];
        getAllTasks(): Task[] {
            return this.tasks;
        }

        getTasksWithFilters(filterDTO: GetTasksFilterDTO): Task[] {
            const { status, search } = filterDTO;
            let tasks = this.getAllTasks();
            if (status) {
                tasks = tasks.filter(task => task.status === status);
            }
            if (search) {
                tasks = tasks.filter(task => task.title.includes(search) || task.description.includes(search));
            }
            return tasks;
        }

        updateTaskStatus(id: string, status: TaskStatus): Task {
            const task = this.getTaskById(id);
            task.status = status;
            return task;
        }

    */
}
