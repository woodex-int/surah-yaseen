# INPRINT API Documentation

**Base URL:** `http://localhost:4000/api/v1` (Production: `https://api.inprint.pk/api/v1`)  
**Protocol:** REST / JSON  
**Authentication:** Bearer token (optional for public lead generation, required for internal production queue updates)

---

## 1. System Health

### `GET /health`
Verifies backend operational status, server timestamp, and physical plant contact.

#### Response `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2026-10-10T21:15:00.000Z",
  "service": "INPRINT Creative Production API",
  "version": "1.0.0",
  "facility": "M-71, Zainab Tower, Model Town Link Road, Lahore, 54700",
  "phone": "0321 3656096"
}
```

---

## 2. Project Briefs & Quotes

### `POST /quotes`
Registers a new project brief or custom quote request from `GetAQuoteView`.

#### Request Body
```json
{
  "fullName": "Usman Sheikh",
  "company": "Urban Retail",
  "phone": "0321 3656096",
  "email": "usman@urbanretail.pk",
  "city": "Lahore",
  "selectedNeeds": [
    "Brand Identity & Logo Design",
    "Signage & Shop Front Letters (3D / Neon)"
  ],
  "projectDetails": {
    "description": "New flagship opening in Gulberg. Need 3D backlit halo LED letters.",
    "quantityOrLocations": "1 Flagship Store",
    "dimensions": "18ft x 4ft facade",
    "deadline": "2026-11-01",
    "budgetRange": "Rs. 150,000 - 500,000",
    "needDesign": "Yes, full design needed",
    "needInstallation": "Yes, on-site installation in Lahore"
  },
  "preferredContact": "WhatsApp"
}
```

#### Response `201 Created`
```json
{
  "success": true,
  "message": "Project brief submitted successfully",
  "referenceId": "INP-Q-7491",
  "data": { ... }
}
```

---

## 3. Order Management

### `POST /orders`
Creates a booked production order from the checkout flow.

#### Request Body
```json
{
  "items": [
    {
      "product": { "id": "prod-card-matte", "name": "Velvet Matte Business Cards" },
      "quantity": 500,
      "material": "400gsm Velvet Soft Touch",
      "finish": "Spot UV + Matte",
      "sides": "Double-sided",
      "totalPrice": 4200
    }
  ],
  "contact": {
    "name": "Tariq Mehmood",
    "phone": "0321 3656096",
    "email": "tariq@client.pk",
    "whatsappConsent": true
  },
  "delivery": {
    "method": "pickup",
    "city": "Lahore",
    "address": "Model Town Link Road"
  },
  "paymentMethod": "bank-transfer",
  "total": 4200
}
```

#### Response `201 Created`
```json
{
  "success": true,
  "message": "Order booked successfully in production queue",
  "orderNumber": "INP-8492",
  "data": {
    "orderNumber": "INP-8492",
    "currentStageIndex": 1,
    "statusText": "Under review by pre-press",
    "estimatedDate": "13 Oct 2026"
  }
}
```

### `GET /orders/:orderNumber`
Fetches the live 9-stage production timeline for an order ID.

#### Response `200 OK`
```json
{
  "success": true,
  "data": {
    "orderNumber": "INP-8492",
    "clientName": "Tariq Mehmood",
    "product": "500 Velvet Matte Business Cards",
    "currentStageIndex": 4,
    "stageName": "Press Plate Setup",
    "estimatedDate": "2026-09-25",
    "city": "Lahore",
    "method": "Model Town Facility Dispatch"
  }
}
```

---

## 4. Lahore Site Reconnaissance & Measurement Visits

### `POST /site-visits`
Schedules an on-site laser survey engineer for architectural signage or retail branding.

#### Request Body
```json
{
  "name": "Asad Qureshi",
  "phone": "0321 3656096",
  "company": "Bistro 42",
  "projectType": "3D Storefront Signage & Facade",
  "address": "Shop 4B, Main Boulevard, Gulberg III, Lahore",
  "preferredDate": "2026-10-15",
  "preferredTime": "Morning (11:00 AM - 2:00 PM)",
  "notes": "Storefront elevation height approx 14 feet. Scaffolding may be needed."
}
```

---

## 5. Franchise Rollout Multi-Location Audit

### `POST /franchise`
Captures multi-unit standardization parameters.

#### Request Body
```json
{
  "fullName": "Daniyal Butt",
  "company": "Roast & Co.",
  "phone": "0321 3656096",
  "email": "founder@brand.pk",
  "currentLocations": "2-4 Locations",
  "plannedLocations": "6-12 New Outlets",
  "cities": "Lahore, Islamabad, Faisalabad",
  "industry": "Specialty Coffee"
}
```

---

## 6. Pre-Flight File Validation

### `POST /artwork/validate`
Performs header, extension, and sizing pre-flight checks before queue injection.

#### Request Body
```json
{
  "fileName": "flagship_dieline_v2.ai",
  "fileSizeMB": 8.4,
  "colorSpace": "CMYK"
}
```

#### Response `200 OK`
```json
{
  "valid": true,
  "message": "File passed pre-flight structure inspection",
  "recommendations": {
    "colorSpace": "CMYK (FOGRA39)",
    "bleedRequired": "3mm around all trims",
    "resolution": "Minimum 300 DPI at 1:1 scale",
    "textRules": "Convert all fonts to vector outlines / curves"
  }
}
```
