import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { EventsService } from "./events.service";
import { FindEventsQueryDto } from "./dto/find-events-query.dto";

@Controller("contracts/:contractId/events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  findByContract(@Param("contractId", ParseIntPipe) contractId: number, @Query() query: FindEventsQueryDto) {
    return this.eventsService.findByContract(contractId, query);
  }
}
