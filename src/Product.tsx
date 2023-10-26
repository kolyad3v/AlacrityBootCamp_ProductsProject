import { FC } from 'react'
import { IProduct } from './App'
interface Props {
	productState: IProduct
	showImages: (imageArray: string[]) => void
}
const Product: FC<Props> = ({ productState, showImages }) => {
	const { title, price, description, thumbnail, images } = productState

	return (
		<>
			<div style={{ maxWidth: '400px' }}>
				<div>Title: {title}</div>
				<div>Price: {price}</div>
				<div>Desc: {description}</div>
				<img
					onClick={() => showImages(images)}
					src={thumbnail}
					alt={title}
				/>
			</div>
		</>
	)
}

export default Product
