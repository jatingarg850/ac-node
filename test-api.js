const axios = require('axios');

const BASE_URL = 'https://main.dmt413879bhi6.amplifyapp.com';

async function testEndpoints() {
    try {
        // Test Users API
        console.log('\n🔍 Testing Users API...');
        const newUser = {
            username: "testuser",
            email: "test@example.com",
            password: "test123",
            is_admin: false
        };
        const userResponse = await axios.post(`${BASE_URL}/api/users`, newUser);
        console.log('✅ POST /api/users:', userResponse.status === 201 ? 'Success' : 'Failed');
        
        const usersGet = await axios.get(`${BASE_URL}/api/users`);
        console.log('✅ GET /api/users:', usersGet.status === 200 ? 'Success' : 'Failed');

        // Test Service Requests API
        console.log('\n🔍 Testing Service Requests API...');
        const newService = {
            name: "Test Service",
            email: "service@test.com",
            phone: "1234567890",
            service_type: "repair",
            address: "123 Test St",
            preferred_date: "2024-01-20",
            message: "Test service request",
            status: "pending"
        };
        const serviceResponse = await axios.post(`${BASE_URL}/api/service-requests`, newService);
        console.log('✅ POST /api/service-requests:', serviceResponse.status === 201 ? 'Success' : 'Failed');
        
        const servicesGet = await axios.get(`${BASE_URL}/api/service-requests`);
        console.log('✅ GET /api/service-requests:', servicesGet.status === 200 ? 'Success' : 'Failed');

        // Test AC Listings API
        console.log('\n🔍 Testing AC Listings API...');
        const newListing = {
            title: "Test AC",
            description: "Test Description",
            brand: "Test Brand",
            manufacturing_year: 2023,
            ac_type: "split",
            dimensions: "24x36",
            no_of_ac: 1,
            price: 1000,
            photos: ["test.jpg"],
            status: "available"
        };
        const listingResponse = await axios.post(`${BASE_URL}/api/ac-listings`, newListing);
        console.log('✅ POST /api/ac-listings:', listingResponse.status === 201 ? 'Success' : 'Failed');
        
        const listingsGet = await axios.get(`${BASE_URL}/api/ac-listings`);
        console.log('✅ GET /api/ac-listings:', listingsGet.status === 200 ? 'Success' : 'Failed');

        // Test Buyer Inquiries API
        console.log('\n🔍 Testing Buyer Inquiries API...');
        const newInquiry = {
            ac_listing_id: 1,
            full_name: "Test Buyer",
            email: "buyer@test.com",
            phone: "0987654321",
            address: "456 Test Ave",
            city: "Test City",
            state: "Test State",
            message: "Test inquiry",
            preferred_contact_time: "morning",
            status: "pending"
        };
        const inquiryResponse = await axios.post(`${BASE_URL}/api/buyer-inquiries`, newInquiry);
        console.log('✅ POST /api/buyer-inquiries:', inquiryResponse.status === 201 ? 'Success' : 'Failed');
        
        const inquiriesGet = await axios.get(`${BASE_URL}/api/buyer-inquiries`);
        console.log('✅ GET /api/buyer-inquiries:', inquiriesGet.status === 200 ? 'Success' : 'Failed');

    } catch (error) {
        console.error('\n❌ Error:', error.response ? {
            endpoint: error.config.url,
            method: error.config.method,
            status: error.response.status,
            message: error.response.data
        } : error.message);
    }
}

testEndpoints(); 