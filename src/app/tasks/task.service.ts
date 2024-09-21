import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private tasks = signal<Task[]>([]);
   
    logService=inject(LoggingService);
    allTasks = this.tasks.asReadonly();

    AddTask(taskData: { title: string, description: string }) {

        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }

        this.tasks.update((oldtasks) => [...oldtasks, newTask]);
        this.logService.log("task added with title "+taskData.title);
    }
    updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) => 
            oldTasks.map((task) =>
                 task.id === taskId ? { ...task, status: newStatus } : task)
        )
        this.logService.log("task updated as "+newStatus);

    }

}
