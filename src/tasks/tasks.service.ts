import { Injectable, NotFoundException } from '@nestjs/common';
import * as uuid from 'uuid/v1';
import { Task, TaskStatus } from '../model/task.model';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        const found = this.tasks.find(task => task.id === id);
        if (!found) {
            throw new NotFoundException(`Task with ID: ${id} Not found!`);
        }
        return found;
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

    createTask(createTaskDTO: CreateTaskDTO): Task {
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }

    updateTaskStatus(id: string, status: TaskStatus): Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }

    deleteTask(id: string): Task[] {
        this.tasks = this.tasks.filter(task => task.id !== id);
        return this.tasks;
    }

}
