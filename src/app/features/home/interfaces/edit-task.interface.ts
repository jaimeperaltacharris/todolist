import { Task } from "@core/entities/task";

export interface IEditTask {
    isEdited: boolean;
    taskInfo?: Task
}