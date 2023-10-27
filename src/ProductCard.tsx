import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IProduct } from './App'
import { FC, useState } from 'react'
import { ImageList, ImageListItem } from '@mui/material'

interface ExpandMoreProps extends IconButtonProps {
	expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const { expand, ...other } = props
	return <IconButton {...other} />
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}))

interface Props {
	productState: IProduct
	setFocusedProduct: React.Dispatch<React.SetStateAction<IProduct | null>>
}

const ProductCard: FC<Props> = ({ productState, setFocusedProduct }) => {
	const [expanded, setExpanded] = React.useState(false)
	const [productImages, setproductImages] = useState<string[]>([])

	const handleExpandClick = () => {
		setExpanded(!expanded)
		showImages(images)
	}
	const { title, price, description, thumbnail, images } = productState

	const showImages = (imageStringArray: string[]) => {
		setproductImages([...imageStringArray])
	}

	return (
		<Card
			sx={{ maxWidth: 345 }}
			onClick={() => setFocusedProduct(productState)}
			classes={{ root: 'clickable' }}
		>
			<CardHeader
				avatar={
					<Avatar
						alt='Remy Sharp'
						src='goodPic.jpeg'
						sx={{ width: 128, height: 128 }}
						aria-label='recipe'
					/>
				}
				action={
					<IconButton aria-label='settings'>
						<MoreVertIcon />
					</IconButton>
				}
				title={title}
				subheader={`Price: £${price}`}
			/>
			<CardMedia
				component='img'
				height='194'
				image={thumbnail}
				alt={title}
			/>
			<CardContent>
				<Typography
					variant='body2'
					color='text.secondary'
				>
					{description}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label='add to favorites'>
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label='share'>
					<ShareIcon />
				</IconButton>
				<ExpandMore
					expand={expanded}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label='show more'
				>
					<ExpandMoreIcon />
				</ExpandMore>
			</CardActions>
			<Collapse
				in={expanded}
				timeout='auto'
				unmountOnExit
			>
				<CardContent>
					{/* {productImages.length > 0 &&
						productImages.map((imageUrl) => <img src={imageUrl} />)} */}
					<ImageList
						sx={{ width: 500, height: 450 }}
						cols={3}
						rowHeight={164}
					>
						<Avatar
							alt='Remy Sharp'
							src='goodPic.jpeg'
							sx={{ width: 128, height: 128 }}
							aria-label='recipe'
						/>
						{productImages.map((imageUrl) => (
							<ImageListItem key={imageUrl}>
								<img
									src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
									loading='lazy'
								/>
							</ImageListItem>
						))}
					</ImageList>
				</CardContent>
			</Collapse>
		</Card>
	)
}

export default ProductCard
