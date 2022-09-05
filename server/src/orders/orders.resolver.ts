import { Args, Query, Resolver } from '@nestjs/graphql'
import { RetailService } from '../retail_api/retail.service'
import { Order, OrdersFilter, OrdersResponse } from 'src/retail_api/types'

@Resolver('Orders')
export class OrdersResolver {
  constructor(private retailService: RetailService) {}

  @Query()
  async order(@Args('number') id: string): Promise<Order | null> {
    return this.retailService.getOrder(id)
  }
  @Query()
  async orders(
    @Args('page') page: OrdersFilter['page'],
    @Args('limit') limit: OrdersFilter['limit'],
  ): Promise<OrdersResponse> {
    return this.retailService.getOrders(page, limit)
  }
}
