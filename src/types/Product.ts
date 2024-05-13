export type Product = {
  id: number
  name: string
  price: number
  priceInProductList: number
  defaultDisplayedPriceFormatted: string
  hdThumbnailUrl: string
  imageUrl: string
  description: string
}

export type ProductList = Product[]
