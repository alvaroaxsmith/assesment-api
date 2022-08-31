import { Body, Controller, Param, Patch, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/strategy/jwt-auth.guard";
import { UserAssessmentDto } from "./user-assessment.dto";
import { UserAssessmentEntity } from "./user-assessment.entity";
import { UserAssessmentsService } from "./user-assessments.service";

@Controller('user-assessments')
@ApiTags('user-assessments')
export class UserAssessmentsController {
    constructor(private userAssessmentsService: UserAssessmentsService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Patch('/questions')
    @ApiBody({ type: UserAssessmentDto })
    async findUserAssessment(
        @Body() payload: UserAssessmentDto,
        @Request() req,
    ) {
        return this.userAssessmentsService.registerUserAnswer(payload, req.user.username);
    }
}