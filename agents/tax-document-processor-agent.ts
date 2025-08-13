import OpenAI from 'openai';

export interface DocumentAnalysis {
  documentType: string;
  keyData: Record<string, any>;
  riskFactors: string[];
  recommendations: string[];
  confidence: number;
}

export interface ProcessedDocument {
  id: string;
  name: string;
  type: string;
  status: 'processing' | 'completed' | 'error';
  analysis: DocumentAnalysis | null;
  uploadedAt: Date;
  processedAt?: Date;
}

export class TaxDocumentProcessorAgent {
  private openai: OpenAI;
  public name: string;
  public description: string;
  public version: string;
  public status: 'idle' | 'processing' | 'error';

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    this.name = "Tax Document Processor Agent";
    this.description = "AI-powered tax document analysis and data extraction";
    this.version = "1.0.0";
    this.status = 'idle';
  }

  async processDocument(documentContent: string, fileName: string): Promise<ProcessedDocument> {
    this.status = 'processing';
    
    try {
      const analysis = await this.analyzeDocument(documentContent);
      
      const processedDoc: ProcessedDocument = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        name: fileName,
        type: analysis.documentType,
        status: 'completed',
        analysis,
        uploadedAt: new Date(),
        processedAt: new Date(),
      };

      this.status = 'idle';
      return processedDoc;
    } catch (error) {
      this.status = 'error';
      throw new Error(`Document processing failed: ${error}`);
    }
  }

  private async analyzeDocument(content: string): Promise<DocumentAnalysis> {
    const prompt = `
      Analyze this tax document and extract key information:
      
      Document content:
      ${content}
      
      Please provide:
      1. Document type (W-2, 1099, Schedule C, etc.)
      2. Key data points (income, deductions, etc.)
      3. Risk factors
      4. Recommendations
      5. Confidence score (0-100)
      
      Respond in JSON format.
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1,
    });

    const result = response.choices[0]?.message?.content;
    if (!result) throw new Error('No response from AI');

    try {
      return JSON.parse(result) as DocumentAnalysis;
    } catch {
      // Fallback parsing if JSON is malformed
      return {
        documentType: 'Unknown',
        keyData: { content: content.substring(0, 200) },
        riskFactors: ['Unable to parse document'],
        recommendations: ['Manual review required'],
        confidence: 0,
      };
    }
  }

  async getAgentInfo() {
    return {
      name: this.name,
      description: this.description,
      version: this.version,
      status: this.status,
      capabilities: [
        'Document type identification',
        'Data extraction',
        'Risk assessment',
        'Compliance checking',
        'Recommendation generation'
      ],
      bmadPhase: 'BUILD'
    };
  }
}
