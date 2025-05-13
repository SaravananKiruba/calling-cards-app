import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Row, 
  Col, 
  Card, 
  Button, 
  Select, 
  Pagination, 
  Checkbox, 
  Slider, 
  Input, 
  Space,
  Collapse,
  Tag,
  Breadcrumb,
  Typography
} from 'antd';
import { 
  FilterOutlined, 
  SortAscendingOutlined, 
  AppstoreOutlined, 
  BarsOutlined,
  StarFilled
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;
const { Search } = Input;
const { Option } = Select;

const ProductListingPage = () => {
  const [gridView, setGridView] = useState(true);
  const [filters, setFilters] = useState({
    priceRange: [0, 100],
    countries: [],
    features: [],
    rating: null
  });
  const [sortOrder, setSortOrder] = useState('popularity');
  const [currentPage, setCurrentPage] = useState(1);

  // Sample product data
  const products = [
    {
      id: 1,
      title: 'Mexico Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 10.00,
      rating: 4.5,
      reviews: 128,
      features: ['No connection fee', 'Mobile compatible', 'Pin-less dialing'],
      country: 'Mexico',
      popular: true
    },
    {
      id: 2,
      title: 'India Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 15.00,
      rating: 4.8,
      reviews: 245,
      features: ['No connection fee', 'Mobile compatible', 'Auto-refill'],
      country: 'India',
      popular: true
    },
    {
      id: 3,
      title: 'China Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 12.00,
      rating: 4.2,
      reviews: 67,
      features: ['Pin-less dialing', 'SMS notification'],
      country: 'China',
      popular: false
    },
    {
      id: 4,
      title: 'Philippines Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 8.00,
      rating: 4.7,
      reviews: 192,
      features: ['No connection fee', 'Mobile compatible', 'Auto-refill'],
      country: 'Philippines',
      popular: true
    },
    {
      id: 5,
      title: 'UK Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 7.50,
      rating: 4.3,
      reviews: 56,
      features: ['Mobile compatible', 'SMS notification'],
      country: 'UK',
      popular: false
    },
    {
      id: 6,
      title: 'Nigeria Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 20.00,
      rating: 4.1,
      reviews: 39,
      features: ['No connection fee', 'Mobile compatible'],
      country: 'Nigeria',
      popular: false
    },
    {
      id: 7,
      title: 'Canada Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 5.00,
      rating: 4.9,
      reviews: 87,
      features: ['No connection fee', 'Auto-refill', 'SMS notification'],
      country: 'Canada',
      popular: true
    },
    {
      id: 8,
      title: 'Brazil Calling Card',
      image: 'https://via.placeholder.com/300x300',
      price: 18.00,
      rating: 4.0,
      reviews: 42,
      features: ['Mobile compatible', 'Pin-less dialing'],
      country: 'Brazil',
      popular: false
    }
  ];

  // Filter options
  const countryOptions = ['Mexico', 'India', 'China', 'Philippines', 'UK', 'Nigeria', 'Canada', 'Brazil'];
  const featureOptions = ['No connection fee', 'Mobile compatible', 'Pin-less dialing', 'Auto-refill', 'SMS notification'];
  
  // Handle filter changes
  const handleFilterChange = (type, value) => {
    setFilters({
      ...filters,
      [type]: value
    });
  };

  // Handle sort change
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

  // Render star rating
  const renderStarRating = (rating) => {
    return (
      <div className="flex items-center">
        <span className="text-yellow-500 flex">
          {[...Array(5)].map((_, i) => (
            <StarFilled key={i} style={{ color: i < Math.floor(rating) ? '#fadb14' : '#e8e8e8' }} />
          ))}
        </span>
        <span className="ml-1 text-gray-500">({rating})</span>
      </div>
    );
  };

  // Render grid item
  const renderGridItem = (product) => (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6} className="mb-4">
      <Link to={`/products/${product.id}`}>
        <Card
          hoverable
          cover={<img alt={product.title} src={product.image} />}
          className="h-full product-card"
        >
          <div className="mb-2">
            {product.popular && (
              <Tag color="blue" className="mb-2">Popular</Tag>
            )}
            <h3 className="text-lg font-medium">{product.title}</h3>
            {renderStarRating(product.rating)}
            <div className="mt-1 text-sm text-gray-500">{product.reviews} reviews</div>
          </div>
          <div className="text-xl font-bold text-blue-600 mb-3">
            ${product.price.toFixed(2)}
          </div>
          <div className="mb-3">
            {product.features.slice(0, 2).map((feature, index) => (
              <div key={index} className="text-sm text-gray-600 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                {feature}
              </div>
            ))}
            {product.features.length > 2 && (
              <div className="text-sm text-gray-500">+ {product.features.length - 2} more</div>
            )}
          </div>
          <Button type="primary" block className="bg-blue-600 hover:bg-blue-700">
            View Details
          </Button>
        </Card>
      </Link>
    </Col>
  );

  // Render list item
  const renderListItem = (product) => (
    <Col key={product.id} xs={24} className="mb-4">
      <Link to={`/products/${product.id}`}>
        <Card hoverable className="product-card">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <img alt={product.title} src={product.image} className="w-full" />
            </div>
            <div className="md:w-3/4 md:pl-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    {product.popular && (
                      <Tag color="blue" className="mb-1">Popular</Tag>
                    )}
                    <h3 className="text-lg font-medium">{product.title}</h3>
                  </div>
                  <div className="text-xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="mb-2">
                  {renderStarRating(product.rating)}
                  <span className="ml-2 text-sm text-gray-500">{product.reviews} reviews</span>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-700 mb-2">Features:</div>
                  <div className="flex flex-wrap gap-2">
                    {product.features.map((feature, index) => (
                      <Tag key={index} className="mb-1">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                        {feature}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
              <Button type="primary" className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 md:w-40">
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </Link>
    </Col>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Products</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={[24, 24]}>
        {/* Sidebar Filters - Desktop */}
        <Col xs={24} md={6} className="hidden md:block">
          <Card title={
            <div className="flex items-center">
              <FilterOutlined className="mr-2" />
              <span>Filters</span>
            </div>
          }>
            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Price Range</h4>
              <Slider
                range
                min={0}
                max={100}
                value={filters.priceRange}
                onChange={(value) => handleFilterChange('priceRange', value)}
                tipFormatter={(value) => `$${value}`}
              />
              <div className="flex justify-between text-gray-500 mt-1">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>

            {/* Countries */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Countries</h4>
              <div className="max-h-48 overflow-y-auto">
                {countryOptions.map(country => (
                  <div key={country} className="mb-2">
                    <Checkbox
                      checked={filters.countries.includes(country)}
                      onChange={(e) => {
                        const newCountries = e.target.checked
                          ? [...filters.countries, country]
                          : filters.countries.filter(c => c !== country);
                        handleFilterChange('countries', newCountries);
                      }}
                    >
                      {country}
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Features</h4>
              {featureOptions.map(feature => (
                <div key={feature} className="mb-2">
                  <Checkbox
                    checked={filters.features.includes(feature)}
                    onChange={(e) => {
                      const newFeatures = e.target.checked
                        ? [...filters.features, feature]
                        : filters.features.filter(f => f !== feature);
                      handleFilterChange('features', newFeatures);
                    }}
                  >
                    {feature}
                  </Checkbox>
                </div>
              ))}
            </div>

            {/* Rating */}
            <div>
              <h4 className="font-medium mb-3">Rating</h4>
              {[4, 3, 2, 1].map(rating => (
                <div key={rating} className="mb-2">
                  <Checkbox
                    checked={filters.rating === rating}
                    onChange={(e) => {
                      handleFilterChange('rating', e.target.checked ? rating : null);
                    }}
                  >
                    {rating}+ <StarFilled style={{ color: '#fadb14' }} /> & up
                  </Checkbox>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Mobile Filters */}
        <Col xs={24} className="md:hidden mb-4">
          <Collapse expandIconPosition="end">
            <Panel 
              header={
                <div className="flex items-center">
                  <FilterOutlined className="mr-2" />
                  <span>Filters</span>
                </div>
              } 
              key="1"
            >
              {/* Price Range */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Price Range</h4>
                <Slider
                  range
                  min={0}
                  max={100}
                  value={filters.priceRange}
                  onChange={(value) => handleFilterChange('priceRange', value)}
                  tipFormatter={(value) => `$${value}`}
                />
                <div className="flex justify-between text-gray-500 mt-1">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}</span>
                </div>
              </div>

              {/* Countries */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Countries</h4>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select countries"
                  value={filters.countries}
                  onChange={(value) => handleFilterChange('countries', value)}
                >
                  {countryOptions.map(country => (
                    <Option key={country} value={country}>{country}</Option>
                  ))}
                </Select>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="font-medium mb-2">Features</h4>
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Select features"
                  value={filters.features}
                  onChange={(value) => handleFilterChange('features', value)}
                >
                  {featureOptions.map(feature => (
                    <Option key={feature} value={feature}>{feature}</Option>
                  ))}
                </Select>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-medium mb-2">Rating</h4>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select minimum rating"
                  value={filters.rating}
                  onChange={(value) => handleFilterChange('rating', value)}
                  allowClear
                >
                  {[4, 3, 2, 1].map(rating => (
                    <Option key={rating} value={rating}>
                      {rating}+ <StarFilled style={{ color: '#fadb14' }} /> & up
                    </Option>
                  ))}
                </Select>
              </div>
            </Panel>
          </Collapse>
        </Col>

        {/* Main Content */}
        <Col xs={24} md={18}>
          {/* Title and Description */}
          <div className="mb-6">
            <Title level={2}>Calling Cards</Title>
            <Paragraph className="text-gray-600">
              Browse our selection of high-quality calling cards for international and domestic calls. 
              We offer competitive rates and reliable connections to help you stay connected with loved ones.
            </Paragraph>
          </div>
          
          {/* Search and Sort Controls */}
          <div className="mb-6">
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={14}>
                <Search
                  placeholder="Search products..."
                  allowClear
                  enterButton
                  className="w-full"
                />
              </Col>
              <Col xs={12} md={6}>
                <div className="flex items-center">
                  <SortAscendingOutlined className="mr-2" />
                  <Select
                    defaultValue="popularity"
                    style={{ width: '100%' }}
                    onChange={handleSortChange}
                  >
                    <Option value="popularity">Popularity</Option>
                    <Option value="priceAsc">Price: Low to High</Option>
                    <Option value="priceDesc">Price: High to Low</Option>
                    <Option value="rating">Rating</Option>
                    <Option value="newest">Newest</Option>
                  </Select>
                </div>
              </Col>
              <Col xs={12} md={4}>
                <div className="flex justify-end">
                  <Space>
                    <Button
                      type={gridView ? 'primary' : 'default'}
                      icon={<AppstoreOutlined />}
                      onClick={() => setGridView(true)}
                      className={gridView ? 'bg-blue-600' : ''}
                    />
                    <Button
                      type={!gridView ? 'primary' : 'default'}
                      icon={<BarsOutlined />}
                      onClick={() => setGridView(false)}
                      className={!gridView ? 'bg-blue-600' : ''}
                    />
                  </Space>
                </div>
              </Col>
            </Row>
          </div>

          {/* Active Filters */}
          {(filters.countries.length > 0 || filters.features.length > 0 || filters.rating || 
            (filters.priceRange[0] > 0 || filters.priceRange[1] < 100)) && (
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-gray-600">Active Filters:</span>
                
                {/* Price Range */}
                {(filters.priceRange[0] > 0 || filters.priceRange[1] < 100) && (
                  <Tag 
                    closable 
                    onClose={() => handleFilterChange('priceRange', [0, 100])}
                  >
                    Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </Tag>
                )}
                
                {/* Countries */}
                {filters.countries.map(country => (
                  <Tag 
                    key={country} 
                    closable 
                    onClose={() => {
                      handleFilterChange('countries', 
                        filters.countries.filter(c => c !== country)
                      );
                    }}
                  >
                    {country}
                  </Tag>
                ))}
                
                {/* Features */}
                {filters.features.map(feature => (
                  <Tag 
                    key={feature} 
                    closable 
                    onClose={() => {
                      handleFilterChange('features', 
                        filters.features.filter(f => f !== feature)
                      );
                    }}
                  >
                    {feature}
                  </Tag>
                ))}
                
                {/* Rating */}
                {filters.rating && (
                  <Tag 
                    closable 
                    onClose={() => handleFilterChange('rating', null)}
                  >
                    {filters.rating}+ Stars
                  </Tag>
                )}
                
                <Button 
                  size="small" 
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 100],
                      countries: [],
                      features: [],
                      rating: null
                    });
                  }}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Products Grid/List */}
          <Row gutter={[16, 16]}>
            {gridView
              ? products.map(product => renderGridItem(product))
              : products.map(product => renderListItem(product))
            }
          </Row>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination
              current={currentPage}
              onChange={setCurrentPage}
              total={24}
              pageSize={8}
              showSizeChanger={false}
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListingPage;
