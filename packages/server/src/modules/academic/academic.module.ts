import { forwardRef, Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'

import { AccountModule } from 'modules/account/account.module'
import { FileStorageModule } from 'modules/fileStorage/fileStorage.module'
import { OrgModule } from 'modules/org/org.module'
import { OrgOfficeModule } from 'modules/orgOffice/orgOffice.module'

import { AcademicService } from './academic.service'
import { AcademicSubjectResolver } from './academicSubject.resolver'
import { CourseResolver } from './course.resolver'
import { AcademicSubject } from './models/AcademicSubject'
import { Course } from './models/Course'

@Module({
  imports: [
    TypegooseModule.forFeature([AcademicSubject, Course]),
    forwardRef(() => OrgModule),
    forwardRef(() => OrgOfficeModule),
    forwardRef(() => AccountModule),
    forwardRef(() => FileStorageModule),
  ],
  providers: [AcademicSubjectResolver, AcademicService, CourseResolver],
  exports: [AcademicService],
})
export class AcademicModule {}
