import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import booksServices from 'src/service/Home'
import { hideLoading, showLoading } from 'src/stores/loading.store'

const Header = styled.header`
  background-color: #fff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  nav {
    display: flex;
    gap: 1rem;

    a {
      text-decoration: none;
      color: #333;
      font-weight: bold;

      &:hover {
        color: #007bff;
      }
    }
  }
`

const CategoryList = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;

  .category {
    text-align: center;
    cursor: pointer;

    img {
      width: 150px;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }

    h3 {
      margin-top: 0.5rem;
      font-size: 1rem;
    }
  }
`

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 0 2rem;

  .product {
    background-color: #fff;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;

    img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
    }

    h4 {
      margin: 1rem 0 0.5rem;
    }

    p {
      color: #007bff;
      font-weight: bold;
    }
  }
`

const Home = () => {
  const [products, setProducts] = useState<any[]>([])
  const [categories] = useState([
    {
      name: 'Book',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NeM8XOYIXQggXv84xni3lnsWB73aBrhYww&s',
      api: 'getBooks',
    },
    {
      name: 'Clothes',
      image:
        'https://img.freepik.com/free-photo/purchase-sale-discount-fashion-style_53876-15282.jpg?t=st=1739948532~exp=1739952132~hmac=faa78c385a7e1ddd1f3cb401c2976cf97adcc849547f319b4848f2fed0c73315&w=1380',
      api: 'getClothes',
    },
    {
      name: 'Laptop',
      image:
        'https://img.freepik.com/free-photo/eid-shopping-trolley-laptops-perspective-view_187299-38654.jpg?ga=GA1.1.931764606.1739948531&semt=ais_hybrid',
      api: 'getLaptops',
    },
    {
      name: 'Mobile Phone',
      image:
        'https://img.freepik.com/premium-psd/red-gold-phone-screen-mockup-with-mobile-app-presentation-template_106244-1651.jpg?ga=GA1.1.931764606.1739948531&semt=ais_hybrid',
      api: 'getPhones',
    },
  ])
  const [selectedCategory, setSelectedCategory] = useState('Book')
  const dispatch = useDispatch()

  const fetchProducts = async (api: string) => {
    try {
      dispatch(showLoading())
      const response = await booksServices.getBooks()
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      dispatch(hideLoading())
    }
  }

  useEffect(() => {
    const category = categories.find((cat) => cat.name === selectedCategory)
    if (category) fetchProducts(category.api)
  }, [selectedCategory])

  return (
    <div>
      <Header>
        <h1>Ecommerce</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </Header>

      <CategoryList>
        {categories.map((category) => (
          <div key={category.name} className="category" onClick={() => setSelectedCategory(category.name)}>
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </div>
        ))}
      </CategoryList>

      <ProductsGrid>
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>${product.price}</p>
          </div>
        ))}
      </ProductsGrid>
    </div>
  )
}

export default Home
