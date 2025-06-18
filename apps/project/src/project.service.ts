// import { Injectable } from '@nestjs/common';
// import { CreateProjectInput } from './dto/create-project.input';
// import { UpdateProjectInput } from './dto/update-project.input';

// @Injectable()
// export class ProjectService {
//   create(createProjectInput: CreateProjectInput) {
//     return 'This action adds a new project';
//   }

//   findAll() {
//     return `This action returns all project`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} project`;
//   }

//   update(id: number, updateProjectInput: UpdateProjectInput) {
//     return `This action updates a #${id} project`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} project`;
//   }
// }


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';
import { RedisService } from '../../../libs/redis/src/redis.service';
import { RmqService } from '../../../libs/rmq/src/rmq.service';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly redisService: RedisService,
    private readonly rmqService: RmqService,
  ) {}

  async create(createProjectInput: CreateProjectInput): Promise<Project> {
    const project = this.projectRepository.create(createProjectInput);
    const savedProject = await this.projectRepository.save(project);
    
    await this.redisService.set(`project_${savedProject.id}`, savedProject, 3600);
    await this.redisService.del('all_projects');
    
    this.rmqService.emit('project_created', {
      id: savedProject.id,
      name: savedProject.name,
      timestamp: new Date(),
    });

    return savedProject;
  }

  async findAll(): Promise<Project[]> {
    const cachedProjects = await this.redisService.get<Project[]>('all_projects');
    if (cachedProjects) {
      return cachedProjects;
    }

    const projects = await this.projectRepository.find();
    await this.redisService.set('all_projects', projects, 60);
    return projects;
  }
}

