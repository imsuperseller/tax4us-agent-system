const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs').promises;

// Import our agents
const Tax4USAgentOrchestrator = require('../agents/tax4us-agent-orchestrator');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Initialize the orchestrator
const orchestrator = new Tax4USAgentOrchestrator();

// Sample data for demonstration
const sampleData = {
  documents: [
    { id: 1, name: 'W-2 Form 2024', status: 'processed', type: 'income', date: '2024-01-15' },
    { id: 2, name: '1099-INT', status: 'pending', type: 'investment', date: '2024-01-20' },
    { id: 3, name: 'Schedule C', status: 'processed', type: 'business', date: '2024-01-10' }
  ],
  compliance: {
    score: 85,
    violations: ['Missing 1099-INT filing'],
    deadlines: ['2024-04-15: Individual Tax Return']
  },
  optimization: {
    opportunities: 5,
    potentialSavings: 2500,
    recommendations: [
      'Maximize home office deduction',
      'Contribute to IRA for tax credit',
      'Optimize charitable giving'
    ]
  },
  stats: {
    documentsProcessed: 2,
    complianceScore: 85,
    potentialSavings: 2500,
    riskScore: 25
  }
};

// API Routes
app.get('/api/dashboard', async (req, res) => {
  try {
    res.json({
      success: true,
      data: sampleData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/upload-document', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No file uploaded'
      });
    }

    // Simulate document processing
    const newDocument = {
      id: Date.now(),
      name: req.file.originalname,
      status: 'processing',
      type: 'uploaded',
      date: new Date().toISOString()
    };

    // Add to sample data
    sampleData.documents.push(newDocument);
    sampleData.stats.documentsProcessed++;

    // Simulate AI processing delay
    setTimeout(() => {
      newDocument.status = 'processed';
    }, 3000);

    res.json({
      success: true,
      document: newDocument,
      message: 'Document uploaded successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.post('/api/process-documents', async (req, res) => {
  try {
    // Simulate BMAD workflow execution
    const result = await orchestrator.executeBMADWorkflow({
      documents: sampleData.documents,
      taxpayer: {
        name: 'Ben Ginati',
        age: 35,
        filingStatus: 'single',
        state: 'CA',
        income: 75000,
        deductions: 12000,
        credits: 2000
      },
      taxYear: 2024
    });

    res.json({
      success: true,
      result: result,
      message: 'Documents processed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/compliance-check', async (req, res) => {
  try {
    // Simulate compliance check
    const complianceResult = {
      score: Math.floor(Math.random() * 30) + 70, // 70-100
      violations: ['Missing 1099-INT filing'],
      deadlines: ['2024-04-15: Individual Tax Return'],
      riskScore: Math.floor(Math.random() * 30) + 10 // 10-40
    };

    sampleData.compliance = complianceResult;
    sampleData.stats.complianceScore = complianceResult.score;
    sampleData.stats.riskScore = complianceResult.riskScore;

    res.json({
      success: true,
      compliance: complianceResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.get('/api/optimization', async (req, res) => {
  try {
    // Simulate optimization analysis
    const optimizationResult = {
      opportunities: Math.floor(Math.random() * 5) + 3, // 3-8
      potentialSavings: Math.floor(Math.random() * 3000) + 1500, // 1500-4500
      recommendations: [
        'Maximize home office deduction',
        'Contribute to IRA for tax credit',
        'Optimize charitable giving',
        'Consider business expense tracking',
        'Review retirement contributions'
      ]
    };

    sampleData.optimization = optimizationResult;
    sampleData.stats.potentialSavings = optimizationResult.potentialSavings;

    res.json({
      success: true,
      optimization: optimizationResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Serve the main dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Tax4US Dashboard running on http://localhost:${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🏥 Health check at http://localhost:${PORT}/health`);
});

module.exports = app;
