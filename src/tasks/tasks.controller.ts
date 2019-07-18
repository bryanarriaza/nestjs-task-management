import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter-dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {

    constructor(private readonly tasksService: TasksService) { }

    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    /*
        @Get()
        getTasks(@Query(ValidationPipe) filterDTO: GetTasksFilterDTO): Task[] {
            if (Object.keys(filterDTO).length) {
                return this.tasksService.getTasksWithFilters(filterDTO);
            } else {
                return this.tasksService.getAllTasks();
            }
        }



        @Post()
        @UsePipes(ValidationPipe)
        createTask(@Body() createTaskDTO: CreateTaskDTO): Task {
            return this.tasksService.createTask(createTaskDTO);
        }

        @Patch('/:id/status')
        updateTaskStatus(@Param('id') id: string, @Body('status', TaskStatusValidationPipe) status: TaskStatus): Task {
            return this.tasksService.updateTaskStatus(id, status);
        }

        @Delete('/:id')
        deleteTask(@Param('id') id: string): Task[] {
            return this.tasksService.deleteTask(id);
        }
    */

}
