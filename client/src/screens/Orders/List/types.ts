export type StringBool = 'true' | 'false'

export type Pagination = {
	limit: 20 | 50 | 100 | 250
	totalCount: number
	currentPage: number
	totalPageCount: number
}

export type OrdersListItem = {
	id: number
	number: number
	site: string
	createdAt: string
	delivery?: {
		code: string
	}
	status: string
	customFields?: {
		packing_status: StringBool
		packing_count: number
		assembly_status: StringBool
		assembly_count: number
	}
}

export type OrdersQueryData = {
	orders: {
		orders: OrdersListItem[]
		pagination: Pagination
	}
}

export interface OrdersListGqlFilter {
	numbers?: String[]
	extendedStatus?: String[]
	deliveryTypes?: String[]
	createdAtFrom?: String
	createdAtTo?: String
	customFields?: {
		assembly_status?: String
		packing_status?: String
	}
}
