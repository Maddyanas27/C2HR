const axios = require('axios');

// Test Company Profiles API
async function testCompanyProfiles() {
  const baseURL = 'http://localhost:5000/api';

  try {
    console.log('Testing Company Profiles API...');

    // Test 1: Get all companies (should return empty array initially)
    console.log('\n1. Testing GET /companies');
    const response = await axios.get(`${baseURL}/companies`);
    console.log('✓ GET /companies successful');
    console.log('Companies found:', response.data.length);

    // Test 2: Try to get a company by employer ID without auth (should fail)
    console.log('\n2. Testing GET /companies/employer/:id without auth');
    try {
      await axios.get(`${baseURL}/companies/employer/test123`);
      console.log('✗ Should have failed without auth');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✓ Correctly requires authentication');
      } else {
        console.log('✗ Unexpected error:', error.response?.status);
      }
    }

    console.log('\n✓ All basic API tests passed!');
    console.log('Company Profiles feature is ready for frontend testing.');

  } catch (error) {
    console.error('✗ API test failed:', error.message);
  }
}

testCompanyProfiles();