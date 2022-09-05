import { makeAutoObservable } from 'mobx'
import { OrderQueryData, SingleOrder } from '~/screens/Orders/Show/types'
import client from 'api/gql'
import { ORDER_QUERY } from '~/screens/Orders/Show/queries'

export default class OrdersShowStore {
	order: SingleOrder | null = null
	id: string | null = null

	constructor() {
		makeAutoObservable(this)
	}

	setOrder(order: SingleOrder): void {
		this.order = order
	}

	setId(id: string): void {
		this.id = id
	}

	async loadOrder() {
		client
			.query(ORDER_QUERY, { number: this.id })
			.toPromise()
			.then(result => {
				const order = (result.data as OrderQueryData).order
				this.setOrder(order)
			})
			.catch(error => console.log(error))
			.finally(() => {})
	}
}
