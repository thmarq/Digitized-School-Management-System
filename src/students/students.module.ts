import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentEntities } from './entities';
import { RepositoryCollection } from './repositoryCollection/repository-collection';

@Module({
  imports: [
    MongooseModule.forFeature([...StudentEntities],
    )
  ],
  controllers: [StudentsController],
  providers: [
    RepositoryCollection,
    StudentsService
  ]
})
export class StudentsModule { }
