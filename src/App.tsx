import { useEffect, useState } from 'react'
import axios from 'axios'
import * as ICONS from '@mui/icons-material'
import { Backdrop, Badge, Button, CircularProgress, Container, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import ProductCard from './ProductComponents/ProductCard'
import Modal from './mui/MyModal'
import MyPopOver from './mui/MyPopOver'
import MyBasicPopper from './mui/MyBasicPopper'
import MySnackBar from './mui/MySnackBar'
import ProductInFocus from './ProductComponents/ProductInFocus'

export type IProduct = {
	id: number
	price: number
	description: string
	thumbnail: string
	title: string
	images: string[]
}

// enum SortByOption {
// 	Title = 'title',
// 	PriceAsc = 'priceAsc',
// 	PriceDesc = 'PriceDesc',
// }

function App() {
	const SortByOption = { Title: 'title', PriceAsc: 'priceAsc', PriceDesc: 'priceDesc' } as const
	const isSortByOption = (value: any): boolean => {
		return Object.values(SortByOption).includes(value)
	}

	type SortByOptionKeys = keyof typeof SortByOption
	type SortByOptionValues = (typeof SortByOption)[SortByOptionKeys]

	const [products, setProducts] = useState<IProduct[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [sortBy, setSortBy] = useState<SortByOptionValues>(SortByOption.PriceAsc)
	const [open, setOpen] = useState(true)

	async function fetchData() {
		try {
			const response = await axios.get('https://dummyjson.com/products?limit=50')
			setProducts(response.data.products)
			console.log(products)
			setOpen(false)
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	useEffect(() => {
		console.log(products)
		console.log(sortBy)
	}, [products, sortBy])

	// computed attributes

	// computed data attributes
	// Quick search, filter, filter by category

	// UX Affordances

	// Sortable properties, title and price.

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearchTerm(event.target.value)
	}

	const getFilteredProducts = (searchTerm: string): IProduct[] => {
		if (searchTerm === '') return products
		return products.filter((product) => product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1)
	}

	const handleSort = (event: SelectChangeEvent<SortByOptionValues>): void => {
		if (!isSortByOption(event.target.value)) return
		setSortBy(event.target.value as SortByOptionValues)
	}

	const getSortedProducts = (sortBy: SortByOptionValues): IProduct[] => {
		return [...products].sort((productA, productB) => {
			if (sortBy === SortByOption.Title) {
				return productA.title.localeCompare(productB.title)
			} else if (sortBy === SortByOption.PriceAsc) {
				return productA.price - productB.price
			} else if (sortBy === SortByOption.PriceDesc) {
				return productB.price - productA.price
			} else {
				return 0
			}
		})
	}

	const filteredProducts = getFilteredProducts(searchTerm)

	const sortedProduct = getSortedProducts(sortBy)

	const [focusedProduct, setFocusedProduct] = useState<IProduct | null>(null)

	return (
		<>
			<Container>
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}>
					<CircularProgress color='inherit' />
				</Backdrop>
				<Grid
					container
					rowSpacing={8}
					spacing={2}
					sx={{ my: 2 }}>
					<Grid
						item
						xs>
						<Button
							sx={{ marginRight: 2 }}
							variant='outlined'
							color='warning'>
							Hello world
						</Button>
						<Badge
							badgeContent={4}
							color='primary'>
							<ICONS.Email color='action' />
						</Badge>
					</Grid>
					<Grid
						item
						xs>
						<Modal />
					</Grid>
					<Grid
						item
						xs>
						<MyPopOver />
					</Grid>
					<Grid
						item
						xs>
						<MyBasicPopper />
					</Grid>
					<Grid
						item
						xs>
						<MySnackBar />
					</Grid>
					<Grid
						item
						xs={8}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Sort By</InputLabel>
							<Select
								name='Sort By'
								value={sortBy}
								onChange={handleSort}
								label='SortBy'>
								{Object.values(SortByOption).map((option) => (
									<MenuItem
										key={option}
										value={option}>
										{option}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>
					<Grid
						item
						xs={4}>
						<TextField
							fullWidth
							id='outlined-basic'
							label='Search for...'
							variant='outlined'
							value={searchTerm}
							onChange={handleSearch}
						/>
					</Grid>
				</Grid>

				{focusedProduct ? (
					<ProductInFocus
						setFocusedProduct={setFocusedProduct}
						productState={focusedProduct}
					/>
				) : (
					<Grid
						container
						columns={12}
						rowSpacing={8}
						spacing={2}>
						{searchTerm !== ''
							? filteredProducts.map((product) => (
									<Grid
										item
										md={4}>
										<ProductCard
											key={product.id}
											productState={product}
											setFocusedProduct={setFocusedProduct}
										/>
									</Grid>
							  ))
							: sortedProduct.map((product) => (
									<Grid
										item
										xs={3}>
										<ProductCard
											key={product.id}
											productState={product}
											setFocusedProduct={setFocusedProduct}
										/>
									</Grid>
							  ))}
					</Grid>
				)}
			</Container>
		</>
	)
}

export default App
