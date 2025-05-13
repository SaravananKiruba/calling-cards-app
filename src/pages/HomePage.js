import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Card, Button, Row, Col, Typography } from 'antd';
import { 
  RocketOutlined, 
  SafetyOutlined, 
  DollarOutlined, 
  CustomerServiceOutlined 
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  // Sample promotional carousel items
  const carouselItems = [
    {
      id: 1,
      title: 'International Calling Plans',
      description: 'Connect with loved ones worldwide at our lowest rates ever!',
      imageUrl: 'https://via.placeholder.com/1200x400',
      buttonText: 'Shop Now',
      buttonLink: '/products?category=international',
    },
    {
      id: 2,
      title: 'New Customer Special',
      description: 'Get 15% off your first order with code NEW15',
      imageUrl: 'https://via.placeholder.com/1200x400',
      buttonText: 'Get Started',
      buttonLink: '/products?category=deals',
    },
    {
      id: 3,
      title: 'Domestic Calling Cards',
      description: 'Stay connected across the country with reliable service',
      imageUrl: 'https://via.placeholder.com/1200x400',
      buttonText: 'Browse Plans',
      buttonLink: '/products?category=domestic',
    },
  ];

  // Product categories
  const categories = [
    {
      id: 1,
      title: 'International Cards',
      image: 'https://via.placeholder.com/300x200',
      description: 'Call internationally at the best rates',
      url: '/products?category=international',
    },
    {
      id: 2,
      title: 'Domestic Cards',
      image: 'https://via.placeholder.com/300x200',
      description: 'Affordable calls within the country',
      url: '/products?category=domestic',
    },
    {
      id: 3,
      title: 'Mobile Recharge',
      image: 'https://via.placeholder.com/300x200',
      description: 'Top up mobile phones worldwide',
      url: '/products?category=recharge',
    },
    {
      id: 4,
      title: 'Special Deals',
      image: 'https://via.placeholder.com/300x200',
      description: 'Limited time offers on select cards',
      url: '/products?category=deals',
    },
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      title: 'Mexico Calling Card',
      image: 'https://via.placeholder.com/200x200',
      price: '$10.00',
      rating: 4.5,
      url: '/products/1',
    },
    {
      id: 2,
      title: 'India Calling Card',
      image: 'https://via.placeholder.com/200x200',
      price: '$15.00',
      rating: 4.8,
      url: '/products/2',
    },
    {
      id: 3,
      title: 'China Calling Card',
      image: 'https://via.placeholder.com/200x200',
      price: '$12.00',
      rating: 4.2,
      url: '/products/3',
    },
    {
      id: 4,
      title: 'Philippines Calling Card',
      image: 'https://via.placeholder.com/200x200',
      price: '$8.00',
      rating: 4.7,
      url: '/products/4',
    },
  ];

  // Value proposition features
  const features = [
    {
      icon: <RocketOutlined style={{ fontSize: '36px', color: '#1890ff' }} />,
      title: 'Fast Connections',
      description: 'Connect within seconds with our high-quality network',
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '36px', color: '#52c41a' }} />,
      title: 'Secure Transactions',
      description: 'Your payment information is always protected',
    },
    {
      icon: <DollarOutlined style={{ fontSize: '36px', color: '#fa8c16' }} />,
      title: 'Best Value',
      description: 'Competitive rates to more than 200 countries',
    },
    {
      icon: <CustomerServiceOutlined style={{ fontSize: '36px', color: '#722ed1' }} />,
      title: '24/7 Support',
      description: 'Our customer service team is always available',
    },
  ];

  return (
    <div>
      {/* Hero Carousel */}
      <section className="mb-12">
        <Carousel autoplay className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]">
          {carouselItems.map(item => (
            <div key={item.id} className="relative h-full">
              <div 
                className="h-full bg-cover bg-center relative" 
                style={{ backgroundImage: `url(${item.imageUrl})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
                  <div className="container mx-auto px-4 text-center md:text-left md:max-w-md">
                    <h2 className="text-white text-2xl md:text-4xl font-bold mb-2">
                      {item.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base mb-4">
                      {item.description}
                    </p>
                    <Link to={item.buttonLink}>
                      <Button type="primary" size="large" className="bg-blue-600 hover:bg-blue-700">
                        {item.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* Product Categories */}
      <section className="container mx-auto px-4 mb-12">
        <Title level={2} className="text-center mb-8">Our Product Categories</Title>
        <Row gutter={[16, 16]} className="justify-center">
          {categories.map(category => (
            <Col key={category.id} xs={24} sm={12} md={12} lg={6}>
              <Link to={category.url}>
                <Card
                  hoverable
                  cover={<img alt={category.title} src={category.image} />}
                  className="h-full"
                >
                  <Card.Meta 
                    title={category.title} 
                    description={category.description} 
                  />
                  <Button type="primary" className="mt-4 bg-blue-600 hover:bg-blue-700">
                    Shop Now
                  </Button>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* Value Propositions */}
      <section className="bg-gray-100 py-12 mb-12">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-8">Why Choose Us</Title>
          <Row gutter={[24, 24]}>
            {features.map((feature, index) => (
              <Col key={index} xs={24} sm={12} md={6}>
                <div className="text-center p-4">
                  <div className="mb-4">{feature.icon}</div>
                  <Title level={4}>{feature.title}</Title>
                  <Paragraph className="text-gray-600">{feature.description}</Paragraph>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 mb-12">
        <div className="flex justify-between items-center mb-6">
          <Title level={2}>Featured Products</Title>
          <Link to="/products">
            <Button type="link">View All</Button>
          </Link>
        </div>
        <Row gutter={[16, 16]}>
          {featuredProducts.map(product => (
            <Col key={product.id} xs={12} sm={8} md={6}>
              <Link to={product.url}>
                <Card
                  hoverable
                  cover={<img alt={product.title} src={product.image} />}
                  className="h-full"
                >
                  <Card.Meta 
                    title={product.title} 
                    description={
                      <div>
                        <div className="text-lg font-bold text-blue-600">
                          {product.price}
                        </div>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">★★★★★</span>
                          <span className="ml-1 text-gray-500">{product.rating}</span>
                        </div>
                      </div>
                    } 
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>

      {/* Testimonials */}
      <section className="bg-blue-50 py-12 mb-12">
        <div className="container mx-auto px-4">
          <Title level={2} className="text-center mb-8">What Our Customers Say</Title>
          <Row gutter={[24, 24]} className="justify-center">
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="text-yellow-500 text-lg mb-2">★★★★★</div>
                <Paragraph className="italic mb-4">
                  "I've been using CallingCards.com for over 5 years to call my family back home. 
                  The rates are amazing and the connection quality is always clear."
                </Paragraph>
                <div className="font-bold">Maria S.</div>
                <div className="text-gray-500">California, USA</div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="text-yellow-500 text-lg mb-2">★★★★★</div>
                <Paragraph className="italic mb-4">
                  "Great customer service and the best rates I've found anywhere. 
                  The website is easy to use and my calls connect quickly."
                </Paragraph>
                <div className="font-bold">John D.</div>
                <div className="text-gray-500">New York, USA</div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card className="h-full">
                <div className="text-yellow-500 text-lg mb-2">★★★★★</div>
                <Paragraph className="italic mb-4">
                  "I recommend CallingCards.com to all my friends who need to make international calls. 
                  Their mobile app is convenient and the call quality is excellent."
                </Paragraph>
                <div className="font-bold">Ahmed K.</div>
                <div className="text-gray-500">Texas, USA</div>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 mb-12 text-center">
        <div className="bg-blue-600 text-white rounded-lg p-8 md:p-12">
          <Title level={2} className="text-white mb-4">Ready to Get Started?</Title>
          <Paragraph className="text-gray-200 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who use our calling cards to stay connected with loved ones around the world.
          </Paragraph>
          <Link to="/products">
            <Button size="large" className="bg-white text-blue-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
