import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import Product from './Product'

export interface IProduct {
	id: number
	price: number
	description: string
	thumbnail: string
	title: string
	images: string[]
}

enum SortByOption {
	Title = 'title',
	PriceAsc = 'priceAsc',
	priceDesc = 'priceDesc',
}

function App() {
	// const SortByOption = []
	const [products, setProducts] = useState<IProduct[]>([])
	const [searchTerm, setSearchTerm] = useState<string>('')
	const [sortBy, setSortBy] = useState<SortByOption>(SortByOption.PriceAsc)

	const [productImages, setproductImages] = useState<string[]>([])

	async function fetchData() {
		try {
			const response = await axios.get('https://dummyjson.com/products?limit=50')
			setProducts(response.data.products)
			console.log(products)
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
		return products.filter(
			(product) =>
				product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
		)
	}

	const handleSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
		setSortBy(event.target.value as SortByOption)
	}

	const getSortedProducts = (sortBy: SortByOption): IProduct[] => {
		return [...products].sort((productA, productB) => {
			if (sortBy === SortByOption.Title) {
				return productA.title.localeCompare(productB.title)
			} else if (sortBy === SortByOption.PriceAsc) {
				return productA.price - productB.price
			} else if (sortBy === SortByOption.priceDesc) {
				return productB.price - productA.price
			} else {
				return 0
			}
		})
	}

	const filteredProducts = getFilteredProducts(searchTerm)

	const sortedProduct = getSortedProducts(sortBy)

	const showImages = (imageStringArray: string[]) => {
		setproductImages([...imageStringArray])
	}

	return (
		<>
			{productImages.length > 0 &&
				productImages.map((imageUrl) => <img src={imageUrl} />)}

			<select
				name='Sort By'
				value={sortBy}
				onChange={handleSort}
			>
				{Object.values(SortByOption).map((option) => (
					<option
						key={option}
						value={option}
					>
						{option}
					</option>
				))}
			</select>
			<input
				type='text'
				value={searchTerm}
				onChange={handleSearch}
			/>
			{searchTerm !== ''
				? filteredProducts.map((product) => (
						<Product
							showImages={showImages}
							key={product.id}
							productState={product}
						/>
				  ))
				: sortedProduct.map((product) => (
						<Product
							showImages={showImages}
							key={product.id}
							productState={product}
						/>
				  ))}
		</>
	)
}

export default App
