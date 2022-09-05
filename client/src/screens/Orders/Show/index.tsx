import React, { useEffect } from 'react'
import OrdersShowStore from './store'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import styles from './styles.m.styl'
import { map } from 'lodash'
import Item from './components/Item'
import { SingleOrderItem } from './types'

type ShowParams = {
	id: string
}

const OrdersShow = observer(
	(): JSX.Element => {
		const [state] = React.useState(new OrdersShowStore())
		const { id } = useParams<ShowParams>()

		useEffect(() => {
			state.setId(id)
			state.loadOrder()
		}, [id, state])

		return (
			<div className={styles.screenWrapper}>
				<div className={styles.screen}>
					<div className={styles.items}>
						{map(state.order?.items, (item: SingleOrderItem, index: number) => (
							<Item item={item} key={index} />
						))}
					</div>
				</div>
			</div>
		)
	}
)

export default OrdersShow
