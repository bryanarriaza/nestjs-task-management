import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';

@EntityRepository()
export class Repository extends Repository<> {
    findByName(clientName: string) {
        return this.findOne({ where: {clientName} });
    }
}
