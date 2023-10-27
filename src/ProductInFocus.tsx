import { FC, useState } from 'react'
import { IProduct } from './App'
import { Avatar, Box, Container, Grid, ImageList, ImageListItem, Typography } from '@mui/material'
interface Props {
	productState: IProduct
}
const Product: FC<Props> = ({ productState }) => {
	const { title, price, description, thumbnail, images } = productState

	return (
		<>
			<Grid
				container
				spacing={8}>
				<Grid
					item
					xs={6}>
					<Grid
						container
						item>
						<Grid
							item
							xs={2}>
							<ImageList
								cols={1}
								rowHeight={164}>
								{images.map((item) => (
									<ImageListItem key={item}>
										<img
											src={`${item}?w=80&h=80&fit=crop&auto=format`}
											loading='lazy'
										/>
									</ImageListItem>
								))}
							</ImageList>
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
