import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import Form from 'react-bootstrap/Form'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Rating from '../components/Rating'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { convertProductToCartItem, getError } from '../utils'
import { Store } from '../Store'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { toast } from 'react-toastify'
import { Review } from '../types/Product'
import { ApiError } from '../types/ApiError'
import {
  useCreateReviewMutation,
  useGetProductDetailsBySlugQuery,
} from '../hooks/productHooks'

function ProductPage() {
  const reviewsRef = useRef<HTMLDivElement>(null)

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const navigate = useNavigate()
  const params = useParams()
  const { slug } = params

  const {
    data: product,
    refetch,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!)

  const { mutateAsync: createReview, isLoading: loadingCreateReview } =
    useCreateReviewMutation()

  const { state, dispatch } = useContext(Store)
  const { cart, userInfo } = state

  const addToCartHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.countInStock < quantity) {
      toast.warn('Desculpe. Produto sem estoque.')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    navigate('/cart')
  }

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (!comment || !rating) {
      toast.error('Por favor digite um comentario e avalie')
      return
    }
    try {
      await createReview({
        productId: product!._id,
        rating,
        comment,
        name: userInfo!.name,
      })
      refetch()
      toast.success('Avaliação enviada com sucesso')
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current!.offsetTop,
      })
      setComment('')
      setRating(0)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : product ? (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="large"
            src={selectedImage || product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>Preço : ${product!.price}</ListGroup.Item>
            <ListGroup.Item>
              <Row xs={1} md={2} className="g-2">
                {[product.image, ...product.images].map((x) => (
                  <Col key={x}>
                    <Card>
                      <Button
                        className="thumbnail"
                        type="button"
                        variant="light"
                        onClick={() => setSelectedImage(x)}
                      >
                        <Card.Img variant="top" src={x} alt="product" />
                      </Button>
                    </Card>
                  </Col>
                ))}
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              Descrição:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Preço:</Col>
                    <Col>${product!.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product!.countInStock > 0 ? (
                        <Badge bg="success">Em estoque</Badge>
                      ) : (
                        <Badge bg="danger">Indisponivel</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Adicionar ao carrinho
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="my-3">
        <h2 ref={reviewsRef}>Avaliações</h2>
        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>Sem avaliação</MessageBox>
          )}
        </div>
        <ListGroup>
          {product.reviews.map((review: Review) => (
            <ListGroup.Item key={review.createdAt}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} numReviews={0} caption=""></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="my-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Digite uma avaliação para os clientes</h2>
              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Select
                  aria-label="Rating"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Selecionar...</option>
                  <option value="1">1- Muito ruim</option>
                  <option value="2">2- Ruim</option>
                  <option value="3">3- Bom</option>
                  <option value="4">4- Muito bom</option>
                  <option value="5">5- Excelente</option>
                </Form.Select>
              </Form.Group>
              <FloatingLabel
                controlId="floatingTextarea"
                label="Comments"
                className="mb-3"
              >
                <Form.Control
                  as="textarea"
                  placeholder="Deixe um comentário aqui"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </FloatingLabel>

              <div className="mb-3">
                <Button disabled={loadingCreateReview} type="submit">
                  Submit
                </Button>
                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please{' '}
              <Link to={`/signin?redirect=/product/${product.slug}`}>
                Sign In
              </Link>{' '}
              to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>no product</div>
  )
}
export default ProductPage
