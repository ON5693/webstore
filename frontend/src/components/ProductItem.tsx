import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import Rating from './Rating'

import { useContext, useMemo } from 'react'
import { Store } from '../Store'
import { CartItem } from '../types/Cart'
import { Product } from '../types/Product'
import { convertProductToCartItem } from '../utils'
import { toast } from 'react-toastify'

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item: CartItem) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    toast.success('Product added to the cart')
  }

  const originalPrice = useMemo(() => {
    let res = (product.price + (product.price / 10)) / 100; 
    return res.toFixed(2);
  }, [product.price]);

  const promoPrice = useMemo(() => {
    return product.price / 100;
  }, [product.price]);

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <span>De: </span>
        <Card.Text style={{color: 'gray', fontWeight: '400', textDecoration: 'line-through'}}>${originalPrice}</Card.Text>
        <span>Por: </span>
        <Card.Text style={{color: 'green'}}>${promoPrice}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Sem estoque
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(convertProductToCartItem(product))}
          >
            Adicionar ao carrinho
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
export default ProductItem
