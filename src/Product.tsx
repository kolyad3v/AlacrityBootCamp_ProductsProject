import { FC, useState } from 'react'
import { IProduct } from './App'
import { Avatar, Container } from '@mui/material'
interface Props {
	productState: IProduct
	showImages: (imageArray: string[]) => void
}
const Product: FC<Props> = ({ productState, showImages }) => {
	const { title, price, description, thumbnail, images } = productState

	return (
		<>
			<Container maxWidth='sm'>
				<Avatar
					alt='Remy Sharp'
					src='goodPic.jpeg'
					sx={{ width: 128, height: 128 }}
				/>
				<div>Title: {title}</div>
				<div>Price: {price}</div>
				<div>Desc: {description}</div>
				<img
					onClick={() => showImages(images)}
					src={thumbnail}
					alt={title}
				/>
			</Container>
		</>
	)
}

export default Product
