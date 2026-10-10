import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// In-Memory Database Store (mirrors database/schema.sql)
const db = {
  quotes: [],
  orders: [],
  siteVisits: [],
  franchiseInquiries: [],
  tradeAccounts: []
};

// -----------------------------------------------------------------------------
// Health Check
// -----------------------------------------------------------------------------
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'INPRINT Creative Production API',
    version: '1.0.0',
    facility: 'M-71, Zainab Tower, Model Town Link Road, Lahore, 54700',
    phone: '0321 3656096'
  });
});

// -----------------------------------------------------------------------------
// Quotes / Project Briefs Endpoint
// -----------------------------------------------------------------------------
app.post('/api/v1/quotes', (req, res) => {
  const { fullName, company, phone, email, city, selectedNeeds, projectDetails, preferredContact } = req.body;

  if (!fullName || !phone) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Full Name and Phone / WhatsApp number are required fields.'
    });
  }

  const quoteId = `INP-Q-${Math.floor(1000 + Math.random() * 9000)}`;
  const newQuote = {
    id: quoteId,
    fullName,
    company: company || 'Not specified',
    phone,
    email: email || null,
    city: city || 'Lahore',
    needs: selectedNeeds || [],
    details: projectDetails || {},
    preferredContact: preferredContact || 'WhatsApp',
    createdAt: new Date().toISOString(),
    status: 'Received - Pending Prepress Review'
  };

  db.quotes.push(newQuote);

  return res.status(201).json({
    success: true,
    message: 'Project brief submitted successfully',
    referenceId: quoteId,
    data: newQuote
  });
});

app.get('/api/v1/quotes', (req, res) => {
  res.json({ success: true, count: db.quotes.length, data: db.quotes });
});

// -----------------------------------------------------------------------------
// Orders Endpoint
// -----------------------------------------------------------------------------
app.post('/api/v1/orders', (req, res) => {
  const { items, contact, delivery, paymentMethod, total } = req.body;

  if (!contact?.name || !contact?.phone || !items || items.length === 0) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Order requires contact details and at least one line item.'
    });
  }

  const orderNumber = `INP-${Math.floor(8000 + Math.random() * 1900)}`;
  const newOrder = {
    orderNumber,
    items,
    contact,
    delivery: delivery || { method: 'pickup', city: 'Lahore' },
    paymentMethod: paymentMethod || 'bank-transfer',
    total: total || 0,
    currentStageIndex: 1, // "Order placed"
    statusText: 'Under review by pre-press',
    orderDate: new Date().toISOString().split('T')[0],
    estimatedDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    facility: 'Model Town Lahore'
  };

  db.orders.push(newOrder);

  return res.status(201).json({
    success: true,
    message: 'Order booked successfully in production queue',
    orderNumber,
    data: newOrder
  });
});

app.get('/api/v1/orders/:orderNumber', (req, res) => {
  const { orderNumber } = req.params;
  const order = db.orders.find((o) => o.orderNumber.toUpperCase() === orderNumber.toUpperCase());

  if (!order) {
    return res.status(404).json({
      error: 'Order not found',
      message: `No record found for order number ${orderNumber}`
    });
  }

  return res.json({ success: true, data: order });
});

// -----------------------------------------------------------------------------
// Site Visits Endpoint (Lahore Laser Survey)
// -----------------------------------------------------------------------------
app.post('/api/v1/site-visits', (req, res) => {
  const { name, phone, company, projectType, address, preferredDate, preferredTime, notes } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Name, phone, and Lahore site address are required.'
    });
  }

  const visitId = `VISIT-${Math.floor(100 + Math.random() * 900)}`;
  const newVisit = {
    id: visitId,
    name,
    phone,
    company: company || '',
    projectType: projectType || 'Signage',
    address,
    preferredDate: preferredDate || 'As soon as possible',
    preferredTime: preferredTime || 'Morning',
    notes: notes || '',
    createdAt: new Date().toISOString(),
    status: 'Engineer Scheduling'
  };

  db.siteVisits.push(newVisit);

  return res.status(201).json({
    success: true,
    message: 'Site visit request registered',
    visitId,
    data: newVisit
  });
});

// -----------------------------------------------------------------------------
// Franchise Rollout Inquiries
// -----------------------------------------------------------------------------
app.post('/api/v1/franchise', (req, res) => {
  const { fullName, company, phone, currentLocations, plannedLocations, cities, industry } = req.body;

  if (!fullName || !phone || !company) {
    return res.status(400).json({
      error: 'Validation failed',
      message: 'Full Name, Brand Name, and Phone are required for franchise audits.'
    });
  }

  const inquiryId = `FRAN-${Math.floor(100 + Math.random() * 900)}`;
  const newInquiry = {
    id: inquiryId,
    fullName,
    company,
    phone,
    currentLocations,
    plannedLocations,
    cities,
    industry,
    createdAt: new Date().toISOString(),
    status: 'Under Review by Technical Director'
  };

  db.franchiseInquiries.push(newInquiry);

  return res.status(201).json({
    success: true,
    message: 'Franchise rollout consultation scheduled',
    inquiryId,
    data: newInquiry
  });
});

// -----------------------------------------------------------------------------
// Artwork Pre-flight Validation Endpoint
// -----------------------------------------------------------------------------
app.post('/api/v1/artwork/validate', (req, res) => {
  const { fileName, fileSizeMB, colorSpace } = req.body;

  const validFormats = ['pdf', 'ai', 'psd', 'cdr', 'tiff', 'jpg', 'png'];
  const ext = fileName?.split('.').pop()?.toLowerCase();

  if (!ext || !validFormats.includes(ext)) {
    return res.status(400).json({
      valid: false,
      error: `Unsupported file format .${ext}. Only print-ready formats (PDF, AI, PSD, CDR, TIFF, JPG, PNG) accepted.`
    });
  }

  if (fileSizeMB && parseFloat(fileSizeMB) > 25) {
    return res.status(400).json({
      valid: false,
      error: `File size exceeds 25MB limit. Please provide a cloud link.`
    });
  }

  return res.json({
    valid: true,
    message: 'File passed pre-flight structure inspection',
    recommendations: {
      colorSpace: colorSpace || 'CMYK (FOGRA39)',
      bleedRequired: '3mm around all trims',
      resolution: 'Minimum 300 DPI at 1:1 scale',
      textRules: 'Convert all fonts to vector outlines / curves'
    }
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[INPRINT API] Server listening on http://0.0.0.0:${PORT}`);
    console.log(`[INPRINT API] Verified endpoints: /api/v1/health, /api/v1/quotes, /api/v1/orders, /api/v1/site-visits, /api/v1/franchise`);
  });
}

export default app;
