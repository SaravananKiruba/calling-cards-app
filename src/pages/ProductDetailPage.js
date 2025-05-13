import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Breadcrumb, 
  Typography, 
  Carousel, 
  Tabs, 
  InputNumber, 
  Rate, 
  Divider,
  Tag,
  List,
  Avatar,
  Comment,
  Form,
  Input
} from 'antd';
import { 
  ShoppingCartOutlined, 
  HeartOutlined, 
  ShareAltOutlined, 
  SafetyOutlined, 
  CheckCircleOutlined,
  PhoneOutlined,
  RocketOutlined,
  DollarOutlined,
  StarFilled
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ProductDetailPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('1');

  // Mock product data based on id
  const product = {
    id: parseInt(id),
    title: 'Mexico Calling Card',
    images: [
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400',
      'https://via.placeholder.com/600x400'
    ],
    price: 10.00,
    salePrice: 8.00,
    onSale: true,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    country: 'Mexico',
    minutes: 240,
    description: 'Our Mexico calling card offers the best rates for calling Mexico from the United States. With no connection fees and crystal-clear call quality, stay connected with your loved ones in Mexico without breaking the bank.',
    features: [
      'No connection fee',
      'Mobile compatible',
      'Pin-less dialing',
      'Auto-refill available',
      'Works from any phone',
      'No expiration date'
    ],
    rates: {
      landline: 0.04,
      mobile: 0.08
    },
    specifications: [
      { key: 'Service Provider', value: 'CallingCards Network' },
      { key: 'Card Type', value: 'Virtual' },
      { key: 'Minutes to Landline', value: '240' },
      { key: 'Minutes to Mobile', value: '120' },
      { key: 'Validity', value: '60 days' },
      { key: 'Rounding', value: '1 minute' },
      { key: 'Connection Fee', value: 'None' },
      { key: 'Maintenance Fee', value: 'None' }
    ],
    instructions: [
      'Dial the access number provided',
      'Enter your PIN when prompted',
      'Dial the destination number with country code',
      'Enjoy your conversation'
    ],
    relatedProducts: [
      { id: 2, title: 'Mexico Plus Calling Card', image: 'https://via.placeholder.com/200x200', price: 15.00 },
      { id: 3, title: 'North America Calling Card', image: 'https://via.placeholder.com/200x200', price: 12.00 },
      { id: 4, title: 'Latin America Bundle', image: 'https://via.placeholder.com/200x200', price: 20.00 }
    ],
    reviews: [
      {
        author: 'Roberto G.',
        avatar: 'https://via.placeholder.com/50x50',
        date: '2023-05-15',
        rating: 5,
        content: 'Excellent service! The call quality is crystal clear and the rates are very competitive. I use this card every week to call my family in Mexico City.'
      },
      {
        author: 'Maria L.',
        avatar: 'https://via.placeholder.com/50x50',
        date: '2023-04-22',
        rating: 4,
        content: 'Good value for the price. I appreciate that there are no hidden fees. The only reason I'm not giving 5 stars is because the mobile rates could be a bit lower.'
      },
      {
        author: 'Juan C.',
        avatar: 'https://via.placeholder.com/50x50',
        date: '2023-03-10',
        rating: 5,
        content: 'This is my go-to calling card for reaching my relatives in Guadalajara. I've been using it for over a year and never had any issues with connection or call quality.'
      }
    ]
  };

  // Handle quantity change
  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    console.log('Added to cart:', { ...product, quantity });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/products">Products</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.title}</Breadcrumb.Item>
      </Breadcrumb>

      {/* Product Overview */}
      <Row gutter={[32, 32]} className="mb-12">
        {/* Product Images */}
        <Col xs={24} md={12}>
          <Card bordered={false} className="product-image-gallery">
            <Carousel
              autoplay
              dotPosition="bottom"
              className="mb-4 product-carousel"
            >
              {product.images.map((image, index) => (
                <div key={index}>
                  <img 
                    src={image} 
                    alt={`${product.title} - View ${index + 1}`} 
                    className="w-full rounded-md"
                  />
                </div>
              ))}
            </Carousel>
            <Row gutter={[8, 8]}>
              {product.images.map((image, index) => (
                <Col span={6} key={index}>
                  <img 
                    src={image} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full rounded-md cursor-pointer border hover:border-blue-500"
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        {/* Product Details */}
        <Col xs={24} md={12}>
          <div>
            <Title level={2}>{product.title}</Title>
            <div className="flex items-center mb-4">
              <Rate disabled allowHalf defaultValue={product.rating} className="text-yellow-500 mr-2" />
              <Text className="text-gray-500">({product.rating}) {product.reviewCount} reviews</Text>
            </div>

            <div className="mb-6">
              {product.onSale ? (
                <div className="flex items-center">
                  <Text delete className="text-gray-500 text-xl mr-2">${product.price.toFixed(2)}</Text>
                  <Text className="text-2xl font-bold text-red-600">${product.salePrice.toFixed(2)}</Text>
                  <Tag color="red" className="ml-2">SALE</Tag>
                </div>
              ) : (
                <Text className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</Text>
              )}
            </div>

            <Paragraph className="mb-6 text-gray-700">{product.description}</Paragraph>

            <div className="mb-6">
              <Title level={5}>Key Features:</Title>
              <ul className="list-disc pl-5">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 mb-1">
                    <CheckCircleOutlined className="text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <Title level={5}>Minutes:</Title>
              <div className="flex space-x-4 mb-2">
                <Card className="flex-1 text-center">
                  <PhoneOutlined className="text-blue-500 text-2xl mb-2" />
                  <div className="text-lg font-bold">{product.minutes}</div>
                  <div className="text-gray-500">Total Minutes</div>
                </Card>
                <Card className="flex-1 text-center">
                  <DollarOutlined className="text-green-500 text-2xl mb-2" />
                  <div className="text-lg font-bold">${product.rates.landline}</div>
                  <div className="text-gray-500">Per Min Landline</div>
                </Card>
                <Card className="flex-1 text-center">
                  <DollarOutlined className="text-green-500 text-2xl mb-2" />
                  <div className="text-lg font-bold">${product.rates.mobile}</div>
                  <div className="text-gray-500">Per Min Mobile</div>
                </Card>
              </div>
            </div>

            <Divider className="my-6" />

            {/* Add to Cart Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <Text className="mr-4">Quantity:</Text>
                <InputNumber
                  min={1}
                  max={10}
                  defaultValue={1}
                  onChange={handleQuantityChange}
                />
                <Text className="ml-4 text-green-600 flex items-center">
                  <CheckCircleOutlined className="mr-1" />
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </Text>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 flex-grow sm:flex-grow-0 sm:flex-basis-auto"
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  size="large"
                  icon={<HeartOutlined />}
                  className="flex-grow sm:flex-grow-0"
                >
                  Add to Wishlist
                </Button>
                <Button
                  size="large"
                  icon={<ShareAltOutlined />}
                  className="flex-grow sm:flex-grow-0"
                >
                  Share
                </Button>
              </div>
            </div>

            <Divider className="my-6" />

            {/* Trust Elements */}
            <div className="mb-4">
              <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
                <div className="flex items-center">
                  <SafetyOutlined className="text-blue-600 text-xl mr-2" />
                  <Text>Secure Payment</Text>
                </div>
                <div className="flex items-center">
                  <RocketOutlined className="text-blue-600 text-xl mr-2" />
                  <Text>Instant Delivery</Text>
                </div>
                <div className="flex items-center">
                  <CheckCircleOutlined className="text-blue-600 text-xl mr-2" />
                  <Text>Money-Back Guarantee</Text>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Tabs */}
      <div className="mb-12">
        <Tabs defaultActiveKey="1" onChange={setActiveTab}>
          <TabPane tab="Description" key="1">
            <div className="p-6 bg-white rounded-md shadow-sm">
              <Title level={4} className="mb-4">About {product.title}</Title>
              <Paragraph className="mb-6">
                {product.description}
                <br /><br />
                Our Mexico calling cards provide crystal-clear connections to both landlines and mobile 
                phones throughout Mexico. With no connection fees, maintenance charges, or hidden costs, 
                you get the full value of your card.
                <br /><br />
                Simply follow the easy dialing instructions and enjoy affordable rates to stay connected 
                with family and friends in Mexico. Our cards are perfect for regular callers who want 
                reliability and value.
              </Paragraph>

              <Title level={4} className="mb-4">How It Works</Title>
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <ol className="list-decimal pl-5">
                  {product.instructions.map((instruction, index) => (
                    <li key={index} className="mb-2">{instruction}</li>
                  ))}
                </ol>
              </div>

              <Title level={4} className="mb-4">Key Benefits</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={8}>
                  <Card className="h-full">
                    <div className="text-center">
                      <DollarOutlined className="text-green-500 text-3xl mb-3" />
                      <Title level={5}>Low Rates</Title>
                      <Paragraph>
                        Enjoy some of the lowest rates to Mexico with no hidden fees.
                      </Paragraph>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className="h-full">
                    <div className="text-center">
                      <PhoneOutlined className="text-blue-500 text-3xl mb-3" />
                      <Title level={5}>High Quality</Title>
                      <Paragraph>
                        Crystal-clear connections on every call to both landlines and mobiles.
                      </Paragraph>
                    </div>
                  </Card>
                </Col>
                <Col xs={24} sm={8}>
                  <Card className="h-full">
                    <div className="text-center">
                      <RocketOutlined className="text-purple-500 text-3xl mb-3" />
                      <Title level={5}>Instant Use</Title>
                      <Paragraph>
                        Start calling immediately after purchase with instant delivery.
                      </Paragraph>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </TabPane>

          <TabPane tab="Specifications" key="2">
            <div className="p-6 bg-white rounded-md shadow-sm">
              <Title level={4} className="mb-4">Technical Details</Title>
              <table className="min-w-full">
                <tbody>
                  {product.specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium">{spec.key}</td>
                      <td className="py-3 px-4">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <Title level={4} className="mt-8 mb-4">Calling Rates</Title>
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left">Destination</th>
                    <th className="py-3 px-4 text-left">Rate per Minute</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="py-3 px-4">Mexico - Landline</td>
                    <td className="py-3 px-4">${product.rates.landline.toFixed(2)}</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-3 px-4">Mexico - Mobile</td>
                    <td className="py-3 px-4">${product.rates.mobile.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabPane>

          <TabPane tab="Reviews" key="3">
            <div className="p-6 bg-white rounded-md shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <Title level={4} className="mb-1">Customer Reviews</Title>
                  <div className="flex items-center">
                    <Rate disabled allowHalf defaultValue={product.rating} className="text-yellow-500 mr-2" />
                    <Text className="text-gray-500">Based on {product.reviewCount} reviews</Text>
                  </div>
                </div>
                <Button type="primary" className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
                  Write a Review
                </Button>
              </div>

              <Divider />

              <div className="mb-8">
                <List
                  itemLayout="vertical"
                  dataSource={product.reviews}
                  renderItem={review => (
                    <List.Item>
                      <Comment
                        author={<Text strong>{review.author}</Text>}
                        avatar={<Avatar src={review.avatar} alt={review.author} />}
                        content={
                          <div>
                            <Rate disabled defaultValue={review.rating} className="text-yellow-500 mb-2" />
                            <Paragraph>{review.content}</Paragraph>
                          </div>
                        }
                        datetime={review.date}
                      />
                    </List.Item>
                  )}
                />
              </div>

              <div className="bg-gray-50 p-6 rounded-md">
                <Title level={4} className="mb-4">Leave a Review</Title>
                <Form layout="vertical">
                  <Form.Item label="Rating">
                    <Rate allowHalf defaultValue={5} className="text-yellow-500" />
                  </Form.Item>
                  <Form.Item label="Review">
                    <TextArea rows={4} placeholder="Share your experience with this product" />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
                      Submit Review
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mb-12">
        <Title level={3} className="mb-6">Related Products</Title>
        <Row gutter={[16, 16]}>
          {product.relatedProducts.map(item => (
            <Col key={item.id} xs={12} sm={8} md={6}>
              <Link to={`/products/${item.id}`}>
                <Card
                  hoverable
                  cover={<img alt={item.title} src={item.image} />}
                  className="h-full"
                >
                  <Card.Meta 
                    title={item.title} 
                    description={
                      <div className="text-lg font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </div>
                    } 
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recently Viewed */}
      <div>
        <Title level={3} className="mb-6">Recently Viewed</Title>
        <Row gutter={[16, 16]}>
          {product.relatedProducts.slice(0, 4).reverse().map(item => (
            <Col key={item.id} xs={12} sm={8} md={6}>
              <Link to={`/products/${item.id}`}>
                <Card
                  hoverable
                  cover={<img alt={item.title} src={item.image} />}
                  className="h-full"
                >
                  <Card.Meta 
                    title={item.title} 
                    description={
                      <div className="text-lg font-bold text-blue-600">
                        ${item.price.toFixed(2)}
                      </div>
                    } 
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ProductDetailPage;
