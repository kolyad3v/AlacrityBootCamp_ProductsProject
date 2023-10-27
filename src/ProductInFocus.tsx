import { FC, useState } from 'react'
import { IProduct } from './App'
import { Avatar, Container, Grid, Typography } from '@mui/material'
interface Props {
	productState: IProduct
}
const Product: FC<Props> = ({ productState }) => {
	const { title, price, description, thumbnail, images } = productState

	return (
		<>
			<Grid container>
				<Grid
					item
					xs={6}>
					<Grid
						container
						item>
						<Grid
							item
							xs={2}>
							small pics
						</Grid>
						<Grid
							item
							xs={10}>
							<img
								src={thumbnail}
								alt={title}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={6}>
					<Grid
						container
						item>
						<Grid
							item
							xs>
							<Typography>Title: {title}</Typography>
							<Typography>Price: {price}</Typography>
							<Typography>Desc: {description}</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default Product
