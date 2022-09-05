import { Injectable } from '@nestjs/common'
import {
  CrmType,
  Order,
  OrdersFilter,
  OrdersResponse,
  RetailPagination,
} from './types'
import axios, { AxiosInstance } from 'axios'
import { serialize } from '../tools'

@Injectable()
export class RetailService {
  private readonly axios: AxiosInstance

  constructor() {
    this.axios = axios.create({
      baseURL: process.env.RETAIL_URL,
      timeout: 10000,
      headers: { 'X-API-KEY': process.env.RETAIL_KEY },
    })

    this.axios.interceptors.request.use((config) => {
      console.log(config.url)
      return config
    })
    this.axios.interceptors.response.use(
      (r) => {
        console.log('Result:', r.data)
        return r
      },
      (r) => {
        console.log('Error:', r.response.data)
        return r
      },
    )
  }

  async getOrders(
    page: OrdersFilter['page'] = 1,
    limit: OrdersFilter['limit'] = 20,
  ): Promise<OrdersResponse> {
    const filter: OrdersFilter = { page: page, limit: limit }
    const params = serialize(filter, '')
    const resp = await this.axios.get('/orders?' + params)

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orders: Order[] = Object.keys(resp.data.orders).map((key) => {
      return resp.data.orders[key]
    })
    const pagination: RetailPagination = resp.data.pagination

    return { orders, pagination }
  }

  async getOrder(id: string): Promise<Order | null> {
    const resp = await this.axios.get(`/orders/${id}?by=id`)

    if (!resp.data) return null

    return resp.data.order as Order
  }

  async orderStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const orderStatuses: CrmType[] = Object.keys(resp.data.statuses).map(
      (key) => {
        return resp.data.statuses[key]
      },
    )

    return orderStatuses
  }

  async productStatuses(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/product-statuses')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const productStatuses: CrmType[] = Object.keys(
      resp.data.productStatuses,
    ).map((key) => {
      return resp.data.productStatuses[key]
    })

    return productStatuses
  }

  async deliveryTypes(): Promise<CrmType[]> {
    const resp = await this.axios.get('/reference/delivery-types')

    if (!resp.data) throw new Error('RETAIL CRM ERROR')

    const deliveryTypes: CrmType[] = Object.keys(resp.data.deliveryTypes).map(
      (key) => {
        return resp.data.deliveryTypes[key]
      },
    )

    return deliveryTypes
  }
}
