import { gql } from '@apollo/client'

export const ORDERS_QUERY = gql`
	query orders($page: Int) {
		orders(page: $page) {
			orders {
				id
				number
				site
				createdAt
				delivery {
					code
				}
				status
			}
			pagination {
				limit
				totalCount
				currentPage
				totalPageCount
			}
		}
	}
`
