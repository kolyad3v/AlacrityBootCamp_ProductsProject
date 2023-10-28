import { FC, useState } from 'react'
import { IProduct } from '../App'
import { Box, Button, ImageList, ImageListItem, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2' // Grid version 2
interface Props {
	productState: IProduct
	setFocusedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
}
const Product: FC<Props> = ({ productState, setFocusedProduct }) => {
	const { title, price, description, thumbnail, images } = productState

	const [primaryImage, setPrimaryImage] = useState<string>(thumbnail)

	return (
		<>
			<Grid container>
				<Grid
					container
					xs={6}>
					<Grid xs={2}>
						<ImageList cols={1}>
							{images.map((item) => (
								<ImageListItem key={item}>
									<img
										onMouseEnter={() => setPrimaryImage(item)}
										src={`${item}?w=164&h=164&fit=crop&auto=format`}
										loading='lazy'
									/>
								</ImageListItem>
							))}
						</ImageList>
					</Grid>
					<Grid xs={10}>
						<img
							src={primaryImage}
							alt={title}
						/>
					</Grid>
				</Grid>

				<Grid
					container
					xs={6}>
					<Grid xs>
						<Typography>Title: {title}</Typography>
						<Typography>Price: {price}</Typography>
						<Typography>Desc: {description}</Typography>
					</Grid>

					<Grid alignSelf='end'>
						<Button
							variant='outlined'
							onClick={() => setFocusedProduct(null)}>
							Back
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}

export default Product
